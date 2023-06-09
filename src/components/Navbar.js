import {Link} from "react-router-dom";

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
        zIndex: 1
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
    }
};


const Navbar = () => {
    return(
        <nav style={styles.navbar}>
            <div style={styles.navbar_title}>
                <Link style={styles.navbar_title} to="/">EcoFriends</Link>
            </div>
            <div>
                <>
                    <Link to="/registration" style={styles.navbar_text}>Регистрация</Link>
                    <Link to="/authorization" style={styles.navbar_text}>Вход</Link>
                </>
            </div>
        </nav>
    )
}

export default Navbar;
