import { useState } from "react";
import { faqs } from "../data/siteContent";

function Faq() {
	const [openIndex, setOpenIndex] = useState(null);

	const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

	return (
		<div className="faq-container">
			<div className="faq-header reveal">
				<span className="section-eyebrow">Got Questions?</span>
				<h2 className="section-heading">
					Frequently Asked <em>Questions</em>
				</h2>
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
								{f.q}
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
		</div>
	);
}

export default Faq;
