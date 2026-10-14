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
                <Link to="/testimonials" className="back-link" style={{ color: 'rgba(255,255,255,0.85)' }}>← Back to Testimonials</Link>
            </div>
            <div className="testimonials-header">
                <h1 className='page-title'>Testimonials</h1>
                <p>Kind words from clients turned friends</p>
            </div>
            <div className="testimonials-list">
                {testimonialsData.map((testimonial, index) => (
                    <div key={index} className="testimonial-item">
                        <blockquote>&#8220;{testimonial.text}&#8221;</blockquote>
                        <p className="client-name">{testimonial.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TestimonialsFull;
