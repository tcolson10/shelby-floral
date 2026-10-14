import React, { useState, useEffect, useRef } from "react";
import {
	Routes,
	Route,
	Link,
	useNavigate,
	useLocation,
	Navigate,
} from "react-router-dom";
import ReactGA4 from "react-ga4";
import "./App.css";
import LandingPage from "./components/LandingPage";
import PortfolioFull from "./components/PortfolioFull";
import TestimonialsFull from "./components/TestimonialsFull";
import Partnerships from "./components/Partnerships";
import SocialLinks from "./components/SocialLinks";

const DEFAULT_DESCRIPTION =
	"Shelby Floral is a Utah wedding florist creating custom bouquets, arches, ceremony installations and reception florals. Request a quote today.";

// Browser-tab titles and search descriptions per route. /partnerships sets
// its own from src/data/mediaKitData.js.
const PAGE_META = {
	"/": { title: "Shelby Floral | Utah Wedding Florist" },
	"/portfolio": { title: "Portfolio | Shelby Floral" },
	"/about": { title: "About Shelby | Shelby Floral" },
	"/testimonials": { title: "Testimonials | Shelby Floral" },
	"/contact": { title: "Request a Quote | Shelby Floral" },
	"/faq": { title: "FAQ | Shelby Floral" },
	"/full-portfolio": {
		title: "Full Portfolio | Shelby Floral",
		description: "Bouquets, arches, aisle florals and reception designs from Shelby Floral weddings across Utah.",
	},
	"/full-testimonials": {
		title: "Client Reviews | Shelby Floral",
		description: "What couples say about working with Shelby Floral, a Utah wedding florist.",
	},
};

const SECTION_ROUTES = ["", "home", "portfolio", "about", "testimonials", "contact", "faq"];

const NAV_ITEMS = [
	["home", "Home"],
	["portfolio", "Portfolio"],
	["about", "About"],
	["testimonials", "Testimonials"],
	["contact", "Contact"],
	["faq", "FAQ"],
];

function App() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const gaInitialized = useRef(false);

	// Initialize GA4 once on mount
	useEffect(() => {
		if (!gaInitialized.current) {
			ReactGA4.initialize("G-9P0D4PPB65");
			gaInitialized.current = true;
		}
	}, []);

	// Track page views on route change
	useEffect(() => {
		ReactGA4.send({
			hitType: "pageview",
			page_title: document.title,
			page_location: window.location.href,
			page_path: location.pathname + location.search,
		});
	}, [location]);

	// Per-page title and description
	useEffect(() => {
		const meta = PAGE_META[location.pathname];
		if (!meta) return;
		document.title = meta.title;
		document
			.querySelector('meta[name="description"]')
			?.setAttribute("content", meta.description ?? DEFAULT_DESCRIPTION);
	}, [location.pathname]);

	// Transparent nav: track scroll position
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 60);
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Scroll reveal: observe .reveal elements on each route
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("is-visible");
						observer.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12 }
		);
		const els = document.querySelectorAll(".reveal");
		els.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, [location.pathname]);

	const scrollToSection = (sectionId) => {
		const section = document.getElementById(sectionId);
		if (!section) return;
		const headerHeight = document.querySelector("header")?.offsetHeight ?? 80;
		const top =
			section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
		window.scrollTo({ top, behavior: "smooth" });
	};

	// Scroll to section based on URL path when location changes
	useEffect(() => {
		const path = location.pathname.replace(/^\//, "");
		if (SECTION_ROUTES.includes(path)) {
			const sectionId = path === "" ? "home" : path;
			setTimeout(() => scrollToSection(sectionId), 100);
		}
	}, [location.pathname]);

	const handleNavigation = (path) => {
		setIsMenuOpen(false);
		navigate(path === "home" ? "/" : `/${path}`);
	};

	// Every section route (/about, /contact…) renders the homepage, hero included.
	const isHome = SECTION_ROUTES.includes(location.pathname.replace(/^\//, ""));
	const navTransparent = isHome && !scrolled && !isMenuOpen;

	return (
		<div className="app-container">
			<header className={navTransparent ? "nav-transparent" : "nav-scrolled"}>
				<button
					className={`hamburger ${isMenuOpen ? "active" : ""}`}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					aria-expanded={isMenuOpen}
				>
					<span className="hamburger-line"></span>
					<span className="hamburger-line"></span>
					<span className="hamburger-line"></span>
				</button>
				<nav className={isMenuOpen ? "nav-active" : ""}>
					<ul>
						{NAV_ITEMS.map(([path, label]) => (
							<li key={path}>
								<Link
									to={path === "home" ? "/" : `/${path}`}
									onClick={() => handleNavigation(path)}
								>
									{label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</header>
			<main>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/about" element={<LandingPage />} />
					<Route path="/portfolio" element={<LandingPage />} />
					<Route path="/testimonials" element={<LandingPage />} />
					<Route path="/contact" element={<LandingPage />} />
					<Route path="/faq" element={<LandingPage />} />
					<Route path="/full-portfolio" element={<PortfolioFull />} />
					<Route path="/full-testimonials" element={<TestimonialsFull />} />
					<Route path="/partnerships" element={<Partnerships />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</main>
			<footer className="site-footer">
				<p className="footer-name">Shelby Floral</p>
				<SocialLinks className="footer-social" />
				<p className="footer-meta">
					<span>Utah Wedding Florist</span>
					<span className="footer-meta-dot" aria-hidden="true"> · </span>
					<span>© {new Date().getFullYear()} Shelby Floral</span>
				</p>
			</footer>
		</div>
	);
}

export default App;
