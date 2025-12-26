#!/usr/bin/env node

/**
 * Crime Data Fetcher for Bethlehem Township, PA
 *
 * This script fetches publicly available crime data from various sources
 * and formats it according to the KONOMI Crime Data Standard.
 *
 * Data Sources:
 * 1. Bethlehem Township Police Department
 * 2. Pennsylvania State Police UCR (Uniform Crime Reporting)
 * 3. CrimeReports.com API (if available)
 * 4. Local news RSS feeds
 *
 * Usage: node scripts/fetch-crime-data.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  dataDir: path.join(__dirname, '../src/_data'),
  outputFile: 'crimes.json',
  sources: {
    // Add actual API endpoints when available
    bethlehem_pd: 'https://www.bethlehemtownship.org/police/crime-data',
    pa_ucr: 'https://www.psp.pa.gov/UCR/Pages/default.aspx',
    // Crime mapping services
    crimereports: 'https://www.crimereports.com/api/v1',
  },
  jurisdiction: {
    name: 'Bethlehem Township, PA',
    center: { lat: 40.6501, lng: -75.3685 },
    radius: 8000 // meters
  }
};

/**
 * Normalize crime type to standard UDT enum
 */
function normalizeCrimeType(rawType) {
  const typeMap = {
    'larceny': 'THEFT',
    'theft': 'THEFT',
    'shoplifting': 'THEFT',
    'burglary': 'BURGLARY',
    'breaking and entering': 'BURGLARY',
    'b&e': 'BURGLARY',
    'assault': 'ASSAULT',
    'battery': 'ASSAULT',
    'simple assault': 'ASSAULT',
    'aggravated assault': 'ASSAULT',
    'vandalism': 'VANDALISM',
    'criminal mischief': 'VANDALISM',
    'property damage': 'VANDALISM',
    'drug offense': 'DRUG_OFFENSE',
    'drug possession': 'DRUG_OFFENSE',
    'narcotics': 'DRUG_OFFENSE',
    'vehicle theft': 'VEHICLE_THEFT',
    'auto theft': 'VEHICLE_THEFT',
    'fraud': 'FRAUD',
    'dui': 'DUI',
    'dwi': 'DUI',
    'domestic': 'DOMESTIC',
  };

  const normalized = rawType.toLowerCase().trim();
  return typeMap[normalized] || 'OTHER';
}

/**
 * Calculate severity based on crime type and details
 */
function calculateSeverity(type, details = {}) {
  const baseSeverity = {
    'ASSAULT': 5,
    'VEHICLE_THEFT': 5,
    'BURGLARY': 4,
    'DRUG_OFFENSE': 3,
    'THEFT': 3,
    'VANDALISM': 2,
    'FRAUD': 3,
    'DUI': 3,
    'DOMESTIC': 4,
    'OTHER': 2
  };

  let severity = baseSeverity[type] || 2;

  // Adjust based on details
  if (details.weapon) severity = Math.min(5, severity + 1);
  if (details.injury) severity = Math.min(5, severity + 1);
  if (details.value && details.value > 5000) severity = Math.min(5, severity + 1);

  return severity;
}

/**
 * Anonymize address to block level
 */
function anonymizeAddress(fullAddress) {
  // Extract street name and convert house number to block
  const match = fullAddress.match(/(\d+)\s+(.+)/);
  if (match) {
    const houseNumber = parseInt(match[1]);
    const streetName = match[2];
    const block = Math.floor(houseNumber / 100) * 100;
    return `${block} Block ${streetName}`;
  }
  return fullAddress;
}

/**
 * Validate coordinates are within jurisdiction
 */
function isWithinJurisdiction(lat, lng) {
  const { center, radius } = CONFIG.jurisdiction;

  // Simple distance calculation (approximate)
  const latDiff = (lat - center.lat) * 111000; // ~111km per degree
  const lngDiff = (lng - center.lng) * 111000 * Math.cos(center.lat * Math.PI / 180);
  const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);

  return distance <= radius;
}

/**
 * Fetch data from CrimeReports.com (example)
 * Note: Requires API key and proper setup
 */
async function fetchFromCrimeReports() {
  console.log('Fetching from CrimeReports.com...');

  // This is a placeholder - actual implementation would use fetch/axios
  // with proper authentication and parameters

  /*
  const response = await fetch(`${CONFIG.sources.crimereports}/incidents`, {
    params: {
      lat: CONFIG.jurisdiction.center.lat,
      lng: CONFIG.jurisdiction.center.lng,
      radius: CONFIG.jurisdiction.radius,
      start_date: new Date(Date.now() - 90*24*60*60*1000).toISOString(),
      end_date: new Date().toISOString()
    }
  });

  const data = await response.json();
  return data.incidents.map(transformIncident);
  */

  console.log('API integration not yet implemented');
  return [];
}

/**
 * Parse CSV crime data
 */
function parseCSV(csvPath) {
  console.log(`Parsing CSV from ${csvPath}...`);

  // Implementation would use a CSV parser library
  // For now, return empty array

  return [];
}

/**
 * Transform incident to KONOMI UDT format
 */
function transformIncident(rawIncident) {
  return {
    id: rawIncident.id || `2025-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    type: normalizeCrimeType(rawIncident.type),
    date: rawIncident.date || new Date().toISOString(),
    location: {
      lat: rawIncident.latitude || rawIncident.lat,
      lng: rawIncident.longitude || rawIncident.lng
    },
    address: anonymizeAddress(rawIncident.address || 'Unknown'),
    description: rawIncident.description || '',
    status: rawIncident.status || 'REPORTED',
    severity: calculateSeverity(
      normalizeCrimeType(rawIncident.type),
      rawIncident.details
    )
  };
}

/**
 * Main execution
 */
async function main() {
  console.log('🚨 Bethlehem Township Crime Data Fetcher');
  console.log('==========================================\n');

  const crimes = [];

  // Fetch from various sources
  try {
    const crimeReportsData = await fetchFromCrimeReports();
    crimes.push(...crimeReportsData);
  } catch (error) {
    console.error('Error fetching from CrimeReports:', error.message);
  }

  // Check if CSV file exists for manual import
  const csvPath = path.join(__dirname, '../data/import.csv');
  if (fs.existsSync(csvPath)) {
    const csvData = parseCSV(csvPath);
    crimes.push(...csvData);
  }

  // Remove duplicates based on ID
  const uniqueCrimes = Array.from(
    new Map(crimes.map(c => [c.id, c])).values()
  );

  // Filter to jurisdiction
  const localCrimes = uniqueCrimes.filter(crime =>
    isWithinJurisdiction(crime.location.lat, crime.location.lng)
  );

  // Sort by date (newest first)
  localCrimes.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Save to data file
  const outputPath = path.join(CONFIG.dataDir, CONFIG.outputFile);
  fs.writeFileSync(
    outputPath,
    JSON.stringify(localCrimes, null, 2),
    'utf8'
  );

  console.log(`✓ Fetched ${localCrimes.length} crime incidents`);
  console.log(`✓ Saved to ${outputPath}`);

  // Print summary
  const byType = localCrimes.reduce((acc, crime) => {
    acc[crime.type] = (acc[crime.type] || 0) + 1;
    return acc;
  }, {});

  console.log('\nCrime Type Summary:');
  Object.entries(byType)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = {
  normalizeCrimeType,
  calculateSeverity,
  anonymizeAddress,
  isWithinJurisdiction,
  transformIncident
};
