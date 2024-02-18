import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { Profile, ProfileResponse } from "../../../app/models";
import { api } from "../../../app/axios-instance";
import { put, call, takeLatest } from "redux-saga/effects";
import { RootState } from "../../../app/store";
import router from "../../../app/router";

interface UserProfileState {
    isLoadingProfile: boolean;
    isLoadingFollow: boolean;
    profile?: Profile;
}
const initialState: UserProfileState = {
    isLoadingProfile: false,
    isLoadingFollow: false
}

export const getUserProfileAsync = createAction<string>('userProfile/getUserProfileAsync');
const tryGetUserProfileAsync = async (username: string): Promise<ProfileResponse> => {
    return (await api.get<ProfileResponse>(`/profiles/${username}`)).data;
}
function* getUserProfileSaga(action: PayloadAction<string>) {
    try {
        yield put(setIsLoadingProfile(true));
        const response: ProfileResponse = yield call(tryGetUserProfileAsync, action.payload);
        yield put(loadProfile(response.profile));
        yield put(setIsLoadingProfile(false));
    }
    catch (error) {
        console.error('getUserProfileSaga', error);
        yield put(setIsLoadingProfile(false));
        router.navigate("/");
    }
}

export interface FollowUserParams {
    username: string;
    isFollowing: boolean;
}
export const toggleFollowUserProfileAsync = createAction<FollowUserParams>('userProfile/toggleFollowUserProfileAsync');
const tryToggleFollowUserProfile = async (params: FollowUserParams) => {
    const url = `/profiles/${params.username}/follow`;
    return (await (params.isFollowing
        ? api.delete<Profile>(url)
        : api.post<Profile>(url, { username: params?.username })
    )).data;
}
function* toggleFollowUserProfileSaga(action: PayloadAction<FollowUserParams>) {
    try {
        yield put(setIsLoadingFollow(true));
        const response: ProfileResponse = yield call(tryToggleFollowUserProfile, action.payload);
        yield put(toggleFollow(response.profile));
        yield put(setIsLoadingFollow(false));
    }
    catch (error) {
        console.error('toggleFollowUserProfileSaga', error);
        yield put(setIsLoadingFollow(false));
    }
}

export function* userProfileSaga() {
    yield takeLatest(getUserProfileAsync, getUserProfileSaga);
    yield takeLatest(toggleFollowUserProfileAsync, toggleFollowUserProfileSaga);
}

export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        setIsLoadingProfile: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isLoadingProfile: action.payload,
            }
        },
        setIsLoadingFollow: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isLoadingFollow: action.payload,
            }
        },
        loadProfile: (state, action: PayloadAction<Profile>) => {
            return {
                ...state,
                profile: action.payload,
            }
        },
        toggleFollow: (state, action: PayloadAction<Profile>) => {
            return {
                ...state,
                profile: action.payload,
            }
        }

    }
})

export const { setIsLoadingProfile, setIsLoadingFollow, loadProfile, toggleFollow } = userProfileSlice.actions;
export const selectIsLoadingProfile = (state: RootState) => state.userProfile.isLoadingProfile;
export const selectIsLoadingFollow = (state: RootState) => state.userProfile.isLoadingFollow;
export const selectProfile = (state: RootState) => state.userProfile.profile;
export default userProfileSlice.reducer; 