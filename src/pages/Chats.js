import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import ChatItem from "../components/ChatItem";
import {useDispatch, useSelector} from "react-redux";
import {threadsThunkCreator} from "../store/threadsReducer";

function Chats(props) {
    const dispatch = useDispatch()
    const thread = useSelector((state) => state.threads.threads.threads)

    useEffect(()=>{
        dispatch(threadsThunkCreator(localStorage.getItem("token")))
    }, [dispatch])

    return ( <div className={styles.cardDeck}>
            <div className={styles.chatsFormBackground}>
                <div className={styles.profileTextName}>Беседы</div>
                {thread && thread.map(thread =>
                    <ChatItem data={thread}/>
                )}
            </div>
        </div>
    )
}

export default Chats;