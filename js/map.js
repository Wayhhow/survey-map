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
    
    const type = feature.properties.type || '未勘测';
    const typeColor = typesConfig && typesConfig[type] ? typesConfig[type].color : '#9E9E9E';
    const popupContent = '<div class="popup-accent" style="border-top:3px solid ' + typeColor + '"><h3>' + (feature.properties.name || '未命名线路') + '</h3><p>类型: ' + type + '</p><p>长度: ' + length.toFixed(2) + ' 公里</p></div>';
    
    // 绑定 popup
    layer.bindPopup(popupContent);
    
    // 保存原始 feature 以便重新获取样式
    layer._feature = feature;
    
    // 绑定点击事件
    layer.on('click', function() {
        // 先恢复之前高亮的图层
        if (highlightedLayer) {
            // 完全重新应用原始样式
            const originalStyle = getStyleByType(highlightedLayer._feature);
            highlightedLayer.setStyle(originalStyle);
        }
        
        // 应用高亮样式 - 只保留加粗和透明度
        const originalStyle = getStyleByType(feature);
        layer.setStyle({
            ...originalStyle,
            weight: originalStyle.weight + 2,
            opacity: 1
        });
        
        // 保存当前高亮的图层
        highlightedLayer = layer;
    });

    layer.on('mouseover', function() {
        if (highlightedLayer !== layer) {
            const style = getStyleByType(feature);
            layer.setStyle({ weight: style.weight + 1 });
        }
    });

    layer.on('mouseout', function() {
        if (highlightedLayer !== layer) {
            layer.setStyle(getStyleByType(feature));
        }
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

    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('fade-out');
        setTimeout(function() { loading.remove(); }, 600);
    }

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
    // 检查是否需要显示欢迎模态框
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
        setTimeout(() => {
            const welcomeModal = document.getElementById('welcome-modal');
            if (welcomeModal) {
                welcomeModal.classList.remove('hidden');
            }
        }, 1000);
    }

    // 绑定关闭按钮事件
    const closeWelcome = document.getElementById('close-welcome');
    const closeWelcomeBtn = document.getElementById('close-welcome-btn');
    const welcomeModal = document.getElementById('welcome-modal');
    const dontShowAgain = document.getElementById('dont-show-again');

    function closeWelcomeModal() {
        if (welcomeModal) {
            if (dontShowAgain && dontShowAgain.checked) {
                localStorage.setItem('hasSeenWelcome', 'true');
            }
            welcomeModal.classList.add('hidden');
        }
    }

    if (closeWelcome) {
        closeWelcome.addEventListener('click', closeWelcomeModal);
    }

    if (closeWelcomeBtn) {
        closeWelcomeBtn.addEventListener('click', closeWelcomeModal);
    }

    initMap();
    listenForDataLoad();
    initStatsPanel();
    
    // 添加地图点击事件，点击空白处时移除高亮
    if (map) {
        map.on('click', function(e) {
            // 如果点击的不是线路图层
            if (!e.originalEvent.target.closest('.leaflet-popup-content-wrapper') && !e.originalEvent.target.closest('.leaflet-interactive')) {
                if (highlightedLayer) {
                    // 完全重新应用原始样式
                    const originalStyle = getStyleByType(highlightedLayer._feature);
                    highlightedLayer.setStyle(originalStyle);
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
