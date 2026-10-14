import { useEffect } from "react";
import { Link } from "react-router-dom";
import mediaKitData from "../data/mediaKitData";

function Partnerships() {
	useEffect(() => {
		window.scrollTo(0, 0);
		const prevTitle = document.title;
		document.title = mediaKitData.meta.title;

		const descriptionTag = document.querySelector('meta[name="description"]');
		const prevDescription = descriptionTag?.getAttribute("content") ?? null;
		descriptionTag?.setAttribute("content", mediaKitData.meta.description);

		return () => {
			document.title = prevTitle;
			if (descriptionTag && prevDescription !== null) {
				descriptionTag.setAttribute("content", prevDescription);
			}
		};
	}, []);

	return (
		<div className="partnerships-page full-page">
			<div className="page-nav">
				<Link to="/" className="back-link" style={{ color: "var(--gold-ink)" }}>
					← Back to Home
				</Link>
			</div>

			<div className="partnerships-masthead">
				<div className="partnerships-header">
					<span className="section-eyebrow">{mediaKitData.header.eyebrow}</span>
					<h1 className="partnerships-title">{mediaKitData.header.title}</h1>
					<p className="partnerships-role">{mediaKitData.header.role}</p>
					<p className="partnerships-handles">
						{mediaKitData.header.handles.map((h, i) => (
							<span key={h.label}>
								{i > 0 && <span className="partnerships-handles-dot" aria-hidden="true">·</span>}
								{h.href ? <a href={h.href} target={h.href.startsWith("http") ? "_blank" : undefined} rel={h.href.startsWith("http") ? "noopener noreferrer" : undefined}>{h.label}</a> : h.label}
							</span>
						))}
					</p>
					<button
						type="button"
						className="partnerships-btn partnerships-download-btn"
						onClick={() => window.print()}
					>
						Download PDF
					</button>
				</div>
				<div className="partnerships-masthead-image">
					<img src={mediaKitData.header.image} alt="Shelby holding white flowers" loading="eager" fetchpriority="high" />
				</div>
			</div>

			<div className="partnerships-container">
				<p className="partnerships-intro">{mediaKitData.intro}</p>
			</div>

			<div className="stats-bar partnerships-stats">
				{mediaKitData.stats.map((s) => (
					<div className="stat-item" key={s.label}>
						<span className="stat-number">{s.value}</span>
						<span className="stat-label">{s.label}</span>
					</div>
				))}
			</div>

			<div className="partnerships-container">
				<section className="partnerships-featured">
					<span className="section-eyebrow">Featured In</span>
					<p className="partnerships-featured-outlet">{mediaKitData.featuredIn.outlet}</p>
					<p className="partnerships-featured-desc">{mediaKitData.featuredIn.description}</p>
				</section>

				<section className="partnerships-why">
					<h2 className="partnerships-why-headline">{mediaKitData.whyItWorks.headline}</h2>
					<p className="partnerships-why-body">{mediaKitData.whyItWorks.body}</p>
				</section>

				<div className="partnerships-columns">
					<section className="partnerships-column">
						<h3 className="partnerships-column-title">Partnership Opportunities</h3>
						<ul className="partnerships-list">
							{mediaKitData.opportunities.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</section>

					<section className="partnerships-column">
						<h3 className="partnerships-column-title">Best-Fit Brand Categories</h3>
						<ul className="partnerships-list">
							{mediaKitData.brandCategories.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</section>
				</div>

				<section className="partnerships-content-fits">
					<h3 className="partnerships-column-title">Content That Fits</h3>
					<div className="partnerships-tags">
						{mediaKitData.contentTags.map((tag) => (
							<span className="partnerships-tag" key={tag}>{tag}</span>
						))}
					</div>
				</section>
			</div>

			<div className="partnerships-closer">
				<h2 className="partnerships-closer-headline">{mediaKitData.closer.headline}</h2>
				<a className="partnerships-btn partnerships-closer-email" href={`mailto:${mediaKitData.closer.email}`}>
					{mediaKitData.closer.email}
				</a>
				<a className="partnerships-closer-website" href={`https://${mediaKitData.closer.website}`} target="_blank" rel="noopener noreferrer">
					{mediaKitData.closer.website}
				</a>
			</div>
		</div>
	);
}

export default Partnerships;
