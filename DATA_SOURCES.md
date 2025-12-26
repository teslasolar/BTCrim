# Crime Data Sources for Bethlehem Township, PA

This document outlines publicly available data sources for crime information in Bethlehem Township, Pennsylvania.

## Official Sources

### 1. Bethlehem Township Police Department

**Website:** https://www.bethlehemtownship.org/police

**Available Data:**
- Press releases and public safety announcements
- Annual crime statistics reports
- Community alerts
- Contact: (610) 814-6400

**Access Method:**
- Manual collection from website
- FOIA requests for detailed records
- Subscribe to public safety alerts

### 2. Pennsylvania State Police (PSP)

**Website:** https://www.psp.pa.gov/

**Available Data:**
- Uniform Crime Reporting (UCR) statistics
- Regional crime trends
- Annual reports by municipality

**Access Method:**
- UCR Data Tool: https://www.psp.pa.gov/UCR/Pages/default.aspx
- Downloadable annual reports (PDF)
- OpenData portal (if available)

### 3. Northampton County

**Website:** https://www.northamptoncounty.org/

**Available Data:**
- Court records (public dockets)
- Sheriff's office reports
- County-wide crime statistics

**Access Method:**
- Public records requests
- Online court docket search
- County data portal

## Third-Party Aggregators

### 4. CrimeReports.com

**Website:** https://www.crimereports.com/

**Coverage:** May include Bethlehem Township data

**Access Method:**
- Free public search by address
- Map-based crime visualization
- API access (requires partnership)

### 5. SpotCrime

**Website:** https://spotcrime.com/

**Coverage:** Aggregates police reports from multiple sources

**Access Method:**
- Free public search
- Email alerts for specific areas
- RSS feeds

### 6. NeighborhoodScout

**Website:** https://www.neighborhoodscout.com/

**Coverage:** Crime statistics and analytics

**Access Method:**
- Free basic statistics
- Premium membership for detailed data

## News Sources

### 7. Local News Outlets

**The Express-Times**
- Website: https://www.lehighvalleylive.com/
- Crime reporting for Lehigh Valley area
- RSS feeds available

**WFMZ-TV**
- Website: https://www.wfmz.com/
- Local crime news coverage

**Access Method:**
- RSS feeds
- News archives
- Crime blotter sections

## Data Collection Best Practices

### Frequency
- **Daily:** Check local news and police department updates
- **Weekly:** Review CrimeReports.com and SpotCrime
- **Monthly:** Analyze PSP UCR statistics
- **Annually:** Download comprehensive reports

### Data Quality
1. **Verify Sources:** Cross-reference multiple sources
2. **Anonymize:** Remove specific addresses, use block-level
3. **Standardize:** Convert to KONOMI UDT format
4. **Validate:** Check coordinates are within jurisdiction
5. **Archive:** Maintain historical data for trend analysis

### Legal Considerations
- All data must be from public sources
- Comply with privacy laws (no PII)
- Respect FOIA request guidelines
- Credit data sources appropriately

## FOIA Request Template

```
Subject: Freedom of Information Request - Crime Statistics

Dear Records Custodian,

Pursuant to the Pennsylvania Right-to-Know Law (65 P.S. §§ 67.101-67.3104),
I am requesting access to the following public records:

1. Crime incident reports for Bethlehem Township
   - Date range: [START_DATE] to [END_DATE]
   - Information requested: incident type, date, block-level location
   - Exclude: victim names, suspect names, detailed addresses

2. Preferred format: CSV, Excel, or JSON

I understand that you may charge reasonable fees for duplication.
Please provide a fee estimate before processing.

Contact: [YOUR_EMAIL]
Phone: [YOUR_PHONE]

Thank you,
[YOUR_NAME]
```

## Automation Scripts

### fetch-crime-data.js
Located at `/scripts/fetch-crime-data.js`

**Features:**
- Fetches data from configured APIs
- Parses CSV imports
- Normalizes to KONOMI format
- Anonymizes addresses
- Validates jurisdiction

**Usage:**
```bash
node scripts/fetch-crime-data.js
```

## Data Update Schedule

| Source | Frequency | Method | Last Updated |
|--------|-----------|--------|--------------|
| BT Police Dept | Weekly | Manual | 2025-12-26 |
| PSP UCR | Monthly | Download | 2025-12-01 |
| CrimeReports | Daily | API | Not configured |
| Local News | Daily | RSS | Manual |

## Contributing Data

If you have access to additional public crime data sources:

1. Verify data is publicly available
2. Ensure compliance with privacy laws
3. Format according to KONOMI UDT standard
4. Submit pull request with data and source documentation

## Privacy Policy

All crime data displayed on this map:
- Contains NO personally identifiable information
- Uses block-level addresses only (e.g., "100 Block Main Street")
- Excludes victim and suspect names
- Complies with applicable privacy regulations
- Sourced exclusively from public records

## Disclaimer

Data accuracy depends on:
- Timeliness of official reporting
- Public records availability
- Third-party aggregator coverage

For official statistics, contact Bethlehem Township Police Department directly.

---

Last Updated: 2025-12-26
