import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';
import saga from "./saga";
import userReducer from "../features/user-infomation-feature/userInfomationSlice";

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(saga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;