/**
 * 地图管理模块
 * 负责地图初始化、路线渲染和交互处理
 */
class MapManager {
    /**
     * 构造函数
     */
    constructor() {
        /**
         * Leaflet 地图实例
         * @type {Object|null}
         */
        this.map = null;
        
        /**
         * 当前高亮的图层(单条路线)
         * @type {Object|null}
         */
        this.highlightedLayer = null;
    }

    /**
     * 初始化地图
     */
    initMap() {
        // 使用默认SVG渲染器(支持CSS动画)
        this.map = L.map('map').setView([39.9042, 116.4074], 12); // 默认北京坐标

        // 添加底图图层(高德地图，支持GCJ-02坐标系)
        L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
            subdomains: '1234',
            maxZoom: 20,
            attribution: '高德地图'
        }).addTo(this.map);

        console.log('地图初始化完成');
    }

    /**
     * 绑定路线点击事件
     * @param {Object} feature - GeoJSON feature
     * @param {Object} layer - Leaflet图层
     */
    onEachFeature(feature, layer) {
        // 计算路线长度
        let length = 0;
        if (feature.geometry.type === 'LineString') {
            const line = turf.lineString(feature.geometry.coordinates);
            length = turf.length(line, { units: 'kilometers' });
        }

        const type = feature.properties.type || '待勘测';
        const typeColor = window.dataManager.typesConfig && window.dataManager.typesConfig[type] 
            ? window.dataManager.typesConfig[type].color 
            : '#9E9E9E';
        const routeName = feature.properties.name || '未命名路线';

        let popupContent = `<div class="popup-accent" style="border-top:3px solid ${typeColor}">`;
        popupContent += `<h3>${routeName}</h3>`;
        popupContent += `<p>类型: ${type}</p>`;
        popupContent += `<p>长度: ${length.toFixed(2)} 公里</p>`;

        // 获取外部 CSV 数据
        if (window.dataManager.routeDetailsData && window.dataManager.routeDetailsData[routeName]) {
            const details = window.dataManager.routeDetailsData[routeName];
            if (details.date) {
                popupContent += `<p>勘测日期: ${details.date}</p>`;        
            }
            if (details.spots) {
                popupContent += `<p>无障碍不规范点: ${details.spots}</p>`;
            }
        }

        popupContent += '</div>';

        // 绑定 popup
        layer.bindPopup(popupContent);

        // 保存原始 feature 以便重新获取样式
        layer._feature = feature;

        // 添加透明点击区域扩展层(增大点击范围)
        const baseStyle = window.dataManager.getStyleByType(feature);
        const hitAreaLayer = L.polyline(layer.getLatLngs(), {
            color: 'transparent',
            weight: 20,
            opacity: 0,
            interactive: true
        });
        hitAreaLayer.addTo(this.map);
        layer._hitArea = hitAreaLayer;

        // 将点击和悬停事件绑定到透明扩展层上
        hitAreaLayer.on('click', (e) => {
            L.DomEvent.stopPropagation(e);

            // 先清除按类型的高亮
            if (window.dataManager.highlightedType) {
                window.dataManager.clearTypeHighlight();
            }

            if (this.highlightedLayer) {
                const originalStyle = window.dataManager.getStyleByType(this.highlightedLayer._feature);    
                this.highlightedLayer.setStyle(originalStyle);
                if (this.highlightedLayer._hitArea) {
                    this.highlightedLayer._hitArea.setStyle({ color: 'transparent', weight: 20, opacity: 0 });
                }
            }

            const originalStyle = window.dataManager.getStyleByType(feature);
            layer.setStyle({
                ...originalStyle,
                weight: originalStyle.weight + 2,
                opacity: 1
            });

            this.highlightedLayer = layer;
            layer.openPopup();
        });

        hitAreaLayer.on('mouseover', () => {
            if (this.highlightedLayer !== layer && !window.dataManager.highlightedType) {
                const style = window.dataManager.getStyleByType(feature);
                layer.setStyle({ weight: style.weight + 1, dashArray: '10' });      
            }
        });

        hitAreaLayer.on('mouseout', () => {
            if (this.highlightedLayer !== layer && !window.dataManager.highlightedType) {
                layer.setStyle(window.dataManager.getStyleByType(feature));
            }
        });
    }

    /**
     * 渲染路线数据
     */
    renderRoutes() {
        try {
            if (!this.map || !window.dataManager?.routesData) return;

            // 移除已有的路线图层(如果有)
            if (window.routesLayer) {
                try {
                    this.map.removeLayer(window.routesLayer);
                } catch (error) {
                    console.warn('移除路线图层时出错:', error);
                }
            }

            // 创建 GeoJSON 图层
            try {
                window.routesLayer = L.geoJSON(window.dataManager.routesData, {
                    style: (feature) => {
                        try {
                            return window.dataManager.getStyleByType(feature);
                        } catch (styleError) {
                            console.warn('获取样式时出错:', styleError);
                            return {};
                        }
                    },
                    onEachFeature: (feature, layer) => {
                        try {
                            this.onEachFeature(feature, layer);
                        } catch (featureError) {
                            console.warn('处理要素时出错:', featureError);
                        }
                    }
                }).addTo(this.map);

                // 调整地图视图以显示所有路线
                try {
                    this.map.fitBounds(window.routesLayer.getBounds(), { padding: [50, 50] });
                } catch (boundsError) {
                    console.warn('调整地图视图时出错:', boundsError);
                }
            } catch (geoJsonError) {
                console.error('创建 GeoJSON 图层时出错:', geoJsonError);
            }

            const loading = document.getElementById('loading');
            if (loading) {
                try {
                    loading.classList.add('fade-out');
                    setTimeout(() => { 
                        try {
                            loading.remove(); 
                        } catch (removeError) {
                            console.warn('移除加载元素时出错:', removeError);
                        }
                    }, 600);
                } catch (loadingError) {
                    console.warn('处理加载元素时出错:', loadingError);
                }
            }

            console.log('路线渲染完成');
        } catch (error) {
            console.error('渲染路线数据时出错:', error);
        }
    }

    /**
     * 监听数据加载完成事件
     */
    listenForDataLoad() {
        // 检查数据是否加载完成
        const checkDataLoaded = setInterval(() => {
            if (window.dataManager.routesData && window.dataManager.typesConfig) {
                clearInterval(checkDataLoaded);
                this.renderRoutes();
            }
        }, 100);
    }

    /**
     * 初始化统计面板功能
     */
    initStatsPanel() {
        const statsPanel = document.getElementById('stats');
        if (!statsPanel) return;

        // 点击面板非类型统计区域时切换显示/隐藏
        statsPanel.addEventListener('click', (e) => {
            // 如果点击的是类型统计项，不执行显示/隐藏操作(由data.js处理)
            if (e.target.closest('.type-stat-item')) {
                return;
            }
            statsPanel.classList.toggle('hidden');
        });

        // 地图移动时显示统计面板(移除hidden类)
        if (this.map) {
            this.map.on('move', () => {
                statsPanel.classList.remove('hidden');
            });

            // 地图缩放时显示统计面板(移除hidden类)
            this.map.on('zoom', () => {
                statsPanel.classList.remove('hidden');
            });

            // 地图点击时显示统计面板(移除hidden类)
            this.map.on('click', () => {
                statsPanel.classList.remove('hidden');
            });
        }
    }

    /**
     * 初始化欢迎模态框
     */
    initWelcomeModal() {
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
    }

    /**
     * 初始化地图点击事件
     */
    initMapClickEvent() {
        if (!this.map) return;
        
        this.map.on('click', (e) => {
            if (!e.originalEvent.target.closest('.leaflet-popup-content-wrapper') &&
                !e.originalEvent.target.closest('.leaflet-interactive') &&      
                !e.originalEvent.target.closest('.type-stat-item')) {

                // 清除单条路线高亮
                if (this.highlightedLayer) {
                    const originalStyle = window.dataManager.getStyleByType(this.highlightedLayer._feature);
                    this.highlightedLayer.setStyle(originalStyle);
                    if (this.highlightedLayer._hitArea) {
                        this.highlightedLayer._hitArea.setStyle({ color: 'transparent', weight: 20, opacity: 0 });
                    }
                    this.highlightedLayer = null;
                }

                // 清除按类型高亮
                if (window.dataManager.highlightedType) {
                    window.dataManager.clearTypeHighlight();
                }
            }
        });
    }

    /**
     * 初始化所有功能
     */
    init() {
        this.initMap();
        this.listenForDataLoad();
        this.initStatsPanel();
        this.initWelcomeModal();
        this.initMapClickEvent();
    }
}

// 导出单例实例
const mapManager = new MapManager();

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
    mapManager.init();
});

// 导出地图管理器
window.mapManager = mapManager;
