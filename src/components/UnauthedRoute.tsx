import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import useLoggedIn from "../hooks/useLoggedIn";

const UnauthedRoute = (props: RouteProps) => {
    const loggedIn = useLoggedIn();

    if(loggedIn) {
        return <Redirect to="/" />
    } else {
        return <Route {...props} />
    }
};
export default UnauthedRoute;