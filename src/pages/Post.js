import styles from "./style.module.css";
import {Button, Card, Carousel, Input, message, Modal, Pagination, Tag} from "antd";
import {DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined} from "@ant-design/icons";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {loadPostCommentsThunkCreator, loadPostDetailsThunkCreator} from "../store/postsReducer";
import {useDispatch, useSelector} from "react-redux";
import CommentItem from "../components/CommentItem";
import {createBlogThunkCreator, loadBlogPostsThunkCreator, loadBlogsThunkCreator} from "../store/blogsReducer";
import {createCommentThunkCreator} from "../store/commentsReducer";
import {
    createNewReactionThunkCreator,
    deleteReactionFromCommThunkCreator,
    deleteReactionFromPostThunkCreator
} from "../store/reactionsReducer";

const Post = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const post_details = useSelector((state) => state.posts.post_details);
    const [pageNumberPost, setPageNumberPost] = useState("1");
    const maxPageNumber = useSelector((state) => state.posts.commMaxPage);
    const post_comments = useSelector((state) => state.posts.post_comments);
    const [commentText, setCommentText] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();

    const handleOk = () => {
        if(commentText !== ''){
            const token = localStorage.getItem("token");
            const userId = JSON.parse(atob(token.split('.')[1])).sub;
            console.log(userId)
            dispatch(createCommentThunkCreator(userId, id, commentText, token)).then(() => {
                success("Комментарий создан");
            });
        }
        else {
            warning("Введите данные в поля");
        }
    };

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1])).sub;
        } catch (e) {
            return null;
        }
    };

    const warning = (error) => {
        messageApi.open({
            type: 'warning',
            content: error,
        });
    };

    const success = (message) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };

    const createReaction = (reaction) => {
        let token = localStorage.getItem("token");
        if(token !== '') {
            let userId = parseJwt(token);

            if (reaction === 'like' && post_details.is_dislike === true) {
                dispatch(deleteReactionFromPostThunkCreator(userId, id));
            }

            if (reaction === 'dislike' && post_details.is_like === true) {
                dispatch(deleteReactionFromPostThunkCreator(userId, id));
            }


            dispatch(createNewReactionThunkCreator(userId, id, "", reaction, token)).then(() => {
                dispatch(loadPostDetailsThunkCreator(id, token));
            });
        }
    }

    const deleteReaction = (reaction) => {
        let token = localStorage.getItem("token");
        if(token !== '') {
            let userId = parseJwt(token);
            console.log(reaction);
            dispatch(deleteReactionFromPostThunkCreator(userId, id)).then(() => {
                dispatch(loadPostDetailsThunkCreator(id, pageNumberPost, token));
            })
        }
    }

    useEffect(() => {
        let token = localStorage.getItem("token");
        dispatch(loadPostDetailsThunkCreator(id, token)).then(() => {
            console.log("check");
            dispatch(loadPostCommentsThunkCreator(id, pageNumberPost, token));
        });
    }, [dispatch, id, pageNumberPost]);

    return (
        <div className={styles.cardDeck}>
            {contextHolder}
            <div className={styles.blogItemDeck}>
                <div style={{width:"80%"}}>
                    {post_details && (
                        <Card style={{margin: "auto 0", marginTop: "15px"}}
                              id={post_details.post_id}>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column"}}>
                                <div style={{marginRight: "auto", display: "flex", flexDirection: "column", width: "100%"}}>
                                    <div className={"author"} style={{color:"#424242"}}>
                                        {post_details.user_first_name} {" "} {post_details.user_last_name}
                                    </div>
                                    <div style={{marginTop:10}}>
                                        {post_details.categories && post_details.categories.map((value) => (
                                            <Tag key={value.category_id} color="green">{value.category_name}</Tag>
                                        ))}
                                    </div>
                                    <div className={"title"} style={{color:"#6D8251", fontWeight: "bold", fontSize:18, marginTop:10}}>
                                        {post_details.post_title}
                                    </div>
                                    <div style={{paddingTop:10}}>
                                        <Carousel style={{  margin: 0}}>
                                            {post_details.photos.map(photo => (
                                                <div key={photo.photo_id}>
                                                    <img src={"http://d.wolf.16.fvds.ru"
                                                        + photo.photo_path} alt="Carousel Slide"/>
                                                </div>
                                            ))}
                                        </Carousel>
                                    </div>
                                    <div className={"description"} style={{color:"#888888", fontSize:13, marginTop:10}}>
                                        {post_details.post_text}
                                    </div>
                                    <div style={{display:"flex", justifyContent:"space-between", paddingTop:20}}>
                                        <div style={{display: "flex", alignItems:"center", textAlign:"center"}}>
                                            {post_details.is_like ?
                                                ( <LikeFilled
                                                    style={{fontSize:20, paddingRight:5}}
                                                    onClick={() => deleteReaction("like")}/>) :
                                                ( <LikeOutlined
                                                    style={{fontSize:20, paddingRight:5}}
                                                    onClick={() => createReaction("like")}/>)}
                                            {post_details.count_likes}
                                        </div>
                                        <div style={{display: "flex", alignItems:"center", textAlign:"center"}}>
                                            {post_details.is_dislike ?
                                                ( <DislikeFilled
                                                    style={{fontSize:20, paddingRight:5}}
                                                    onClick={() => deleteReaction("dislike")}/>) :
                                                ( <DislikeOutlined
                                                    style={{fontSize:20, paddingRight:5}}
                                                    onClick={() => createReaction("dislike")}/>)}
                                            {post_details.count_dislikes}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>)}
                    <Card style={{margin: "auto 0", marginTop: "15px"}}>
                        <div className={"title"} style={{color:"#6D8251", fontWeight: "bold", fontSize:16}}>
                            Комментарии
                        </div>
                        {token && token !== '' && (<div style={{display:"flex", flexDirection:"row", paddingTop:5}}>
                            <Input
                                value={commentText}
                                placeholder="Введите текст комменатрия"
                                onChange={(event) => setCommentText(event.target.value)}
                            />
                            <Button type={"primary"} style={{marginLeft:10}}
                                onClick={handleOk}>
                                Отправить
                            </Button>
                        </div>)}
                        {post_comments && post_comments.map((value) =>  (
                            <CommentItem key={value.comment_id}
                                         postId={value.post_id}
                                         id={value.comment_id}
                                         userId={value.user_id}
                                         first_name={value.user_first_name}
                                         last_name={value.user_last_name}
                                         text={value.comment_text}
                                         likes={value.count_like}
                                         dislikes={value.count_dislikes}
                                         showBtn={parseJwt(token) === value.user_id}
                                         is_like={value.is_like}
                                         is_dislike={value.is_dislike}
                                         page={pageNumberPost}/>
                        ))}
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <Pagination style={{marginTop: 20}}
                                        defaultCurrent={1} total={maxPageNumber * 10}
                                        onChange={(event) => {setPageNumberPost(event);}}/>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Post;