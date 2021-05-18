import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Message } from "semantic-ui-react";
import API, { UserData } from "../API";
import DataStore from "../DataStore";
import useLoggedIn from "../hooks/useLoggedIn";
import { deleteCookie } from "../utils/cookie";


const Home = () => {
    const isLoggedIn = useLoggedIn();
    
    const [logoutError, setLogoutError] = useState<string|null>(null);
    const [userDataError, setUserDataError] = useState<string|null>(null);

    const logout = async () => {
        setLogoutError(null);
        const data = await API.logout();

        if(data.type === "success" || data.code === "INVALID_TOKEN") {
            setUserDataError(null);
            deleteCookie("GSYSAuthCookie");
            DataStore.loggedIn = false;
        } else if(data.type === "error") {
            setLogoutError(data.message || "Unbekannter Fehler");
        }
    }

    const [userData, setUserData] = useState<UserData|null>(null);

    useEffect(() => {
        if(isLoggedIn) {
            (async () => {
                const resp = await API.me();
                console.log(resp);
                if(resp.type === "success" && resp.user) {
                    setUserData(resp.user);
                } else {
                    if(resp.type === "error" && resp.message) {
                        setUserDataError(resp.message);
                    }
                }
            })();
        }
    }, [isLoggedIn]);

    return (
        <Container>
            <h1>Home</h1>

            {logoutError && (
                <Message error={true}>
                    {logoutError}
                </Message>
            )}

            {userDataError && (
                <Message error={true}>
                    {userDataError}
                </Message>
            )}

            {isLoggedIn ? (
                <>
                    {userData && (
                        <>
                            <b>Name: </b>{userData.firstName + " " + userData.lastName}<br />
                            <b>E-Mail: </b>{userData.email}<br />
                            <b>Benutzername: </b>{userData.username}<br />
                        </>
                    )}
                    <Button color="teal" onClick={logout}>Abmelden</Button>
                </>
            ) : (
                <>
                    <Link className="ui button teal" to="/login">Einloggen</Link>
                    <Link className="ui button teal" to="/register">Registrieren</Link>
                </>
            )}
            
        </Container>
    )
}
export default Home;