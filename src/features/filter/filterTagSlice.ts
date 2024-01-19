import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../app/axios-instance";
import { Tag, TagsResponse } from "../../app/models";
import { RootState } from "../../app/store";

interface FilterState {
    isLoading: boolean;
    tag?: string;
    tags: string[];
};

const initialState: FilterState = {
    isLoading: false,
    tag: undefined,
    tags: [],
}

export const getTagsAsync = createAction('filter/getTagsAsync');
const tryGetTags = async (): Promise<TagsResponse> => {
    return (await api.get<TagsResponse>('/tags')).data;
}

function* getTagsSaga() {
    try {
        yield put(setIsLoading(true));
        const response: TagsResponse = yield call(tryGetTags);
        yield put(loadTags(response));
        yield put(setIsLoading(false));
    }
    catch (error) {
        console.error('tagsSaga', error);
        yield put(setIsLoading(false));
    }
}

export function* filterSaga() {
    yield takeLatest(getTagsAsync, getTagsSaga)
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            return { ...state, isLoading: action.payload }
        },
        loadTags: (state, action: PayloadAction<TagsResponse>) => {
            return { ...state, tags: action.payload.tags }
        },
        findTag: (state, action: PayloadAction<Tag>) => {
            return { ...state, tag: action.payload.tag }
        },
        cleanTag: (state) => {
            return { ...state, tag: undefined }
        },

    }
});

export const { setIsLoading, loadTags, findTag, cleanTag } = filterSlice.actions;
export const selectFilter = (state: RootState) => state.filter;
export const selectTags = (state: RootState) => state.filter.tags;
export const selectTag = (state: RootState) => state.filter.tag;

export default filterSlice.reducer;