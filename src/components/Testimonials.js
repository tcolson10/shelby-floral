import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Photo from "./Photo";
import { featured as testimonialsData } from "../data/testimonials";

const ADVANCE_MS = 7000;

function Testimonials() {
	const [current, setCurrent] = useState(0);
	const [paused, setPaused] = useState(false);

	useEffect(() => {
		// Hold still while someone is reading (hovering or focused inside),
		// and never auto-advance for visitors who ask for reduced motion.
		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (paused || reduceMotion) return;
		const timer = setInterval(() => {
			setCurrent((c) => (c + 1) % testimonialsData.length);
		}, ADVANCE_MS);
		return () => clearInterval(timer);
	}, [current, paused]);

	const prev = () =>
		setCurrent((c) => (c - 1 + testimonialsData.length) % testimonialsData.length);
	const next = () => setCurrent((c) => (c + 1) % testimonialsData.length);

	const pad = (n) => String(n).padStart(2, "0");

	return (
		<section
			className="lx-band lx-testimonials"
			aria-label="Client testimonials"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
			onFocus={() => setPaused(true)}
			onBlur={() => setPaused(false)}
		>
			<Photo file="band-veil.jpg" sizes="(orientation: portrait) 170vw, 100vw" className="lx-band-photo" loading="lazy" />
			<div className="lx-band-wash" />
			<div className="lx-band-inner">
				<span className="lx-band-label">Kind Words</span>
				<div className="lx-quotes" aria-live={paused ? "polite" : "off"}>
					{testimonialsData.map((t, i) => (
						<figure
							key={t.name}
							className={`lx-quote${i === current ? " is-active" : ""}`}
							aria-hidden={i !== current}
						>
							<blockquote>{t.text}</blockquote>
							<figcaption>{t.name}</figcaption>
						</figure>
					))}
				</div>
				<div className="lx-quote-nav">
					<button type="button" onClick={prev} aria-label="Previous testimonial">
						&#8592;
					</button>
					<span className="lx-quote-count" aria-hidden="true">
						{pad(current + 1)} <span>/</span> {pad(testimonialsData.length)}
					</span>
					<button type="button" onClick={next} aria-label="Next testimonial">
						&#8594;
					</button>
				</div>
				<Link to="/full-testimonials" className="lx-btn lx-btn--light">
					Read All Reviews
				</Link>
			</div>
		</section>
	);
}

export default Testimonials;
