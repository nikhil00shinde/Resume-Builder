import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as authActions from "../../redux/actions/authActions";
import logo from "../../static/images/logo.png";
import { isLoaded, isEmpty } from "react-redux-firebase";

function LoggesOut(props) {
	return (
		<ul>
			<li className="signup ">
				<NavLink className=" btnv-1" to="/register">
					Register
				</NavLink>
			</li>
			<li className="signin">
				<NavLink className="text-blue btnv-3" to="/login">
					Sign In
				</NavLink>
			</li>
		</ul>
	);
}

const Header = (props) => {
	const auth = props.auth;
	const handleLogOut = () => {
		console.log("The user will sign out");
		props.signOut();
	};

	return (
		<header className="header">
			<nav className="nav">
				<a href="/" className="holder-logo">
					<img
						className="logo"
						src="https://img.icons8.com/color/48/000000/resume.png"
						alt="logo"
					/>
					<ul>
						<li
							style={{
								width: "35rem",
								lineHeight: "3rem",
								fontSize: "4rem",
								textAlign: "center",
								color: "inherit",
								paddingTop: "23px",
							}}
							onMouseEnter={(e) => {
								if (e.target.children.length) {
									e.target.children[0].style.color = "#5ae4ce";
								} else {
									e.target.style.color = "#5ae4ce";
								}
							}}
							onMouseLeave={(e) => {
								e.target.style.color = "#303D46";
							}}
						>
							Resume Builder
						</li>
					</ul>
				</a>

				<div className="header-links full-height">
					{isLoaded(auth) && !isEmpty(auth) ? (
						<>
							<ul>
								<li className="signin ">
									<NavLink className="  " to="/">
										Logged in as {auth.email}
									</NavLink>
								</li>
								<li className="signin">
									<button className="text-blue btnv-3" onClick={handleLogOut}>
										Signout
									</button>
								</li>
							</ul>
						</>
					) : (
						<LoggesOut></LoggesOut>
					)}

					<ul id="nav-mid">
						<li>
							<NavLink className="btn-nvt-gm" to="/resume-templates">
								Resume Templates
							</NavLink>
						</li>
						<li className="holder-pricing">
							<NavLink className="btn-nvt-gm" to="/about-us">
								About Us
							</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(authActions.signout()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
