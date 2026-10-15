import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
	Routes,
	Route,
	Link,
	useNavigate,
	useLocation,
	useNavigationType,
	Navigate,
} from "react-router-dom";
import ReactGA4 from "react-ga4";
import "./App.css";
import LandingPage from "./components/LandingPage";
import PortfolioFull from "./components/PortfolioFull";
import TestimonialsFull from "./components/TestimonialsFull";
import Partnerships from "./components/Partnerships";

// Scroll position of every page visited in this session, keyed by history
// entry, so Back returns visitors to exactly where they were.
const savedScroll = new Map();

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

// The address the site is served from. shelbyfloral.com redirects here.
const SITE_URL = "https://www.shelbyfloral.com";

const CONTACT_EMAIL = "shelby@shelbyfloral.com";

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
	const [emailCopied, setEmailCopied] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const navigationType = useNavigationType();
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

	// Per-page title, description and canonical address
	useEffect(() => {
		// The section links (/about, /faq…) are the homepage scrolled down, so they
		// point Google at the homepage. Separate pages point at themselves.
		const section = SECTION_ROUTES.includes(location.pathname.replace(/^\/|\/$/g, ""));
		const canonical = SITE_URL + (section ? "/" : location.pathname.replace(/\/$/, ""));
		document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonical);
		document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonical);

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

	// The app manages scroll position itself (below), not the browser.
	useEffect(() => {
		if ("scrollRestoration" in window.history) {
			window.history.scrollRestoration = "manual";
		}
	}, []);

	// Keep a record of where the visitor is on the current page.
	useEffect(() => {
		const key = location.key;
		let frame = null;
		const save = () => {
			frame = null;
			savedScroll.set(key, window.scrollY);
		};
		const onScroll = () => {
			if (frame === null) frame = requestAnimationFrame(save);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			if (frame !== null) cancelAnimationFrame(frame);
		};
	}, [location.key]);

	// Going Back (or Forward) returns to the saved spot; following a link to
	// a section scrolls to that section.
	useLayoutEffect(() => {
		const saved = savedScroll.get(location.key);
		if (navigationType === "POP" && saved !== undefined) {
			window.scrollTo(0, saved);
			// Once more after images and fonts settle, in case the page grew.
			const t = setTimeout(() => window.scrollTo(0, saved), 120);
			return () => clearTimeout(t);
		}
		const path = location.pathname.replace(/^\//, "");
		if (SECTION_ROUTES.includes(path)) {
			const sectionId = path === "" ? "home" : path;
			const t = setTimeout(() => scrollToSection(sectionId), 100);
			return () => clearTimeout(t);
		}
		// Any other page (full portfolio, testimonials, partnerships) opens at the top.
		window.scrollTo(0, 0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.key]);

	// mailto: only works when the device has a mail app set up, so also copy
	// the address and say so, in case nothing opens.
	const onEmailClick = () => {
		navigator.clipboard?.writeText(CONTACT_EMAIL).catch(() => {});
		setEmailCopied(true);
		setTimeout(() => setEmailCopied(false), 3000);
	};

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
				<p className="footer-tagline">Wedding &amp; Event Florals · Utah</p>
				<nav className="footer-nav" aria-label="Footer">
					{NAV_ITEMS.filter(([path]) => path !== "home").map(([path, label]) => (
						<Link key={path} to={`/${path}`} onClick={() => handleNavigation(path)}>
							{label}
						</Link>
					))}
				</nav>
				<div className="footer-icons">
					<a
						href="https://www.instagram.com/shelbyfloral/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
							<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
							<circle cx="12" cy="12" r="4"/>
							<circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
						</svg>
					</a>
					<a
						href="https://www.tiktok.com/@shelbyfloral"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="TikTok"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
						</svg>
					</a>
					<a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Floral Inquiry")}`} aria-label={`Email ${CONTACT_EMAIL}`} onClick={onEmailClick}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
							<rect x="2" y="4" width="20" height="16" rx="2"/>
							<polyline points="2,4 12,13 22,4"/>
						</svg>
					</a>
				</div>
				<p className={`footer-copied${emailCopied ? " is-shown" : ""}`} role="status">
					{emailCopied && <>Email copied: {CONTACT_EMAIL}</>}
				</p>
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
