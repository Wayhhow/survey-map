#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { kml } = require('@mapbox/togeojson');
const { DOMParser } = require('xmldom');

// 命令行参数
const args = process.argv.slice(2);
if (args.length < 1) {
    console.error('用法: node convert-kml.js <input.kml> [output.geojson]');
    process.exit(1);
}

const inputPath = args[0];
const outputPath = args[1] || path.join(path.dirname(inputPath), 'routes.geojson');

// 读取 KML 文件
fs.readFile(inputPath, 'utf8', (err, data) => {
    if (err) {
        console.error('读取 KML 文件失败:', err);
        process.exit(1);
    }
    
    try {
        // 解析 KML
        const xml = new DOMParser().parseFromString(data, 'text/xml');
        const geojson = kml(xml);
        
        // 处理转换后的数据（可选：添加类型属性）
        geojson.features.forEach(feature => {
            // 可以根据需要添加类型属性
            // 例如：feature.properties.type = '已勘测';
        });
        
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
