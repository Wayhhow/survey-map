# Errors

Command failures and integration errors.

---

## [ERR-20260515-001] PowerShell 不支持 && 链式命令

**Logged**: 2026-05-15T00:00:00Z
**Priority**: low
**Status**: wont_fix
**Area**: infra

### Summary
PowerShell 5（Windows PowerShell 5.x）不支持 `&&` 链式命令运算符

### Error
```
标记"&&"不是此版本中的有效语句分隔符。
```

### Context
在 Windows 环境下使用 PowerShell 5 执行 `wc -l file1 && wc -l file2` 时失败。`&&` 是 PowerShell 7+（pwsh）才支持的语法。

### Suggested Fix
在 PowerShell 5 环境下使用 `;` 分隔符（顺序执行，不检查前一个命令退出码）或拆分为两条命令。在 PowerShell 7+ 环境下直接使用 `&&`。

### Metadata
- Reproducible: yes
- Environment: Windows + PowerShell 5

---

## [ERR-20260515-002] git push 无 upstream branch

**Logged**: 2026-05-15T00:00:00Z
**Priority**: low
**Status**: resolved
**Area**: infra

### Summary
首次 push 时本地分支无对应的 upstream remote 分支

### Error
```
fatal: The current branch main has no upstream branch.
```

### Context
本地新建的仓库首次 push 到 GitHub，需要用 `git push --set-upstream origin main` 建立追踪关系。

### Suggested Fix
首次 push 使用 `git push --set-upstream origin <branch>`。后续直接 `git push` 即可。

### Metadata
- Reproducible: yes
- First-Seen: 2026-05-15

---
