import React, {useEffect} from "react";
import styles from "./style.module.css";
import {useDispatch, useSelector} from "react-redux";
import {profile, profileThunkCreator} from "../store/profilesReducer";

function Profile(props) {
    const dispatch = useDispatch()
    const profile = useSelector((state) => state.profiles.profile)
    const url = 'http://d.wolf.16.fvds.ru';

    useEffect(()=>{
        dispatch(profileThunkCreator(localStorage.getItem("token")))
    }, [dispatch])

    return (
        <div className={styles.cardDeck}>
            <div className={styles.profileFormBackground}>
                <div className={styles.profileForm}>
                    <img src={profile.user_avatar ? url + profile.user_avatar[0].photo_path: 'https://avatars.mds.yandex.net/i?id=b2266d78cef1da20e2f0fd46d284fa030678aa4a-9137964-images-thumbs&n=13'}
                         className={styles.image} />
                    <div className={styles.profileTextName}>{profile.first_name + ' ' + profile.last_name}</div>
                </div>
                <div className={styles.profileForm}>
                    <div className={styles.profileText}>Город: {profile.city}</div>
                    <div className={styles.profileText}>Дата рождения: {profile.birth_date}</div>
                    <div className={styles.profileText}>Email: {profile.email}</div>
                    <div className={styles.profileText}>Телефон: {profile.phone}</div>
                </div>
            </div>
        </div>
    )
}

export default Profile;