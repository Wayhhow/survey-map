# Learnings

Corrections, insights, and knowledge gaps captured during development.

**Categories**: correction | insight | knowledge_gap | best_practice

---

## [LRN-20260515-001] best_practice

**Logged**: 2026-05-15T00:00:00Z
**Priority**: critical
**Status**: resolved
**Area**: frontend

### Summary
数据轮询就绪判断必须用"全部加载完成"条件，而非"已有数据"

### Details
在多文件顺序异步加载场景中（如 `loadAccessibilityData` 循环加载多个 geojson），用 `Object.keys(data).length > 0` 判断就绪会导致竞态条件——小文件先返回时轮询就触发，但大文件还在下载中，渲染时只处理了部分数据。桌面端网速快两个文件几乎同时到所以没问题，移动端网速慢则暴露此 bug。正确的条件是 `length === types.length`（加载数量等于预期类型数量）。

### Suggested Action
所有涉及"等待多个异步操作完成"的轮询逻辑，一律用"已完成数 === 预期总数"作为就绪条件，而非"已有数 > 0"。

### Metadata
- Source: conversation
- Related Files: js/map.js (listenForAccessibilityData)
- Tags: race_condition, async, polling, mobile
- Pattern-Key: async.poll.complete_condition

---

## [LRN-20260515-002] best_practice

**Logged**: 2026-05-15T00:00:00Z
**Priority**: high
**Status**: resolved
**Area**: frontend

### Summary
不要在同一元素上同时使用直接监听器和委托监听器处理同一类事件

### Details
桌面端 checkbox 的 `change` 事件同时触发了 data.js 中的直接监听器（`addEventListener`）和 map.js 中的委托监听器（`panel.addEventListener('change')`），两次 `toggleAccessibilityLayer` 调用方向相反（勾选时：on→off→无变化）。移动端只有委托监听器生效，直接监听器在某些 Android 浏览器上不可靠。修复：只在 data.js 中保留直接监听器，不额外加委托监听器。

### Suggested Action
处理 checkbox、radio 等表单元素时，统一使用直接监听器（在数据生成时就绑定），不要在父容器上加同类型事件的委托监听器。如需事件委托，只用于"不原生支持事件委托"的场景。

### Metadata
- Source: conversation
- Related Files: js/data.js, js/map.js
- Tags: event_listeners, double_toggle, event_delegation
- Pattern-Key: event.no_double_listener

---

## [LRN-20260515-003] correction

**Logged**: 2026-05-15T00:00:00Z
**Priority**: high
**Status**: resolved
**Area**: frontend

### Summary
CSS 类选择器（.class）不会匹配 id 属性（id="class"）

### Details
将 `.accessibility-list` 误写为收起规则的 CSS 选择器，但 HTML 中该元素使用的是 `id="accessibility-list"`（ID 属性）。类选择器无法匹配 ID 属性，导致收起时列表内容从未被隐藏。修复：将 `.accessibility-list` 改为 `#accessibility-list`。

### Suggested Action
区分 CSS 选择器类型：`.className` 匹配 `class="className"`，`#idName` 匹配 `id="idName"`。代码审查时重点检查选择器与 HTML 属性的对应关系。

### Metadata
- Source: conversation
- Related Files: css/style.css, index.html
- Tags: css_selector, specificity
- Pattern-Key: css.selector_match_check

---

## [LRN-20260515-004] best_practice

**Logged**: 2026-05-15T00:00:00Z
**Priority**: medium
**Status**: resolved
**Area**: frontend

### Summary
两个相似面板需保持完全一致的交互模式时，逐项对比两者的 CSS 规则

### Details
"线路统计"和"无障碍设施"两个面板需要有相同的玻璃态点击效果、收起时隐藏分隔线、展开时显示完整内容。但两者 CSS 规则不一致：线路统计有 `.expanded` 类控制展开，无障碍设施用 `.collapsed` 控制收起；线路统计收起时有 opacity:0.6，无障碍设施没有。统一方案：都使用 `.collapsed` 类，移除 opacity 效果，h3 底部边框和间距在 `.collapsed` 状态下置零。

### Suggested Action
复制粘贴相似的 UI 组件时，逐项对比两者的 CSS 差异，建立统一的设计模式。

### Metadata
- Source: conversation
- Related Files: css/style.css
- Tags: ui_consistency, glassmorphism, panel_design

---

## [LRN-20260515-005] best_practice

**Logged**: 2026-05-15T00:00:00Z
**Priority**: medium
**Status**: resolved
**Area**: frontend

### Summary
三角箭头图标方向应遵循"收起=折叠=箭头朝右，展开=打开=箭头朝下"

### Details
`▼` 旋转 -90° 后变成 `▶`（朝右）。收起状态代表内容被折叠，箭头应指向折叠方向（朝右）；展开状态代表内容向下展开，箭头应指向展开方向（朝下）。因此 rotate(-90deg) 应在 `.collapsed` 状态下设置，而非 `.expanded`。

### Suggested Action
设计展开/收起图标时，先明确：收起=朝右折叠（collapsed），展开=朝下打开（expanded）。

### Metadata
- Source: conversation
- Related Files: css/style.css
- Tags: ui_iconography, toggle_state

---

## [LRN-20260515-006] insight

**Logged**: 2026-05-15T00:00:00Z
**Priority**: medium
**Status**: resolved
**Area**: frontend

### Summary
桌面端和移动端的 checkbox change 事件行为存在差异

### Details
桌面端浏览器对 checkbox change 事件的触发更可靠，直接监听器始终有效。移动端某些 Android 浏览器对 checkbox change 事件的处理不稳定，需要通过 map.js 中的委托监听器作为补充。但加了两层监听器又导致桌面端双触发问题。需要在直接监听器和委托监听器之间做取舍，优先使用直接监听器（数据生成时绑定），但要在父容器上加 change 事件作为兜底。

### Suggested Action
处理跨平台 checkbox 交互时，优先使用直接监听器。如需兼容移动端，不要在 map.js 中额外加同类型的委托监听器（会导致桌面端双触发），而是确保 data.js 中的直接监听器能正确工作。

### Metadata
- Source: conversation
- Related Files: js/data.js, js/map.js
- Tags: mobile_compatibility, checkbox, cross_platform

---

## [LRN-20260515-007] best_practice

**Logged**: 2026-05-15T00:00:00Z
**Priority**: medium
**Status**: resolved
**Area**: frontend

### Summary
修复 bug 时必须先完整追踪"数据加载→状态判断→事件触发→渲染"全链路

### Details
移动端轮椅可达场所不显示的问题，第一次修复误以为是"缺少事件监听器"，添加了 change 委托监听器，结果修好了移动端却破坏了桌面端（双触发）。第二次才找到真正根因：轮询条件 `length > 0` 导致渲染时机过早，`wheelchair_poi` 的图层组从未被创建。根本原因是跳过了数据流分析，直接猜测"事件监听"问题。

### Suggested Action
遇到 UI 行为异常时，按顺序排查：1）数据是否正确加载；2）状态判断条件是否正确；3）事件监听是否正确绑定；4）渲染函数是否被正确调用。不要跳步猜测。

### Metadata
- Source: conversation
- Tags: debugging, data_flow, bug_analysis
- Pattern-Key: debug.trace_full_data_path

---
