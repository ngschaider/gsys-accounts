import { useState } from "react";
import API from "../API";
import DataStore from "../DataStore";
import { deleteCookie } from "../utils/cookie";

const useLogout = () => {
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        if(!DataStore.loggedIn) return;

        setLoading(true);
        const res = await API.logout();
        setLoading(false);

        if(res.type === "success") {
            deleteCookie("GSYSAuthCookie");
            DataStore.loggedIn = false;
        }
    }

    return {logout, loading};
};
export default useLogout;