import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import useMe from "../hooks/useMe";

const AdminRoute = (props: RouteProps) => {
    const {user, loading} = useMe();

    if(loading) {
        return null;
    };

    if(user?.isAdmin) {
        return <Route {...props} />
    } else {
        return <Redirect to="/" />
    }
};
export default AdminRoute;