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

This project is a route visualization platform for the accessibility supervision activities of the **"Chengguang" Volunteer Service Team** at Zhicheng College, Southern University of Science and Technology. It displays supervision routes on an interactive map, supporting surveyed/to-be-surveyed route distinction, real-time length statistics, and survey detail display, providing an intuitive data management and presentation tool for accessibility facility supervision.

The project is built with Leaflet.js and Amap (Gaode) tiles, hosted on GitHub Pages, and configured with GitHub Actions for automated deployment.

## 🎯 Core Features

- **Route Visualization**: Render all supervision routes based on Leaflet.js with zoom and pan support
- **Type Distinction**: Surveyed and to-be-surveyed routes are displayed in different colors; click the stats panel to highlight the corresponding type
- **Length Statistics**: Real-time calculation of total route length and length by type using Turf.js
- **Interactive Features**: Click a route to view details (name, type, length, survey date, number of irregularities)
- **Responsive Design**: Adapted for both desktop and mobile devices, providing a consistent user experience
- **Automated Deployment**: GitHub Actions automatically builds and deploys on pushes to the `main` branch

## 🌐 Quick Access

**Live Map**: [https://wayhhow.github.io/survey-map/](https://wayhhow.github.io/survey-map/)

## 📁 Project Structure

```
survey-map/
├── index.html              # Main page
├── css/
│   └── style.css           # Style definitions
├── js/
│   ├── map.js              # Map initialization and interaction
│   └── data.js             # Data loading and statistics
├── data/
│   ├── routes.geojson      # Route geographic data
│   ├── route_details.csv   # Route survey details
│   └── types.json          # Type color configuration
├── image/
│   └── logo.png            # Chengguang Team logo
├── convert-kml.js          # KML/GeoJSON conversion tool
├── package.json            # Project dependencies
├── README.md               # Chinese documentation
├── README.en.md            # English documentation
├── CONTRIBUTING.md         # Contribution guidelines
├── FAQ.md                  # Frequently asked questions
├── LICENSE                 # License
└── .github/workflows/
    ├── deploy.yml          # Auto-deployment workflow
    └── star-history.yml    # Star history update workflow
```

## 🛠 Technology Stack

| Category | Technology/Library | Purpose |
|----------|-------------------|---------|
| Map Library | Leaflet 1.9.4 | Map initialization and route rendering |
| Base Map | Amap (Gaode) | Map tile service |
| Geospatial Computing | Turf.js 6.x | Route length calculation |
| Data Format | GeoJSON / CSV | Route and detail data storage |
| Build Tool | Node.js | KML conversion script runtime |
| Deployment | GitHub Pages | Static site hosting |
| CI/CD | GitHub Actions | Automated deployment and scheduled tasks |

## 🚀 Deployment Guide

### 1. Create a GitHub Repository and Enable Pages

1. Create a new repository on GitHub
2. Go to **Settings → Pages**
3. Select the `main` branch as the publishing source and click **Save**

### 2. Clone and Push Code

```bash
git clone https://github.com/your-username/survey-map.git
cd survey-map
git add .
git commit -m "Initial commit"
git push origin main
```

### 3. Wait for Deployment

GitHub Pages usually completes building and deployment within 1–2 minutes. You can then access the site at `https://your-username.github.io/survey-map`.

## 📊 Usage Guide

### Quick Start

1. **Prepare route data**: Draw routes in [Google My Maps](https://www.google.com/maps/d/), grouped by type
2. **Convert data**: Use `convert-kml.js` to convert the exported KML file to GeoJSON
3. **Update project**: Replace `data/routes.geojson`; the conversion tool will automatically sync `data/route_details.csv`
4. **Commit and deploy**: Push to GitHub; changes on the `main` branch trigger automatic deployment

### KML Conversion Example

```bash
# Install dependencies (first time)
npm install

# Basic conversion
node convert-kml.js input.kml

# Specify output path
node convert-kml.js input.kml data/routes.geojson
```

The conversion process preserves manually entered data in `route_details.csv` (survey date, irregularities) and automatically adds empty records for new routes.

### Configure Route Type Colors

Edit `data/types.json`:

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

## 📝 Beginner Guide: How to Update Route Data

> This guide is for beginners with no prior coding experience. Follow the step-by-step instructions to update route data on the map.

### What You Need

- A computer (Windows or Mac)
- A web browser (Chrome recommended)
- GitHub account with access to the [project repository](https://github.com/Wayhhow/survey-map)

---

### Step 1: Export KML File from Google My Maps

1. Open your browser and go to [Google My Maps](https://www.google.com/maps/d/), sign in with your Google account
2. Find and open the Chengguang Team map project (usually named "Accessibility Supervision Routes" or similar)
3. Verify that your new routes are on the map (add them first if needed)
4. Next to the map name, click the **folder icon** or **three-dot menu button**
5. Select **"Export to KML"**
6. **Do NOT check** "Export as KML instead of KMZ" (keep default)
7. Click **Download**, you'll get a `.kml` file (e.g., `Accessibility_Routes.kml`)
8. Save the file to an accessible location (like your Desktop)

> 💡 **Tip**: If you get a `.kmz` file instead, you selected the wrong export option. Please repeat the steps and make sure to select KML format.

---

### Step 2: Convert KML File to Project Format

1. Copy the downloaded `.kml` file to the project root folder (the `survey-map` folder, same directory as `convert-kml.js`)
2. Open your computer's **Terminal**:
   - **Windows**: Press `Win + R`, type `cmd`, press Enter
   - **Mac**: Press `Cmd + Space`, type `Terminal`, press Enter
3. Use `cd` command to enter the project folder:
   ```bash
   cd Desktop/Accessibility_Map_Visualization/survey-map
   ```
   > 💡 If your path has spaces or Chinese characters, wrap it in quotes: `cd "C:\Users\YourName\Desktop\survey-map"`
4. **First time only**: Install dependencies (you won't need to do this again):
   ```bash
   npm install
   ```
   > 💡 If you see `npm is not recognized`, you need to install [Node.js](https://nodejs.org/). Download the LTS version and restart your terminal.
5. Run the conversion command (replace `your_file_name.kml` with your actual file name):
   ```bash
   node convert-kml.js your_file_name.kml data/routes.geojson
   ```
6. You'll see success messages like:
   ```
   Conversion successful! Output file: data/routes.geojson
   Successfully updated route details CSV! Added 3 new route records. Output file: data/route_details.csv
   ```
   > 💡 If you see "No new routes found", the KML file doesn't contain new routes.

---

### Step 3: Manually Fill in Survey Information

After conversion, the `data/route_details.csv` file is automatically updated with new routes added at the bottom. However, the "Survey Date" and "Accessibility Irregularities" columns are empty and need to be filled manually.

1. Open `data/route_details.csv` with **Excel** or **Notepad**
2. You'll see a table like this:

   | Name | Survey Date | Accessibility Irregularities |
   |------|-------------|------------------------------|
   | Gate1-Gate3 | 2025-12-7 | 10 spots |
   | ... | ... | ... |
   | **NewRouteA** | **(empty)** | **(empty)** |
   | **NewRouteB** | **(empty)** | **(empty)** |

3. Fill in the following for new routes:
   - **Survey Date**: Format as `YYYY-MM-DD`, e.g., `2026-5-7`
   - **Accessibility Irregularities**: Format as `number + spots`, e.g., `5 spots` (means 5 irregular spots found)
4. Leave both fields empty if the route hasn't been surveyed yet
5. **Save the file** (if using Excel, choose "Save as CSV" format)

> ⚠️ **Important**: Do NOT modify existing route names or reorder rows. Only fill in the empty date and irregularities columns.

---

### Step 4: Upload Updates to GitHub

1. Open Terminal and make sure you're still in the `survey-map` directory
2. Run these three commands one by one:

   ```bash
   git add data/routes.geojson data/route_details.csv
   ```

   This tells Git: "I want to include changes to these two files."

   ```bash
   git commit -m "Update route data: add new surveyed routes"
   ```

   This commits the changes. The message in quotes describes what you updated.

   ```bash
   git push origin main
   ```

   This pushes the changes to GitHub.

3. Wait 1–2 minutes, then visit the [live map](https://wayhhow.github.io/survey-map/) to see the updated data!

> 💡 **If `git push` fails**: Someone may have updated the code before you. Run `git pull origin main` first to get the latest changes, then try `git push origin main` again.

---

### Complete Workflow Summary

```
Draw routes in Google My Maps → Export KML file → Run conversion script → CSV auto-adds empty rows → Manually fill dates/irregularities → Git push to GitHub → Map updates automatically
```

### Common Issues

| Issue | Solution |
|-------|----------|
| `npm install` fails | Make sure [Node.js](https://nodejs.org/) is installed, restart terminal |
| `node convert-kml.js` fails | Ensure the KML file is in the `survey-map` folder, no Chinese/spaces in filename |
| `git push` rejected | Run `git pull origin main` first, then `git push origin main` |
| New routes not showing on map | Wait 1–2 minutes for GitHub Pages deployment, refresh with Ctrl+F5 |
| CSV file shows garbled text in Excel | Open with Notepad to verify content; Excel encoding issues don't affect the website |

## 👨‍💻 Local Development

Start a local static server for preview:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

Visit `http://localhost:8000` in your browser.

## ⚠️ Notes

- Ensure the KML exported from Google My Maps contains route data
- The converted GeoJSON should be placed at `data/routes.geojson`
- The `properties.type` field in route data is used to distinguish types; defaults to "ToBeSurveyed" if not specified
- The star history chart is automatically updated every 6 hours by GitHub Actions

## 👥 About Us

**"Chengguang" Volunteer Service Team of Zhicheng College, Southern University of Science and Technology**

We are dedicated to accessibility public welfare, promoting urban accessibility improvements through on-site surveys. This project provides data visualization support for our series of supervision activities.

## 👤 Author

**Wayhhow**
- GitHub: [@Wayhhow](https://github.com/Wayhhow)

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  🌟 If you find this project useful, please give it a star!
</p>
