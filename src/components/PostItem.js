import {Card, Carousel, Input, message, Modal, Popconfirm, Tag} from "antd";
import {
    CommentOutlined, DeleteOutlined,
    DislikeFilled,
    DislikeOutlined,
    EditOutlined,
    LikeFilled,
    LikeOutlined
} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createNewReactionThunkCreator, deleteReactionFromPostThunkCreator} from "../store/reactionsReducer";
import {
    createBlogThunkCreator,
    loadBlogPostsThunkCreator,
    loadBlogPostsWithTokenThunkCreator, loadBlogsThunkCreator
} from "../store/blogsReducer";
import {deletePostThunkCreator, editPostThunkCreator} from "../store/postsReducer";
import TextArea from "antd/es/input/TextArea";
import {useState} from "react";

function PostItem(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1])).sub;
        } catch (e) {
            return null;
        }
    };

    const createReaction = (reaction) => {
        let token = localStorage.getItem("token");
        let userId = parseJwt(token);
        dispatch(createNewReactionThunkCreator(userId, props.id, "", reaction, token)).then(() => {
            console.log(props.id, props.page, token);
            dispatch(loadBlogPostsThunkCreator(props.blogId, props.page, token));
        });
    }

    const deleteReaction = (reaction) => {
        let token = localStorage.getItem("token");
        let userId = parseJwt(token);
        console.log(reaction);
        dispatch(deleteReactionFromPostThunkCreator(userId, props.id)).then(() => {
            dispatch(loadBlogPostsThunkCreator(props.blogId, props.page, token));
        })
    }

    const deletePost = () => {
        let token = localStorage.getItem("token");
        dispatch(deletePostThunkCreator(props.id, token)).then(() => {
            dispatch(loadBlogPostsThunkCreator(props.blogId, props.page, token));
            success("Пост удален");
        });
    }

    const handleOk = () => {
        if(text !== '' && title !== ''){
            const token = localStorage.getItem("token");
            dispatch(editPostThunkCreator(props.id, title, text, token)).then(() => {
                dispatch(loadBlogPostsThunkCreator(props.blogId, props.page, token));
                success("Пост отредактирован");
            });
            handleCancel();
        }
    };

    const handleCancel = () => {
        setTitle("");
        setText("");
        setOpen(false);
    };

    const success = (message) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };

    return(
        <>
            {contextHolder}
            <Card style={{margin: "auto 0", marginTop: "15px"}}
                  id={props.id}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column"}}>
                    <div style={{marginRight: "auto", display: "flex", flexDirection: "column", width: "100%"}}>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <div className={"author"} style={{color:"#424242"}}>
                                {props.first_name} {" "} {props.last_name}
                            </div>
                            {props.showBtn && (<div>
                                <EditOutlined style={{fontSize: 20, paddingRight: 10}} onClick={() => {
                                    setTitle(props.post_title);
                                    setText(props.post_description);
                                    setOpen(true);
                                }}/>
                                <Popconfirm
                                    title="Вы хотите удалить пост?"
                                    onConfirm={deletePost}
                                    okText="Да"
                                    cancelText="Нет"
                                >
                                <DeleteOutlined style={{fontSize: 20}}/>
                                </Popconfirm>
                            </div>)}
                        </div>
                        <div style={{marginTop:10}}>
                            {props.post_tags && props.post_tags.map((value) => (
                                <Tag key={value.category_id} color="green">{value.category_name}</Tag>
                            ))}
                        </div>
                        <div className={"title"} style={{color:"#6D8251", fontWeight: "bold", fontSize:16, marginTop:10}}>
                            {props.post_title}
                        </div>
                        <div style={{paddingTop:10}}>
                            <Carousel style={{  margin: 0}}>
                                {props.photos.map(photo => (
                                    <div key={photo.photo_id}>
                                        <img src={"http://d.wolf.16.fvds.ru"
                                            + photo.photo_path} alt="Carousel Slide"/>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <div className={"description"} style={{color:"#888888", fontSize:12, marginTop:10}}>
                            {props.post_description}
                        </div>
                        <div style={{display:"flex", justifyContent:"space-between", paddingTop:20}}>
                            <div style={{display: "flex", alignItems:"center", textAlign:"center"}}>
                                {props.is_like ?
                                    ( <LikeFilled
                                        style={{fontSize:20, paddingRight:5}}
                                        onClick={() => deleteReaction("like")}/>) :
                                    ( <LikeOutlined
                                        style={{fontSize:20, paddingRight:5}}
                                        onClick={() => createReaction("like")}/>)}
                                {props.likes}
                            </div>
                            <div style={{display: "flex", alignItems:"center", textAlign:"center"}}>
                                <Link to={`/post/${props.id}`} style={{width:"100%", color:"black"}}>
                                    <CommentOutlined style={{fontSize:20}}/>
                                </Link>
                            </div>
                            <div style={{display: "flex", alignItems:"center", textAlign:"center"}}>
                                {props.is_dislike ?
                                    ( <DislikeFilled
                                        style={{fontSize:20, paddingRight:5}}
                                        onClick={() => deleteReaction("dislike")}/>) :
                                    ( <DislikeOutlined
                                        style={{fontSize:20, paddingRight:5}}
                                        onClick={() => createReaction("dislike")}/>)}
                                {props.dislikes}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            <Modal
                title="Редактирование поста"
                centered
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
            >
                Заголовок поста
                <Input
                    value={title}
                    placeholder="Введите заголовок поста"
                    onChange={(event) => setTitle(event.target.value)}
                />
                Текст поста
                <TextArea
                    value={text}
                    placeholder="Введите текст поста"
                    onChange={(event) => setText(event.target.value)}
                />
            </Modal>
        </>
    )
}

export default PostItem;