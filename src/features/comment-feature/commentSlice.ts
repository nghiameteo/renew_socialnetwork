import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { Comment, MultipleCommentResponse, NewComment, SingleCommentResponse } from "../../app/models";
import { api } from "../../app/axios-instance";
import { call, put, takeLatest } from "redux-saga/effects";
import { RootState } from "../../app/store";

interface CommentState {
    isLoadingLoadComment: boolean;
    isLoadingAddComment: boolean;    
    isLoadingRemoveComment: boolean;
    comments: Comment[];
}
const initialState: CommentState = {
    isLoadingLoadComment: false,
    isLoadingAddComment: false,
    isLoadingRemoveComment:false,
    comments: [],
}

export const getCommentAsync = createAction<string>('comment/getCommentAsync');
const tryGetComment = async (slug: string): Promise<MultipleCommentResponse> => {
    return (await api.get<MultipleCommentResponse>(`/articles/${slug}/comments`)).data;
}
function* getCommentSaga(action: PayloadAction<string>) {
    try {
        yield put(setIsLoadingLoadComment(true));
        const response: MultipleCommentResponse = yield call(tryGetComment, action.payload);
        yield put(load(response.comments));
        yield put(setIsLoadingLoadComment(false));
    }
    catch (error) {
        console.error('getCommentSaga', error);
        yield put(setIsLoadingLoadComment(false));
    }
}

export interface AddCommentParams {
    slug: string;
    comment: NewComment;
}
export const addCommentAsync = createAction<AddCommentParams>('comment/addCmtAsync');
const tryAddComment = async (params: AddCommentParams): Promise<SingleCommentResponse> => {
    return (await api.post<SingleCommentResponse>(`/articles/${params.slug}/comments`, { comment: params.comment })).data;
}
function* addCommentSaga(action: PayloadAction<any>) {
    try {
        yield put(setIsLoadingAddComment(true));
        const response: SingleCommentResponse = yield call(tryAddComment, action.payload);
        yield put(add(response.comment));
        yield put(setIsLoadingAddComment(false));
    }
    catch (error) {
        console.error('addCmtSaga', error);
        yield put(setIsLoadingAddComment(false));
    }
}

export interface DelCommentParams {
    slug: string;
    id: number;
}
export const delCommentAsync = createAction<DelCommentParams>('comment/delCommentAsync');
const tryDelComment = async (params: DelCommentParams) => {
    return (await api.delete<SingleCommentResponse>(`/articles/${params.slug}/comments/${params.id}`)).data;
}
function* delCommentSaga(action: PayloadAction<DelCommentParams>) {
    try {
        yield put(setIsLoadingRemoveComment(true));
        const response: SingleCommentResponse = yield call(tryDelComment, action.payload);
        yield put(del(action.payload.id));
        yield put(setIsLoadingRemoveComment(false));
    }
    catch (error) {
        console.error('delCmtSaga', error);
        yield put(setIsLoadingRemoveComment(false));
    }
}

export function* commentSaga() {
    yield takeLatest(getCommentAsync, getCommentSaga);
    yield takeLatest(addCommentAsync, addCommentSaga);
    yield takeLatest(delCommentAsync, delCommentSaga);

}
export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        setIsLoadingLoadComment: (state, action: PayloadAction<boolean>) => {
            return { ...state, isLoadingLoadComment: action.payload }
        },
        setIsLoadingAddComment: (state, action: PayloadAction<boolean>) => {
            return { ...state, isLoadingAddComment: action.payload }
        },
        setIsLoadingRemoveComment: (state, action: PayloadAction<boolean>) => {
            return { ...state, isLoadingRemoveComment: action.payload }
        },
        load: (state, action: PayloadAction<Comment[]>) => {
            const comments = action.payload;
            return {
                ...state,
                comments: comments,
            }
        },
        add: (state, action: PayloadAction<Comment>) => {
            const comment = action.payload;
            return {
                ...state,
                comments: [comment, ...state.comments],
            }
        },
        del: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                comments: state.comments.filter((comment) => comment.id !== action.payload)
            }
        },
    }
});
export const { setIsLoadingLoadComment,setIsLoadingAddComment, setIsLoadingRemoveComment, load, add, del } = commentSlice.actions;
export const selectCommentState = (state: RootState) => state.comment;
export const selectComments = (state: RootState) => state.comment.comments;
export default commentSlice.reducer;