import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import testimonialsData from '../data/testimonials';

function TestimonialsFull() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="testimonials-container full-page">
            <div className="page-nav">
                <Link to="/testimonials" className="back-link">← Back to Testimonials</Link>
            </div>
            <div className="testimonials-header">
                <span className="section-eyebrow">Kind Words</span>
                <h1 className='page-title'>Testimonials</h1>
                <p>From clients turned friends</p>
            </div>
            <div className="review-wall">
                {testimonialsData.map((testimonial) => (
                    <figure key={testimonial.name} className="review-card">
                        <span className="review-mark" aria-hidden="true">&#8220;</span>
                        <blockquote>{testimonial.text}</blockquote>
                        <figcaption>{testimonial.name}</figcaption>
                    </figure>
                ))}
            </div>
        </div>
    );
}

export default TestimonialsFull;
