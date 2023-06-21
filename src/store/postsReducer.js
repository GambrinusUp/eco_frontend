import {postsAPI} from "../api/postsAPI";

const LOAD_POST_REACTIONS = "LOAD_POST_REACTIONS"
const LOAD_POST_DETAILS = "LOAD_POST_DETAILS"
const LOAD_POST_COMMENTS = "LOAD_POST_COMMENTS"

let initialState = {
    post_details : '',
    post_comments : '',
    likes : '',
    dislikes : '',
    commMaxPage : 1
}

const postsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOAD_POST_DETAILS:
            newState.post_details = action.post_details;
            return newState;
        case LOAD_POST_COMMENTS:
            newState.post_comments = action.post_comments;
            newState.commMaxPage = action.maxPage;
            return newState;
        case LOAD_POST_REACTIONS:
            console.log(action.reactions);
            newState.likes = action.reactions.count_likes;
            newState.dislikes = action.reactions.count_dislikes;
            return newState;
        default:
            return state;
    }
}

export function loadPostReactionsActionCreator(reactions) {
    return {type: LOAD_POST_REACTIONS, reactions: reactions}
}

export function loadPostDetailsActionCreator(post_details) {
    return {type: LOAD_POST_DETAILS, post_details : post_details}
}

export function loadPostCommentsActionCreator(post_comments) {
    return {type: LOAD_POST_COMMENTS, post_comments : post_comments.comments_ratings,
        maxPage : post_comments.pageInfo.pageCount}
}

export const createPostThunkCreator = (id, title, text, token, categories) => (dispatch) => {
    return postsAPI.createPostInBlog(id, title, text, token).then(
        (data) => {
            console.log(data);
            if(data.status === 200 || data.status === 201) {
                const createCategoryPromises = categories.map(category => {
                    return postsAPI.addCategories(data.post, category, token);
                });
                return Promise.all(createCategoryPromises)
                    .then(() => {
                        // Все запросы для создания категорий успешно выполнены
                        return Promise.resolve();
                    })
                    .catch(error => {
                        // Обработка ошибок при выполнении запросов для создания категорий
                        console.error("Ошибка при создании категорий:", error);
                        return Promise.reject(error);
                    });
            }
            return Promise.reject();
        }
    );
}

export const loadPostCommentsThunkCreator = (id, page, token) => (dispatch) => {
    return postsAPI.getPostCommentsById(id, page, token).then(
        (data) => {
            console.log(data);
            if(data.status === 200) {
                dispatch(loadPostCommentsActionCreator(data.post_comments));
                return Promise.resolve();
            }
            if(data.status === 404) {
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
}

export const loadPostDetailsThunkCreator = (id, token) => (dispatch) => {
    return postsAPI.getPostById(id, token).then(
        (data) => {
            console.log(data);
            if(data.status === 200) {
                dispatch(loadPostDetailsActionCreator(data.post_details));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
}

export const deletePostThunkCreator = (id, token) => (dispatch) => {
    return postsAPI.deletePost(id, token).then(
        (data) => {
            console.log(data);
            if(data.status === 200) {
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
}

export const editPostThunkCreator = (postId, title, text, token)=> (dispatch) => {
    return postsAPI.editPost(postId, title, text, token).then(
        (data) => {
            console.log(data);
            if(data.status === 200) {
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
}

export const loadPostReactionsThunkCreator = (id) => (dispatch) => {
    return postsAPI.getPostReactions(id).then(
        (data) => {
            console.log(data);
            if(data.status === 200) {
                dispatch(loadPostReactionsActionCreator(data.reactions));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
}

export default postsReducer;