import React from 'react';
import styles from "../pages/style.module.css";
import {Link} from "react-router-dom";

const CommentItem = (props) => {
    const URL = 'http://d.wolf.16.fvds.ru/api/storage/photos/' + props.data.user_avatar.photo_path;

    return (
        <div>
            <div className={styles.theChat}>
                <img src={URL}
                     className={styles.chatImage}/>
                <div className={styles.commentTextAuthorName} >{props.data.user_first_name} {props.data.user_last_name}:</div>
                <div className={styles.chatsText}>{props.data.comment_text}</div>
                <div className={styles.commentTextAuthorName}
                     style={{marginRight: "10px", marginLeft: "auto"}}
                    >{props.data.edited? props.data.edited.slice(0,10) : props.data.created.slice(0,10)}</div>
            </div>
        </div>
    );
};

export default CommentItem;