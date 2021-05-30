import { buildQueryString } from "./utils/query";

type APIResponse = {
    type: "error" | "success";
    message?: string;
    code?: string;
}

export type LoginInput = {
    usernameOrEmail: string,
    password: string;
}
type LoginResponse = APIResponse & {
    token?: string;
}

export type UserData = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    changePasswordOnLogin: boolean;
    isAdmin: boolean;
}

export type CreateUserInput = {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    changePasswordOnLogin: boolean;
    isAdmin: boolean;
}

export type UpdateUserInput = {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    changePasswordOnLogin: boolean;
    isAdmin: boolean;
}

export type UserResponse = APIResponse & {
    user?: UserData;
}

export type UsersResponse = APIResponse & {
    users?: UserData[];
}

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


    //#region Private Helper Functions

    private static async prepareOutput(res: Response): Promise<APIResponse> {
        if(res.status === 200 && res.body) {
            const json = await res.json();
            if(json.type === "error") {
                this.error(json.code, json.message);
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