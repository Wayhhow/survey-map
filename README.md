# 橙光队无障碍督导路线可视化

GitHub Pages 托管的地图网站，显示 Google My Maps 导出的线路，按类型区分颜色。

## 项目结构

```
survey-map/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式
├── js/
│   ├── map.js          # 地图初始化、渲染
│   └── data.js         # 数据加载、统计计算
├── data/
│   ├── routes.geojson  # 所有线路数据（单一文件）
│   └── types.json      # 类型颜色配置
├── convert-kml.js      # KML 转 GeoJSON 工具
├── package.json        # 依赖配置
└── .github/
    └── workflows/
        └── deploy.yml  # 自动部署配置
```

## 技术栈

- **地图库**: Leaflet 1.9.x
- **底图**: CartoDB Positron
- **数据格式**: GeoJSON
- **数据处理**: Turf.js

## 部署步骤

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

## 使用方法

### 1. 准备线路数据

1. 在 Google My Maps 中绘制线路，按类型分层
2. 导出为 KML 文件
3. 使用转换工具将 KML 转换为 GeoJSON

### 2. 转换 KML 为 GeoJSON

```bash
# 安装依赖
npm install

# 转换 KML 文件
node convert-kml.js input.kml
# 或指定输出文件
node convert-kml.js input.kml data/routes.geojson
```

### 3. 更新线路数据

1. 将转换后的 `routes.geojson` 文件替换到 `data/` 目录
2. 提交并推送更改：
   ```bash
   git add data/routes.geojson
   git commit -m "Update routes data"
   git push origin main
   ```

### 4. 配置类型颜色

编辑 `data/types.json` 文件，配置不同类型线路的颜色和样式：

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

## 功能说明

- **地图显示**: 显示所有线路，按类型区分颜色
- **线路点击**: 点击线路显示详细信息（名称、类型、长度）
- **统计面板**: 显示总线路长度和各类型线路长度
- **自动适配**: 地图会自动调整视图以显示所有线路
- **标题显示**: 地图顶部显示项目标题"橙光队无障碍督导路线可视化"

## 开发指南

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
- `css/style.css`: 样式定义
- `js/data.js`: 数据加载、长度计算和统计
- `js/map.js`: 地图初始化和线路渲染
- `data/types.json`: 类型颜色配置
- `convert-kml.js`: KML 转 GeoJSON 工具

## 注意事项

- 确保 Google My Maps 导出的 KML 文件包含线路数据
- 转换后的 GeoJSON 文件应放在 `data/routes.geojson` 位置
- 线路数据中的 `properties.type` 字段用于区分线路类型
- 如果没有指定类型，默认显示为 "待勘测" 类型

## Star History

<iframe style="width:100%;height:auto;min-width:600px;min-height:400px;" src="https://www.star-history.com/?repos=Wayhhow%2Fsurvey-map&type=date&legend=top-left" frameBorder="0"></iframe>
