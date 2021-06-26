import React from "react";
import { Button } from "semantic-ui-react";
import API from "../API";
import useServiceUsers from "../hooks/useServiceUsers";

type UserDeleteButtonProps = {
    id: string;
    onClick?: () => void;
}

const ServiceUserDeleteButton = ({id, onClick: onClickCb}: UserDeleteButtonProps) => {
    
    const onClick = () => {
        (async () => {
            await API.deleteServiceUser(id);
            onClick?.();
        })();
    };

    return (
        <Button color="red" onClick={onClick}>
            Löschen
        </Button>
    )

}
export default ServiceUserDeleteButton;