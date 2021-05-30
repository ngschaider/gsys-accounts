import { useEffect, useState } from "react";
import API, { UserData } from "../API";
import useLoggedIn from "./useLoggedIn";

const useUsers = () => {
    const [user, setUser] = useState<UserData|null>(null);
    const [loading, setLoading] = useState(false);

    useLoggedIn(() => invalidate());

    useEffect(() => {
        if(!user && !loading) {
            setLoading(true);
            API.me().then(res => {
                setLoading(false);
                setUser(res.user ?? null);
            });
        }
    }, [user, loading]);

    const invalidate = () => {
        setUser(null);
    }

    return {user, invalidate, loading};
};
export default useUsers;