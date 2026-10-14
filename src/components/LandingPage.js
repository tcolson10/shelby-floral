import Photo from "./Photo";
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
				<Photo
					file="hero-hydrangeas.jpg"
					sizes="100vw"
					className="hero-bg"
					fetchpriority="high"
				/>
				<div className="hero-overlay" />
				<div className="hero-content">
					<span className="hero-eyebrow hero-fade-in" style={{ animationDelay: "150ms" }}>Utah Wedding Florist</span>
					<h1 className="hero-headline">
						<em>
							{"Shelby Floral".split("").map((char, i) => (
								<span key={i} className="hero-letter" style={{ animationDelay: `${275 + i * 45}ms` }}>
									{char === " " ? " " : char}
								</span>
							))}
						</em>
					</h1>
					<p className="hero-tagline hero-fade-in" style={{ animationDelay: "1150ms" }}>Custom floral design for weddings and events across Utah</p>
					<div className="hero-actions hero-fade-in" style={{ animationDelay: "1150ms" }}>
						<button
							className="hero-btn-primary"
							onClick={() => scrollTo("portfolio")}
						>
							View Our Work
						</button>
						<button className="hero-btn-outline" onClick={toContact}>
							Get In Touch
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
