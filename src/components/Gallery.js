import { useEffect, useState } from "react";
import Photo from "./Photo";
import Lightbox from "./Lightbox";
import { images } from "../data/images";

// 3 columns on desktop, 2 below 900px (matches the .masonry-* breakpoints).
function useColumnCount() {
	const query = "(max-width: 900px)";
	const [narrow, setNarrow] = useState(() => window.matchMedia(query).matches);
	useEffect(() => {
		const mql = window.matchMedia(query);
		const onChange = (e) => setNarrow(e.matches);
		mql.addEventListener("change", onChange);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return narrow ? 2 : 3;
}

// The first `orderedCount` photos fill complete rows round-robin (photo 1 in
// column 1, 2 in column 2, …) so they read left to right in list order. Any
// photo left over for an unfinished row, and everything after, goes in the
// currently shortest column to fill gaps and keep the columns even.
function toColumns(files, count, orderedCount) {
	const columns = Array.from({ length: count }, () => ({ height: 0, items: [] }));
	const fullRows = Math.floor(orderedCount / count) * count;
	files.forEach((file, index) => {
		const column =
			index < fullRows
				? columns[index % count]
				: columns.reduce((a, b) => (b.height < a.height ? b : a));
		const { w, h } = images[file];
		column.items.push({ file, index });
		column.height += h / w;
	});
	// Even out the bottom edge: every column is scaled to the average height,
	// so each photo is cropped (or extended) by only a few percent instead of
	// one column ending a whole photo short.
	const target = columns.reduce((sum, c) => sum + c.height, 0) / count;
	return columns.map((c) => {
		const scale = c.height ? target / c.height : 1;
		return c.items.map((item) => ({ ...item, scale }));
	});
}

// Masonry photo grid that opens a full-screen viewer on click. Shared by the
// homepage preview and the full portfolio page.
function Gallery({ files, eagerCount = 6, orderedCount = files.length }) {
	const [lightboxIndex, setLightboxIndex] = useState(null);
	const columnCount = useColumnCount();

	return (
		<>
			<div className="masonry-grid">
				{toColumns(files, columnCount, orderedCount).map((column, c) => (
					<div className="masonry-column" key={c}>
						{column.map(({ file, index, scale }) => (
							<button
								type="button"
								className="masonry-item"
								style={{ aspectRatio: `${images[file].w} / ${images[file].h * scale}` }}
								key={file}
								onClick={() => setLightboxIndex(index)}
								aria-label="View larger photo"
							>
								<Photo
									file={file}
									sizes="(max-width: 900px) 50vw, 33vw"
									loading={index < eagerCount ? "eager" : "lazy"}
									onLoad={(e) => e.target.classList.add("loaded")}
								/>
							</button>
						))}
					</div>
				))}
			</div>
			{lightboxIndex !== null && (
				<Lightbox
					files={files}
					startIndex={lightboxIndex}
					onClose={() => setLightboxIndex(null)}
				/>
			)}
		</>
	);
}

export default Gallery;
