import { useEffect, useState } from "react";
import DataStore, { DataStoreEvent } from "../DataStore";

const useLoggedIn = (): boolean => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        DataStore.on(DataStoreEvent.LoggedInChanged, setLoggedIn);
        setLoggedIn(DataStore.loggedIn);
        return () => {
            DataStore.off(DataStoreEvent.LoggedInChanged, setLoggedIn);
        }
    }, []);

    return loggedIn;
}
export default useLoggedIn;