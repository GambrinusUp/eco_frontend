import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {logout, refreshTokenThunkCreator} from "../store/authenticationReducer";

const styles = {
    navbar: {
        height: "60px",
        backgroundColor: "#4C711C",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        position: "fixed",
        zIndex: 100
    },
    navbar_title: {
        textDecoration: 'none',
        display: "flex",
        //fontFamily: "Inter",
        fontStyle: "normal",
        fontSize: "32px",
        color: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: '10px'
    },
    navbar_text: {
        display: "inline-block",
        fontStyle: "normal",
        fontSize: "20px",
        color: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: '10px',
        textDecoration: 'none',
        outline: 'none',
        paddingRight: '10px',
        cursor: "pointer"
    },
    navbar_text_after_title: {
        paddingLeft: "30px",
        display: "inline-block",
        fontStyle: "normal",
        fontSize: "20px",
        color: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: '10px',
        textDecoration: 'none',
        outline: 'none',
        paddingRight: '10px'
    }
};


const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const logoutUser = () => {
        let token = localStorage.getItem("token");
        if(token !== null) {
            dispatch(logout(token))
                .then(() => {
                    setIsLoggedIn(false);
                })
                .catch(() => {
                    setIsLoggedIn(false);
                });
        }
        navigate('/', {replace: true});
    };

    useEffect(() => {
        console.log("rendering");
        let token = localStorage.getItem("token");
        if (token !== null && token !== '') {
            let refresh_token = localStorage.getItem("refresh_token");
            console.log(refresh_token);
            if(refresh_token !== null && refresh_token !== '') {
                dispatch(refreshTokenThunkCreator(refresh_token)).catch(() => {
                    localStorage.setItem("token", '');
                    localStorage.setItem("refresh_token", '');
                    setIsLoggedIn(false);
                });
            }
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [dispatch, setIsLoggedIn, token]);

    return(
        <nav style={styles.navbar}>
            <div style={styles.navbar_title}>
                <Link style={styles.navbar_title} to="/">EcoFriends</Link>
                <Link to="/blogs" style={styles.navbar_text_after_title}>Блоги</Link>
            </div>
            <div>
                {!isLoggedIn && (
                    <>
                        <Link to="/registration" style={styles.navbar_text}>Регистрация</Link>
                        <Link to="/authorization" style={styles.navbar_text}>Вход</Link>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <Link to="/profile" style={styles.navbar_text}>Профиль</Link>
                        <div style={styles.navbar_text} onClick={logoutUser}>Выход</div>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar;
