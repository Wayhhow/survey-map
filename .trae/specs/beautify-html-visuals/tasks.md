# Tasks

- [x] Task 1: 字体系统与层级优化
  - [x] SubTask 1.1: 调整 #title 字号为 20px，优化 letter-spacing 和 text-shadow
  - [x] SubTask 1.2: 调整 stats h3 字号为 18px，添加底部装饰边框
  - [x] SubTask 1.3: 调整 modal-header h2 字号为 22px，增加渐变文字效果
  - [x] SubTask 1.4: 统一正文行高为 1.7，优化辅助文本颜色对比度

- [x] Task 2: 显示效果增强（阴影、渐变、动画）
  - [x] SubTask 2.1: 为 #title 添加彩虹渐变底边和 hover 光泽效果
  - [x] SubTask 2.2: 为 #stats 添加顶部装饰条和左侧渐变边框
  - [x] SubTask 2.3: 为所有玻璃态容器添加内发光效果（inset shadow）
  - [x] SubTask 2.4: 优化按钮渐变角度和 hover 阴影扩散
  - [x] SubTask 2.5: 统一 transition 时序函数为 cubic-bezier(0.4, 0, 0.2, 1)
  - [x] SubTask 2.6: 添加 staggered 入场动画延迟

- [x] Task 3: 边框与容器样式优化
  - [x] SubTask 3.1: 统一容器圆角（title/stats 16px, modal 20px）
  - [x] SubTask 3.2: 优化所有容器边框颜色和透明度
  - [x] SubTask 3.3: 为弹窗内容区添加微妙的网格纹理背景
  - [x] SubTask 3.4: 优化 Leaflet 控件（zoom、attribution）圆角和阴影

- [x] Task 4: 布局与位置调整
  - [x] SubTask 4.1: 将 #stats 宽度增至 240px，调整底部间距为 20px
  - [x] SubTask 4.2: 将 #github-link 改为水平布局（图标与文字并排）
  - [x] SubTask 4.3: 为 type-stat-item 添加水平进度条背景
  - [x] SubTask 4.4: 优化 Leaflet popup 容器宽度和内边距

- [x] Task 5: 组件间距与留白优化
  - [x] SubTask 5.1: 增加 .modal-body 内边距至 28px
  - [x] SubTask 5.2: 增加 .welcome-section 间距至 28px，添加分隔线
  - [x] SubTask 5.3: 增加 .guide-grid gap 至 16px，.guide-item 内边距至 14px
  - [x] SubTask 5.4: 统一统计面板各统计项的 margin-bottom 为 10px

- [x] Task 6: 交互反馈增强
  - [x] SubTask 6.1: 为 .type-stat-item 添加 hover 左侧边框滑入动画
  - [x] SubTask 6.2: 增强 #github-link a hover 图标旋转和缩放效果
  - [x] SubTask 6.3: 为 .leaflet-control-zoom a 添加 active 按下状态
  - [x] SubTask 6.4: 为 .close-btn 添加 hover 旋转和圆形高亮背景
  - [x] SubTask 6.5: 为所有链接添加 underline 滑入动画

- [x] Task 7: 响应式与移动端适配
  - [x] SubTask 7.1: 更新移动端 #stats 宽度为 240px
  - [x] SubTask 7.2: 调整移动端 #title 字号为 15px
  - [x] SubTask 7.3: 优化横屏模式下面板间距

- [x] Task 8: 验证与测试
  - [x] SubTask 8.1: 在桌面端验证所有视觉改动
  - [x] SubTask 8.2: 在移动端（<768px）验证响应式效果
  - [x] SubTask 8.3: 检查所有交互状态（hover、active、focus）
  - [x] SubTask 8.4: 确认无功能退化（地图交互、弹窗、统计面板）

# Task Dependencies
- Task 2 依赖 Task 1（字体层级确定后再调整阴影/渐变对比）
- Task 4 依赖 Task 3（容器样式确定后再调整布局）
- Task 6 依赖 Task 2（过渡动画统一后再添加交互反馈）
- Task 7 依赖 Task 4 和 Task 5（布局与间距确定后再适配移动端）
- Task 8 依赖所有前置任务
