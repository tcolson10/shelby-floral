import { processSteps } from "../data/siteContent";

function Process() {
	return (
		<div className="process-container">
			<div className="process-header reveal">
				<span className="section-eyebrow">How It Works</span>
				<h2 className="section-heading">
					Simple from <em>start to finish</em>
				</h2>
			</div>
			<ol className="process-steps">
				{processSteps.map((step, i) => (
					<li key={step.title} className="process-step reveal">
						<span className="process-number">{String(i + 1).padStart(2, "0")}</span>
						<h3 className="process-title">{step.title}</h3>
						<p>{step.body}</p>
					</li>
				))}
			</ol>
		</div>
	);
}

export default Process;
