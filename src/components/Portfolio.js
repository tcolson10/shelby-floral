import { Link } from "react-router-dom";
import Gallery from "./Gallery";
import { homeGallery } from "../data/images";

function Portfolio() {
	return (
		<div className="portfolio-page-container">
			<div className="portfolio-header reveal">
				<span className="section-eyebrow">Our Work</span>
				<h2 className="section-heading">
					A glimpse of <em>our craft</em>
				</h2>
				<p>From intimate ceremonies to grand celebrations</p>
			</div>
			<Gallery files={homeGallery} eagerCount={6} />
			<Link to="/full-portfolio" className="portfolio-button">
				View Full Portfolio
			</Link>
		</div>
	);
}

export default Portfolio;
