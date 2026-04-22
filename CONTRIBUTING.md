# 贡献指南

## 🎯 项目简介

**橙光队无障碍督导路线可视化**是一个用于展示无障碍督导路线的地图应用，由南方科技大学致诚书院"橙光"志愿服务队开发和维护。

- **项目地址**：[https://github.com/Wayhhow/survey-map](https://github.com/Wayhhow/survey-map)
- **在线演示**：[https://wayhhow.github.io/survey-map/](https://wayhhow.github.io/survey-map/)

## 📋 如何贡献

我们欢迎各种形式的贡献，包括但不限于：

- **功能开发**：添加新功能或改进现有功能
- **Bug修复**：解决已知问题或潜在问题
- **文档完善**：改进README或其他文档
- **代码优化**：提高代码质量和性能
- **测试覆盖**：添加或改进测试用例

## 🔧 开发环境搭建

### 1. 克隆仓库

```bash
# 克隆仓库
git clone https://github.com/Wayhhow/survey-map.git

# 进入项目目录
cd survey-map
```

### 2. 安装依赖

```bash
# 安装依赖（用于KML转换工具）
npm install
```

### 3. 本地预览

```bash
# 使用 Python 3 启动本地服务器
python -m http.server 8000

# 或使用 Node.js
npx http-server
```

然后在浏览器中访问 `http://localhost:8000` 查看效果。

## 📝 代码风格规范

### JavaScript 规范

- 使用 **ES6+** 语法
- 采用 **4空格** 缩进
- 每行代码长度不超过 **80** 字符
- 变量和函数命名使用 **驼峰命名法**
- 常量使用 **全大写** 加下划线
- 代码注释清晰明了

### CSS 规范

- 使用 **CSS变量** 管理颜色和尺寸
- 采用 **4空格** 缩进
- 选择器使用 **小写字母** 加连字符
- 样式属性按 **逻辑顺序** 排列
- 避免使用 `!important`

### HTML 规范

- 使用 **语义化标签**
- 缩进使用 **4空格**
- 标签和属性使用 **小写**
- 引号使用 **双引号**
- 确保所有标签正确闭合

## 🔄 提交流程

### 1. 创建分支

```bash
# 从main分支创建新分支
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

### 2. 提交更改

```bash
# 添加更改的文件
git add .

# 提交更改（使用清晰的提交信息）
git commit -m "Feature: 添加新功能描述"
# 或
git commit -m "Fix: 修复问题描述"
```

### 3. 推送到远程

```bash
# 推送分支到远程仓库
git push origin feature/your-feature-name
```

### 4. 创建 Pull Request

1. 访问 GitHub 仓库页面
2. 点击 "Pull requests" 标签
3. 点击 "New pull request"
4. 选择你的分支与 main 分支进行比较
5. 填写 PR 标题和描述
6. 点击 "Create pull request"

## 🐛 报告问题

如果发现 Bug 或有功能建议，请在 GitHub 上创建 Issue：

1. 访问 [Issue 页面](https://github.com/Wayhhow/survey-map/issues)
2. 点击 "New issue"
3. 选择合适的模板（Bug 报告或功能请求）
4. 填写详细信息，包括：
   - 问题描述
   - 复现步骤
   - 预期行为
   - 实际行为
   - 环境信息（浏览器、操作系统等）
   - 相关截图（如有）

## 📄 行为准则

我们期望所有贡献者遵循以下行为准则：

- **尊重**：尊重其他贡献者和用户
- **包容**：欢迎不同背景和经验的贡献者
- **专业**：保持专业的沟通和代码质量
- **协作**：积极协作，共同解决问题
- **诚信**：诚实守信，尊重知识产权

## 📞 联系我们

- **GitHub Issues**：[https://github.com/Wayhhow/survey-map/issues](https://github.com/Wayhhow/survey-map/issues)
- **项目维护者**：[Wayhhow](https://github.com/Wayhhow)

---

感谢你的贡献！每一个贡献都对项目的发展至关重要。

![贡献者](https://img.shields.io/github/contributors/Wayhhow/survey-map?style=flat-square)
