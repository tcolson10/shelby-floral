import BackLink from "./BackLink";
import Gallery from "./Gallery";
import { fullGallery, homeGallery } from "../data/images";

function PortfolioFull() {
	return (
		<div className="portfolio-page-container full-page">
			<div className="page-nav">
				<BackLink to="/">← Back to Home</BackLink>
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
