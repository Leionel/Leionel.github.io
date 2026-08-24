# 笔记格式说明（本文件不会被页面列出）

在 `src/content/notes/` 下新建 `.md` 文件即可发布一篇笔记：

- **文件名**（不含 .md）就是 URL slug，建议 `YYYY-MM-标题短横线.md`；
- 文件名以 `_` 开头的文件不会显示（比如本文件）；
- 头部 frontmatter 可选，支持 `title` / `date` / `direction` 三个字段；
- 正文是标准 Markdown（GFM：表格、代码块、删除线都支持）；
- 按日期倒序排列；列表摘要自动取正文开头。

示例：

```markdown
---
title: 笔记标题
date: 2026-08-25
direction: Agent Harness
---

正文第一段……

## 小标题

- 列表项
```
