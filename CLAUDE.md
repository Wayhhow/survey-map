# CLAUDE.md

项目上下文、约定和关键决策，供所有 Claude 会话使用。

## 项目概述

橙光队无障碍督导路线可视化 — 基于 Leaflet.js + 高德地图的无障碍设施地图展示系统。

## 关键约定

### CSS 类名与 HTML 属性对应关系
- **类选择器**（`.className`）只匹配 `class="className"`
- **ID 选择器**（`#idName`）只匹配 `id="idName"`
- 两者不可混用，审查修改时优先确认选择器类型

### 面板交互模式
两个面板（`#stats` 线路统计、`#accessibility-panel` 无障碍设施）使用相同的交互模式：
- 点击面板（非 checkbox/h3 区域）→ 切换 `.hidden` 玻璃态效果
- 点击 h3 → 切换 `.collapsed` 展开/收起
- 三角箭头方向：收起=朝右（`rotate(-90deg)` 在 `.collapsed` 状态），展开=朝下

### 无障碍设施图层渲染时机
**重要**：必须等待**所有**无障碍设施类型数据全部加载后才渲染图层。

正确做法：
```javascript
// ✅ 正确：等全部加载完成
if (data && types && Object.keys(data).length === Object.keys(types).length) {
    renderAccessibilityLayers();
}
```

错误做法：
```javascript
// ❌ 错误：只检查有无数据（竞态条件）
if (Object.keys(data).length > 0) { renderAccessibilityLayers(); }
```

### 事件监听器原则
- checkbox/radio 交互：使用直接监听器（在 DOM 生成时绑定），**不要**在父容器加同类型委托监听器（会导致双触发）
- 地图事件（move/zoom/click）用于恢复面板 `.hidden` 状态

### 异步数据轮询就绪条件
所有涉及"等待多个异步操作完成"的场景，一律用"已完成数 === 预期总数"，而非"> 0"。

## 技术栈
- Leaflet.js 1.9.4 + 高德地图瓦片
- Turf.js（地理计算）
- PapaParse（CSV 解析）
- 原生 JavaScript（无框架）

## 文件结构
```
├── index.html          # 主页面
├── css/style.css       # 全局样式
├── js/
│   ├── data.js         # 数据管理（加载、缓存、统计）
│   └── map.js          # 地图管理（渲染、交互）
└── data/
    ├── routes.geojson       # 路线数据
    ├── route_details.csv    # 路线详情
    ├── types.json           # 路线类型配置
    ├── accessibility_types.json  # 无障碍设施类型配置
    └── accessibility/      # 无障碍设施 GeoJSON 文件
        ├── wheelchair_toilets.geojson
        ├── wheelchair_poi.geojson
        ├── amap_accessibility.geojson
        └── metro_accessibility.geojson
```
