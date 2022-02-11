import React from "react";
import { connect } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ auth, component: Component, ...restProps }) {
	console.log(restProps);
	return (
		<Route
			{...restProps}
			render={(props) =>
				isLoaded(auth) && !isEmpty(auth) ? (
					<Component {...props} />
				) : (
					<Redirect to="/" />
				)
			}
		/>
	);
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
	};
};

export default connect(mapStateToProps)(PrivateRoute);
