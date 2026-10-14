import { images, widthsFor, webpPath } from "../data/images";

// Serves the WebP copies from scripts/optimize-images.js, letting the browser
// pick the smallest one that fits, with the original JPEG as a fallback.
// `sizes` tells the browser how wide the photo will be drawn.
function Photo({ file, sizes = "100vw", className, ...imgProps }) {
	const { w, h, alt } = images[file];
	const srcSet = widthsFor(file)
		.map((width) => `${webpPath(file, width)} ${width}w`)
		.join(", ");

	return (
		<picture>
			<source type="image/webp" srcSet={srcSet} sizes={sizes} />
			<img
				src={`/images/portfolio/${file}`}
				alt={alt}
				width={w}
				height={h}
				className={className}
				{...imgProps}
			/>
		</picture>
	);
}

export default Photo;
