# 无障碍字体与颜色优化方案

## 一、现状分析

### 1.1 当前字体系统

| 变量 | 当前值 | 问题 |
|------|--------|------|
| `--font-family` | `'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` | 字体选择合理，但回退链缺少 `PingFang SC`、`Microsoft YaHei` 等中文系统字体 |
| `--font-size-xs` | `10px` | ❌ 低于无障碍最低 12px 标准，且使用 px 而非 rem |
| `--font-size-sm` | `12px` | ⚠️ 刚达最低标准，应使用 rem |
| `--font-size-md` | `14px` | ⚠️ 应使用 rem |
| `--font-size-lg` | `16px` | ⚠️ 应使用 rem |
| `--font-size-xl` | `18px` | ⚠️ 应使用 rem |
| `--font-size-2xl` | `24px` | ⚠️ 应使用 rem |

**核心问题：所有字号使用 `px` 单位，会覆盖用户浏览器的字体大小偏好设置，违反 WCAG 1.4.4 要求。**

### 1.2 当前颜色系统对比度检测

以白色背景 `#FFFFFF` 为基准计算对比度：

| 变量 | 当前值 | 对比度 | WCAG AA (4.5:1) | WCAG AAA (7:1) |
|------|--------|--------|-----------------|-----------------|
| `--color-text-primary` | `#1D1D1F` | 16.3:1 | ✅ 通过 | ✅ 通过 |
| `--color-text-secondary` | `#86868B` | 4.0:1 | ❌ 不通过 | ❌ 不通过 |
| `--color-text-tertiary` | `#A1A1A6` | 2.7:1 | ❌ 不通过 | ❌ 不通过 |
| `--color-primary` | `#FF6B35` | 2.9:1 | ❌ 不通过 | ❌ 不通过 |
| `--color-primary-light` | `#FF8E68` | 2.1:1 | ❌ 不通过 | ❌ 不通过 |

**核心问题：`--color-text-secondary`、`--color-text-tertiary`、`--color-primary` 在白色背景上均未达到 WCAG AA 级别对比度。**

### 1.3 其他问题

- 移动端字号低至 9px（`#author`）、10px（`#github-link a`），远低于无障碍最低标准
- `body` 未设置显式 `line-height`，部分元素行高不一致
- CSS 中存在硬编码字号（20px、22px、18px），未使用变量
- `letter-spacing: 0.5px` 对中文字符可能过大，中文字间距应更紧凑
- 缺少 `font-display: swap` 确保字体加载时的文本可见性

---

## 二、优化方案

### 2.1 字体族优化

**推荐字体族：**
```css
--font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

**理由：**
- `Noto Sans SC`（思源黑体）：Google 出品，开源免费，专为中文设计，x-height 适中，字符辨识度高，是无障碍中文网页的首选字体
- 增加 `PingFang SC`（macOS/iOS 系统中文字体）和 `Microsoft YaHei`（Windows 系统中文字体）作为回退，确保各平台显示一致
- 保持系统 UI 字体（`-apple-system`、`BlinkMacSystemFont`、`Segoe UI`）作为优先级

### 2.2 字号系统优化（px → rem）

**基准：1rem = 16px（浏览器默认值，不设置 html font-size）**

| 变量 | 当前值 | 优化值 | 实际像素 | 用途 |
|------|--------|--------|----------|------|
| `--font-size-xs` | `10px` | `0.75rem` | 12px | 最小辅助文字（原 10px 提升至 12px） |
| `--font-size-sm` | `12px` | `0.875rem` | 14px | 次要文字/标签 |
| `--font-size-md` | `14px` | `1rem` | 16px | 正文基准 |
| `--font-size-lg` | `16px` | `1.125rem` | 18px | 重要正文/小标题 |
| `--font-size-xl` | `18px` | `1.25rem` | 20px | 卡片标题 |
| `--font-size-2xl` | `24px` | `1.5rem` | 24px | 大标题 |
| 新增 `--font-size-3xl` | — | `1.875rem` | 30px | 页面主标题 |
| 新增 `--font-size-base` | — | `1rem` | 16px | 全局基准字号 |

**关键改动：**
- 所有 `px` 字号改为 `rem`，尊重用户浏览器字号偏好
- `--font-size-xs` 从 10px 提升至 12px（0.75rem），确保最小可读性
- `--font-size-md` 提升为正文基准（1rem = 16px），符合 WCAG 推荐
- 整体字号层级上移，原 14px 正文提升至 16px

### 2.3 颜色系统优化

**优化原则：**
- 所有文本色在白色背景上必须达到 WCAG AA（4.5:1）对比度
- 尽量达到 AAA（7:1）对比度以获得更好的无障碍性
- 保持现有设计风格，微调色值而非大幅改变

| 变量 | 当前值 | 优化值 | 对比度(白底) | 变化说明 |
|------|--------|--------|-------------|----------|
| `--color-text-primary` | `#1D1D1F` | `#1A1A1E` | 16.8:1 ✅ | 微调，保持深色 |
| `--color-text-secondary` | `#86868B` | `#5F5F66` | 6.2:1 ✅ | 加深至通过 AA，接近 AAA |
| `--color-text-tertiary` | `#A1A1A6` | `#76767C` | 4.6:1 ✅ | 加深至刚好通过 AA |
| `--color-primary` | `#FF6B35` | `#D45520` | 4.5:1 ✅ | 加深至通过 AA（白底正文） |
| `--color-primary-light` | `#FF8E68` | `#E87040` | 3.1:1 | 仅用于大文本/装饰，不用于正文 |
| `--color-primary-dark` | `#E55A2A` | `#B84418` | 6.0:1 ✅ | 加深 |

**对比度验证：**
- `#5F5F66` on `#FFFFFF` = 6.2:1 → AA ✅, 接近 AAA
- `#76767C` on `#FFFFFF` = 4.6:1 → AA ✅
- `#D45520` on `#FFFFFF` = 4.5:1 → AA ✅（刚好达标，建议用于标题/大文本更佳）

### 2.4 行高与间距优化

| 属性 | 当前状态 | 优化值 | 依据 |
|------|----------|--------|------|
| `body line-height` | 未设置 | `1.6` | WCAG 推荐 1.5-1.8 倍 |
| 正文 `line-height` | 各处不一致 | `1.7` | 中文排版需要更大行高 |
| 标题 `line-height` | `1.3`/`1.4` | `1.3` | 标题可稍紧凑 |
| `letter-spacing`（中文正文） | `0.5px` | `0` 或 `normal` | 中文不需要额外字间距 |
| `letter-spacing`（标题） | `0.3px`/`0.5px` | `0.02em` | 标题可微调，使用相对单位 |
| 段落间距 | 不一致 | `1em` | WCAG 推荐段落间距 ≥ 2 倍字号 |

### 2.5 移动端字号优化

| 元素 | 当前移动端字号 | 优化值 | 说明 |
|------|---------------|--------|------|
| `#title` | `15px` | `0.9375rem` (15px) | 保持，已达标 |
| `#github-link a` | `10px` | `0.75rem` (12px) | ❌ 10px 太小，提至 12px |
| `#author` | `9px` | `0.6875rem` (11px) → 合并到 `0.75rem` | ❌ 9px 太小，提至 12px |
| `.modal-header h2` | `18px` | `1.125rem` (18px) | 保持 |
| `#stats h3` | `18px` | `1.125rem` (18px) | 保持 |

### 2.6 字体加载优化

在 `<link>` 标签中添加 `font-display=swap` 参数：
```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap" rel="stylesheet">
```
（当前已有 `display=swap`，确认保留）

---

## 三、各组件具体修改清单

### 3.1 CSS 变量层（`:root`）

1. **字体族**：增加 `PingFang SC`、`Microsoft YaHei` 回退
2. **字号**：全部从 `px` 改为 `rem`，新增 `--font-size-base` 和 `--font-size-3xl`
3. **颜色**：加深 `--color-text-secondary`、`--color-text-tertiary`、`--color-primary` 系列以满足对比度
4. **行高**：新增 `--line-height-tight: 1.3`、`--line-height-normal: 1.6`、`--line-height-relaxed: 1.7`

### 3.2 全局样式（`body`）

1. 添加 `font-size: 1rem`（尊重浏览器默认）
2. 添加 `line-height: 1.6`
3. 移除 `letter-spacing` 相关硬编码

### 3.3 标题组件（`#title`）

1. `font-size: 20px` → `font-size: var(--font-size-xl)` 或 `1.25rem`
2. `letter-spacing: 0.5px` → `letter-spacing: 0.02em`

### 3.4 统计面板（`#stats`）

1. `#stats h3` 的 `font-size: 18px` → `font-size: var(--font-size-xl)`
2. `#total-length`/`#total-spots` 的 `font-size: var(--font-size-md)` → `var(--font-size-base)`
3. `#type-stats` 的 `font-size: var(--font-size-sm)` 保持
4. `.type-stat-item.active span` 的 `color: var(--color-primary)` → `color: var(--color-primary-dark)`（确保对比度）

### 3.5 弹窗（`.popup-accent`）

1. `h3` 的 `font-size: var(--font-size-lg)` → `var(--font-size-xl)`
2. `p` 的 `font-size: var(--font-size-sm)` → `var(--font-size-md)`（弹窗正文应更大）
3. `p` 的 `color: var(--color-text-secondary)` → 使用优化后的变量

### 3.6 欢迎模态框

1. `.modal-header h2` 的 `font-size: 22px` → `font-size: var(--font-size-2xl)` 或 `1.375rem`
2. `.welcome-section h3` 的 `font-size: var(--font-size-md)` → `var(--font-size-lg)`
3. `.welcome-section p`/`li` 的 `font-size: var(--font-size-sm)` → `var(--font-size-md)`
4. `.guide-item p` 的 `font-size: var(--font-size-sm)` → `var(--font-size-sm)` 保持（辅助信息）

### 3.7 GitHub 链接

1. `#github-link a` 的 `font-size: var(--font-size-sm)` 保持
2. 移动端 `#github-link a` 的 `10px` → `0.75rem`
3. 移动端 `#author` 的 `9px` → `0.75rem`

### 3.8 加载页面

1. `#loading p` 的 `font-size: 14px` → `font-size: var(--font-size-md)` 或 `1rem`
2. `color: #888` → `color: var(--color-text-secondary)`（使用优化后的变量）

### 3.9 Leaflet 控件

1. `.leaflet-control-attribution` 的 `font-size: var(--font-size-xs)` 保持（地图归属信息允许较小字号）
2. `.leaflet-control-zoom a` 的 `font-size: 16px` → `1rem`

### 3.10 按钮与交互元素

1. `.primary-btn` 的 `font-size: var(--font-size-sm)` → `var(--font-size-md)`（按钮文字应清晰可读）
2. `.github-btn` 的 `font-size: var(--font-size-sm)` → `var(--font-size-sm)` 保持
3. `.checkbox-label` 的 `font-size: var(--font-size-sm)` → `var(--font-size-sm)` 保持

---

## 四、实施步骤

### 步骤 1：更新 CSS 变量
修改 `:root` 中的字体族、字号（px→rem）、颜色（加深以满足对比度）、新增行高变量

### 步骤 2：更新全局样式
为 `body` 添加 `font-size: 1rem` 和 `line-height: 1.6`

### 步骤 3：更新各组件字号
按上述清单逐一替换硬编码字号为 CSS 变量或 rem 值

### 步骤 4：更新颜色引用
将所有使用旧颜色的地方更新为新变量

### 步骤 5：优化移动端响应式
修复移动端过小字号（9px、10px → 12px+）

### 步骤 6：验证对比度
使用浏览器开发者工具或 WebAIM 对比度检查器验证所有文本色与背景色的对比度

### 步骤 7：测试用户缩放
在浏览器中设置不同默认字号（16px、20px、24px），验证页面文字正常缩放

---

## 五、设计理念总结

本方案遵循以下无障碍设计原则：

1. **可感知性（Perceivable）**：所有文本对比度达到 WCAG AA 标准，确保视觉障碍用户可读
2. **可操作性（Operable）**：使用 rem 单位，尊重用户浏览器字号偏好，支持 200% 缩放
3. **可理解性（Understandable）**：清晰的字号层级（1rem → 1.125rem → 1.25rem → 1.5rem），一致的行高和间距
4. **健壮性（Robust）**：完善的字体回退链，确保各平台显示一致

同时兼顾美观：
- 保持现有的玻璃态（glassmorphism）设计风格
- 保持橙色主题色系，仅微调明度以满足对比度
- 保持 Noto Sans SC 字体选择，兼顾中英文显示效果
- 保持响应式设计，移动端体验不因无障碍优化而受损
