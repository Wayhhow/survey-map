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

<p align="center">
  <b>🌐 语言 / Language:</b>
  <a href="./README.md"><b>中文</b></a> |
  <a href="./README.en.md">English</a>
</p>

---

## 📋 项目简介

本项目是**南方科技大学致诚书院"橙光"志愿服务队**无障碍督导活动的路线可视化平台。通过交互式地图展示督导路线，支持已勘测与待勘测线路的区分、长度实时统计、勘测详情展示等功能，为无障碍设施督导工作提供直观的数据管理与展示工具。

项目基于 Leaflet.js 与高德地图瓦片构建，采用 GitHub Pages 托管，并配置 GitHub Actions 实现自动化部署。

## 🎯 核心功能

- **线路可视化**：基于 Leaflet.js 渲染所有督导路线，支持缩放与平移
- **类型区分**：已勘测与待勘测线路以不同颜色展示，点击统计面板可高亮对应类型
- **长度统计**：利用 Turf.js 实时计算线路总长度及各类型长度
- **交互功能**：点击线路查看详情（名称、类型、长度、勘测日期、不规范点数量）
- **响应式设计**：适配桌面端与移动端，提供一致的用户体验
- **自动化部署**：推送代码至 `main` 分支后，GitHub Actions 自动构建并部署

## 🌐 快速访问

**在线地图**：[https://wayhhow.github.io/survey-map/](https://wayhhow.github.io/survey-map/)

## 📁 项目结构

```
survey-map/
├── index.html              # 主页面
├── css/
│   └── style.css           # 样式定义
├── js/
│   ├── map.js              # 地图初始化与交互
│   └── data.js             # 数据加载与统计计算
├── data/
│   ├── routes.geojson      # 线路地理数据
│   ├── route_details.csv   # 线路勘测详情
│   └── types.json          # 类型颜色配置
├── image/
│   └── logo.png            # 橙光队队徽
├── convert-kml.js          # KML/GeoJSON 转换工具
├── package.json            # 项目依赖
├── README.md               # 中文文档
├── README.en.md            # 英文文档
├── CONTRIBUTING.md         # 贡献指南
├── FAQ.md                  # 常见问题
├── LICENSE                 # 许可证
└── .github/workflows/
    ├── deploy.yml          # 自动部署工作流
    └── star-history.yml    # 星标历史更新工作流
```

## 🛠 技术栈

| 类别 | 技术/库 | 用途 |
|------|---------|------|
| 地图库 | Leaflet 1.9.4 | 地图初始化与路线渲染 |
| 底图 | 高德地图 | 地图瓦片服务 |
| 地理计算 | Turf.js 6.x | 线路长度计算 |
| 数据格式 | GeoJSON / CSV | 线路与详情数据存储 |
| 构建工具 | Node.js | KML 转换脚本运行环境 |
| 部署 | GitHub Pages | 静态网站托管 |
| CI/CD | GitHub Actions | 自动部署与定时任务 |

## 🚀 部署指南

### 1. 创建 GitHub 仓库并启用 Pages

1. 在 GitHub 创建新仓库
2. 进入 **Settings → Pages**
3. 选择 `main` 分支作为发布源，点击 **Save**

### 2. 克隆并推送代码

```bash
git clone https://github.com/your-username/survey-map.git
cd survey-map
git add .
git commit -m "Initial commit"
git push origin main
```

### 3. 等待部署

GitHub Pages 通常在 1–2 分钟内完成构建与部署，随后可通过 `https://your-username.github.io/survey-map` 访问。

## 📊 使用方法

### 快速开始

1. **准备线路数据**：在 [Google My Maps](https://www.google.com/maps/d/) 中绘制线路，按类型分层
2. **转换数据**：使用 `convert-kml.js` 将导出的 KML 文件转换为 GeoJSON
3. **更新项目**：替换 `data/routes.geojson`，转换工具会自动同步 `data/route_details.csv`
4. **提交部署**：推送至 GitHub，`main` 分支变更将触发自动部署

### KML 转换示例

```bash
# 安装依赖（首次使用）
npm install

# 基本转换
node convert-kml.js input.kml

# 指定输出路径
node convert-kml.js input.kml data/routes.geojson
```

转换过程会保留 `route_details.csv` 中已有的手动填写数据（勘测日期、不规范点），并自动为新路线添加空记录行。

### 配置线路类型颜色

编辑 `data/types.json`：

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

## 👨‍💻 本地开发

启动本地静态服务器预览：

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

浏览器访问 `http://localhost:8000`。

## ⚠️ 注意事项

- 确保 Google My Maps 导出的 KML 包含线路数据
- 转换后的 GeoJSON 应置于 `data/routes.geojson`
- 线路 `properties.type` 字段用于区分类型，未指定时默认为"待勘测"
- 星标历史图表由 GitHub Actions 每 6 小时自动更新

## 👥 关于我们

**南方科技大学致诚书院"橙光"志愿服务队**

我们致力于无障碍公益行动，通过实地勘测推动城市无障碍环境改善。本项目为系列督导活动提供数据可视化支持。

## 👤 作者

**Wayhhow**
- GitHub: [@Wayhhow](https://github.com/Wayhhow)

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

---

<p align="center">
  🌟 如果你觉得这个项目有用，请给它点个星吧！
</p>
