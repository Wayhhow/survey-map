<!-- language switcher -->
<div id="language-switcher" style="text-align: center; margin-bottom: 20px; padding: 10px; background: #f5f5f5; border-radius: 8px;">
  <button id="btn-zh" onclick="switchLanguage('zh')" style="padding: 8px 20px; margin: 0 10px; border: 1px solid #ddd; border-radius: 4px; background: #f8f9fa; cursor: pointer; font-size: 14px; font-weight: 500;">中文</button>
  <button id="btn-en" onclick="switchLanguage('en')" style="padding: 8px 20px; margin: 0 10px; border: 1px solid #ddd; border-radius: 4px; background: #f8f9fa; cursor: pointer; font-size: 14px; font-weight: 500;">English</button>
</div>

<script>
// Language switcher
function switchLanguage(lang) {
  // Hide all language content
  document.querySelectorAll('.lang-zh, .lang-en').forEach(el => {
    el.style.display = 'none';
  });

  // Show selected language content
  document.querySelectorAll('.lang-' + lang).forEach(el => {
    el.style.display = 'block';
  });

  // Save language preference
  localStorage.setItem('preferredLanguage', lang);

  // Update button styles
  document.getElementById('btn-zh').style.background = lang === 'zh' ? '#0366d6' : '#f8f9fa';
  document.getElementById('btn-zh').style.color = lang === 'zh' ? 'white' : 'black';
  document.getElementById('btn-en').style.background = lang === 'en' ? '#0366d6' : '#f8f9fa';
  document.getElementById('btn-en').style.color = lang === 'en' ? 'white' : 'black';
}

// Restore language preference on page load
window.onload = function() {
  const savedLang = localStorage.getItem('preferredLanguage') || 'zh';
  switchLanguage(savedLang);
};
</script>

<!-- Chinese content -->
<div class="lang-zh">
# 橙光队无障碍督导路线可视化

<p align="center">
  <img src="image/logo.png" alt="橙光队队徽" width="80" height="80">
</p>

<p align="center">
  <a href="https://wayhhow.github.io/survey-map/" target="_blank">
    <img src="https://img.shields.io/badge/🌍%20访问地图-立即查看-brightgreen" alt="访问地图">
  </a>
  <a href="https://github.com/Wayhhow/survey-map" target="_blank">
    <img src="https://img.shields.io/github/stars/Wayhhow/survey-map?style=social" alt="GitHub Stars">
  </a>
</p>

## 📋 项目简介

我们是**南方科技大学致诚书院"橙光"志愿服务队**，持续开展无障碍相关的公益活动。这个地图是我们"无障碍督导"活动的路线可视化平台，至今已开展两期，未来也会持续开展。

本项目使用 GitHub Pages 托管，支持线路展示、类型区分、长度统计等功能，为无障碍督导工作提供直观的路线管理工具。

## 🎯 核心功能

- **线路可视化**: 使用 Leaflet 地图库展示所有督导路线
- **类型区分**: 点击统计面板中的类型可高亮对应线路，不同类型以不同颜色显示（已勘测/待勘测）
- **长度统计**: 实时计算并显示线路总长度和各类型长度
- **交互功能**: 点击线路查看详细信息（名称、类型、长度）；点击统计面板类型可筛选高亮
- **勘测详情展示**: 点击线路可查看勘测日期、无障碍不规范点数量等详情（从 CSV 自动加载）
- **自动适配**: 地图自动调整视图以显示所有线路
- **响应式设计**: 支持桌面和移动设备
- **实时更新**: 通过 GitHub Actions 自动部署；支持 KML/GeoJSON 转 CSV 自动提取新路线

## 🌐 快速访问

**直接访问地图**: [https://wayhhow.github.io/survey-map/](https://wayhhow.github.io/survey-map/)

## 📁 项目结构

```
survey-map/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式定义
├── js/
│   ├── map.js          # 地图初始化、渲染
│   └── data.js         # 数据加载、统计计算
├── data/
│   ├── routes.geojson  # 线路数据
│   └── types.json      # 类型颜色配置
├── image/
│   └── logo.png        # 橙光队队徽
├── convert-kml.js      # KML 转 GeoJSON 工具
├── star-history.html   # 星标统计页面
├── star-history.svg    # 星标历史图表
├── .star-history.json  # 星标历史数据
├── package.json        # 依赖配置
├── README.md           # 项目文档
└── .github/
    └── workflows/
        ├── deploy.yml      # 自动部署配置
        └── star-history.yml  # 星标历史更新配置
```

## 🛠 技术栈

| 类别 | 技术/库 | 版本 | 用途 |
|------|---------|------|------|
| **地图库** | Leaflet | 1.9.4 | 地图初始化和渲染 |
| **底图** | 高德地图 | - | 提供地图底图服务 |
| **数据处理** | Turf.js | 6.x | 计算线路长度 |
| **数据格式** | GeoJSON | - | 存储线路数据 |
| **构建工具** | Node.js | - | 运行转换脚本 |
| **部署** | GitHub Pages | - | 托管网站 |
| **CI/CD** | GitHub Actions | - | 自动部署和星标统计 |

## 🚀 部署指南

### 1. 创建 GitHub 仓库

1. 在 GitHub 上创建一个新仓库
2. 开启 GitHub Pages 功能：
   - 进入仓库 Settings → Pages
   - 选择 `main` 分支作为发布源
   - 点击 Save

### 2. 克隆仓库并上传代码

```bash
# 克隆仓库
git clone https://github.com/your-username/survey-map.git

# 进入目录
cd survey-map

# 上传代码
git add .
git commit -m "Initial commit"
git push origin main
```

### 3. 等待部署完成

GitHub Pages 会自动构建和部署你的网站，通常需要 1-2 分钟。部署完成后，你可以在 `https://your-username.github.io/survey-map` 访问网站。

## 📊 使用方法

### 🎯 快速开始

1. **准备线路数据**：在 Google My Maps 中绘制线路，按类型分层
2. **转换文件**：使用转换工具将 KML 转换为 GeoJSON
3. **更新数据**：替换 `data/routes.geojson` 文件
4. **提交更改**：推送到 GitHub 自动部署

### 1. 准备线路数据

1. **创建地图**：在 [Google My Maps](https://www.google.com/maps/d/) 中创建新地图
2. **绘制线路**：添加线路图层，按类型（已勘测/待勘测）分组
3. **导出文件**：点击菜单 → 导出为 KML/KMZ 文件

### 2. 转换 KML 为 GeoJSON

```bash
# 安装依赖（首次使用）
npm install

# 基本转换
node convert-kml.js input.kml

# 自定义输出路径
node convert-kml.js input.kml data/routes.geojson
```

### 3. 更新线路数据

#### 3.1 数据更新流程

1. **替换文件**：将转换后的 `routes.geojson` 文件放入 `data/` 目录
2. **自动处理**：转换过程会自动更新 `data/route_details.csv` 文件：
   - ✅ 保留已有的手动填写数据（勘测日期、无障碍不规范点）
   - ✅ 自动为新路线添加新行（只添加路线名称，其他字段为空）

#### 3.2 提交更改

```bash
# 提交更新的文件
git add data/routes.geojson data/route_details.csv

# 提交更改
git commit -m "Update routes data"

# 推送到 GitHub
git push origin main
```

### 4. 配置类型颜色

编辑 `data/types.json` 文件，配置不同类型线路的样式：

```json
{
  "已勘测": {
    "color": "#4CAF50",
    "weight": 4,
    "opacity": 0.8,
    "description": "已完成现场勘测的线路"
  },
  "待勘测": {
    "color": "#9E9E9E",
    "weight": 4,
    "opacity": 0.8,
    "description": "待勘测的线路"
  }
}
```

---

### 📋 数据文件说明

| 文件名 | 用途 | 编辑方式 |
|--------|------|----------|
| `routes.geojson` | 存储线路地理数据 | 自动生成，勿手动编辑 |
| `route_details.csv` | 存储线路详细信息 | 可手动编辑，添加勘测日期和不规范点 |
| `types.json` | 配置线路类型样式 | 可手动编辑，调整颜色和样式 |

### 🔧 常见操作

#### 查看地图
- 访问：[https://wayhhow.github.io/survey-map/](https://wayhhow.github.io/survey-map/)
- 首次访问会显示欢迎模态框，可选择"不再显示"

#### 线路管理
- **添加新线路**：在 Google My Maps 中添加后重新转换
- **修改线路**：更新 Google My Maps 中的线路后重新转换
- **删除线路**：从 Google My Maps 中删除后重新转换

## 👨‍💻 开发指南

### 本地预览

1. 在本地启动一个静态服务器，例如：
   ```bash
   # 使用 Python 3
   python -m http.server 8000

   # 或使用 Node.js
   npx http-server
   ```

2. 在浏览器中访问 `http://localhost:8000`

### 代码结构

- `index.html`: 页面结构和脚本引入
- `css/style.css`: 样式定义，包含响应式设计
- `js/data.js`: 数据加载、长度计算和统计功能
- `js/map.js`: 地图初始化、线路渲染和交互事件
- `data/types.json`: 类型颜色配置
- `convert-kml.js`: KML 转 GeoJSON 工具脚本

## ⚠️ 注意事项

- 确保 Google My Maps 导出的 KML 文件包含线路数据
- 转换后的 GeoJSON 文件应放在 `data/routes.geojson` 位置
- 线路数据中的 `properties.type` 字段用于区分线路类型
- 如果没有指定类型，默认显示为 "待勘测" 类型
- 星标历史图表通过 GitHub Actions 每 6 小时自动更新

## 👥 关于我们

**南方科技大学致诚书院"橙光"志愿服务队**

我们是南方科技大学致诚书院的志愿服务队，持续开展无障碍相关的公益活动。无障碍督导是我们系列活动之一，通过实地勘测城市无障碍设施，为改进城市无障碍环境贡献力量。

## 👤 作者

**Wayhhow**
- GitHub: [@Wayhhow](https://github.com/Wayhhow)

## ☕ 请我喝瓶水

如果你觉得这个项目有帮助，欢迎通过爱发电支持我：

<a href="https://ifdian.net/a/Wayhhow" target="_blank">
  <img src="https://img.shields.io/badge/❤️_爱发电-Wayhhow-red" alt="爱发电">
</a>

## ⭐ Star History

![Star History Chart](https://wayhhow.github.io/survey-map/star-history.svg)

> 注：图表通过 GitHub Actions 每 6 小时自动更新，确保显示最新的星标数据

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

<p align="center">
  🌟 如果你觉得这个项目有用，请给它点个星吧！
</p>
</div>

<!-- English content -->
<div class="lang-en" style="display: none;">
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
├── README.md           # Project documentation
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
</div>