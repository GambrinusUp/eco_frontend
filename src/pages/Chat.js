import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {useDispatch, useSelector} from "react-redux";
import {commentsThunkCreator, threadsThunkCreator} from "../store/threadsReducer";
import { Pagination } from 'antd'
import MessageItem from "../components/MessageItem";


function Chat(props) {
    const dispatch = useDispatch()
    const comments = useSelector((state) => state.threads.comments.comments_in_thread)
    const paginate = useSelector((state) => state.threads.comments)
    const [pageNum, setPageNum] = useState(1)
    const [id, setID] = useState('');
    function paginationSwitch(page, count){
        setPageNum(page)
    }

    useEffect(()=>{
        console.log("NEW DATA: ", comments);
        const path = window.location.pathname;
        const parts = path.split('/');
        const id = parts[2];
        setID(id);
        dispatch(commentsThunkCreator(localStorage.getItem("token"), id, pageNum))
        console.log("ETO COMMENTS: ", comments)
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
                {comments && comments.map(comment =>
                    <MessageItem data={comment}/>
                )}
                <Pagination className={styles.pagination}
                            onChange={paginationSwitch}
                            defaultCurrent={1}
                            total={paginate.pageInfo.pageCount * 10} />
            </div>

        </div>
    )
}

export default Chat;