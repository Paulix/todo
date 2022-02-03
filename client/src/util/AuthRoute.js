import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { motion } from "framer-motion";

const AuthRoute = ({ component: Component, authenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                !!authenticated ? (
                    <div>
                        <Component {...props} />
                    </div>
                ) : (
                    <Redirect to="/signin" />
                )
            }
        />
    );
};

const mapStateToProps = (state) => ({
    authenticated: state.authenticated,
});

export default connect(mapStateToProps)(AuthRoute);
