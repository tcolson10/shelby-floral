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
			<div className="contact-container">
				<div className="contact-header contact-thanks" role="status">
					<span className="section-eyebrow">Inquiry Received</span>
					<h2 className="section-heading">
						Thank you, <em>talk soon!</em>
					</h2>
					<p>We'll be in touch within 24 hours to start planning your florals.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="contact-container">
			<div className="contact-header reveal">
				<span className="section-eyebrow">Let's Connect</span>
				<h2 className="section-heading">
					Start your <em>floral story</em>
				</h2>
				<p>Fill out the form below and we'll be in touch within 24 hours</p>
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
					<button type="submit" className="submit-button" disabled={status === "sending"}>
						{status === "sending" ? "Sending…" : "Send Inquiry"}
					</button>
				</div>
			</form>
		</div>
	);
}

export default Contact;
