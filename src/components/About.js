import Photo from "./Photo";
import { bio } from "../data/siteContent";

function About({ onContact }) {
	return (
		<div className="about-section reveal">
			<div className="about-image">
				<Photo file={bio.image} sizes="(max-width: 900px) 100vw, 50vw" loading="lazy" />
			</div>
			<div className="about-text">
				<span className="section-eyebrow">Meet the Florist</span>
				<h2 className="section-heading">
					Hi, I&apos;m <em>Shelby</em>
				</h2>
				{bio.paragraphs.map((p) => (
					<p key={p}>{p}</p>
				))}
				<button className="about-cta" onClick={onContact}>
					Work With Me
				</button>
			</div>
		</div>
	);
}

export default About;
