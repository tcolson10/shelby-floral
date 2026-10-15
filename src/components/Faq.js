import { useState } from "react";
import { faqs } from "../data/siteContent";

function Faq() {
	const [openIndex, setOpenIndex] = useState(null);

	const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

	return (
		<section className="lx-section lx-faq">
			<div className="lx-head reveal">
				<span className="section-eyebrow">Good to Know</span>
				<h2 className="section-heading">Questions</h2>
			</div>
			<div className="faq-list">
				{faqs.map((f, i) => {
					const open = openIndex === i;
					return (
						<div key={f.q} className={`faq-item${open ? " faq-item--open" : ""}`}>
							<button
								type="button"
								className="faq-question"
								aria-expanded={open}
								aria-controls={`faq-answer-${i}`}
								onClick={() => toggle(i)}
							>
								<span className="lx-faq-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
								<span className="lx-faq-q">{f.q}</span>
							</button>
							{/* Animates open/closed by growing the grid row from 0fr to 1fr. */}
							<div className="faq-answer-wrapper" id={`faq-answer-${i}`} aria-hidden={!open}>
								<div className="faq-answer">
									<p>{f.a}</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}

export default Faq;
