import { useEffect, useState } from "react";
import API, { ServiceData } from "../API";

const useServices = () => {
    const [services, setServices] = useState<ServiceData[]|null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            if(!services && !loading) {
                setLoading(true);
                const res = await API.getServices();
                    
                setServices(res.services ?? null);
                setLoading(false);
            }
        })();
    }, [services, loading]);

    const invalidate = () => {
        setServices(null);
    }

    return {services, invalidate, loading};
};
export default useServices;