import React, {useEffect} from "react";
import styles from "./style.module.css";
import {useDispatch, useSelector} from "react-redux";
import {profile, profileThunkCreator} from "../store/profilesReducer";

function Profile(props) {
    const dispatch = useDispatch()
    const profile = useSelector((state) => state.profiles.profile)

    useEffect(()=>{
        dispatch(profileThunkCreator(localStorage.getItem("token")))
    }, [dispatch])

    return (
        <div className={styles.cardDeck}>
            <div className={styles.profileFormBackground}>
                <div className={styles.profileForm}>
                    <img src={'https://eternalhost.net/wp-content/uploads/2019/06/circled-user-male-skin-type-1-2.png'}
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