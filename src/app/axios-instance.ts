import axios from "axios";
import { LoadTokenFromLocalStorage } from "./utils";
// base URL 
export const api = axios.create({
    baseURL: 'https://node-express-conduit.appspot.com/api',
})

//interceptors
api.interceptors.request.use((config) => {
    if (LoadTokenFromLocalStorage()) {
        config.headers.set('Authorization', 'Bearer ' + LoadTokenFromLocalStorage());
    }
    return config;
})