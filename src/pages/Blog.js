import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {loadBlogPostsThunkCreator, loadBlogThunkCreator} from "../store/blogsReducer";
import {useDispatch, useSelector} from "react-redux";
import styles from "./style.module.css";
import {Card} from "antd";
import PostItem from "../components/PostItem";

const Blog = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const blog = useSelector((state) => state.blogs.blog);
    const blogPostsArr = useSelector((state) => state.blogs.blogPostsArr);

    useEffect(() => {
        dispatch(loadBlogThunkCreator(id));
        dispatch(loadBlogPostsThunkCreator(id, 1));
    }, [dispatch, id]);

    return (
        <div className={styles.cardDeck}>
            <div className={styles.blogItemDeck}>
                <div style={{width:"80%"}}>
                    <Card style={{margin: "auto 0", marginTop: "20px", minHeight: 200, width: "100%",
                        opacity: 1}}>
                        <div style={{ display: "flex", flexDirection: "row", padding: "20px" }}>
                            <div
                                style={{
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    width: "100px",
                                    height: "100px",
                                }}
                            >
                                <img src={"https://image.pngaaa.com/57/1026057-middle.png"} alt={'blog'} style={{ width: "100%" }} />
                            </div>
                            <div style={{ flex: "1", paddingLeft: "40px" }}>
                                <div style={{ color: "#6D8251", fontWeight: "bold", fontSize: 16 }}>
                                    {blog.blog_title}
                                </div>
                                <div style={{ color: "#888888", fontSize: 12 }}>
                                    {blog.blog_description}
                                </div>
                            </div>
                        </div>
                    </Card>
                    {blogPostsArr && blogPostsArr.map((value) => (
                        <PostItem  key={value.post_id} id={value.post_id} first_name={value.user_first_name}
                                   last_name={value.user_last_name} post_title={value.post_title}
                                   post_description={value.post_text} post_tags={value.categories}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Blog;