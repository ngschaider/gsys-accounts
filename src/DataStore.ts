import EventEmitter from "events";

const eventEmitter = new EventEmitter();

export enum DataStoreEvent {
    LoggedInChanged = "LoggedInChanged",
};

class DataStore {
    private static data = {
        loggedIn: document.cookie.includes("GSYSAuthCookie")
    };

    public static get loggedIn() {
        return this.data.loggedIn;
    }
    public static set loggedIn(value) {
        this.data.loggedIn = value;
        eventEmitter.emit(DataStoreEvent.LoggedInChanged, this.data.loggedIn);
    }

    public static on(e: string, listener: (...args: any[]) => void) {
        return eventEmitter.on(e, listener);
    }

    public static off(e: string, listener: (...args: any[]) => void) {
        return eventEmitter.off(e, listener);
    }

}

export default DataStore;