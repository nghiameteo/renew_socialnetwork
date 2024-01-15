import axios from "axios";
// base URL 
export const api=axios.create({
    baseURL: 'https://node-express-conduit.appspot.com/api',
})

//interceptors
api.interceptors.request.use((config)=> {
    const token= localStorage.getItem('token');
    if (token) {
        config.headers.set('Authorization', 'Bearer ' + token);        
    }
    return config;
})