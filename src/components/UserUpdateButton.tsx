import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "semantic-ui-react";

type UserUpdateButtonProps = {
    id: string;
}

const UserUpdateButton = ({id}: UserUpdateButtonProps) => {
    const [redirect, setRedirect] = useState(false);

    const onClick = () => {
        setRedirect(true);
    };

    return (
        <>
            <Button color="teal" onClick={onClick}>
                Bearbeiten
            </Button>
            {redirect && <Redirect to={"/users/update/" + id} />}
        </>
    );

}
export default UserUpdateButton;