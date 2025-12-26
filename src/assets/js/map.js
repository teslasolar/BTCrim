// Bethlehem Township Crime Map
// Initialize Leaflet map centered on Bethlehem Township, PA

let map;
let markers = [];
let heatmapLayer;
let clusterGroup;

// Bethlehem Township, PA coordinates
const BETHLEHEM_CENTER = [40.6501, -75.3685];

function initMap() {
  // Initialize map
  map = L.map('crimeMap').setView(BETHLEHEM_CENTER, 13);

  // Add OpenStreetMap tiles (dark theme)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  // Add township boundary (approximate)
  const townshipBoundary = L.circle(BETHLEHEM_CENTER, {
    color: '#3b82f6',
    fillColor: '#3b82f6',
    fillOpacity: 0.05,
    radius: 8000 // ~5 miles
  }).addTo(map);

  // Load initial crime data
  loadCrimeData();
}

async function loadCrimeData() {
  try {
    // Fetch real crime data from JSON file
    const response = await fetch('/data/crimes.json');
    const crimes = await response.json();

    console.log(`Loaded ${crimes.length} crime incidents from real data`);

    // Add markers to map
    crimes.forEach(crime => addCrimeMarker(crime));

    // Store data globally for filtering
    window.crimeData = crimes;

    return crimes;
  } catch (error) {
    console.error('Error loading crime data:', error);

    // Fallback to empty array
    window.crimeData = [];
    return [];
  }
}

function addCrimeMarker(crime) {
  const color = getCrimeColor(crime.type);

  const marker = L.circleMarker([crime.location.lat, crime.location.lng], {
    radius: 8,
    fillColor: color,
    color: '#fff',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8
  });

  // Create popup content
  const popupContent = `
    <div class="p-2 min-w-[200px]">
      <div class="flex justify-between items-start mb-2">
        <h3 class="font-bold text-lg">${crime.type}</h3>
        <span class="text-xs px-2 py-1 rounded" style="background: ${color}20; color: ${color}; border: 1px solid ${color}">
          ${crime.type}
        </span>
      </div>
      <div class="space-y-1 text-sm">
        <div><strong>Date:</strong> ${crime.date}</div>
        <div><strong>Location:</strong> ${crime.address}</div>
        ${crime.description ? `<div><strong>Description:</strong> ${crime.description}</div>` : ''}
        <div><strong>Status:</strong> ${crime.status}</div>
        <div><strong>Severity:</strong> ${'⚠️'.repeat(crime.severity)}</div>
      </div>
    </div>
  `;

  marker.bindPopup(popupContent);
  marker.addTo(map);
  markers.push(marker);
}

function getCrimeColor(type) {
  const colors = {
    'THEFT': '#f59e0b',
    'BURGLARY': '#dc2626',
    'ASSAULT': '#ef4444',
    'VANDALISM': '#f97316',
    'DRUG_OFFENSE': '#8b5cf6',
    'VEHICLE_THEFT': '#f59e0b',
    'FRAUD': '#6366f1',
    'DUI': '#ec4899',
    'DOMESTIC': '#ef4444',
    'OTHER': '#6b7280'
  };
  return colors[type] || colors.OTHER;
}

function showOnMap(lat, lng) {
  map.setView([lat, lng], 16);
  // Find and open the marker popup
  markers.forEach(marker => {
    const markerLatLng = marker.getLatLng();
    if (Math.abs(markerLatLng.lat - lat) < 0.0001 && Math.abs(markerLatLng.lng - lng) < 0.0001) {
      marker.openPopup();
    }
  });
}

// Filter functionality
function filterCrimes(filters) {
  // Clear existing markers
  markers.forEach(marker => marker.remove());
  markers = [];

  let filteredData = window.crimeData || [];

  // Apply filters
  if (filters.type) {
    filteredData = filteredData.filter(crime => crime.type === filters.type.toUpperCase());
  }
  if (filters.severity) {
    filteredData = filteredData.filter(crime => crime.severity >= parseInt(filters.severity));
  }
  if (filters.status) {
    filteredData = filteredData.filter(crime => crime.status === filters.status.toUpperCase());
  }

  // Re-add filtered markers
  filteredData.forEach(crime => addCrimeMarker(crime));
}

// Event listeners for filters
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('crimeMap')) {
    initMap();
  }

  // Filter change handlers
  const filterIds = ['crimeType', 'severity', 'status'];
  filterIds.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('change', () => {
        const filters = {
          type: document.getElementById('crimeType')?.value || '',
          severity: document.getElementById('severity')?.value || '',
          status: document.getElementById('status')?.value || ''
        };
        filterCrimes(filters);
      });
    }
  });

  // Toggle buttons
  const heatmapBtn = document.getElementById('toggleHeatmap');
  if (heatmapBtn) {
    heatmapBtn.addEventListener('click', () => {
      // TODO: Implement heatmap layer toggle
      alert('Heatmap visualization coming soon!');
    });
  }

  const clusterBtn = document.getElementById('toggleClusters');
  if (clusterBtn) {
    clusterBtn.addEventListener('click', () => {
      // TODO: Implement marker clustering
      alert('Cluster visualization coming soon!');
    });
  }
});
