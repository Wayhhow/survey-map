#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { kml } = require('@mapbox/togeojson');
const { DOMParser } = require('xmldom');

// 命令行参数
const args = process.argv.slice(2);
if (args.length < 1) {
    console.error('用法: node convert-kml.js <input.kml|input.geojson> [output.geojson]');
    process.exit(1);
}

const inputPath = args[0];
const outputPath = args[1] || path.join(path.dirname(inputPath), 'routes.geojson');

// 颜色到类型的映射
const colorToType = {
    '#4CAF50': '已勘测',
    '#9E9E9E': '待勘测',
    '#F44336': '待勘测',
    '#fbc02d': '已勘测', // 黄色
    '#000000': '待勘测'  // 黑色
};

// 读取文件
fs.readFile(inputPath, 'utf8', (err, data) => {
    if (err) {
        console.error('读取文件失败:', err);
        process.exit(1);
    }
    
    try {
        let geojson;
        
        // 检查文件类型
        if (inputPath.endsWith('.kml')) {
            // 解析 KML
            const xml = new DOMParser().parseFromString(data, 'text/xml');
            geojson = kml(xml);
            
            // 提取样式信息
            const styles = {};
            const styleElements = xml.getElementsByTagName('Style');
            
            for (let i = 0; i < styleElements.length; i++) {
                const style = styleElements[i];
                const id = style.getAttribute('id');
                const lineStyle = style.getElementsByTagName('LineStyle')[0];
                
                if (id && lineStyle) {
                    const colorElement = lineStyle.getElementsByTagName('color')[0];
                    if (colorElement) {
                        let color = colorElement.textContent;
                        // 转换 KML 颜色格式（AABBGGRR）为 CSS 格式（#RRGGBB）
                        if (color.length === 8) {
                            color = '#' + color.substring(6, 8) + color.substring(4, 6) + color.substring(2, 4);
                        }
                        styles[id] = color;
                    }
                }
            }
            
            // 处理转换后的数据
            geojson.features.forEach(feature => {
                // 从 styleUrl 提取样式 ID
                let type = '待勘测'; // 默认类型
                if (feature.properties.styleUrl) {
                    const styleId = feature.properties.styleUrl.replace('#', '');
                    const color = styles[styleId];
                    if (color && colorToType[color]) {
                        type = colorToType[color];
                    }
                }
                feature.properties.type = type;
            });
        } else if (inputPath.endsWith('.geojson')) {
            // 解析 GeoJSON
            geojson = JSON.parse(data);
            
            // 处理 GeoJSON 数据
            geojson.features.forEach(feature => {
                let type = '待勘测'; // 默认类型
                if (feature.properties.stroke) {
                    const color = feature.properties.stroke.toLowerCase();
                    if (colorToType[color]) {
                        type = colorToType[color];
                    }
                }
                feature.properties.type = type;
            });
        } else {
            console.error('不支持的文件类型，请使用 .kml 或 .geojson 文件');
            process.exit(1);
        }
        
        // 写入 GeoJSON 文件
        fs.writeFile(outputPath, JSON.stringify(geojson, null, 2), (err) => {
            if (err) {
                console.error('写入 GeoJSON 文件失败:', err);
                process.exit(1);
            }
            console.log(`转换成功！输出文件: ${outputPath}`);
        });
    } catch (error) {
        console.error('转换过程出错:', error);
        process.exit(1);
    }
});
