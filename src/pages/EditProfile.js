import React, {useEffect, useState} from 'react';
import styles from "./style.module.css"
import {Button, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {profileEditThunkCreator, profileThunkCreator} from "../store/profilesReducer";
import PhoneInput from "react-phone-input-2";
const EditProfile = () => {
    const dispatch = useDispatch()
    const profile = useSelector((state) => state.profiles.profile)
    const url = 'http://d.wolf.16.fvds.ru';
    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const[city, setCity] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')


    function editBtn(){
        console.log(firstName)
        dispatch(profileEditThunkCreator(localStorage.getItem("token"), firstName, lastName, email, password))
        window.location.href = '/profile';
    }
    useEffect(()=>{
        dispatch(profileThunkCreator(localStorage.getItem("token")))
        setFirstName(profile.first_name)
        setLastName(profile.last_name)
        setCity(profile.city)
        setEmail(profile.email)
    }, [dispatch])

    if(profile.first_name === undefined){
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className={styles.cardDeck}>
                <div className={styles.profileFormBackground} style={{flexDirection:"column"}}>
                    <div className={styles.profileForm}>
                        <div className={styles.profileTextName}>Редактирование профиля</div>
                    </div>
                    <div className={styles.profileForm}>
                        <div style={{color:"Black", marginLeft:"30px", marginBottom:"10px"}}>Имя</div>
                        <Input value={firstName}
                               defaultValue={profile.first_name}
                               onChange={event => setFirstName(event.target.value)}
                               style={{marginBottom:"20px",
                                    marginLeft:"30px",
                                    width:"auto"}}
                        />
                        <div style={{color:"Black", marginLeft:"30px", marginBottom:"10px"}}>Фамилия</div>
                        <Input value={lastName}
                               defaultValue={profile.last_name}
                               onChange={event => setLastName(event.target.value)}
                               style={{marginBottom:"20px",
                                   marginLeft:"30px",
                                   width:"auto"}}
                        />

                        <div style={{color:"Black", marginLeft:"30px", marginBottom:"10px"}}>Email</div>
                        <Input value={email}
                               defaultValue={profile.email}
                               onChange={event => setEmail(event.target.value)}
                               style={{marginBottom:"20px",
                                   marginLeft:"30px",
                                   width:"auto"}}
                        />
                        <div style={{color:"Black", marginLeft:"30px", marginBottom:"10px"}}>Пароль</div>
                        <Input.Password value={password}
                               placeholder="Введите пароль"
                               onChange={event => setPassword(event.target.value)}
                               style={{marginBottom:"20px",
                                   marginLeft:"30px",
                                   width:"auto"}}
                        />

                        <Button type="primary"
                                onClick={editBtn}
                                style={{backgroundColor: "#A9BE8C",
                                    marginLeft:"30px",
                                    marginBottom:"30px"}}
                        >Обновить</Button>
                    </div>
                </div>
            </div>
            )
        </div>
    );
};

export default EditProfile;