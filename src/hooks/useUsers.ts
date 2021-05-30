import { useEffect, useState } from "react";
import API, { UserData } from "../API";

const useUsers = () => {
    const [users, setUsers] = useState<UserData[]|null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!users && !loading) {
            setLoading(true);
            API.getUsers().then(res => {
                setUsers(res.users ?? null);
                setLoading(false);
            });
        }
    }, [users, loading]);

    const invalidate = () => {
        setUsers(null);
    }

    return {users, invalidate, loading};
};
export default useUsers;