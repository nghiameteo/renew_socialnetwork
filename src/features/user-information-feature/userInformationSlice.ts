import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../app/axios-instance";
import { LoginUser, NewUser, NewUserRequest, UpdateUser, User, UserResponse } from "../../app/models";
import router from "../../app/router";
import { RootState } from "../../app/store";
import { ClearTokenToLocalStorage, LoadTokenFromLocalStorage, SaveTokenToLocalStorage } from "../../app/utils";
interface UserState {
    isReady: boolean;
    isAuthorized: boolean;
    isLoading: boolean;
    token?: string;
    user?: User;
}
const initialState: UserState = {
    isReady: false,
    isAuthorized: false,
    isLoading: false,
}
// update user
export const updateUserAsync = createAction<UpdateUser>('user/updateUserAsync')

const tryUpdateUser = async (user: UpdateUser): Promise<UserResponse> => {
    return (await api.put<UserResponse>('/user', { user })).data;
}

function* updateUserSaga(action: PayloadAction<UpdateUser>) {
    try {
        yield put(setIsLoading(true));
        const response: UserResponse = yield call(tryUpdateUser, action.payload);
        yield put(update(response.user));
        yield put(setIsLoading(false));
    }
    catch (error) {
        yield put(setIsLoading(false));
        console.log('updateUserSaga', error);
    }
}

//logout
export const getLogOut = createAction('user/getLogOut');

function* logoutSaga() {
    try {
        yield put(setIsLoading(true));
        yield put(logout());
        ClearTokenToLocalStorage();
        yield put(setIsLoading(false));
        router.navigate('/login')
    }
    catch (error) {
        yield put(setIsLoading(false));
        console.log('logoutSaga', error);
    }
}

// login action
export const loginAsync = createAction<LoginUser>('user/loginAsync');

const tryLogin = async (data: LoginUser): Promise<UserResponse> => {
    return (await api.post<UserResponse>('/users/login', { user: data })).data;
}

function* loginSaga(action: PayloadAction<LoginUser>) {
    yield put(setIsLoading(true));
    try {
        const response: UserResponse = yield call(tryLogin, action.payload);
        SaveTokenToLocalStorage(response.user.token);
        yield put(login(response.user));
        yield put(setIsLoading(false));
        router.navigate('/');
    }
    catch (error) {
        console.log('login', error)
        yield put(setIsLoading(false));

    }
}

//register
export const registerAsync = createAction<NewUser>('user/registerAsync');

const tryRegister = async (data: NewUser): Promise<NewUserRequest> => {
    return (await api.post<NewUserRequest>('/users', { user: data })).data;
}

function* registerSaga(action: PayloadAction<NewUser>) {
    yield put(setIsLoading(true));
    try {
        const response: UserResponse = yield call(tryRegister, action.payload);
        yield put(login(response.user));
        yield put(setIsLoading(false));
        router.navigate('/');
    }
    catch (error) {
        console.error('register', error);
        yield put(setIsLoading(false));
    }
}

//get current user available
export const getCurrentUserAsync = createAction('user/getCurrentUserAsync');

const tryGetCurrentUser = async (): Promise<UserResponse> => {
    return (await api.get<UserResponse>('/user')).data;
};

function* getCurrentUserSaga() {
    try {
        const response: UserResponse = yield call(tryGetCurrentUser);
        yield put(login(response.user));
    }
    catch (error) {
        console.error('get current user', error)
    }
}

//try load current user from available token
export const loadCurrentToken = createAction('user/loadCurrentToken');

function* loadCurrentTokenSaga() {
    const currentToken = LoadTokenFromLocalStorage();;
    if (!!currentToken && currentToken !== '') {
        yield put(loadToken(currentToken!));
        yield call(getCurrentUserSaga);
    }
}

export function* userSaga() {
    yield takeLatest(loadCurrentToken, loadCurrentTokenSaga);
    yield takeLatest(getCurrentUserAsync, getCurrentUserSaga);
    yield takeLatest(registerAsync, registerSaga);
    yield takeLatest(loginAsync, loginSaga);
    yield takeLatest(getLogOut, logoutSaga);
    yield takeLatest(updateUserAsync, updateUserSaga);
};

/* UserSlice */
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            return { ...state, isLoading: action.payload };
        },
        loadToken: (_, action: PayloadAction<string>) => {
            return {
                isReady: true,
                isAuthorized: true,
                isLoading: false,
                token: action.payload,
                user: undefined,
            }
        },
        register: (state, action: PayloadAction<User>) => {
            return { ...state, isLoading: false };
        },
        login: (_, action: PayloadAction<User>) => {
            const user = action.payload;
            return {
                isReady: true,
                isAuthorized: true,
                isLoading: false,
                token: user.token,
                user: user,
            }
        },
        logout: () => {
            return {
                isReady: true,
                isLoading: false,
                isAuthorized: false,
            }
        },
        update: (state, action: PayloadAction<User>) => {
            const user = action.payload;
            return {
                ...state,
                user: user,
            }
        }
    }
});

export const { setIsLoading, loadToken, register, login, logout, update } = userSlice.actions;

export const selectIsAuthorized = (state: RootState) => state.user.isAuthorized;
export const selectIsLoading = (state: RootState) => state.user.isLoading;
export const selectUser = (state: RootState) => state.user.user;
export const selectToken = (state: RootState) => state.user.token;
export const selectIsReady = (state: RootState) => state.user.isReady;

export default userSlice.reducer