import SocialLinks from "./SocialLinks";
import Portfolio from "./Portfolio";
import About from "./About";
import Process from "./Process";
import Testimonials from "./Testimonials";
import Faq from "./Faq";
import Contact from "./Contact";

const LandingPage = () => {
	const scrollTo = (id) => {
		const el = document.getElementById(id);
		if (!el) return;
		const h = document.querySelector("header")?.offsetHeight ?? 60;
		window.scrollTo({
			top: el.getBoundingClientRect().top + window.pageYOffset - h,
			behavior: "smooth",
		});
	};
	const toContact = () => scrollTo("contact");

	return (
		<div>
			{/* Hero */}
			<div className="hero" id="home">
				<div className="hero-content">
					<span className="hero-flower hero-fade-in" style={{ animationDelay: "0ms" }} aria-hidden="true" />
					<p className="hero-eyebrow hero-fade-in" style={{ animationDelay: "100ms" }}>
						Utah Wedding Florist
					</p>
					<h1 className="hero-headline hero-fade-in" style={{ animationDelay: "350ms" }}>
						<span>Shelby</span> <span>Floral</span>
					</h1>
					<p className="hero-tagline hero-fade-in" style={{ animationDelay: "650ms" }}>
						Wedding &amp; Event Design
					</p>
					<div className="hero-actions hero-fade-in" style={{ animationDelay: "950ms" }}>
						<button type="button" className="hero-btn" onClick={() => scrollTo("portfolio")}>
							View Our Work
						</button>
						<button type="button" className="hero-btn" onClick={toContact}>
							Get In Touch
						</button>
					</div>
				</div>
				<SocialLinks className="hero-social hero-fade-in" />
			</div>

			<div id="portfolio">
				<Portfolio />
			</div>

			<div id="about">
				<About onContact={toContact} />
			</div>

			<div id="testimonials">
				<Testimonials />
			</div>

			<Process />

			<div id="contact">
				<Contact />
			</div>

			<div id="faq">
				<Faq />
			</div>
		</div>
	);
};

export default LandingPage;
