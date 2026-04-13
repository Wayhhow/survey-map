// 全局地图对象
let map = null;

// 初始化地图
function initMap() {
    // 创建地图实例
    map = L.map('map').setView([39.9042, 116.4074], 12); // 默认北京坐标
    
    // 添加底图图层（CartoDB Positron）
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
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
});
