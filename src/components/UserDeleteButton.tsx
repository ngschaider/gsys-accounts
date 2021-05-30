import React from "react";
import { Button } from "semantic-ui-react";
import API from "../API";
import DataStore from "../DataStore";
import useUsers from "../hooks/useMe";
import useMe from "../hooks/useMe";
import { deleteCookie } from "../utils/cookie";

type UserDeleteButtonProps = {
    id: string;
    onClick?: () => void;
}

const UserDeleteButton = ({id, onClick: onClickCb}: UserDeleteButtonProps) => {
    const {user, loading} = useMe();
    const {invalidate} = useUsers();

    const onClick = () => {
        (async () => {
            if(loading) return;
            API.deleteUser(id);
            if(user && user.id === id) {
                DataStore.loggedIn = false;
                deleteCookie("GSYSAuthCookie");
            }
            invalidate();
        })();
    };

    return (
        <Button color="red" onClick={onClick}>
            Löschen
        </Button>
    )

}
export default UserDeleteButton;