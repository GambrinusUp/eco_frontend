import React from 'react';
import styles from "../pages/style.module.css";
import {Link, NavLink} from "react-router-dom";

const ChatItem = (props) => {
    const url = 'http://d.wolf.16.fvds.ru' + props.data.user_avatar[0].photo_path;
    return (
        <div>
            <div className={styles.theChat}>
                <img src={url}
                     className={styles.chatImage}/>
                <Link to={`/chat/${props.data.thread_id}`} className={styles.chatsText}>{props.data.thread_title}</Link>
                <div className={styles.chatsAuthorsText}>Автор: {props.data.user_first_name} {props.data.user_last_name}</div>
            </div>
        </div>
    );
};

export default ChatItem;