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
                <Redirect to="/users/create" />
            )}
            <Button onClick={onClick} color="green">
                Benutzer erstellen
            </Button>
        </>
    )
};

export default UserCreateButton;