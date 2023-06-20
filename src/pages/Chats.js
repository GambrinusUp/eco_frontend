import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import ChatItem from "../components/ChatItem";
import {useDispatch, useSelector} from "react-redux";
import {threadsThunkCreator} from "../store/threadsReducer";
import { Pagination } from 'antd'


function Chats(props) {
    const dispatch = useDispatch()
    const thread = useSelector((state) => state.threads.threads.threads)
    const paginate = useSelector((state) => state.threads.threads)
    const [pageNum, setPageNum] = useState(1)

    function paginationSwitch(page, count){
        setPageNum(page)
    }

    useEffect(()=>{
        dispatch(threadsThunkCreator(localStorage.getItem("token"), pageNum))
    }, [dispatch, pageNum])

    if(!thread){
        return(
            <div className={styles.chatsText} />
        )
    }
    return (
        <div className={styles.cardDeck}>
            <div className={styles.chatsFormBackground}>
                <div className={styles.chatTitle}>Беседы</div>
                {thread && thread.map(thread =>
                    <ChatItem data={thread}/>
                )}
                <Pagination className={styles.pagination}
                            onChange={paginationSwitch}
                            defaultCurrent={1}
                            total={paginate.pageInfo.pageCount * 10} />
            </div>

        </div>
    )
}

export default Chats;