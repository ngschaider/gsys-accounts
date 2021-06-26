import { useEffect, useState } from "react";
import API, { ServiceUserData } from "../API";

const useServiceUsers = (id?: string) => {
    const [serviceUsers, setServiceUsers] = useState<ServiceUserData[]|null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!serviceUsers && !loading) {
            setLoading(true);
            API.getServiceUsers(id).then(res => {
                setServiceUsers(res.serviceUsers ?? null);
                setLoading(false);
            });
        }
    }, [serviceUsers, loading, id]);

    const invalidate = () => {
        setServiceUsers(null);
    }

    return {serviceUsers, invalidate, loading};
};
export default useServiceUsers;