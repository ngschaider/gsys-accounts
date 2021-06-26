import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react";
import API, { LoginInput } from "../API";
import DataStore from "../DataStore";
import useForm from "../hooks/useForm";
import { setCookie } from "../utils/cookie";
import { getQueryParameter } from "../utils/query";

const Login = () => {
    const [redirect, setRedirect] = useState(false);

    const {onChange, onSubmit, values} = useForm<LoginInput>({
        usernameOrEmail: "",
        password: "",
    }, async (values) => {
        const data = await API.login(values);
        
        if(data.type === "success" && data.token) {
            setCookie("GSYSAuthCookie", data.token);

            const origin = getQueryParameter("origin");
            
            if(origin) {
                window.location.replace(origin);
            } else {
                DataStore.loggedIn = true;
                setRedirect(true); // redirect to home page
            }
        }
    });

    return (
        <Grid textAlign="center" style={{height: "100vh"}} verticalAlign="middle" >
            <Grid.Column style={{maxWidth: 450}}>
                {redirect && (
                    <Redirect to="/" />
                )}
                <Header as="h2" color="teal" textAlign="center">
                    <Image src="/logo.png" style={{width: "50%"}}/>
                </Header>
                <Form size="large" onSubmit={onSubmit}>
                    <Segment>
                        <Form.Input 
                            fluid 
                            icon="user" 
                            iconPosition="left" 
                            placeholder="E-Mail Adresse oder Benutzername" 
                            name="usernameOrEmail"
                            onChange={onChange}
                            value={values.usernameOrEmail}
                            autoComplete="off"
                        />

                        <Form.Input 
                            fluid 
                            icon="lock" 
                            iconPosition="left" 
                            placeholder="Passwort" 
                            type="password" 
                            name="password" 
                            onChange={onChange}
                            value={values.password}
                            autoComplete="off"
                        />

                        <Button color="teal" fluid size="large" type="submit">
                            Einloggen
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    <Link to="/register">Neues Konto anlegen</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}
export default Login;