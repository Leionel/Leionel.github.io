# 部署说明（GitHub Pages）

本项目是基于 Vite + React 的静态站点，部署目标为：`https://leionel.github.io/`（仓库：`Leionel/Leionel.github.io`）。

当前采用 **GitHub Actions 自动构建并发布到 GitHub Pages** 的方式：只要 push 到 `main` 分支，就会自动构建 `dist/` 并发布。

---

## 1. 一次性初始化（只做一次）

### 1.1 初始化 Git 仓库并提交首版代码

在项目根目录（例如：`D:\personalweb`）执行：

```bash
git init
git add .
git commit -m "Initial commit"
```

### 1.2 绑定远程仓库

```bash
git remote add origin https://github.com/Leionel/Leionel.github.io.git
```

如果之前已经配置过 remote，可用以下命令检查：

```bash
git remote -v
```

### 1.3 推送 main 分支

```bash
git branch -M main
git push -u origin main
```

---

## 2. 日常更新发布流程（每次改完代码都这样做）

### 2.1 本地验证（建议）

```bash
npm run build
```

### 2.2 提交并推送到 GitHub

```bash
git status --short
git add .
git commit -m "chore: update"
git push origin main
```

推送成功后，GitHub 会自动触发 Actions 工作流进行构建与发布。

---

## 3. GitHub Pages 设置（必须正确配置一次）

进入仓库页面：

1. `Settings` → `Pages`
2. `Build and deployment` → `Source` 选择 **GitHub Actions**

之后每次 push 到 `main`，都会自动部署到 `https://leionel.github.io/`。

---

## 4. 如何确认已经发布成功

### 4.1 在 GitHub 上查看 Actions 状态

仓库 → `Actions`：

- 找到工作流 **Deploy Pages**
- 最新一次运行需要是绿色（成功）

### 4.2 访问线上地址

打开：

- `https://leionel.github.io/`

首次部署或刚部署完成时，可能会有缓存延迟：

- 等待 1–3 分钟
- 必要时强制刷新（Windows：`Ctrl + F5`）

---

## 5. 常见问题与排查

### 5.1 网站白屏/打不开

典型原因是 GitHub Pages 没有拿到可运行的构建产物（`dist/`），例如把源码分支当成静态文件发布。

当前项目使用 GitHub Actions 发布，只需要确保：

- `Settings → Pages → Source` 为 **GitHub Actions**
- `Actions` 里最新一次 **Deploy Pages** 成功

### 5.2 `npm run deploy` / `gh-pages` 推送失败（node_modules ignored）

本项目已切换为 GitHub Actions 部署，不再依赖本地 `gh-pages` 推送。

如果你仍想本地用 `gh-pages`，容易踩到以下坑：

- 发布命令没有只发布 `dist`，而是把项目根目录当成发布内容，导致试图 `git add node_modules` 从而失败
- Git Bash 里不要用反引号包裹 URL（反引号会被当成命令替换）

推荐做法：不要用本地 `gh-pages`，直接使用本项目已配置好的 GitHub Actions。

### 5.3 改了代码但 GitHub 上没更新

优先确认你 push 的是正确分支（应为 `main`）：

```bash
git branch -vv
git log --oneline -n 5
```

如果你不小心在其它分支（例如 `gh-pages`）开发，`main` 没同步改动，那么 push `main` 不会更新线上效果。

正确做法：

- 切换回 `main`
- 把改动合并/同步到 `main`
- 再 push `main`

---

## 6. 本项目的部署工作流文件

GitHub Actions 工作流位于：

- `.github/workflows/deploy-pages.yml`

其职责是：

1. checkout 代码
2. `npm ci`
3. `npm run build` 生成 `dist/`
4. 将 `dist/` 作为 Pages artifact 发布

