const tokenKey: string = "token";

export const LoadTokenFromLocalStorage = (): string | undefined | null => {
    return localStorage.getItem(tokenKey);
}

export const SaveTokenToLocalStorage = (token: string | undefined) => {
    
}