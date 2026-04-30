# 网页视觉美化优化 Spec

## Why
当前网页虽然功能完整，但视觉呈现仍有提升空间：字体层级不够清晰、部分组件缺乏视觉深度、交互反馈不够细腻。通过系统性的视觉优化，可以在不改变核心功能的前提下，显著提升页面的专业感和用户体验。

## What Changes
- **字体系统优化**：调整标题、正文、辅助文本的字号与字重，建立更清晰的视觉层级
- **显示效果增强**：为关键组件添加微妙的阴影、渐变和过渡动画，提升视觉质感
- **边框与容器优化**：统一容器圆角、边框样式，采用更现代的玻璃态/卡片化设计
- **布局与位置调整**：优化统计面板、标题、GitHub链接的位置与尺寸，改善空间分配
- **组件间距调整**：统一各元素的内边距、外边距，确保留白合理舒适
- **交互反馈增强**：为按钮、链接、卡片添加更细腻的 hover/active 状态动画

## Impact
- Affected specs: 网页视觉呈现、用户体验、交互反馈
- Affected code: `css/style.css`（主要）、`index.html`（辅助类名调整）

## ADDED Requirements

### Requirement: 字体层级系统
The system SHALL 建立清晰的字体层级系统，确保信息可读性。

#### Scenario: 标题与正文层级
- **WHEN** 用户浏览页面
- **THEN** 标题(#title)字号从 18px 提升至 20px，字重保持 700，增加微妙的文字阴影
- **AND** 统计面板标题(stats h3)字号从 16px 提升至 18px，增加底部边框装饰
- **AND** 弹窗标题(modal-header h2)字号从 18px 提升至 22px，增加渐变文字效果
- **AND** 正文与辅助文本保持 14px/12px，但行高从 1.6 提升至 1.7，增加阅读舒适度

### Requirement: 显示效果增强
The system SHALL 为关键组件添加阴影、渐变和过渡动画，提升视觉深度。

#### Scenario: 组件阴影与渐变
- **WHEN** 页面加载完成
- **THEN** #title 背景增加微妙的彩虹渐变底边（从 primary 到 secondary 到暖黄）
- **AND** #stats 增加左侧彩色边框指示器（从 success 渐变为 primary）
- **AND** 所有玻璃态容器（backdrop-filter）增加内发光效果（inset box-shadow）
- **AND** 按钮(primary-btn)背景渐变从 135deg 调整为 90deg，增加光泽感
- **AND** 卡片/面板 hover 时增加 translateY(-3px) 和更明显的阴影扩散

#### Scenario: 过渡动画优化
- **WHEN** 用户与组件交互
- **THEN** 所有 transition 统一使用 cubic-bezier(0.4, 0, 0.2, 1) 替代默认 ease
- **AND** hover 状态变换时间从 0.3s 调整为 0.25s，响应更敏捷
- **AND** 添加页面加载时的 staggered 入场动画（标题 → 统计面板 → GitHub链接依次出现）

### Requirement: 边框与容器样式
The system SHALL 优化容器的边框、圆角和背景，呈现更现代的视觉效果。

#### Scenario: 容器圆角与边框
- **WHEN** 用户查看任何 UI 面板
- **THEN** #title 圆角从 14px 提升至 16px
- **AND** #stats 圆角从 14px 提升至 16px，增加顶部装饰条
- **AND** .modal-content 圆角从 18px 提升至 20px
- **AND** 所有容器边框统一为 1px solid rgba(255,255,255,0.6)，增加玻璃态质感
- **AND** 弹窗内容区域增加微妙的网格纹理背景（CSS gradient pattern）

### Requirement: 布局与位置优化
The system SHALL 调整关键组件的位置和尺寸，优化页面空间分配。

#### Scenario: 组件位置调整
- **WHEN** 用户在不同尺寸屏幕下浏览
- **THEN** #stats 面板宽度从 220px 增加至 240px，底部间距从 25px 调整为 20px
- **AND** #github-link 调整为水平布局（图标+文字并排），节省垂直空间
- **AND** 统计面板中的 type-stat-item 增加水平进度条式背景，直观显示占比
- **AND** Leaflet zoom 控件增加圆角和阴影，与整体风格统一

### Requirement: 组件间距与留白
The system SHALL 统一并优化各组件的内边距、外边距和间隙。

#### Scenario: 间距系统优化
- **WHEN** 用户查看弹窗或面板
- **THEN** .modal-body 内边距从 24px 增加至 28px
- **AND** .welcome-section 之间的间距从 24px 增加至 28px，并添加 subtle 分隔线
- **AND** .guide-grid 的 gap 从 12px 增加至 16px
- **AND** .guide-item 内边距从 12px 增加至 14px
- **AND** 统计面板中各统计项之间的 margin-bottom 统一为 10px

### Requirement: 交互反馈增强
The system SHALL 为可交互元素添加更细腻的反馈效果。

#### Scenario: Hover/Active 状态
- **WHEN** 用户悬停在可交互元素上
- **THEN** .type-stat-item hover 时增加左侧彩色边框滑入动画
- **AND** #github-link a hover 时图标旋转 10deg 并放大 1.15 倍
- **AND** .leaflet-control-zoom a 增加 active 状态（按下时 scale(0.95)）
- **AND** .close-btn hover 时背景变为圆形高亮，旋转 90deg 动画
- **AND** 所有链接增加 underline 滑入动画（从左侧展开）

## MODIFIED Requirements

### Requirement: 现有动画系统
**原实现**: 动画使用默认 ease 时序函数，入场动画较为简单。
**修改后**: 
- slideDown/slideLeft/slideRight 统一使用 cubic-bezier(0.16, 1, 0.3, 1)（保持）
- 新增 scaleIn 动画用于按钮点击反馈
- 新增 shimmer 动画用于加载状态

### Requirement: 响应式适配
**原实现**: 移动端适配基本可用，但部分间距过于紧凑。
**修改后**:
- 移动端 #stats 面板保持 240px 宽度
- 移动端 #title 字号调整为 15px（原 14px）
- 横屏模式下各面板间距增加 2px

## REMOVED Requirements
无移除需求。所有修改均为增强型优化，不改变现有功能逻辑。
