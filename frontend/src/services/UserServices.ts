import { makeRequest, method } from "./ServiceConfig";

const UserServices = {
    async getMe() {
        return await makeRequest(`/api/users/me`, method.GET, {});
    },
    async login(req: {email: string, password: string}) {
        return await makeRequest(`/api/users/login`, method.POST, req);
    },
    async register(req: {name:string, email: string, password: string}) {
        const response =  await makeRequest(`/api/users`, method.POST, req);
        if(response) {
            localStorage.setItem('user', JSON.stringify(response.user))
        }
        return response;
    },
    async logout () {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }
}

export default UserServices