import {blogsAPI} from "../api/blogsAPI";
import blog from "../pages/Blog";

const LOAD_BLOGS = "LOAD_BLOGS"
const LOAD_BLOG = "LOAD_BLOG"
const LOAD_BLOG_POSTS = "LOAD_BLOG_POSTS"
const CREATE_BLOG = "CREATE_BLOG"

let initialState = {
    blogsArr : [],
    blog : '',
    blogPostsArr : [],
    maxPageNumber : 1,
    postMaxPage : 1
}

const blogsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOAD_BLOGS:
            console.log(action.blogs);
            newState.blogsArr = action.blogs;
            console.log(action.maxPage);
            newState.maxPageNumber = action.maxPage;
            return newState;
        case LOAD_BLOG:
            newState.blog = action.blog;
            return newState;
        case LOAD_BLOG_POSTS:
            newState.blogPostsArr = action.blogPosts;
            newState.postMaxPage = action.maxPagePosts;
            return newState;
        case CREATE_BLOG:
            //newState.blogsArr.push(action.blog);
            return newState;
        default:
            return state;
    }
}

export function loadBlogsActionCreator(blogs) {
    return {type: LOAD_BLOGS, blogs : blogs.blogs, maxPage : blogs.maxPage}
}

export function loadBlogActionCreator(blog) {
    return {type: LOAD_BLOG, blog: blog}
}

export function loadBlogPostsActionCreator(blogPosts) {
    return {type: LOAD_BLOG_POSTS, blogPosts: blogPosts.blog_posts, maxPagePosts: blogPosts.postsMaxPage}
}

export function createBlogActionCreator(blog) {
    return {type: CREATE_BLOG, blog: blog}
}

export const deleteBlogThunkCreator = (token, id) => (dispatch) => {
    return blogsAPI.deleteBlog(token, id).then(
        (data) => {
            console.log(data);
            if(data.status === 200) {
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
}

export const editBlogThunkCreator = (blogId, userId, name, description, avatar, token) => (dispatch) => {
    return blogsAPI.editBlog(blogId, userId, name, description, avatar, token).then(
        (data) => {
            console.log(data);
            if(data.status === 200) {
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
}

export const createBlogThunkCreator = (userId, name, description, avatar, token) => (dispatch) => {
    return blogsAPI.createBlog(userId, name, description, avatar, token).then(
        (data) => {
            console.log(data);
            if(data.status === 200 || data.status === 201) {
                dispatch(createBlogActionCreator(data.blog));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
}

export const loadBlogPostsThunkCreator = (id, page, token) => (dispatch) => {
    return blogsAPI.getBlogPosts(id, page, token).then(
        (data) => {
            console.log(data);
            if (data.status === 200 || data.status === 404) {
                dispatch(loadBlogPostsActionCreator(data));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
}

export const loadBlogThunkCreator = (id, token) => (dispatch) => {
    return blogsAPI.getBlogById(id, token).then(
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

export const loadBlogsThunkCreator = (pageNumber) => (dispatch) => {
    return blogsAPI.getBlogs(pageNumber).then(
        (data) => {
            console.log(pageNumber);
            if(data.status === 200) {
                dispatch(loadBlogsActionCreator(data));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
}

export default blogsReducer;
