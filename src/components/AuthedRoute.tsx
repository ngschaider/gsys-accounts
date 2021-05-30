import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import useLoggedIn from "../hooks/useLoggedIn";

const AuthedRoute = (props: RouteProps) => {
    const loggedIn = useLoggedIn();

    if(loggedIn) {
        return <Route {...props} />
    } else {
        return <Redirect to="/login" />
    }
};
export default AuthedRoute;