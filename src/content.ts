// SPDX-FileCopyrightText: 2026 NALIDE
// SPDX-License-Identifier: MIT

/**
 * NALIDE 品牌主站文案。主站只讲品牌：生态、路径、原则；
 * 产品细节与购买在各产品子站（如 idc.nalide.com、pass.nalide.com）。
 */

export const brand = {
  name: 'Nalide',
  wordmark: 'NALIDE',
  email: 'contact@nalide.com',
};

export const nav = [
  {label: '生态', href: '#log'},
  {label: '路径', href: '#trajectory'},
  {label: '原则', href: '#missions'},
  {label: '公告', href: '/announcements/'},
  {label: '关于', href: '/about/'},
  {label: '联系', href: '#reserve'},
];

export const hero = {
  title: 'NALIDE',
  kicker: '一个认真做基础设施的品牌',
  site: 'Hong Kong · 22.32°N 114.17°E',
  closingLabel: '我们做产品的标准',
  closingLines: ['安全优先', '持续维护', '长期主义'],
};

export const intro = {
  eyebrow: '品牌生态',
  heading: '先把一件事做对，再做下一件。',
  body: 'NALIDE 从一套给经销商用的域名/SSL 业务系统出发，慢慢长成一组围绕安全与基础设施的产品。这是它们的全家福。',
};

export const log = [
  {tag: 'IDC', title: '业务系统', body: '给经销商的域名与 SSL 业务系统：计费、开通、续费都在一个后台，安全优先，持续维护。', image: '/media/cards/m1-launch.webp'},
  {tag: 'PASS', title: 'Nalipass', body: '自研密码管理器，核心开源可审计，把安全带到个人。', image: '/media/cards/m2-orbit.webp'},
  {tag: 'CERT', title: '证书管理', body: '证书的签发、续期与巡检，一处看全，不再靠人记日子。', image: '/media/cards/m3-base.webp'},
  {tag: 'TOOLS', title: '基础设施工具', body: 'IP 诊断与网络小工具，顺手、免费、打开就能用。', image: '/media/cards/m4-walk.webp'},
];

/** 品牌路径的四段，依次描出。 */
export const trajectory = {
  eyebrow: '品牌路径',
  heading: '一条线，把产品连成生态。',
  legs: [
    {day: '起点', title: '业务系统', body: '从经销商最头疼的计费与开通开始，先把系统做稳、做安全。'},
    {day: '延展', title: '工具矩阵', body: '证书、IP 诊断这些每天都要用的小工具，一个一个补齐。'},
    {day: '当下', title: '密码管理', body: 'Nalipass 把「安全」从商家后台，带到每个人的日常里。'},
    {day: '远方', title: '品牌生态', body: '主站只讲品牌，产品各归其位，慢慢长成一片。'},
  ],
};

export const missions = {
  eyebrow: '品牌原则',
  heading: '我们信的三件事。',
  note: '说到做到，比说得好听重要。',
  items: [
    {name: '安全优先', days: 1, unit: '原则', lines: ['授权校验不打折', '自动巡逻与复核', '出了问题先处理，再谈营销'], cta: '咨询业务系统'},
    {name: '长期维护', days: 2, unit: '原则', lines: ['持续更新，不跑路', '老客户和新客户同等对待', '文档与支持跟得上'], cta: '咨询 Nalipass', featured: true},
    {name: '克制专注', days: 3, unit: '原则', lines: ['只做想清楚的产品', '不堆没用的功能', '不拿用户数据做交易'], cta: '咨询工具线'},
  ],
};

/** 公告：首页只放最近三条，完整列表在 /announcements/（静态页，两处手动保持一致）。 */
export const newsSection = {
  eyebrow: '公告',
  heading: '最近发生的事。',
  note: '只报重要的，不吵。',
  allLabel: '查看全部公告',
};

export const announcements = [
  {date: '2026-11-16', tag: '开源', title: '品牌站前端开源', body: '前端代码已在 GitHub 公开（MIT 许可），v1.0.0 同步发布。', href: '/announcements/2026-11-16-open-source/'},
  {date: '2026-11-15', tag: '上线', title: '品牌站全新上线', body: '主站只讲品牌，产品陆续转入各自子站。', href: '/announcements/2026-11-15-site-launch/'},
  {date: '2026-11-15', tag: '安全', title: '漏洞披露政策升级', body: '披露政策对齐 disclose.io 完全安全港条款，善意研究有明确承诺。', href: '/announcements/2026-11-15-disclosure-upgrade/'},
];

/** 关于小段：首页公告区下方的一段品牌简介，全文在 /about/，故事在 /story/。 */
export const aboutTeaser = {
  eyebrow: '关于',
  body: 'NALIDE 是一个专注于安全与基础设施的软件品牌：IDC 业务系统打头阵，密码管理、证书与网络工具随后跟上。所有产品同一套标准——安全放在第一位，承诺长期维护。故事从这里说起。',
  cta: '了解 NALIDE',
  storyCta: '读我们的故事',
  storyHref: '/story/',
};

/** 页脚友情链接：自家站点互链（中小微站页脚同样链回本站）。 */
export const friends = [
  {label: '中小微企业交流平台', href: 'https://www.zhongxiaowei.cn'},
  {label: 'windblade.top', href: 'https://windblade.top'},
];

/** 页脚政策链接：隐私与协议（静态页，源码在 public/ 下）。 */
export const policies = [
  {label: '隐私政策', href: '/privacy/'},
  {label: '用户协议', href: '/terms/'},
];

/** 页脚关于组：自家内容页（公告、简介、故事），排在友情链接之前。 */
export const aboutLinks = [
  {label: '公告', href: '/announcements/'},
  {label: '品牌简介', href: '/about/'},
  {label: '我们的故事', href: '/story/'},
  {label: '加入我们', href: '/careers/'},
  {label: '品牌素材', href: '/brand/'},
  {label: 'GitHub 开源仓库', href: 'https://github.com/fengderenzhui-lab/nalide-website'},
  {label: 'X（@2026nalide）', href: 'https://x.com/2026nalide'},
];

/** 页脚安全组：披露政策、security.txt 直链与报告入口（独立成组）。 */
export const securityLinks = [
  {label: '漏洞披露政策', href: '/security/'},
  {label: 'security.txt', href: '/.well-known/security.txt'},
  {label: '报告漏洞', href: 'mailto:postmaster@nalide.com'},
];

/** 服务状态页（站外托管：UptimeRobot 公开状态页；自定义域名是其付费功能，免费版先用官方地址，升级后换回 status.nalide.com）。 */
export const statusPage = {label: '服务状态', href: 'https://stats.uptimerobot.com/4ZkFuWJ2ri'};

/** 绿色托管核验（Green Web Foundation 数据集比对，认的是边缘托管商 Cloudflare；徽章图为官方图、本地托管，链接指向实时核验页；状态由每周漂移检查复核）。 */
export const greenHosting = {
  href: 'https://www.thegreenwebfoundation.org/green-web-check/?url=nalide.com',
  src: '/badges/green-hosting.png',
  alt: 'This website runs on green hosting — verified by The Green Web Foundation',
};

/** Internet.nl 网站测试满分徽章（2026-11-16 实测 100%、进其名人堂；徽章图为官方图、本地托管，链接指向该次测试报告；按其徽章条款，分数保持 100% 期间可用）。 */
export const internetnl = {
  href: 'https://internet.nl/site/nalide.com/4413891/',
  src: '/badges/internetnl-100.svg',
  alt: '100% score in the Internet.nl website test — nalide.com',
};

/** 页脚署名与站点信息：自托管字体均为 SIL OFL 1.1，许可全文随站点 /fonts/ 目录发布。 */
export const colophon = {
  typefaces: '字体 Manrope · Michroma · IBM Plex Mono — SIL OFL 1.1',
  updated: '2026-11-16',
};

export const reserve = {
  eyebrow: '联系',
  heading: '和 NALIDE 聊聊。',
  body: '产品合作、经销咨询，或者只是打个招呼。留个邮箱，我们会回。',
  options: ['IDC 业务系统', 'Nalipass', '证书与工具', '其他合作'],
};
