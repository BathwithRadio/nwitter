import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom";

//function component
const Profile = () => {
    // Hook 사용
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};
export default Profile;