import {useDispatch, useSelector} from "react-redux";
import styles from "./style.module.css";
import PostItem from "../components/PostItem";
import {Pagination} from "antd";
import {useEffect, useState} from "react";
import {loadBlogPostsThunkCreator, loadBlogThunkCreator} from "../store/blogsReducer";
import {loadCategoriesThunkCreator} from "../store/categoriesReducer";
import {loadFeedThunkCreator} from "../store/feedReducer";

const Feed = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const maxPageNumber = useSelector((state) => state.feed.maxPage);
    const [pageNumber, setPageNumber] = useState("1");
    const posts = useSelector((state) => state.feed.posts);

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1])).sub;
        } catch (e) {
            return null;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        dispatch(loadFeedThunkCreator(pageNumber, token));
    }, [dispatch, pageNumber]);

    return (
        <div className={styles.cardDeck}>
            <div className={styles.blogsItemDeck}>
                <div style={{width:"80%"}}>
                {posts && posts.map((value) => (
                    <PostItem  key={value.post_id} id={value.post_id} first_name={value.user_first_name}
                               last_name={value.user_last_name} post_title={value.post_title}
                               post_description={value.post_text} post_tags={value.categories}
                               dislikes={value.count_dislikes} likes={value.count_likes}
                               blogId={value.blog_id} photos={value.photos}
                               is_dislike={value.is_dislike} is_like={value.is_like}
                               page={pageNumber}
                               showBtn={parseJwt(token) === value.user_id}/>
                ))}
                <div style={{display:"flex", justifyContent:"center"}}>
                    <Pagination style={{marginTop: 20, paddingBottom:20}}
                                defaultCurrent={1} total={maxPageNumber * 10}
                                onChange={(event) => {setPageNumber(event);}}/>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Feed;