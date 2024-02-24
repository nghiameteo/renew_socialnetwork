const tokenKey: string = "token";

export const LoadTokenFromLocalStorage = (): string | undefined | null => {
    return localStorage.getItem(tokenKey);
}

export const SaveTokenToLocalStorage = (token: string | undefined) => {
    if (!token) {
        ClearTokenToLocalStorage();
    } else {
        localStorage.setItem(tokenKey, token);
    }
}

export const ClearTokenToLocalStorage = () => {
    localStorage.removeItem(tokenKey);
}