import styles from "./style.module.css";
import BlogItem from "../components/BlogItem";
import {Pagination} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {loadSubBlogsThunkCreator} from "../store/subReducer";
import {loadOwnerThunkCreator} from "../store/blogsReducer";

const OwnerBlogs = () => {
    let token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const [pageNumber, setPageNumber] = useState("1");
    const navigate = useNavigate();
    const blogs = useSelector((state) => state.blogs.blogsArr);
    const maxPage = useSelector((state) => state.subs.maxPageNumber);

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1])).sub;
        } catch (e) {
            return null;
        }
    };

    useEffect(() => {
        let userId = parseJwt(token);
        console.log(userId);
        if (token !== '') {
            dispatch(loadOwnerThunkCreator(userId, pageNumber, token));
        } else {
            navigate('/blogs', {replace: true});
        }
        // eslint-disable-next-line
    }, [dispatch, pageNumber]);

    return(
        <div className={styles.cardDeck}>
            <div className={styles.blogItemDeck}>
                <div>
                    <div style={{display:"flex", justifyContent:"center", paddingTop:10, fontSize:30, fontWeight:"bold"}}>
                        Собственые посты:
                    </div>
                    {blogs && blogs.map((value) => (
                        <BlogItem key={value.blog_id} id={value.blog_id} first_name={value.user_first_name}
                                  last_name={value.user_last_name} blog_title={value.blog_title}
                                  blog_description={value.blog_description}
                                  blog_id={value.blog_id}
                                  show_buttons={value.user_id === parseJwt(token)}
                                  page={pageNumber}
                                  user_id={value.user_id}
                                  avatar={value.user_avatar}
                                  photo={value.blog_avatar[0]}/>
                    ))}
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <Pagination style={{marginTop: 20, paddingBottom:20}}
                                    defaultCurrent={1} total={maxPage * 10}
                                    onChange={(event) => {setPageNumber(event);}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OwnerBlogs;