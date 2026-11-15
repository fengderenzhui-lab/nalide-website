# NALIDE 品牌官网

nalide.com 品牌站的前端源码，线上地址：https://nalide.com

技术栈：React 19 + Vite 6 + TypeScript + Tailwind CSS v4 + Lenis。纯静态站点，无后端依赖（`public/csp-report.php` 是 CSP 报告接收端点，部署在源站 PHP 环境）。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
node scripts/prerender.mjs
```

构建后必须再跑预渲染脚本，把渲染后的全文写回 `dist/index.html`。漏了这一步，页面在浏览器里打开没问题，但搜索引擎和 AI 抓取器读到的会是空壳 HTML。

## 目录

- `src/` — 页面源码，文案集中在 `src/content.ts`
- `public/` — 静态文件：政策页（`privacy/`、`terms/`、`security/`）、自托管字体（`fonts/`）、`robots.txt`、`sitemap.xml`、`llms.txt`、`.well-known/security.txt`
- `scripts/` — 预渲染脚本

## 授权

- 本仓库的**代码**以 [MIT License](LICENSE) 授权。
- **不属于上述授权的范围**：NALIDE 名称与 Logo 等品牌标识、`public/media/` 与 `public/layers/` 中的图片、站点文案。这些内容未经许可不得用于冒充 NALIDE 或作商业宣传。
- `public/fonts/` 中的字体（Manrope、Michroma、IBM Plex Mono）各自以 SIL Open Font License 1.1 授权，许可全文与字体文件放在同一目录。

## 安全问题

发现安全问题请按 https://nalide.com/security/ 的披露政策报告，不要直接开公开 Issue。
