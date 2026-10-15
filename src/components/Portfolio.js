import { Link } from "react-router-dom";
import Gallery from "./Gallery";
import { homeGallery } from "../data/images";

function Portfolio() {
	return (
		<section className="lx-section lx-portfolio">
			<div className="lx-head reveal">
				<span className="section-eyebrow">Portfolio</span>
				<h2 className="section-heading">Selected Work</h2>
			</div>
			<Gallery files={homeGallery} eagerCount={6} />
			<div className="lx-after">
				<Link to="/full-portfolio" className="lx-btn">
					View Full Portfolio
				</Link>
			</div>
		</section>
	);
}

export default Portfolio;
