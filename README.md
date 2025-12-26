# 🚨 Bethlehem Township Crime Map

Interactive crime mapping and analysis for Bethlehem Township, PA built with the KONOMI Standard framework.

## 📋 Features

- **Interactive Crime Map** - Visualize crime incidents on an interactive map using Leaflet.js
- **Real-time Filtering** - Filter by crime type, severity, date range, and status
- **Hotspot Analysis** - Identify crime concentration areas with intensity levels
- **Crime Statistics** - View trends, analytics, and historical comparisons
- **Timeline View** - Track incidents chronologically
- **Mobile Responsive** - Full functionality on all devices
- **Dark Mode** - Eye-friendly dark theme by default
- **Public Data** - All data from publicly available sources

## 🏗️ Architecture

Built using the **KONOMI Standard** structure:

```
BTCrim/
├── .github/workflows/
│   └── deploy.yml          # GitHub Pages deployment
├── src/
│   ├── _data/
│   │   └── crime_standard.json  # UDT definitions
│   ├── _includes/
│   │   ├── base.njk        # Base layout
│   │   ├── sidebar.njk     # Navigation
│   │   └── crime-card.njk  # Crime card component
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css    # Tailwind styles
│   │   └── js/
│   │       ├── map.js      # Leaflet map logic
│   │       ├── stats.js    # Analytics
│   │       └── search.js   # Search functionality
│   ├── index.njk           # Home page with map
│   └── about.njk           # About page
├── .eleventy.js            # 11ty configuration
├── tailwind.config.js      # Tailwind configuration
└── package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/BTCrim.git
cd BTCrim

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

The site will be available at `http://localhost:8080`

## 📊 Data Model (KONOMI UDTs)

### CrimeIncident
```javascript
{
  id: string              // Unique identifier
  type: CrimeType         // THEFT, BURGLARY, ASSAULT, etc.
  date: datetime          // Incident date/time
  location: GeoLocation   // Lat/lng coordinates
  address: string         // Street address (anonymized)
  description: string     // Incident details
  status: IncidentStatus  // REPORTED, INVESTIGATING, CLOSED
  severity: int           // 1-5 severity level
}
```

### Hotspot
```javascript
{
  id: string
  center: GeoLocation
  radius: float           // Meters
  incidentCount: int
  intensity: string       // HIGH, MEDIUM, LOW
  timeframe: string
}
```

## 📡 Data Sources

Crime data is collected from:
- Bethlehem Township Police Department public records
- Pennsylvania State Police reporting system
- Public safety bulletins
- FOIA requests

**Note:** Addresses are generalized for privacy. No PII is included.

## 🛠️ Technology Stack

- **Static Site Generator:** [11ty (Eleventy)](https://www.11ty.dev/)
- **CSS Framework:** [Tailwind CSS](https://tailwindcss.com/)
- **Mapping Library:** [Leaflet.js](https://leafletjs.com/)
- **Interactivity:** [Alpine.js](https://alpinejs.dev/)
- **Map Tiles:** CARTO Dark Matter (OpenStreetMap)
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions

## 📈 Available Scripts

```bash
npm run dev      # Start dev server with hot reload
npm run build    # Build production site
npm run css      # Compile Tailwind CSS
```

## 🔄 Deployment

The site automatically deploys to GitHub Pages when pushing to the `main` branch.

### Manual Deployment

```bash
npm run build
# Push dist/ folder to gh-pages branch
```

## 🎨 Customization

### Colors

Edit [tailwind.config.js](tailwind.config.js) to customize the color scheme:

```javascript
colors: {
  crime: {
    bg: '#0f172a',
    surface: '#1e293b',
    accent: '#3b82f6',
    // ...
  }
}
```

### Map Style

Change map tiles in [src/assets/js/map.js](src/assets/js/map.js):

```javascript
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  // Your preferred tile provider
}).addTo(map);
```

## 📝 Adding Crime Data

Crime data can be added in several ways:

1. **Manual JSON files** in `src/_data/`
2. **API integration** - Modify `map.js` to fetch from an API
3. **CSV import** - Add build script to parse CSV files
4. **Database connection** - Use 11ty's data files to query a database

Example data file structure:

```json
[
  {
    "id": "2025-001",
    "type": "THEFT",
    "date": "2025-12-25",
    "location": { "lat": 40.6520, "lng": -75.3700 },
    "address": "Main Street",
    "description": "Vehicle break-in",
    "status": "INVESTIGATING",
    "severity": 3
  }
]
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## ⚠️ Disclaimer

This crime map is for informational purposes only. Data may be incomplete or contain errors.
Do not use as the sole basis for safety or property decisions. Contact Bethlehem Township
Police Department for official crime statistics.

## 📞 Contact

- **Issues:** [GitHub Issues](https://github.com/yourusername/BTCrim/issues)
- **Email:** contact@example.com
- **Township Police:** [Bethlehem Township Police Department](https://www.bethlehemtownship.org/police)

---

Built with the **KONOMI Standard** framework | Powered by public data | Hosted on GitHub Pages
