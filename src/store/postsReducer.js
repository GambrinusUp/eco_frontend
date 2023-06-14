import {postsAPI} from "../api/postsAPI";

const LOAD_POST_REACTIONS = "LOAD_POST_REACTIONS"

let initialState = {
    likes : '',
    dislikes : ''
}

const postsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
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