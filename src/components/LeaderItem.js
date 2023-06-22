import React from 'react';
import styles from "../pages/style.module.css";
import {Link, NavLink} from "react-router-dom";

const LeaderItem = (props) => {
    const url = props.data.user_avatar[0] ? 'http://d.wolf.16.fvds.ru' + props.data.user_avatar[0].photo_path : 'https://avatars.mds.yandex.net/i?id=b2266d78cef1da20e2f0fd46d284fa030678aa4a-9137964-images-thumbs&n=13'
    return (
        <div>
            <div className={styles.theChat}>
                <img src={props.data.user_avatar ? url : 'https://sun6-21.userapi.com/s/v1/if1/KRndOKs7PodK1pDZC6K85eAe8Wa1pUvSFEvEAMty8r63Kx31xmbpBd2Wo_-J4Yia1LMS5-Pl.jpg?size=962x962&quality=96&crop=201,0,962,962&ava=1'}
                     className={styles.chatImage}/>
                <div className={styles.commentTextAuthorName} style={{fontSize:"20px"}} >{props.data.user_first_name} {props.data.user_last_name}</div>
                <div className={styles.chatsText}
                     style={{fontSize:"25px", marginRight:"30px", marginLeft:"auto"}}
                >Рейтинг: {props.data.total_count}</div>
            </div>
        </div>
    );
};

export default LeaderItem;