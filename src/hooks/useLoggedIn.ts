import { useEffect, useState } from "react";
import DataStore, { DataStoreEvent } from "../DataStore";

const useLoggedIn = (onChange?: (loggedIn: boolean) => void) => {
    const [loggedIn, setLoggedIn] = useState(DataStore.loggedIn);

    useEffect(() => {
        const onLoggedInChanged = (loggedIn: boolean) => {
            setLoggedIn(loggedIn);
            onChange?.(loggedIn);
        }

        DataStore.on(DataStoreEvent.LoggedInChanged, onLoggedInChanged);
        return () => {
            DataStore.off(DataStoreEvent.LoggedInChanged, onLoggedInChanged);
        }
    }, [onChange]);

    return loggedIn;
}

export default useLoggedIn;