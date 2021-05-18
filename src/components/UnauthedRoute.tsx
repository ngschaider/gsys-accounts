import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import useLoggedIn from "../hooks/useLoggedIn";

const UnauthedRoute = (props: RouteProps) => {
    const isLoggedIn = useLoggedIn();

    if(isLoggedIn) {
        return <Redirect to="/" />
    } else {
        return <Route {...props} />
    }
};
export default UnauthedRoute;