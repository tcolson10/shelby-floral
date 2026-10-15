import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

	return (
		<div className="testimonials-container testimonials-home">
			<div className="testimonials-header reveal">
				<span className="section-eyebrow testimonials-eyebrow">Kind Words</span>
				<h2 className="section-heading testimonials-heading">
					What our <em>clients say</em>
				</h2>
			</div>
			<div
				className="testimonials-carousel"
				onMouseEnter={() => setPaused(true)}
				onMouseLeave={() => setPaused(false)}
				onFocus={() => setPaused(true)}
				onBlur={() => setPaused(false)}
			>
				<button className="carousel-btn" onClick={prev} aria-label="Previous testimonial">
					&#8249;
				</button>
				<div className="testimonial-card">
					<span className="review-mark" aria-hidden="true">&#8220;</span>
					<div className="carousel-track" aria-live={paused ? "polite" : "off"}>
						{testimonialsData.map((t, i) => (
							<div
								key={t.name}
								className={`carousel-slide${i === current ? " carousel-slide--active" : ""}`}
								aria-hidden={i !== current}
							>
								<blockquote>{t.text}</blockquote>
								<p className="client-name">{t.name}</p>
							</div>
						))}
					</div>
				</div>
				<button className="carousel-btn" onClick={next} aria-label="Next testimonial">
					&#8250;
				</button>
			</div>
			<div className="carousel-dots">
				{testimonialsData.map((t, i) => (
					<button
						key={t.name}
						className={`carousel-dot${i === current ? " carousel-dot--active" : ""}`}
						onClick={() => setCurrent(i)}
						aria-label={`Show review from ${t.name}`}
					/>
				))}
			</div>
			<Link to="/full-testimonials" className="testimonials-button">
				See All Testimonials
			</Link>
		</div>
	);
}

export default Testimonials;
