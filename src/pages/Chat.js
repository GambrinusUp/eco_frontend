import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {useDispatch, useSelector} from "react-redux";
import {commentsThunkCreator, postCommentThunkCreator, threadsThunkCreator} from "../store/threadsReducer";
import {Button, Input, Space, Pagination} from 'antd'
import MessageItem from "../components/MessageItem";


function Chat(props) {
    const dispatch = useDispatch()
    const comments = useSelector((state) => state.threads.comments.comments_in_thread)
    const paginate = useSelector((state) => state.threads.comments)
    const [pageNum, setPageNum] = useState(1)
    const [id, setID] = useState('');
    const [value, setValue] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [firstTime, setFirstTime] = useState(true)

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1])).sub;
        } catch (e) {
            return null;
        }
    };

    function paginationSwitch(page, count){
        setPageNum(page)
    }

    function submit(){
        const token = localStorage.getItem("token");
        const userId = JSON.parse(atob(token.split('.')[1])).sub;
        const textMessage = document.getElementsByTagName("input")[0].value
        console.log("token: ", token);
        console.log("userId: ", userId);
        console.log("threadId: ", id);
        console.log("textMessage: ", textMessage)
        dispatch(postCommentThunkCreator(localStorage.getItem("token"), userId, id, textMessage))
        console.log(document.getElementsByTagName("input")[0].value)
        setValue('')
        dispatch(commentsThunkCreator(localStorage.getItem("token"), id, paginate.pageInfo.pageCount))
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(()=>{
        const path = window.location.pathname;
        const parts = path.split('/');
        const id = parts[2];
        setID(id);
        dispatch(commentsThunkCreator(localStorage.getItem("token"), id, pageNum))
        //dispatch(commentsThunkCreator(localStorage.getItem("token"), id, paginate.pageInfo.pageCount))
    }, [dispatch, pageNum])

    if(!comments){
        console.log("comment - undefiend")
        return(
            <div className={styles.chatsText}>Gaaay</div>
        )
    }
    console.log("comment - fiend")
    return (
        <div className={styles.cardDeck}>
            <div className={styles.chatsFormBackground}>
                <div className={styles.chatTitle}>Беседа</div>
                <div className={styles.inputFormChats}>
                    <Space.Compact style={{ width: '100%' }}>
                        <Input style={{boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"}}
                               placeholder="Напишите своё сообщение!"
                               id={"input"}
                               value={value}
                               onChange={event => setValue(event.target.value)}
                        />
                        <Button style={{backgroundColor: "rgba(233, 250, 210, 0.47)",
                            color: "black",
                            boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
                        }}
                                onClick={submit}
                                type="primary">Отправить</Button>
                    </Space.Compact>
                </div>

                {comments && comments.map(comment =>
                    <MessageItem data={comment}/>
                )}
                <Pagination className={styles.pagination}
                            onChange={paginationSwitch}
                            defaultCurrent={pageNum}
                            total={paginate.pageInfo.pageCount * 10} />
            </div>

        </div>
    )
}

export default Chat;