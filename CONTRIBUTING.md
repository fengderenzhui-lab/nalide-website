# 贡献指南

欢迎提交 Issue 和 Pull Request。仓库文档以中文为主，英文的 Issue 和评论同样欢迎（English issues and comments are welcome）。

## 提 Issue

- Bug 和功能建议都开在 GitHub Issues 里，写清复现步骤或预期效果。
- **安全问题不要开公开 Issue**，请按 https://nalide.com/security/ 的披露政策通过邮件报告，或使用 GitHub 的私密漏洞报告（仓库 Security 页的 "Report a vulnerability"）。

## 提交流程

1. Fork 本仓库，从 `main` 切出你的分支。
2. 改动后本地跑通全部检查（见下）。
3. 开 Pull Request，说明改了什么、为什么改。维护者评审后合入。

## 接受标准

提交前必须全部通过：

```bash
npm run lint        # TypeScript 严格模式类型检查
npx eslint .        # 静态分析
npm test            # 构建 + 预渲染 + 冒烟测试
```

另外几条约定：

- **新功能要带测试**：新增主要功能时，同步在 `tests/` 里补上或更新冒烟测试，覆盖新功能的可见行为。
- 文案改动只改 `src/content.ts`，不要把文案散写进组件。
- 涉及 `public/` 下政策页（隐私、协议、披露政策）的改动，PR 里要单独说明理由。
- 品牌标识、Logo、图片与站点文案不在 MIT 授权范围内（见 README 的授权一节），这类素材不接受替换性贡献。

## 开发

```bash
npm install
npm run dev     # 本地开发服务器
npm run build   # 构建
node scripts/prerender.mjs   # 构建后预渲染，发布流程的一部分
```
