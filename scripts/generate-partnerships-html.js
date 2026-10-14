// Runs automatically after `npm run build` (via the "postbuild" script in
// package.json). This is a Create React App project with no server-side
// rendering, so every route shares the same build/index.html — that means
// link-preview crawlers (iMessage, Slack, email clients don't run JS) would
// otherwise see generic site-wide title/description for every page,
// including /partnerships.
//
// This script clones the real build/index.html (keeping its correct,
// content-hashed <script>/<link> tags so the real React app still boots
// normally) and swaps in page-specific <title>/description/Open Graph tags
// for /partnerships only. vercel.json rewrites the exact path "/partnerships"
// to this file. Content values come from src/data/mediaKitData.js — the same
// file the live React page renders from — so there is nothing to keep in
// sync by hand.

const fs = require("fs");
const path = require("path");
const mediaKitData = require("../src/data/mediaKitData");

const SITE_URL = "https://shelbyfloral.com";
const PAGE_URL = `${SITE_URL}/partnerships`;

const buildDir = path.join(__dirname, "..", "build");
const indexPath = path.join(buildDir, "index.html");
const outPath = path.join(buildDir, "partnerships.html");

if (!fs.existsSync(indexPath)) {
	console.error(`[generate-partnerships-html] ${indexPath} not found — run "react-scripts build" first.`);
	process.exit(1);
}

const { title, description, ogImage } = mediaKitData.meta;
const absoluteOgImage = `${SITE_URL}${ogImage}`;

let html = fs.readFileSync(indexPath, "utf8");

html = html.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`);

html = html.replace(
	/<meta name="description" content=".*?"\s*\/?>/s,
	`<meta name="description" content="${description}" />`
);

// Drop the homepage's canonical/Open Graph/Twitter tags so the page-specific
// ones below are the only ones crawlers see.
html = html.replace(/<link rel="canonical"[^>]*>/g, "");
html = html.replace(/<meta (property="og:|name="twitter:)[^>]*>/g, "");

const extraTags = `
    <link rel="canonical" href="${PAGE_URL}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${absoluteOgImage}" />
    <meta property="og:url" content="${PAGE_URL}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${absoluteOgImage}" />
</head>`;

html = html.replace(/<\/head>/, extraTags);

fs.writeFileSync(outPath, html);
console.log(`[generate-partnerships-html] wrote ${outPath}`);
