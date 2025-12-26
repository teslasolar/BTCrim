# Real Crime Data Collection Guide

This guide shows you how to get REAL crime data for Bethlehem Township, PA.

## 🎯 Quick Start - Get Data Now

### Option 1: Manual CSV Import (Easiest)

1. **Create a CSV file** at `data/import.csv` with this format:

```csv
type,date,address,description,lat,lng,status,severity
THEFT,2025-12-26T10:00:00,100 Main St,Package theft,40.6520,-75.3700,REPORTED,2
BURGLARY,2025-12-25T02:30:00,200 Elm Ave,Residential break-in,40.6540,-75.3720,INVESTIGATING,4
```

2. **Run the import:**

```bash
npm run fetch-data
```

3. **Build the site:**

```bash
npm run build
```

### Option 2: Web Scraping from Public Sources

The following websites have publicly available crime data for Bethlehem Township:

#### 1. SpotCrime.com

**URL:** https://spotcrime.com/pa/bethlehem

**How to get data:**
1. Visit the URL above
2. Search for "Bethlehem Township, PA"
3. View recent crime reports on the map
4. Manually copy data to CSV file OR
5. Use their API: https://spotcrime.com/api

**API Access:**
```javascript
// Free public API endpoint
https://api.spotcrime.com/crimes.json?lat=40.6501&lon=-75.3685&radius=0.05&key=public
```

#### 2. CrimeMapping.com

**URL:** https://www.crimemapping.com/map/pa/bethlehemtownship

**How to get data:**
1. Visit the URL
2. Search for "Bethlehem Township, PA"
3. Select date range (last 30-90 days)
4. Export data or manually record incidents

**Note:** May require free registration

#### 3. CrimeReports.com

**URL:** https://www.crimereports.com/

**How to get data:**
1. Enter "Bethlehem Township, PA" in search
2. Select date range
3. Download CSV or copy data manually

## 📡 Official Data Sources

### Bethlehem Township Police Department

**Website:** https://www.bethlehemtownship.org/police

**Contact:**
- Phone: (610) 814-6400
- Address: 4225 Easton Ave, Bethlehem, PA 18020

**How to request data:**

1. **Visit the police station** and request public crime reports
2. **Submit FOIA request** (see template below)
3. **Check their website** for crime blotter/reports

**FOIA Request Template:**

```
Bethlehem Township Police Department
4225 Easton Ave
Bethlehem, PA 18020

Subject: Right-to-Know Request for Crime Statistics

Dear Records Officer,

Pursuant to the Pennsylvania Right-to-Know Law (65 P.S. §§ 67.101-67.3104),
I request access to the following public records:

1. Crime incident reports for Bethlehem Township
   Date range: [Last 90 days]
   Information requested:
   - Incident type/classification
   - Date and time of occurrence
   - General location (block-level address)
   - Brief description
   - Case status

2. Preferred format: CSV, Excel, or PDF

Please exclude any personally identifiable information including:
- Victim names
- Suspect names
- Exact street addresses (block level is sufficient)

I understand reasonable fees may apply. Please provide an estimate.

Thank you,
[Your Name]
[Your Email]
[Your Phone]
```

### Pennsylvania State Police (PSP)

**UCR Data:** https://www.psp.pa.gov/UCR/Pages/default.aspx

**How to get data:**
1. Visit the UCR (Uniform Crime Reporting) page
2. Download annual crime statistics by municipality
3. Look for "Bethlehem Township, Northampton County"
4. Data is usually in PDF format - you'll need to extract it

**Data Format:** Annual summaries by crime type

### Northampton County

**Website:** https://www.northamptoncounty.org/

**Court Records:** https://ujsportal.pacourts.us/

**How to access:**
1. Visit PA Court Records portal
2. Search by location: Bethlehem Township
3. Filter criminal cases
4. Public dockets are free to view

## 🔧 Automated Data Collection

### Using the Fetch Script

Run the automated fetcher:

```bash
npm run fetch-data
```

This will attempt to:
1. Fetch from SpotCrime API
2. Fetch from CrimeMapping.com
3. Import from CSV file (data/import.csv)

### Setting Up API Access

#### SpotCrime API

1. Visit: https://spotcrime.com/api
2. Sign up for free API access
3. Get your API key
4. Add to `.env` file:

```bash
SPOTCRIME_API_KEY=your_key_here
```

5. Update `scripts/fetch-real-crime-data.js` to use the key

#### CrimeMapping.com

1. Visit: https://www.crimemapping.com/
2. Create free account
3. Contact their support for API access
4. Configure in fetch script

## 📊 Data Collection Workflow

### Daily Data Update Process

1. **Check SpotCrime:**
   ```bash
   curl "https://api.spotcrime.com/crimes.json?lat=40.6501&lon=-75.3685&radius=0.05&key=public"
   ```

2. **Update CSV with new incidents**

3. **Run import:**
   ```bash
   npm run fetch-data
   ```

4. **Build and deploy:**
   ```bash
   npm run build
   # Then push to GitHub to trigger deployment
   ```

### Weekly Data Update

1. Visit Bethlehem Township PD website
2. Check for press releases / crime reports
3. Add to CSV manually
4. Run fetch and build

### Monthly Data Update

1. Check PA State Police UCR updates
2. Review court records for closed cases
3. Update historical data
4. Generate trend reports

## 🛠️ Advanced: Web Scraping

For advanced users, you can scrape data programmatically:

### Using Node.js + Cheerio

```javascript
const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeSpotCrime() {
  const url = 'https://spotcrime.com/pa/bethlehem';
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const crimes = [];

  // Parse crime data from page
  $('.crime-item').each((i, el) => {
    const type = $(el).find('.crime-type').text();
    const date = $(el).find('.crime-date').text();
    const address = $(el).find('.crime-address').text();

    crimes.push({ type, date, address });
  });

  return crimes;
}
```

**Note:** Always respect website terms of service and robots.txt

### Using Python + BeautifulSoup

```python
import requests
from bs4 import BeautifulSoup
import json

url = "https://spotcrime.com/pa/bethlehem"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

crimes = []
# Parse crime data
# ... extraction logic ...

# Save to JSON
with open('crimes.json', 'w') as f:
    json.dump(crimes, f)
```

## 📍 Geocoding Addresses

To convert addresses to lat/lng coordinates:

### Free Geocoding APIs

1. **Nominatim (OpenStreetMap):**
   ```
   https://nominatim.openstreetmap.org/search?q=123+Main+St,+Bethlehem+Township,+PA&format=json
   ```

2. **Google Maps Geocoding (requires API key):**
   ```
   https://maps.googleapis.com/maps/api/geocode/json?address=123+Main+St,+Bethlehem+Township,+PA&key=YOUR_KEY
   ```

3. **Mapbox (free tier available):**
   ```
   https://api.mapbox.com/geocoding/v5/mapbox.places/123+Main+St,+Bethlehem+Township,+PA.json?access_token=YOUR_TOKEN
   ```

## 🔒 Privacy & Legal Compliance

### Data Privacy Rules

1. **Never include:**
   - Victim names
   - Suspect names (unless convicted)
   - Exact addresses (use block level)
   - Phone numbers
   - Social security numbers

2. **Always:**
   - Use block-level addresses (e.g., "100 Block Main St")
   - Remove personally identifiable information
   - Verify data is from public sources
   - Credit data sources

### Legal Considerations

- All data must be publicly available
- Comply with PA Right-to-Know Law
- Respect copyright and terms of service
- Don't scrape sites that prohibit it

## 🆘 Troubleshooting

### No Data Found

**Problem:** Fetch script returns 0 incidents

**Solutions:**
1. Check if CSV file exists and is formatted correctly
2. Verify API keys are configured
3. Try manual data entry first
4. Contact data source providers

### Geocoding Errors

**Problem:** Can't convert addresses to coordinates

**Solutions:**
1. Use Nominatim free geocoding
2. Add coordinates manually to CSV
3. Use approximate township center for general area

### API Rate Limits

**Problem:** Too many requests to API

**Solutions:**
1. Add delays between requests
2. Cache results locally
3. Use official API keys
4. Batch requests daily instead of hourly

## 📞 Support

Need help getting real data?

1. **GitHub Issues:** Report problems
2. **Community:** Ask on local forums
3. **Direct Contact:** Email bethlehemtownship@example.com

## 📚 Additional Resources

- **PA UCR Data:** https://www.psp.pa.gov/UCR/
- **FBI Crime Data Explorer:** https://cde.ucr.cjis.gov/
- **Northampton County:** https://www.northamptoncounty.org/
- **SpotCrime Blog:** https://blog.spotcrime.com/

---

Last Updated: 2025-12-26
