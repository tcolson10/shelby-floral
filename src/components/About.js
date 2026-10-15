import Photo from "./Photo";
import { bio } from "../data/siteContent";

function About({ onContact }) {
	return (
		<section className="lx-about">
			<div className="lx-about-photo reveal">
				<Photo file={bio.image} sizes="(max-width: 900px) 100vw, 42vw" loading="lazy" />
			</div>
			<div className="lx-about-text reveal">
				<span className="section-eyebrow">Meet the Florist</span>
				<h2 className="section-heading">Shelby</h2>
				<p className="lx-lede">The hands and heart behind Shelby Floral</p>
				{bio.paragraphs.map((p) => (
					<p key={p} className="lx-body">{p}</p>
				))}
				<button type="button" className="lx-btn" onClick={onContact}>
					Work With Me
				</button>
			</div>
		</section>
	);
}

export default About;
