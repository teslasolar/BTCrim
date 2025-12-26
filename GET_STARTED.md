# 🚀 Get Started with Real Crime Data

This guide will get you up and running with REAL crime data for Bethlehem Township, PA.

## ✅ What's Been Set Up

The project is now configured to pull real crime data instead of sample data:

- ✅ Real data fetcher script (`scripts/fetch-real-crime-data.js`)
- ✅ CSV import capability (`data/import.csv`)
- ✅ Map loads from `crimes.json` (real data file)
- ✅ Sample crimes removed, using actual imported data
- ✅ Ready for API integration

## 🎯 Three Ways to Get Real Data

### Option 1: Manual CSV Entry (Start This Way!)

**Best for:** Getting started immediately

1. **Edit the CSV file:**

Open [data/import.csv](data/import.csv) and add real crime data:

```csv
type,date,address,description,lat,lng,status,severity
THEFT,2025-12-26T10:00:00,123 Main Street,Package theft,40.6520,-75.3700,REPORTED,2
BURGLARY,2025-12-25T02:30:00,456 Elm Avenue,Residential break-in,40.6540,-75.3720,INVESTIGATING,4
VANDALISM,2025-12-24T18:00:00,789 Oak Street,Property damage,40.6485,-75.3665,REPORTED,2
```

2. **Import the data:**

```bash
npm run fetch-data
```

3. **View the results:**

```bash
npm run dev
```

Visit http://localhost:8080 to see your data on the map!

### Option 2: Web Sources (Recommended)

**Best for:** Regular updates with public data

#### A. SpotCrime.com

1. **Visit:** https://spotcrime.com/pa/bethlehem
2. **Filter:** Set to "Bethlehem Township, PA"
3. **Copy data** from the map/list view
4. **Add to CSV** following the format above

**Pro Tip:** SpotCrime has a public API:
```bash
curl "https://api.spotcrime.com/crimes.json?lat=40.6501&lon=-75.3685&radius=0.05&key=public"
```

#### B. CrimeMapping.com

1. **Visit:** https://www.crimemapping.com/map/pa/bethlehemtownship
2. **Select date range** (last 30-90 days)
3. **View incidents** on the map
4. **Manually copy** to CSV or export if available

#### C. Local News Sources

**Lehigh Valley Live:** https://www.lehighvalleylive.com/
- Search for "Bethlehem Township crime"
- Copy recent incidents to CSV

**WFMZ News:** https://www.wfmz.com/
- Check crime section for local reports
- Add verified incidents to CSV

### Option 3: Official Sources (Most Reliable)

**Best for:** Verified, official data

#### Bethlehem Township Police Department

**Contact:**
- Phone: (610) 814-6400
- Website: https://www.bethlehemtownship.org/police
- Address: 4225 Easton Ave, Bethlehem, PA 18020

**How to request:**

1. **Visit in person** - Ask for public crime reports
2. **Call** - Request crime statistics for recent period
3. **Submit FOIA request** - Use template in [REAL_DATA_GUIDE.md](REAL_DATA_GUIDE.md)

**What to ask for:**
- Crime incidents from last 30-90 days
- Block-level addresses only
- No personal information
- CSV or Excel format preferred

## 📊 Data Collection Workflow

### Daily Updates

```bash
# 1. Check SpotCrime for new incidents
curl "https://api.spotcrime.com/crimes.json?lat=40.6501&lon=-75.3685&radius=0.05&key=public" > new_crimes.json

# 2. Add to CSV manually or parse JSON

# 3. Import and rebuild
npm run update-data
```

### Weekly Updates

1. Visit Bethlehem Township PD website
2. Check local news sources
3. Add new incidents to CSV
4. Run `npm run fetch-data`
5. Commit and push to deploy

## 🛠️ Commands Reference

```bash
# Fetch/import crime data
npm run fetch-data

# Start development server
npm run dev

# Build for production
npm run build

# Fetch data AND build
npm run update-data
```

## 📍 Getting Coordinates

Need latitude/longitude for addresses?

### Online Tools:

1. **LatLong.net:** https://www.latlong.net/
   - Enter address, get coordinates

2. **Google Maps:**
   - Right-click location → "What's here?"
   - Coordinates appear at bottom

3. **Nominatim (Free API):**
```bash
curl "https://nominatim.openstreetmap.org/search?q=123+Main+St,+Bethlehem+Township,+PA&format=json"
```

### Approximate Bethlehem Township Coordinates:

- **Center:** 40.6501, -75.3685
- **North:** ~40.67, -75.37
- **South:** ~40.63, -75.37
- **East:** ~40.65, -75.35
- **West:** ~40.65, -75.39

If you don't have exact coordinates, use the center and the map will still work!

## ✨ Next Steps

### 1. Add Your First Real Crime

Edit `data/import.csv`:
```csv
THEFT,2025-12-26,100 Main St,Vehicle break-in,40.6520,-75.3700,REPORTED,3
```

Run:
```bash
npm run fetch-data
npm run dev
```

### 2. Set Up Regular Updates

Create a cron job or scheduled task:
```bash
# Run daily at 9 AM
0 9 * * * cd /path/to/BTCrim && npm run update-data
```

### 3. Configure API Access

For automated updates, set up API access:

**SpotCrime:**
1. Sign up at https://spotcrime.com/api
2. Get API key
3. Add to environment variables

**CrimeMapping:**
1. Create account at https://www.crimemapping.com/
2. Contact support for API access

### 4. Deploy to Production

```bash
# Commit your changes
git add .
git commit -m "Add real crime data"
git push origin main

# Site will auto-deploy to GitHub Pages
```

## 🔍 Verifying Your Data

After importing, check:

1. **Number of incidents:** Should see count in terminal
2. **Map markers:** Should appear on the map
3. **Browser console:** Check for "Loaded X crime incidents from real data"
4. **Data file:** Look at `src/_data/crimes.json`

## ❓ Troubleshooting

### No crimes showing on map?

1. Check `src/_data/crimes.json` exists
2. Verify JSON format is correct
3. Check browser console for errors
4. Ensure coordinates are within Bethlehem Township

### CSV import fails?

1. Check CSV format matches template
2. Ensure no special characters
3. Verify dates are in ISO format (YYYY-MM-DDTHH:MM:SS)
4. Check commas are correct (no extra commas)

### Wrong coordinates?

Use this tool to verify: https://www.latlong.net/
- Enter address
- Compare to Bethlehem Township area
- Lat should be ~40.65, Lng should be ~-75.37

## 📞 Get Help

**Documentation:**
- [README.md](README.md) - Project overview
- [REAL_DATA_GUIDE.md](REAL_DATA_GUIDE.md) - Detailed data sources
- [QUICKSTART.md](QUICKSTART.md) - Development guide

**Issues:**
- Open GitHub issue with details
- Include error messages
- Share CSV format if relevant

## 🎓 Example: Complete Workflow

Here's a real example of adding crime data:

**1. Find incident on SpotCrime:**
```
Type: Theft
Date: December 26, 2025
Location: 100 Block of Main Street
```

**2. Add to CSV:**
```csv
THEFT,2025-12-26T15:30:00,100 Main Street,Package theft from porch,40.6520,-75.3700,REPORTED,2
```

**3. Import:**
```bash
npm run fetch-data
```

**4. Verify:**
```bash
npm run dev
# Open http://localhost:8080
# Check map for new marker
```

**5. Deploy:**
```bash
git add data/import.csv src/_data/crimes.json
git commit -m "Add Dec 26 theft incident"
git push
```

Done! Your crime map now has real data. 🎉

---

**Ready to start?** Edit `data/import.csv` and run `npm run fetch-data`!
