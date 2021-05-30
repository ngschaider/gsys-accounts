import EventEmitter from "events";


export enum DataStoreEvent {
    DataChanged = "DataChanged",
    LoggedInChanged = "LoggedInChanged"
};

export type DataStoreContent = {
    loggedIn: boolean;
}

class DataStore extends EventEmitter {

    constructor() {
        super();
        this.setMaxListeners(100);
    }

    private data: DataStoreContent = {
        loggedIn: document.cookie.includes("GSYSAuthCookie")
    }

    public get loggedIn() {
        return this.data.loggedIn;
    }

    public set loggedIn(value: boolean) {
        const changed = this.loggedIn !== value;
        this.data.loggedIn = value;
        if(changed) {
            this.emit(DataStoreEvent.LoggedInChanged, this.loggedIn);
        }
    }

}

const dataStore = new DataStore();

export default dataStore;