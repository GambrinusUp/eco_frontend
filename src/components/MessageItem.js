import React from 'react';
import styles from "../pages/style.module.css";

const MessageItem = (props) => {
    const url = 'http://d.wolf.16.fvds.ru' + props.data.user_avatar[0].photo_path;
    return (
        <div>
            <div className={styles.theChat}>
                <img src={props.data.user_avatar ? url : 'https://sun6-21.userapi.com/s/v1/if1/KRndOKs7PodK1pDZC6K85eAe8Wa1pUvSFEvEAMty8r63Kx31xmbpBd2Wo_-J4Yia1LMS5-Pl.jpg?size=962x962&quality=96&crop=201,0,962,962&ava=1'}
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

export default MessageItem;