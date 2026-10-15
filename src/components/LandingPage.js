import Photo from "./Photo";
import Portfolio from "./Portfolio";
import About from "./About";
import Process from "./Process";
import Testimonials from "./Testimonials";
import Faq from "./Faq";
import Contact from "./Contact";
import CtaBand from "./CtaBand";

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
				<Photo
					file="hero-bridesmaids.jpg"
					sizes="(orientation: portrait) 66vh, 100vw"
					className="hero-bg"
					fetchpriority="high"
				/>
				<div className="hero-overlay" />
				<div className="hero-content">
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
							Inquire
						</button>
					</div>
				</div>
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

			<CtaBand onContact={toContact} />

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
