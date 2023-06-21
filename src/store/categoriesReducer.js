import {authorizeAPI} from "../api/authorizeAPI";
import {loginActionCreator} from "./authenticationReducer";
import {categoriesAPI} from "../api/categoriesAPI";

const LOAD_CATEGORIES = "LOAD_CATEGORIES";

let initialState = {
    categories : []
}

const categoriesReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOAD_CATEGORIES:
            newState.categories = action.categories;
            return newState;
        default:
            return state;
    }
}

export function loadCategoriesActionCreator(categories) {
    return {type: LOAD_CATEGORIES, categories: categories}
}

export const loadCategoriesThunkCreator = () => (dispatch) => {
    return categoriesAPI.getCategories().then(
        (data) => {
            console.log(data);
            if(data.status === 200 || data.status === 201) {
                dispatch(loadCategoriesActionCreator(data.categories));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
};

export default categoriesReducer;