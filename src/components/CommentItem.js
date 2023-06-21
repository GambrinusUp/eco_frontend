import React from 'react';
import styles from "../pages/style.module.css";
import {Link} from "react-router-dom";

const CommentItem = (props) => {
    return (
        <div>
            <div className={styles.theChat}>
                <img src="https://sportishka.com/uploads/posts/2022-11/thumbs/1667456833_43-sportishka-com-p-kachok-s-borodoi-instagram-43.jpg"
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