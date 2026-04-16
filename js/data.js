// 全局变量存储数据
let routesData = null;
let typesConfig = null;
let stats = {
    totalLength: 0,
    typeStats: {}
};
// 当前按类型高亮的状态
let highlightedType = null;

// 加载类型配置
async function loadTypesConfig() {
    try {
        const response = await fetch('data/types.json');
        typesConfig = await response.json();
        console.log('类型配置加载成功:', typesConfig);
    } catch (error) {
        console.error('类型配置加载失败:', error);
        // 默认配置
        typesConfig = {
            "已勘测": { "color": "#4CAF50", "weight": 4, "opacity": 0.8 },
            "未勘测": { "color": "#9E9E9E", "weight": 3, "opacity": 0.6 }
        };
    }
}

// 加载线路数据
async function loadRoutesData() {
    try {
        const response = await fetch('data/routes.geojson');
        routesData = await response.json();
        console.log('线路数据加载成功:', routesData);
        calculateStats();
        updateStatsDisplay();
    } catch (error) {
        console.error('线路数据加载失败:', error);
        // 创建示例数据
        routesData = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": { "name": "示例线路1", "type": "已勘测" },
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[116.3974, 39.9093], [116.4100, 39.9100], [116.4200, 39.9080]]
                    }
                },
                {
                    "type": "Feature",
                    "properties": { "name": "示例线路2", "type": "未勘测" },
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[116.3800, 39.9000], [116.3900, 39.8900], [116.4000, 39.8800]]
                    }
                }
            ]
        };
        calculateStats();
        updateStatsDisplay();
    }
}

// 计算统计数据
function calculateStats() {
    if (!routesData || !routesData.features) return;
    
    let totalLength = 0;
    const typeStats = {};
    
    // 初始化类型统计
    Object.keys(typesConfig).forEach(type => {
        typeStats[type] = 0;
    });
    
    // 计算每条线路的长度
    routesData.features.forEach(feature => {
        if (feature.geometry.type === 'LineString') {
            const line = turf.lineString(feature.geometry.coordinates);
            const length = turf.length(line, { units: 'kilometers' });
            totalLength += length;
            
            // 按类型统计
            const type = feature.properties.type || '未勘测';
            if (!typeStats[type]) {
                typeStats[type] = 0;
            }
            typeStats[type] += length;
        }
    });
    
    stats.totalLength = totalLength;
    stats.typeStats = typeStats;
}

// 按类型高亮线路（供外部调用）
function highlightRoutesByType(type) {
    if (!window.routesLayer) return;
    
    // 先清除之前的高亮
    clearTypeHighlight();
    
    highlightedType = type;
    
    window.routesLayer.eachLayer(function(layer) {
        if (layer._feature) {
            const layerType = layer._feature.properties.type || '未勘测';
            if (layerType === type) {
                const style = typesConfig[type] || {};
                layer.setStyle({
                    ...style,
                    weight: (style.weight || 4) + 3,
                    opacity: 1,
                    dashArray: '10'
                });
                if (layer._hitArea) {
                    layer._hitArea.setStyle({ color: 'transparent', weight: 20, opacity: 0 });
                }
            } else {
                layer.setStyle({
                    weight: 1,
                    opacity: 0.25,
                    dashArray: '6'
                });
                if (layer._hitArea) {
                    layer._hitArea.setStyle({ color: 'transparent', weight: 20, opacity: 0 });
                }
            }
        }
    });
    
    // 更新统计面板的选中状态
    document.querySelectorAll('.type-stat-item').forEach(item => {
        if (item.dataset.type === type) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// 清除按类型的高亮
function clearTypeHighlight() {
    if (!window.routesLayer) return;
    
    highlightedType = null;
    
    window.routesLayer.eachLayer(function(layer) {
        if (layer._feature) {
            const originalStyle = getStyleByType(layer._feature);
            layer.setStyle(originalStyle);
            if (layer._hitArea) {
                layer._hitArea.setStyle({ color: 'transparent', weight: 20, opacity: 0 });
            }
        }
    });
    
    // 移除所有选中状态
    document.querySelectorAll('.type-stat-item').forEach(item => {
        item.classList.remove('active');
    });
}

// 更新统计显示
function updateStatsDisplay() {
    // 更新总长度
    const totalLengthElement = document.getElementById('total-length');
    if (totalLengthElement) {
        totalLengthElement.innerHTML = `总长度: ${stats.totalLength.toFixed(2)} 公里`;
    }
    
    // 更新类型统计
    const typeStatsElement = document.getElementById('type-stats');
    if (typeStatsElement) {
        typeStatsElement.innerHTML = '';
        Object.entries(stats.typeStats).forEach(([type, length]) => {
            const typeConfig = typesConfig[type] || {};
            const color = typeConfig.color || '#9E9E9E';
            
            const statItem = document.createElement('div');
            statItem.className = 'type-stat-item';
            statItem.dataset.type = type;
            statItem.innerHTML = `
                <div class="type-color" style="background-color: ${color}"></div>
                <span>${type}: ${length.toFixed(2)} 公里</span>
            `;
            
            // 点击事件：按类型高亮线路
            statItem.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // 如果已经高亮了该类型，则取消高亮；否则高亮该类型
                if (highlightedType === type) {
                    clearTypeHighlight();
                } else {
                    highlightRoutesByType(type);
                }
            });
            
            typeStatsElement.appendChild(statItem);
        });
    }
}

// 初始化数据加载
async function initData() {
    await loadTypesConfig();
    await loadRoutesData();
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', initData);
