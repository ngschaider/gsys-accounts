import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "semantic-ui-react";

const UserCreateButton = () => {
    const [redirect, setRedirect] = useState(false);

    const onClick = () => {
        setRedirect(true);
    }

    return (
        <>
            {redirect && (
                <Redirect to="/serviceUsers/create" />
            )}
            <Button onClick={onClick} color="green">
                Service User erstellen
            </Button>
        </>
    )
};

export default UserCreateButton;