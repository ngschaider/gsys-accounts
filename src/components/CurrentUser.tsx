import React from "react";
import { Button, Loader } from "semantic-ui-react";
import useLogout from "../hooks/useLogout";
import useMe from "../hooks/useMe";


const Home = () => {
    const {logout} = useLogout();
    const {user} = useMe();

    return (
        <>
            {user ? (
                <p>
                    <b>Angemeldet als:</b> {user.firstName} {user.lastName} ({user.username})
                </p>
            ) : (
                <>
                    <Loader active inline />
                    <br />
                </>
            )}
            <Button color="teal" onClick={logout}>Abmelden</Button> 
        </>
    )
}
export default Home;