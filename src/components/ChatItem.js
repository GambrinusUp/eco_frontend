import React from 'react';
import styles from "../pages/style.module.css";

const ChatItem = (props) => {
    console.log(props.data)
    return (
        <div>
            <div className={styles.theChat}>
                <img src="https://cdn-icons-png.flaticon.com/512/7789/7789682.png"
                     className={styles.chatImage}/>
                <div className={styles.chatsText}>{props.data.thread_title}</div>
                <div className={styles.chatsAuthorsText}>Автор: {props.data.user_first_name} {props.data.user_last_name}</div>
            </div>
        </div>
    );
};

export default ChatItem;