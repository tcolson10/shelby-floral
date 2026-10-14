// Creates WebP copies of every photo listed in src/data/images.js, at the
// widths the site requests (see widthsFor). Run with `npm run optimize-images`
// after adding a photo. Existing copies are skipped, so it is quick to rerun.

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { images, widthsFor, webpPath } = require("../src/data/images");

const publicDir = path.join(__dirname, "..", "public");
const outDir = path.join(publicDir, "images", "optimized");
fs.mkdirSync(outDir, { recursive: true });

(async () => {
	let made = 0;
	for (const file of Object.keys(images)) {
		const src = path.join(publicDir, "images", "portfolio", file);
		for (const width of widthsFor(file)) {
			const out = path.join(publicDir, webpPath(file, width));
			if (fs.existsSync(out)) continue;
			await sharp(src).rotate().resize({ width }).webp({ quality: 78 }).toFile(out);
			made++;
		}
	}
	console.log(`[optimize-images] wrote ${made} file(s) to ${outDir}`);
})();
