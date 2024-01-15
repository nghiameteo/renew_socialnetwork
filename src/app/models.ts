// model api
export interface UserRequest<T> {
    user: T;
}

export interface User {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
}

export interface UserResponse {
    user: User;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface NewUser {
    username: string;
    email: string;
    password: string;
}

export interface NewUserRequest {
    user: NewUser;
}

export interface UpdateUser {
    email?: string;
    password?: string;
    username?: string;
    bio?: string;
    image?: string;
}

export interface ProfileResponse {
    profile: Profile;
}

export interface Profile {
    username: string;
    bio: string;
    image: string;
    following: boolean;
}

export interface Article {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updateAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: Profile;
}

export interface SingleArticleResponse {
    article: Article
}

export interface MultipleArticleResponse {
    articles: Article[];
    articlesCount: number;
}

export interface NewArticle {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
}

export interface UpdateArticle {
    title?: string;
    description?: string;
    body?: string;
}

export interface Comment {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: Profile;
}

export interface SingleCommentResponse {
    comment: Comment;
}

export interface MultipleCommentResponse {
    comments: Comment[];
}

export interface NewComment {
    body: string;
}

export interface NewCommentRequest {
    comment: NewComment;
}

export interface TagsResponse {
    tags: string[];
}

export interface Tag {
    tag: string;
}

export interface GenericErrorModel {
    errors: { body: string[] };
}

export function ConvertDate(dateString: string) {
    const date = new Date(dateString);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
