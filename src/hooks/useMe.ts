import { useEffect, useState } from "react";
import API, { UserData } from "../API";
import useLoggedIn from "./useLoggedIn";

const useUsers = () => {
    const [user, setUser] = useState<UserData|null>(null);
    const [loading, setLoading] = useState(false);

    useLoggedIn(() => invalidate());

    useEffect(() => {
        (async () => {
            if(user || loading) return;

            setLoading(true);
            const res = await API.me();
            setUser(res.user ?? null);
            setLoading(false);
        })();
    }, [user, loading]);

    const invalidate = () => {
        setUser(null);
    }

    return {user, invalidate, loading};
};
export default useUsers;