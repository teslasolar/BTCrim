# Quick Start Guide

Get the Bethlehem Township Crime Map up and running in minutes!

## Prerequisites

- Node.js 20+ installed
- Git installed
- Text editor (VS Code recommended)

## Installation

### 1. Install Dependencies

```bash
npm install
```

This will install:
- 11ty (Eleventy) - Static site generator
- Tailwind CSS - Styling framework
- Leaflet - Interactive maps
- Alpine.js - Lightweight JavaScript framework
- Lunr - Search functionality

### 2. Run Development Server

```bash
npm run dev
```

The site will be available at: **http://localhost:8080**

Changes to source files will automatically reload the browser.

## Project Structure

```
BTCrim/
├── src/                          # Source files
│   ├── _data/                    # Data files
│   │   ├── crime_standard.json   # UDT definitions
│   │   └── sample_crimes.json    # Sample crime data
│   ├── _includes/                # Reusable templates
│   │   ├── base.njk             # HTML shell
│   │   ├── sidebar.njk          # Navigation
│   │   └── crime-card.njk       # Crime display component
│   ├── assets/                   # Static assets
│   │   ├── css/main.css         # Tailwind styles
│   │   └── js/                  # JavaScript files
│   │       ├── map.js           # Leaflet map
│   │       ├── stats.js         # Analytics
│   │       └── search.js        # Search
│   ├── index.njk                # Home page
│   └── about.njk                # About page
├── scripts/                      # Build scripts
│   └── fetch-crime-data.js      # Data fetcher
└── dist/                         # Build output (generated)
```

## Adding Crime Data

### Option 1: Edit Sample Data

Edit [src/_data/sample_crimes.json](src/_data/sample_crimes.json):

```json
[
  {
    "id": "2025-001",
    "type": "THEFT",
    "date": "2025-12-25T14:30:00",
    "location": { "lat": 40.6520, "lng": -75.3700 },
    "address": "100 Block Main Street",
    "description": "Vehicle break-in",
    "status": "INVESTIGATING",
    "severity": 3
  }
]
```

### Option 2: Use Data Fetcher Script

```bash
node scripts/fetch-crime-data.js
```

Modify the script to connect to your data sources.

### Option 3: Import CSV

1. Place CSV file at `data/import.csv`
2. Run: `node scripts/fetch-crime-data.js`
3. Script will parse and convert to JSON

## Customization

### Change Map Center

Edit [src/assets/js/map.js](src/assets/js/map.js):

```javascript
const BETHLEHEM_CENTER = [40.6501, -75.3685]; // Change coordinates
```

### Update Colors

Edit [tailwind.config.js](tailwind.config.js):

```javascript
colors: {
  crime: {
    bg: '#0f172a',      // Background
    surface: '#1e293b', // Cards
    accent: '#3b82f6',  // Primary color
    // ...
  }
}
```

### Modify Crime Types

Edit [src/_data/crime_standard.json](src/_data/crime_standard.json):

```json
{
  "CrimeType": {
    "values": [
      "THEFT",
      "BURGLARY",
      "YOUR_CUSTOM_TYPE"
    ]
  }
}
```

## Building for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready to deploy.

## Deployment

### GitHub Pages (Automatic)

1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Enable GitHub Pages:
   - Go to repository Settings
   - Pages section
   - Source: GitHub Actions

3. Site will deploy automatically on push

### Manual Deployment

```bash
npm run build
# Upload dist/ folder to your web server
```

## Common Tasks

### Update Crime Data

```bash
# Edit sample_crimes.json, then
npm run build
```

### Add a New Page

1. Create `src/new-page.njk`:
   ```njk
   ---
   layout: base.njk
   title: New Page
   ---
   <h1>New Page Content</h1>
   ```

2. Add to sidebar in `src/_includes/sidebar.njk`

### Customize Styling

1. Edit `src/assets/css/main.css`
2. Run `npm run css` to rebuild
3. Or use `npm run dev` for auto-rebuild

## Troubleshooting

### Port 8080 Already in Use

```bash
# Use different port
npx @11ty/eleventy --serve --port=8081
```

### CSS Not Updating

```bash
# Rebuild CSS manually
npm run css
```

### Map Not Showing

1. Check browser console for errors
2. Verify Leaflet is loaded
3. Ensure `#crimeMap` element exists
4. Check coordinates are valid

### Data Not Appearing

1. Verify JSON syntax in data files
2. Check file paths in `.eleventy.js`
3. Look for errors in terminal
4. Clear browser cache

## Next Steps

1. **Add Real Data:** Configure data fetcher with actual sources
2. **Enable Analytics:** Add crime trend charts
3. **Implement Hotspots:** Cluster crime incidents
4. **Add Heatmap:** Visualize crime density
5. **Create Reports:** Generate monthly/annual reports
6. **API Integration:** Connect to official data sources

## Getting Help

- **Documentation:** See [README.md](README.md)
- **Data Sources:** See [DATA_SOURCES.md](DATA_SOURCES.md)
- **Issues:** Open GitHub issue
- **Email:** contact@example.com

## Resources

- [11ty Documentation](https://www.11ty.dev/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Leaflet Tutorials](https://leafletjs.com/examples.html)
- [Alpine.js Guide](https://alpinejs.dev/start-here)

---

Happy mapping! 🗺️🚨
