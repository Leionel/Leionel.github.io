# 个人网站（Leionel.github.io）

个人作品集网站，基于 Vite + React + TypeScript + Tailwind CSS 构建，部署在 GitHub Pages。

- 在线访问：https://leionel.github.io/
- 仓库地址：https://github.com/Leionel/Leionel.github.io

## 功能

- 首页 / 关于我 / 项目 / 技能 / 奖项 / 联系方式
- 顶部导航栏与移动端菜单
- 中英文切换（导航与页面内容同步切换）
- 简历下载（`public/resume.pdf`）

## 本地开发

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

构建产物：

```bash
npm run build
```

## 部署到 GitHub Pages

本项目使用 GitHub Actions 自动部署：push 到 `main` 后自动构建并发布。

详见部署文档：[DEPLOYMENT.md](file:///d:/personalweb/DEPLOYMENT.md)
