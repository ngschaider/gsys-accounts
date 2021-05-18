import { buildQueryString } from "./utils/query";

type APIResponse = {
    type: "error" | "success";
    message?: string;
    code?: string;
}

export type LoginData = {
    usernameOrEmail: string,
    password: string;
}
type LoginResponse = APIResponse & {
    token?: string;
}

export type RegisterData = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
}
type RegisterResponse = APIResponse & {
    token?: string;
};

export type UserData = {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
}

export type MeResponse = APIResponse & {
    user?: UserData;
}

class API {

    static baseUrl: string = "https://api.gsys.at";

    public static async login(data: LoginData): Promise<LoginResponse> {
        const res = await fetch(this.baseUrl + "/auth/login" + buildQueryString(data));

        return this.prepareOutput(res);
    }

    public static async register(data: RegisterData): Promise<RegisterResponse> {
        const res = await fetch(this.baseUrl + "/auth/register" + buildQueryString(data));

        return this.prepareOutput(res);
    }

    public static async logout(): Promise<APIResponse> {
        const res = await fetch(this.baseUrl + "/auth/logout", {
            credentials: "include",
        });

        return this.prepareOutput(res);
    }

    public static async me(): Promise<MeResponse> {
        const res = await fetch(this.baseUrl + "/auth/me", {
            credentials: "include",
        });
        return this.prepareOutput(res);
    }

    private static async prepareOutput(res: Response): Promise<APIResponse> {
        if(res.status === 200 && res.body) {
            return await res.json();
        } else {
            return {
                type: "error",
                message: "Unbekannter Fehler",
            }
        }
    }

}

export default API;