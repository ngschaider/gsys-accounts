import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "semantic-ui-react";

type ServiceUserUpdateButtonProps = {
    id: string;
}

const ServiceUserUpdateButton = ({id}: ServiceUserUpdateButtonProps) => {
    const [redirect, setRedirect] = useState(false);

    const onClick = () => {
        setRedirect(true);
    };

    return (
        <>
            <Button color="teal" onClick={onClick}>
                Bearbeiten
            </Button>
            {redirect && <Redirect to={"/serviceUsers/update/" + id} />}
        </>
    );

}
export default ServiceUserUpdateButton;