import { useEffect, useRef, useState } from "react";
import Photo from "./Photo";

const SWIPE_THRESHOLD = 50; // px of horizontal travel that counts as a swipe

function Lightbox({ files, startIndex, onClose }) {
	const [index, setIndex] = useState(startIndex);
	const containerRef = useRef(null);
	const touchStartX = useRef(null);

	const goPrev = () => setIndex((i) => (i - 1 + files.length) % files.length);
	const goNext = () => setIndex((i) => (i + 1) % files.length);

	useEffect(() => {
		// Return focus to the photo that opened the viewer when it closes.
		const opener = document.activeElement;
		containerRef.current?.focus();
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const onKeyDown = (e) => {
			if (e.key === "Escape") onClose();
			else if (e.key === "ArrowLeft" && files.length > 1) goPrev();
			else if (e.key === "ArrowRight" && files.length > 1) goNext();
		};
		window.addEventListener("keydown", onKeyDown);

		return () => {
			document.body.style.overflow = prevOverflow;
			window.removeEventListener("keydown", onKeyDown);
			opener?.focus?.();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [files.length]);

	const onTouchStart = (e) => {
		touchStartX.current = e.touches[0].clientX;
	};

	const onTouchEnd = (e) => {
		if (touchStartX.current === null || files.length < 2) return;
		const dx = e.changedTouches[0].clientX - touchStartX.current;
		touchStartX.current = null;
		if (dx > SWIPE_THRESHOLD) goPrev();
		else if (dx < -SWIPE_THRESHOLD) goNext();
	};

	return (
		<div
			className="lightbox-overlay"
			role="dialog"
			aria-modal="true"
			aria-label="Photo viewer"
			ref={containerRef}
			tabIndex={-1}
			onClick={onClose}
			onTouchStart={onTouchStart}
			onTouchEnd={onTouchEnd}
		>
			<button
				type="button"
				className="lightbox-close"
				aria-label="Close"
				onClick={onClose}
			>
				&times;
			</button>

			{files.length > 1 && (
				<button
					type="button"
					className="lightbox-nav lightbox-prev"
					aria-label="Previous photo"
					onClick={(e) => { e.stopPropagation(); goPrev(); }}
				>
					&#8249;
				</button>
			)}

			<Photo
				key={files[index]}
				file={files[index]}
				sizes="90vw"
				className="lightbox-image"
				onClick={(e) => e.stopPropagation()}
			/>

			{files.length > 1 && (
				<button
					type="button"
					className="lightbox-nav lightbox-next"
					aria-label="Next photo"
					onClick={(e) => { e.stopPropagation(); goNext(); }}
				>
					&#8250;
				</button>
			)}

			{files.length > 1 && (
				<div className="lightbox-counter" aria-live="polite">
					{index + 1} / {files.length}
				</div>
			)}
		</div>
	);
}

export default Lightbox;
