import { processSteps } from "../data/siteContent";

const NUMERALS = ["I", "II", "III", "IV", "V"];

function Process() {
	return (
		<section className="lx-section lx-process">
			<div className="lx-head reveal">
				<span className="section-eyebrow">The Experience</span>
				<h2 className="section-heading">How It Works</h2>
			</div>
			<ol className="lx-steps">
				{processSteps.map((step, i) => (
					<li key={step.title} className="lx-step reveal">
						<span className="lx-numeral" aria-hidden="true">{NUMERALS[i]}</span>
						<h3 className="lx-step-title">{step.title}</h3>
						<p className="lx-body">{step.body}</p>
					</li>
				))}
			</ol>
		</section>
	);
}

export default Process;
