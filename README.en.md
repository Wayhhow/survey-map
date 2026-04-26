# Chengguang Team Accessibility Supervision Route Visualization

<p align="center">
  <img src="image/logo.png" alt="Chengguang Team Logo" width="80" height="80">
</p>

<p align="center">
  <a href="https://wayhhow.github.io/survey-map/" target="_blank">
    <img src="https://img.shields.io/badge/🌍%20Visit%20Map-View%20Now-brightgreen" alt="Visit Map">
  </a>
  <a href="https://github.com/Wayhhow/survey-map" target="_blank">
    <img src="https://img.shields.io/github/stars/Wayhhow/survey-map?style=social" alt="GitHub Stars">
  </a>
</p>

<p align="center">
  <b>🌐 Language / 语言:</b>
  <a href="./README.md">中文</a> |
  <a href="./README.en.md"><b>English</b></a>
</p>

---

## 📋 Project Introduction

We are the **"Chengguang" Volunteer Service Team** from Zhicheng College of Southern University of Science and Technology, continuously carrying out accessibility-related public welfare activities. This map is a route visualization platform for our "Accessibility Supervision" activities, which have been carried out for two phases so far and will continue in the future.

This project is hosted on GitHub Pages and supports functions such as route display, type distinction, and length statistics, providing an intuitive route management tool for accessibility supervision work.

## 🎯 Core Features

- **Route Visualization**: Uses Leaflet map library to display all supervision routes
- **Type Distinction**: Click on types in the statistics panel to highlight corresponding routes, different types are displayed in different colors (Surveyed/To be Surveyed)
- **Length Statistics**: Real-time calculation and display of total route length and length by type
- **Interactive Features**: Click on routes to view detailed information (name, type, length); click on types in the statistics panel to filter and highlight
- **Survey Details Display**: Click on routes to view survey date, number of accessibility irregularities and other details (automatically loaded from CSV)
- **Automatic Adaptation**: Map automatically adjusts view to display all routes
- **Responsive Design**: Supports desktop and mobile devices
- **Real-time Updates**: Automatic deployment through GitHub Actions; supports KML/GeoJSON to CSV automatic extraction of new routes

## 🌐 Quick Access

**Direct access to the map**: [https://wayhhow.github.io/survey-map/](https://wayhhow.github.io/survey-map/)

## 📁 Project Structure

```
survey-map/
├── index.html          # Main page
├── css/
│   └── style.css       # Style definitions
├── js/
│   ├── map.js          # Map initialization and rendering
│   └── data.js         # Data loading and statistical calculation
├── data/
│   ├── routes.geojson  # Route data
│   └── types.json      # Type color configuration
├── image/
│   └── logo.png        # Chengguang Team logo
├── convert-kml.js      # KML to GeoJSON tool
├── star-history.html   # Star history page
├── star-history.svg    # Star history chart
├── .star-history.json  # Star history data
├── package.json        # Dependency configuration
├── README.md           # Project documentation (Chinese)
├── README.en.md        # Project documentation (English)
└── .github/
    └── workflows/
        ├── deploy.yml      # Automatic deployment configuration
        └── star-history.yml  # Star history update configuration
```

## 🛠 Technology Stack

| Category | Technology/Library | Version | Purpose |
|----------|-------------------|---------|---------|
| **Map Library** | Leaflet | 1.9.4 | Map initialization and rendering |
| **Base Map** | Gaode Maps | - | Provides map base service |
| **Data Processing** | Turf.js | 6.x | Calculates route length |
| **Data Format** | GeoJSON | - | Stores route data |
| **Build Tool** | Node.js | - | Runs conversion scripts |
| **Deployment** | GitHub Pages | - | Hosts the website |
| **CI/CD** | GitHub Actions | - | Automatic deployment and star statistics |

## 🚀 Deployment Guide

### 1. Create GitHub Repository

1. Create a new repository on GitHub
2. Enable GitHub Pages feature:
   - Go to Repository Settings → Pages
   - Select `main` branch as the publishing source
   - Click Save

### 2. Clone Repository and Upload Code

```bash
# Clone repository
git clone https://github.com/your-username/survey-map.git

# Enter directory
cd survey-map

# Upload code
git add .
git commit -m "Initial commit"
git push origin main
```

### 3. Wait for Deployment

GitHub Pages will automatically build and deploy your website, usually taking 1-2 minutes. After deployment, you can access the website at `https://your-username.github.io/survey-map`.

## 📊 Usage Guide

### 🎯 Quick Start

1. **Prepare route data**: Draw routes in Google My Maps, grouped by type
2. **Convert files**: Use the conversion tool to convert KML to GeoJSON
3. **Update data**: Replace `data/routes.geojson` file
4. **Commit changes**: Push to GitHub for automatic deployment

### 1. Prepare Route Data

1. **Create map**: Create a new map in [Google My Maps](https://www.google.com/maps/d/)
2. **Draw routes**: Add route layers, grouped by type (Surveyed/To be Surveyed)
3. **Export file**: Click menu → Export as KML/KMZ file

### 2. Convert KML to GeoJSON

```bash
# Install dependencies (first use)
npm install

# Basic conversion
node convert-kml.js input.kml

# Custom output path
node convert-kml.js input.kml data/routes.geojson
```

### 3. Update Route Data

#### 3.1 Data Update Process

1. **Replace file**: Put the converted `routes.geojson` file into the `data/` directory
2. **Automatic processing**: The conversion process will automatically update the `data/route_details.csv` file:
   - ✅ Preserves existing manually entered data (survey date, accessibility irregularities)
   - ✅ Automatically adds new rows for new routes (only adds route name, other fields are empty)

#### 3.2 Commit Changes

```bash
# Commit updated files
git add data/routes.geojson data/route_details.csv

# Commit changes
git commit -m "Update routes data"

# Push to GitHub
git push origin main
```

### 4. Configure Type Colors

Edit the `data/types.json` file to configure styles for different types of routes:

```json
{
  "Surveyed": {
    "color": "#4CAF50",
    "weight": 4,
    "opacity": 0.8,
    "description": "Routes that have been surveyed on-site"
  },
  "ToBeSurveyed": {
    "color": "#9E9E9E",
    "weight": 4,
    "opacity": 0.8,
    "description": "Routes to be surveyed"
  }
}
```

---

### 📋 Data File Description

| File Name | Purpose | Editing Method |
|-----------|---------|---------------|
| `routes.geojson` | Stores route geographic data | Automatically generated, do not edit manually |
| `route_details.csv` | Stores route detailed information | Can be edited manually, add survey date and irregularities |
| `types.json` | Configures route type styles | Can be edited manually, adjust colors and styles |

### 🔧 Common Operations

#### View Map
- Access: [https://wayhhow.github.io/survey-map/](https://wayhhow.github.io/survey-map/)
- A welcome modal will be displayed on first visit, you can choose "Don't show again"

#### Route Management
- **Add new route**: Add in Google My Maps and re-convert
- **Modify route**: Update route in Google My Maps and re-convert
- **Delete route**: Delete from Google My Maps and re-convert

## 👨‍💻 Development Guide

### Local Preview

1. Start a local static server, for example:
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Or using Node.js
   npx http-server
   ```

2. Access `http://localhost:8000` in your browser

### Code Structure

- `index.html`: Page structure and script imports
- `css/style.css`: Style definitions, including responsive design
- `js/data.js`: Data loading, length calculation and statistical functions
- `js/map.js`: Map initialization, route rendering and interactive events
- `data/types.json`: Type color configuration
- `convert-kml.js`: KML to GeoJSON tool script

## ⚠️ Notes

- Ensure the KML file exported from Google My Maps contains route data
- The converted GeoJSON file should be placed at `data/routes.geojson`
- The `properties.type` field in route data is used to distinguish route types
- If no type is specified, it will be displayed as "To be Surveyed" type by default
- Star history chart is automatically updated every 6 hours through GitHub Actions

## 👥 About Us

**"Chengguang" Volunteer Service Team of Zhicheng College, Southern University of Science and Technology**

We are a volunteer service team from Zhicheng College of Southern University of Science and Technology, continuously carrying out accessibility-related public welfare activities. Accessibility supervision is one of our series of activities, contributing to improving the urban accessibility environment through on-site survey of urban accessibility facilities.

## 👤 Author

**Wayhhow**
- GitHub: [@Wayhhow](https://github.com/Wayhhow)

## ☕ Buy Me a Coffee

If you find this project helpful, welcome to support me through Afdian:

<a href="https://ifdian.net/a/Wayhhow" target="_blank">
  <img src="https://img.shields.io/badge/❤️_Afdian-Wayhhow-red" alt="Afdian">
</a>

## ⭐ Star History

![Star History Chart](https://wayhhow.github.io/survey-map/star-history.svg)

> Note: The chart is automatically updated every 6 hours through GitHub Actions to ensure the latest star data is displayed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

---

<p align="center">
  🌟 If you find this project useful, please give it a star!
</p>