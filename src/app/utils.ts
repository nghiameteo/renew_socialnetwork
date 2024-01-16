const tokenKey: string = "token";

export const LoadTokenFromLocalStorage = (): string | undefined | null => {
    return localStorage.getItem(tokenKey);
}

export const SaveTokenFromLocalStorage = (token: string | undefined) => {
    
}