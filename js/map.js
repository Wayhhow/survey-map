// 全局地图对象
let map = null;
// 当前高亮的图层
let highlightedLayer = null;

// 初始化地图
function initMap() {
    // 创建地图实例
    map = L.map('map').setView([39.9042, 116.4074], 12); // 默认北京坐标
    
    // 添加底图图层（高德地图，支持GCJ-02坐标系）
    L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
        subdomains: '1234',
        maxZoom: 20,
        attribution: '高德地图'
    }).addTo(map);
    
    console.log('地图初始化完成');
}

// 根据类型获取样式
function getStyleByType(feature) {
    if (!typesConfig) return {};
    
    const type = feature.properties.type || '未勘测';
    return typesConfig[type] || typesConfig['未勘测'] || {};
}

// 绑定线路点击事件
function onEachFeature(feature, layer) {
    // 计算线路长度
    let length = 0;
    if (feature.geometry.type === 'LineString') {
        const line = turf.lineString(feature.geometry.coordinates);
        length = turf.length(line, { units: 'kilometers' });
    }
    
    // 创建 popup 内容
    const popupContent = `
        <h3>${feature.properties.name || '未命名线路'}</h3>
        <p>类型: ${feature.properties.type || '未勘测'}</p>
        <p>长度: ${length.toFixed(2)} 公里</p>
    `;
    
    // 绑定 popup
    layer.bindPopup(popupContent);
    
    // 保存原始样式
    layer._originalStyle = getStyleByType(feature);
    
    // 绑定点击事件
    layer.on('click', function() {
        // 先恢复之前高亮的图层
        if (highlightedLayer) {
            highlightedLayer.setStyle({
                ...highlightedLayer._originalStyle,
                dashArray: null // 确保恢复为实线
            });
        }
        
        // 应用高亮样式
        layer.setStyle({
            ...layer._originalStyle,
            weight: layer._originalStyle.weight + 2,
            opacity: 1,
            dashArray: '5, 5'
        });
        
        // 保存当前高亮的图层
        highlightedLayer = layer;
    });
}

// 渲染线路数据
function renderRoutes() {
    if (!map || !routesData) return;
    
    // 清除已有的线路图层（如果有）
    if (window.routesLayer) {
        map.removeLayer(window.routesLayer);
    }
    
    // 创建 GeoJSON 图层
    window.routesLayer = L.geoJSON(routesData, {
        style: getStyleByType,
        onEachFeature: onEachFeature
    }).addTo(map);
    
    // 调整地图视图以显示所有线路
    map.fitBounds(window.routesLayer.getBounds(), { padding: [50, 50] });
    
    console.log('线路渲染完成');
}

// 监听数据加载完成事件
function listenForDataLoad() {
    // 检查数据是否加载完成
    const checkDataLoaded = setInterval(() => {
        if (routesData && typesConfig) {
            clearInterval(checkDataLoaded);
            renderRoutes();
        }
    }, 100);
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
    initMap();
    listenForDataLoad();
    initStatsPanel();
    
    // 添加地图点击事件，点击空白处时移除高亮
    if (map) {
        map.on('click', function(e) {
            // 如果点击的不是线路图层
            if (!e.originalEvent.target.closest('.leaflet-popup-content-wrapper') && !e.originalEvent.target.closest('.leaflet-interactive')) {
                if (highlightedLayer) {
                    highlightedLayer.setStyle({
                        ...highlightedLayer._originalStyle,
                        dashArray: null // 确保恢复为实线
                    });
                    highlightedLayer = null;
                }
            }
        });
    }
});

// 初始化统计面板功能
function initStatsPanel() {
    const statsPanel = document.getElementById('stats');
    if (!statsPanel) return;
    
    // 点击切换统计面板透明度
    statsPanel.addEventListener('click', function() {
        this.classList.toggle('hidden');
    });
    
    // 地图移动时显示统计面板（移除hidden类）
    if (map) {
        map.on('move', function() {
            statsPanel.classList.remove('hidden');
        });
        
        // 地图缩放时显示统计面板（移除hidden类）
        map.on('zoom', function() {
            statsPanel.classList.remove('hidden');
        });
        
        // 地图点击时显示统计面板（移除hidden类）
        map.on('click', function() {
            statsPanel.classList.remove('hidden');
        });
    }
}
