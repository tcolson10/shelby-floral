import { useEffect } from "react";
import { Link } from "react-router-dom";
import Gallery from "./Gallery";
import { fullGallery, homeGallery } from "../data/images";

function PortfolioFull() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="portfolio-page-container full-page">
			<div className="page-nav">
				<Link to="/" className="back-link" style={{ color: "var(--sage)" }}>
					← Back to Home
				</Link>
			</div>
			<div className="portfolio-header reveal">
				<span className="section-eyebrow">Our Work</span>
				<h1 className="section-heading">
					The Full <em>Collection</em>
				</h1>
				<p>Every arrangement, every moment, every bloom</p>
			</div>
			<Gallery files={fullGallery} eagerCount={9} orderedCount={homeGallery.length} />
		</div>
	);
}

export default PortfolioFull;
