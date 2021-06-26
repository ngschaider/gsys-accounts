import dataStore from "./DataStore";
import { deleteCookie } from "./utils/cookie";
import { buildQueryString } from "./utils/query";

type APIResponse = {
    type: "error" | "success";
    message?: string;
    code?: string;
}

//#region AuthController Types

export type LoginInput = {
    usernameOrEmail: string,
    password: string;
}
export type LoginResponse = APIResponse & {
    token?: string;
}

//#endregion

//#region UserController Types

export type UserData = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    resetPasswordOnLogin: boolean;
    isAdmin: boolean;
}

export type CreateUserInput = {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    resetPasswordOnLogin: boolean;
    isAdmin: boolean;
}

export type UpdateUserInput = {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    resetPasswordOnLogin: boolean;
    isAdmin: boolean;
}

export type UserResponse = APIResponse & {
    user?: UserData;
}

export type UsersResponse = APIResponse & {
    users?: UserData[];
}

//#endregion

//#region ServiceController Types

export type ServiceProtocol = "http" | "https";

export enum ServiceType {
    Transparent = "transparent",
    PVE = "pve",
    PhpMyAdmin = "phpmyadmin",
}

export type ServiceData = {
    id: string;
    name: string;
    type: string;
    hostname: string;
    targetHost: string;
    targetPort: string;
    protocol: ServiceProtocol;
}

export type CreateServiceInput = {
    id: string;
    hostname: string;
    targetHost: string;
    targetPort: string;
    protocol: ServiceProtocol;
    type: ServiceType;
}

export type ServicesResponse = APIResponse & {
    services?: ServiceData[];
}

export type ServiceResponse = APIResponse & {
    service?: ServiceData;
}

//#endregion

//#region ServiceUserController Types

export type ServiceUserData = {
    id: string;
    service: ServiceData;
    user: UserData;
    username: string;
    password: string;
    data: any;
}

export type CreateServiceUserInput = {
    username: string;
    password: string;
    serviceId: string;
    userId: string;
}

export type ServiceUsersResponse = APIResponse & {
    serviceUsers?: ServiceUserData[];
}

export type ServiceUserResponse = APIResponse & {
    serviceUser?: ServiceUserData;
}

//#endregion

class API {

    static baseUrl: string = "https://api.gsys.at";

    //#region AuthController

    public static async login(data: LoginInput): Promise<LoginResponse> {
        const res = await this.request("/auth/login" + buildQueryString(data));

        return this.prepareOutput(res);
    }

    public static async logout(): Promise<APIResponse> {
        const res = await this.request("/auth/logout");

        return this.prepareOutput(res);
    }

    //#endregion

    //#region UserController

    /**
     * Requests the user who's currently logged in.
     */
    public static async me(): Promise<UserResponse> {
        const res = await this.request("/user/me");
        return this.prepareOutput(res);
    }

    public static async deleteUser(id: string): Promise<APIResponse> {
        const res = await this.request("/user/delete/" + encodeURIComponent(id));
        return this.prepareOutput(res);
    }

    /**
     * Creates a new user
     * @param data Data for the new user.
     */
    public static async createUser(data: CreateUserInput): Promise<UserResponse> {
        const res = await this.request("/user", {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "post",
        });
        return this.prepareOutput(res);
    }

    public static async updateUser(id: string, data: UpdateUserInput): Promise<UserResponse> {
        const res = await this.request("/user/update/" + id, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "post",
        });
        return this.prepareOutput(res);
    }

    /**
     * Gets all users' data
     */
    public static async getUsers(): Promise<UsersResponse> {
        const res = await this.request("/user");
        return this.prepareOutput(res);
    }

    /**
     * Gets a single user's data.
     * @param id ID of the user
     */
    public static async getUser(id: string): Promise<UserResponse> {
        const res = await this.request("/user/" + encodeURIComponent(id));
        return this.prepareOutput(res);
    }

    //#endregion

    //#region ServiceUserController

    public static async getServiceUsers(userId?: string): Promise<ServiceUsersResponse> {
        const suffix = userId ?? "";
        const res = await this.request("/serviceUser/" + suffix);
        return this.prepareOutput(res);
    }
    
    public static async createServiceUser(data: CreateServiceUserInput): Promise<ServiceUserResponse> {
        const res = await this.request("/serviceUser", {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "post",
        });
        return this.prepareOutput(res);
    }
    
    public static async deleteServiceUser(id: string): Promise<APIResponse> {
        const res = await this.request("/serviceUser/delete/" + id);
        return this.prepareOutput(res);
    }

    //#endregion

    //#region ServiceController

    public static async getServices(): Promise<ServicesResponse> {
        const res = await this.request("/service");
        return this.prepareOutput(res);
    }

    public static async deleteService(id: string): Promise<APIResponse> {
        const res = await this.request("/service/delete/" + id);
        return this.prepareOutput(res);
    }

    public static async createService(data: CreateServiceInput): Promise<ServiceResponse> {
        const res = await this.request("/service", {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "post",
        });
        return this.prepareOutput(res);
    }

    //#endregion

    //#region Private Helper Functions

    private static async prepareOutput(res: Response): Promise<APIResponse> {
        if(res.status === 200 && res.body) {
            const json = await res.json();
            if(json.type === "error") {
                if(json.code === "INVALID_TOKEN") {
                    deleteCookie("GSYSAuthCookie");
                    dataStore.loggedIn = false;
                } else {
                    this.error(json.code, json.message);
                }
            }

            return json;
        } else {
            this.error("UNKNOWN_ERROR", "Unbekannter Fehler.");
            return new Promise<APIResponse>(r => r({
                type: "error",
                code: "UNKNOWN_ERROR",
                message: "Unbekannter Fehler.",
            }));
        }
    }

    private static async error(code: string, message: string) {
        alert("Fehler bei der Serveranfrage (Code " + code + "):\n" + message);
    }

    private static async request(url: string, options: RequestInit = {}) {
        return await fetch(this.baseUrl + url, {
            credentials: "include",
            ...options
        });
    }

    //#endregion

}

export default API;