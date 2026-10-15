import { useEffect, useRef, useState } from "react";

const FORM_ENDPOINT = "https://formspree.io/f/mwkgrzrd";

// "2027-06-12" -> "June 12, 2027". Built from the parts so the time zone can't shift the day.
const formatDate = (value) => {
	const [y, m, d] = value.split("-").map(Number);
	if (!y || !m || !d) return value;
	return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

// Today as "2027-06-12" in the visitor's time zone, so the date picker starts at today.
const today = () => {
	const d = new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

function Contact() {
	// "idle" | "sending" | "sent" | "error"
	const [status, setStatus] = useState("idle");
	const [budget, setBudget] = useState("");
	const thanksRef = useRef(null);

	// The thank-you message is much shorter than the form, so bring it into view.
	// Otherwise phones are left looking at the FAQ below it.
	useEffect(() => {
		if (status !== "sent" || !thanksRef.current) return;
		const header = document.querySelector("header")?.offsetHeight ?? 60;
		window.scrollTo({
			top: thanksRef.current.getBoundingClientRect().top + window.pageYOffset - header,
			behavior: "smooth",
		});
	}, [status]);

	// On a phone keyboard, Return moves to the next field instead of sending a
	// half-finished inquiry. The last field's Return still sends.
	const handleKeyDown = (e) => {
		if (e.key !== "Enter" || e.target.tagName !== "INPUT") return;
		const fields = [...e.currentTarget.querySelectorAll("input:not([tabindex='-1']), textarea")];
		const next = fields[fields.indexOf(e.target) + 1];
		if (!next) return;
		e.preventDefault();
		next.focus();
	};

	// Puts a dollar sign in front when the budget starts with a number: "5000" -> "$5000".
	// Words like "Not sure yet" are left as typed.
	const handleBudget = (e) => {
		const rest = e.target.value.replace(/^[\s$]+/, "");
		setBudget(/^\d/.test(rest) ? `$${rest}` : rest);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus("sending");
		const data = new FormData(e.target);
		// Formspree uses _subject as the email's subject line, so Shelby's inbox reads
		// "New Inquiry: Sarah & James, June 12, 2027".
		const names = data.get("fullName").trim();
		const date = formatDate(data.get("date"));
		data.append("_subject", `New Inquiry: ${names}, ${date}`);
		try {
			const res = await fetch(FORM_ENDPOINT, {
				method: "POST",
				body: data,
				headers: { Accept: "application/json" },
			});
			if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
			setStatus("sent");
		} catch {
			setStatus("error");
		}
	};

	if (status === "sent") {
		return (
			<section className="lx-section lx-contact lx-contact--thanks" ref={thanksRef}>
				<div className="lx-contact-thanks" role="status">
					<span className="section-eyebrow">Inquiry Received</span>
					<h2 className="section-heading">Thank You</h2>
					<p className="lx-lede">We&apos;ll be in touch within 48 hours to start planning your florals.</p>
				</div>
			</section>
		);
	}

	return (
		<section className="lx-section lx-contact">
			<div className="lx-contact-intro reveal">
				<span className="section-eyebrow">Inquire</span>
				<h2 className="section-heading">Start Your Floral Story</h2>
				<p className="lx-lede">Tell us about your day.</p>
				<p className="lx-body">
					Share a few details and we&apos;ll be in touch within 48 hours to begin
					designing your florals.
				</p>
				<a className="lx-contact-email" href="mailto:shelby@shelbyfloral.com">
					shelby@shelbyfloral.com
				</a>
			</div>
			<form className="contact-form" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
				<p className="form-note">
					Fields marked <span aria-hidden="true">*</span> are required
				</p>

				{/* Spam trap: hidden from people, filled in by bots. Formspree drops these. */}
				<input type="text" name="_gotcha" className="form-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />

				<div className="form-row">
					<div className="form-group">
						<label className="form-label" htmlFor="fullName">Names *</label>
						<input type="text" id="fullName" name="fullName" placeholder="Your name & partner's name" autoComplete="name" autoCapitalize="words" enterKeyHint="next" required />
					</div>
					<div className="form-group">
						<label className="form-label" htmlFor="email">Email *</label>
						<input type="email" id="email" name="email" placeholder="Your email address" autoComplete="email" autoCapitalize="none" autoCorrect="off" spellCheck="false" enterKeyHint="next" required />
					</div>
				</div>

				<div className="form-row">
					<div className="form-group">
						<label className="form-label" htmlFor="date">Event Date *</label>
						<input type="date" id="date" name="date" min={today()} required />
					</div>
					<div className="form-group">
						<label className="form-label" htmlFor="phone">Phone</label>
						<input type="tel" id="phone" name="phone" placeholder="Your phone number" autoComplete="tel" enterKeyHint="next" />
					</div>
				</div>

				<div className="form-row">
					<div className="form-group">
						<label className="form-label" htmlFor="location">Event Location</label>
						<input type="text" id="location" name="location" placeholder="City, venue" autoCapitalize="words" enterKeyHint="next" />
					</div>
					<div className="form-group">
						<label className="form-label" htmlFor="eventType">Event Type</label>
						<input type="text" id="eventType" name="eventType" placeholder="Wedding, shower, etc." autoCapitalize="sentences" enterKeyHint="next" />
					</div>
				</div>

				<div className="form-row">
					<div className="form-group">
						<label className="form-label" htmlFor="guestCount">Guest Count</label>
						<input type="text" id="guestCount" name="guestCount" inputMode="numeric" placeholder="Approximate number" enterKeyHint="next" />
					</div>
					<div className="form-group">
						<label className="form-label" htmlFor="budget">Floral Budget</label>
						<input type="text" id="budget" name="budget" placeholder="Approximate budget" value={budget} onChange={handleBudget} enterKeyHint="next" />
					</div>
				</div>

				<div className="form-row">
					<div className="form-group">
						<label className="form-label" htmlFor="colors">Color Palette</label>
						<input type="text" id="colors" name="colors" placeholder="Your colors" autoCapitalize="sentences" enterKeyHint="next" />
					</div>
					<div className="form-group">
						<label className="form-label" htmlFor="flowers">Specific Flowers</label>
						<input type="text" id="flowers" name="flowers" placeholder="Any must-have blooms" autoCapitalize="sentences" enterKeyHint="next" />
					</div>
				</div>

				<div className="form-group">
					<label className="form-label" htmlFor="description">Tell Us More</label>
					<textarea
						id="description"
						name="description"
						rows="4"
						placeholder="Share your vision, quantities, and any other details..."
					></textarea>
				</div>

				<div className="form-row">
					<div className="form-group">
						<label className="form-label" htmlFor="instagramHandle">Instagram Handle</label>
						<input type="text" id="instagramHandle" name="instagramHandle" placeholder="@handle" autoCapitalize="none" autoCorrect="off" spellCheck="false" enterKeyHint="next" />
					</div>
					<div className="form-group">
						<label className="form-label" htmlFor="pinterestLink">Pinterest Board</label>
						<input type="text" id="pinterestLink" name="pinterestLink" inputMode="url" placeholder="Link to your inspo board" autoCapitalize="none" autoCorrect="off" spellCheck="false" enterKeyHint="send" />
					</div>
				</div>

				{status === "error" && (
					<p className="form-error" role="alert">
						Something went wrong sending your inquiry. Please try again, or email{" "}
						<a href="mailto:shelby@shelbyfloral.com">shelby@shelbyfloral.com</a>.
					</p>
				)}

				<div className="submit-button-container">
					<button type="submit" className="lx-btn submit-button" disabled={status === "sending"}>
						{status === "sending" ? "Sending…" : "Send Inquiry"}
					</button>
				</div>
			</form>
		</section>
	);
}

export default Contact;
