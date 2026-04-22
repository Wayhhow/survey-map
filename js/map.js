// 全局地图对象
let map = null;
// 当前高亮的图层(单条路线)
let highlightedLayer = null;

// 初始化地图
function initMap() {
    // 使用默认SVG渲染器(支持CSS动画)
    map = L.map('map').setView([39.9042, 116.4074], 12); // 默认北京坐标

    // 添加底图图层(高德地图，支持GCJ-02坐标系)
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

    const type = feature.properties.type || '待勘测';
    const style = typesConfig[type] || typesConfig['待勘测'] || {};

    return {
        ...style,
        dashArray: '10',
        lineCap: 'round'
    };
}

// 绑定路线点击事件
function onEachFeature(feature, layer) {
    // 计算路线长度
    let length = 0;
    if (feature.geometry.type === 'LineString') {
        const line = turf.lineString(feature.geometry.coordinates);
        length = turf.length(line, { units: 'kilometers' });
    }

    const type = feature.properties.type || '待勘测';
    const typeColor = typesConfig && typesConfig[type] ? typesConfig[type].color : '#9E9E9E';
    const routeName = feature.properties.name || '未命名路线';

    let popupContent = '<div class="popup-accent" style="border-top:3px solid ' + typeColor + '">';
    popupContent += '<h3>' + routeName + '</h3>';
    popupContent += '<p>类型: ' + type + '</p>';
    popupContent += '<p>长度: ' + length.toFixed(2) + ' 公里</p>';

    // 获取外部 CSV 数据
    if (typeof routeDetailsData !== 'undefined' && routeDetailsData[routeName]) {
        const details = routeDetailsData[routeName];
        if (details.date) {
            popupContent += '<p>勘测日期: ' + details.date + '</p>';        
        }
        if (details.spots) {
            popupContent += '<p>无障碍不规范点: ' + details.spots + '</p>';
        }
    }

    popupContent += '</div>';

    // 绑定 popup
    layer.bindPopup(popupContent);

    // 保存原始 feature 以便重新获取样式
    layer._feature = feature;

    // 添加透明点击区域扩展层(增大点击范围)
    const baseStyle = getStyleByType(feature);
    const hitAreaLayer = L.polyline(layer.getLatLngs(), {
        color: 'transparent',
        weight: 20,
        opacity: 0,
        interactive: true
    });
    hitAreaLayer.addTo(map);
    layer._hitArea = hitAreaLayer;

    // 将点击和悬停事件绑定到透明扩展层上
    hitAreaLayer.on('click', function(e) {
        L.DomEvent.stopPropagation(e);

        // 先清除按类型的高亮
        if (typeof clearTypeHighlight === 'function' && highlightedType) {
            clearTypeHighlight();
        }

        if (highlightedLayer) {
            const originalStyle = getStyleByType(highlightedLayer._feature);    
            highlightedLayer.setStyle(originalStyle);
            if (highlightedLayer._hitArea) {
                highlightedLayer._hitArea.setStyle({ color: 'transparent', weight: 20, opacity: 0 });
            }
        }

        const originalStyle = getStyleByType(feature);
        layer.setStyle({
            ...originalStyle,
            weight: originalStyle.weight + 2,
            opacity: 1
        });

        highlightedLayer = layer;
        layer.openPopup();
    });

    hitAreaLayer.on('mouseover', function() {
        if (highlightedLayer !== layer && !highlightedType) {
            const style = getStyleByType(feature);
            layer.setStyle({ weight: style.weight + 1, dashArray: '10' });      
        }
    });

    hitAreaLayer.on('mouseout', function() {
        if (highlightedLayer !== layer && !highlightedType) {
            layer.setStyle(getStyleByType(feature));
        }
    });
}

// 渲染路线数据
function renderRoutes() {
    if (!map || !routesData) return;

    // 移除已有的路线图层(如果有)
    if (window.routesLayer) {
        map.removeLayer(window.routesLayer);
    }

    // 创建 GeoJSON 图层
    window.routesLayer = L.geoJSON(routesData, {
        style: getStyleByType,
        onEachFeature: onEachFeature
    }).addTo(map);

    // 调整地图视图以显示所有路线
    map.fitBounds(window.routesLayer.getBounds(), { padding: [50, 50] });

    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('fade-out');
        setTimeout(function() { loading.remove(); }, 600);
    }

    console.log('路线渲染完成');
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

    // 添加地图点击事件，点击空白处时取消高亮
    if (map) {     
        map.on('click', function(e) {
            if (!e.originalEvent.target.closest('.leaflet-popup-content-wrapper') &&
                !e.originalEvent.target.closest('.leaflet-interactive') &&      
                !e.originalEvent.target.closest('.type-stat-item')) {

                // 清除单条路线高亮
                if (highlightedLayer) {
                    const originalStyle = getStyleByType(highlightedLayer._feature);
                    highlightedLayer.setStyle(originalStyle);
                    if (highlightedLayer._hitArea) {
                        highlightedLayer._hitArea.setStyle({ color: 'transparent', weight: 20, opacity: 0 });
                    }
                    highlightedLayer = null;
                }

                // 清除按类型高亮
                if (typeof clearTypeHighlight === 'function' && highlightedType) {
                    clearTypeHighlight();
                }
            }
        });
    }
});

// 初始化统计面板功能
function initStatsPanel() {
    const statsPanel = document.getElementById('stats');
    if (!statsPanel) return;

    // 点击面板非类型统计区域时切换显示/隐藏
    statsPanel.addEventListener('click', function(e) {
        // 如果点击的是类型统计项，不执行显示/隐藏操作(由data.js处理)
        if (e.target.closest('.type-stat-item')) {
            return;
        }
        this.classList.toggle('hidden');
    });

    // 地图移动时显示统计面板(移除hidden类)
    if (map) {
        map.on('move', function() {
            statsPanel.classList.remove('hidden');
        });

        // 地图缩放时显示统计面板(移除hidden类)
        map.on('zoom', function() {
            statsPanel.classList.remove('hidden');
        });

        // 地图点击时显示统计面板(移除hidden类)
        map.on('click', function() {
            statsPanel.classList.remove('hidden');
        });
    }
}
