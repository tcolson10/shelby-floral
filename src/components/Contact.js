import { useState } from "react";

const FORM_ENDPOINT = "https://formspree.io/f/mwkgrzrd";

function Contact() {
	// "idle" | "sending" | "sent" | "error"
	const [status, setStatus] = useState("idle");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus("sending");
		try {
			const res = await fetch(FORM_ENDPOINT, {
				method: "POST",
				body: new FormData(e.target),
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
			<section className="lx-section lx-contact lx-contact--thanks">
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
			<form className="contact-form" onSubmit={handleSubmit}>
				<p className="form-note">
					Fields marked <span aria-hidden="true">*</span> are required
				</p>

				{/* Spam trap: hidden from people, filled in by bots. Formspree drops these. */}
				<input type="text" name="_gotcha" className="form-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />

				<div className="form-row">
					<div className="form-group">
						<label className="form-label" htmlFor="fullName">Names *</label>
						<input type="text" id="fullName" name="fullName" placeholder="Your name & partner's name" autoComplete="name" required />
					</div>
					<div className="form-group">
						<label className="form-label" htmlFor="email">Email *</label>
						<input type="email" id="email" name="email" placeholder="Your email address" autoComplete="email" required />
					</div>
				</div>

				<div className="form-row">
					<div className="form-group">
						<label className="form-label" htmlFor="date">Event Date *</label>
						<input type="date" id="date" name="date" required />
					</div>
					<div className="form-group">
						<label className="form-label" htmlFor="phone">Phone</label>
						<input type="tel" id="phone" name="phone" placeholder="Your phone number" autoComplete="tel" />
					</div>
				</div>

				<div className="form-row">
					<div className="form-group">
						<label className="form-label" htmlFor="location">Event Location</label>
						<input type="text" id="location" name="location" placeholder="City, venue" />
					</div>
					<div className="form-group">
						<label className="form-label" htmlFor="eventType">Event Type</label>
						<input type="text" id="eventType" name="eventType" placeholder="Wedding, shower, etc." />
					</div>
				</div>

				<div className="form-row">
					<div className="form-group">
						<label className="form-label" htmlFor="guestCount">Guest Count</label>
						<input type="text" id="guestCount" name="guestCount" inputMode="numeric" placeholder="Approximate number" />
					</div>
					<div className="form-group">
						<label className="form-label" htmlFor="budget">Floral Budget</label>
						<input type="text" id="budget" name="budget" placeholder="Approximate budget" />
					</div>
				</div>

				<div className="form-row">
					<div className="form-group">
						<label className="form-label" htmlFor="colors">Color Palette</label>
						<input type="text" id="colors" name="colors" placeholder="Your colors" />
					</div>
					<div className="form-group">
						<label className="form-label" htmlFor="flowers">Specific Flowers</label>
						<input type="text" id="flowers" name="flowers" placeholder="Any must-have blooms" />
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
						<input type="text" id="instagramHandle" name="instagramHandle" placeholder="@handle" />
					</div>
					<div className="form-group">
						<label className="form-label" htmlFor="pinterestLink">Pinterest Board</label>
						<input type="url" id="pinterestLink" name="pinterestLink" placeholder="Link to your inspo board" />
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
