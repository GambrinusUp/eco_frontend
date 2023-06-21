import {Card, Input, message, Modal, Popconfirm} from "antd";
import {
    DeleteOutlined,
    DislikeFilled,
    DislikeOutlined,
    EditOutlined,
    LikeFilled,
    LikeOutlined
} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {deleteCommentThunkCreator, editCommentThunkCreator} from "../store/commentsReducer";
import {createNewReactionThunkCreator, deleteReactionFromCommThunkCreator} from "../store/reactionsReducer";
import {loadPostCommentsThunkCreator} from "../store/postsReducer";

function CommentItem(props) {
    const dispatch = useDispatch();
    const [commentText, setCommentText] = useState(props.text);
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const handleOk = () => {
        if(commentText !== ''){
            const token = localStorage.getItem("token");
            const userId = JSON.parse(atob(token.split('.')[1])).sub;
            dispatch(editCommentThunkCreator(props.id, props.postId, commentText, token)).then(() => {
                success("Комментарий отредактирован");
                dispatch(loadPostCommentsThunkCreator(props.postId, props.page, token));
            }).catch(() => warning("Ошибка"));
            handleCancel();
        }
        else {
            warning("Введите данные в поля");
        }
    };

    const deleteComment = () => {
        const token = localStorage.getItem("token");
        dispatch(deleteCommentThunkCreator(props.id, props.postId, token)).then(() => {
            dispatch(loadPostCommentsThunkCreator(props.postId, props.page, token));
            success("Комментарий удален");
        }).catch(() => warning("Ошибка"));
    }

    const handleCancel = () => {
        setOpen(false);
    };

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
        dispatch(createNewReactionThunkCreator(userId, "", props.id, reaction, token)).then(() => {
            dispatch(loadPostCommentsThunkCreator(props.postId, props.page, token));
        });
    }

    const deleteReaction = (reaction) => {
        console.log(reaction);
        let token = localStorage.getItem("token");
        let userId = parseJwt(token);
        dispatch(deleteReactionFromCommThunkCreator(userId, props.id)).then(() => {
            dispatch(loadPostCommentsThunkCreator(props.postId, props.page, token));
        });
    }

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

    return (
        <>
            {contextHolder}
            <Card  size="small" style={{marginTop: 10}}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div className={"title"} style={{color:"#6D8251", fontWeight: "bold", fontSize:14}}>
                        {props.first_name} {" "} {props.last_name}
                    </div>
                    {props.showBtn && (<div>
                        <EditOutlined style={{fontSize: 18, paddingRight: 10}} onClick={() => setOpen(true)}/>
                        <Popconfirm
                            title="Вы хотите удалить комментарий?"
                            onConfirm={deleteComment}
                            okText="Да"
                            cancelText="Нет"
                        >
                        <DeleteOutlined style={{fontSize: 18}}/>
                        </Popconfirm>
                    </div>)}
                </div>
                <div className={"description"} style={{color:"#888888", fontSize:12, marginTop:5}}>
                    {props.text}
                </div>
                <div style={{display:"flex", justifyContent:"space-between", marginTop:5}}>
                    <div style={{display: "flex", alignItems:"center", textAlign:"center"}}>
                        {props.is_like ?
                            ( <LikeFilled
                                style={{fontSize:16, paddingRight:5}}
                                onClick={() => deleteReaction("like")}/>) :
                            ( <LikeOutlined
                                style={{fontSize:16, paddingRight:5}}
                                onClick={() => createReaction("like")}/>)}
                        {props.likes}
                    </div>
                    <div style={{display: "flex", alignItems:"center", textAlign:"center"}}>
                        {props.is_dislike ?
                            ( <DislikeFilled
                                style={{fontSize:16, paddingRight:5}}
                                onClick={() => deleteReaction("dislike")}/>) :
                            ( <DislikeOutlined
                                style={{fontSize:16, paddingRight:5}}
                                onClick={() => createReaction("dislike")}/>)}
                        {props.dislikes}
                    </div>
                </div>
            </Card>
            <Modal
                title="Редактирование комментария"
                centered
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
            >
                Текст комментария
                <Input
                    value={commentText}
                    placeholder="Введите комментарий"
                    onChange={(event) => setCommentText(event.target.value)}
                />
            </Modal>
        </>
    )
}

export default CommentItem;