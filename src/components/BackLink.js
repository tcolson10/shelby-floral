import { Link, useNavigate } from "react-router-dom";

// "← Back" link for the subpages. If the visitor came from elsewhere on the
// site it acts like the browser's Back button (returning them to where they
// were scrolled); otherwise, e.g. arriving from Google, it links to `to`.
function BackLink({ to, children }) {
	const navigate = useNavigate();

	const onClick = (e) => {
		if ((window.history.state?.idx ?? 0) > 0) {
			e.preventDefault();
			navigate(-1);
		}
	};

	return (
		<Link to={to} className="back-link" onClick={onClick}>
			{children}
		</Link>
	);
}

export default BackLink;
