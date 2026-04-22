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
