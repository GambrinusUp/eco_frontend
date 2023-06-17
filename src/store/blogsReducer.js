import {blogsAPI} from "../api/blogsAPI";

const LOAD_BLOGS = "LOAD_BLOGS"
const LOAD_BLOG = "LOAD_BLOG"
const LOAD_BLOG_POSTS = "LOAD_BLOG_POSTS"

let initialState = {
    blogsArr : [],
    blog : '',
    blogPostsArr : [],
    page : 1
}

const blogsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOAD_BLOGS:
            console.log(action.blogs);
            newState.blogsArr = action.blogs;
            return newState;
        case LOAD_BLOG:
            newState.blog = action.blog;
            return newState;
        case LOAD_BLOG_POSTS:
            newState.blogPostsArr = action.blogPosts;
            return newState;
        default:
            return state;
    }
}

export function loadBlogsActionCreator(blogs) {
    return {type: LOAD_BLOGS, blogs : blogs}
}

export function loadBlogActionCreator(blog) {
    return {type: LOAD_BLOG, blog: blog}
}

export function loadBlogPostsActionCreator(blogPosts) {
    return {type: LOAD_BLOG_POSTS, blogPosts: blogPosts}
}

export const loadBlogPostsThunkCreator = (id, page) => (dispatch) => {
    return blogsAPI.getBlogPosts(id, page).then(
        (data) => {
            console.log(data);
            if(data.status === 200) {
                dispatch(loadBlogPostsActionCreator(data.blog_posts));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
}

export const loadBlogThunkCreator = (id) => (dispatch) => {
    return blogsAPI.getBlogById(id).then(
        (data) => {
            console.log(data);
            if(data.status === 200) {
                dispatch(loadBlogActionCreator(data.blog));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
}

export const loadBlogsThunkCreator = () => (dispatch) => {
    return blogsAPI.getBlogs(initialState.page).then(
        (data) => {
            console.log(data);
            if(data.status === 200) {
                dispatch(loadBlogsActionCreator(data.blogs));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
}

export default blogsReducer;
