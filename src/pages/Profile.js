import React from "react";

function Profile(props) {
    return (
        <div className="profile">
            <img src={props.photo} alt="User Profile" />
            <h2>{props.name}</h2>
            <p>{props.city}</p>
        </div>
    );
}

export default Profile;