import Photo from "./Photo";

// Full-bleed photo band before the inquiry form, echoing the hero.
function CtaBand({ onContact }) {
	return (
		<section className="lx-band lx-cta" aria-label="Inquire">
			<Photo file="band-hydrangea.jpg" sizes="(orientation: portrait) 120vw, 100vw" className="lx-band-photo" loading="lazy" />
			<div className="lx-band-wash" />
			<div className="lx-band-inner reveal">
				<span className="lx-band-label">Now Booking 2027</span>
				<h2 className="lx-band-title">Let&apos;s Create Something Beautiful</h2>
				<button type="button" className="lx-btn lx-btn--light" onClick={onContact}>
					Inquire
				</button>
			</div>
		</section>
	);
}

export default CtaBand;
