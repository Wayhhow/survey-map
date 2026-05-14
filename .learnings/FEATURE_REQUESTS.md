# Feature Requests

Capabilities requested by the user.

---

## [FEAT-20260515-001] 移动端与桌面端功能一致性

**Logged**: 2026-05-15T00:00:00Z
**Priority**: high
**Status**: resolved
**Area**: frontend

### Requested Capability
无障碍设施面板的 checkbox 切换功能在桌面端和移动端表现完全一致

### User Context
用户发现移动端无法切换"轮椅可达场所"图层，而桌面端可以。根因是数据加载竞态条件，而非事件监听问题。

### Complexity Estimate
medium

### Suggested Implementation
确保 `listenForAccessibilityData` 的轮询条件使用 `length === types.length`，保证所有数据加载完成后再渲染图层。

### Metadata
- Frequency: first_time
- Related Features: accessibility_layer_toggle

---

## [FEAT-20260515-002] 面板展开/收起交互统一

**Logged**: 2026-05-15T00:00:00Z
**Priority**: medium
**Status**: resolved
**Area**: frontend

### Requested Capability
"线路统计"和"无障碍设施"两个面板的展开/收起交互效果完全一致

### User Context
用户希望两个面板有统一的视觉交互体验，包括玻璃态效果、收起时无分隔线、三角箭头方向语义一致。

### Complexity Estimate
simple

### Suggested Implementation
统一使用 `.collapsed` 类控制收起状态，统一三角箭头方向语义（收起=箭头朝右，展开=箭头朝下）。

### Metadata
- Frequency: first_time

---
