import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react";
import API, { RegisterData } from "../API";
import DataStore from "../DataStore";
import useForm from "../hooks/useForm";
import { setCookie } from "../utils/cookie";

const Register = () => {
    const [error, setError] = useState<string|null>(null);

    const {onChange, onSubmit, values} = useForm<RegisterData>({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
    }, async (values) => {
        setError(null);
        const data = await API.register(values);
        
        if(data.type === "success" && data.token) {
            setCookie("GSYSAuthCookie", data.token);
            DataStore.loggedIn = true;
        } else {
            setError(data.message || "Unbekannter Fehler");
        }
    });

    return (
        <Grid textAlign="center" style={{height: "100vh"}} verticalAlign="middle" >
            <Grid.Column style={{maxWidth: 450}}>
                <Header as="h2" color="teal" textAlign="center">
                    <Image src="/logo.png" style={{width: "50%"}}/>
                </Header>
                {error && (
                    <Message error={true}>
                        {error}
                    </Message>
                )}
                <Form size="large" onSubmit={onSubmit}>
                    <Segment>
                        <Form.Input 
                            fluid 
                            icon="user" 
                            iconPosition="left" 
                            placeholder="Vorname" 
                            name="firstName"
                            onChange={onChange}
                            value={values.firstName}
                            autoComplete="off"
                        />

                        <Form.Input 
                            fluid 
                            icon="user" 
                            iconPosition="left" 
                            placeholder="Nachname" 
                            name="lastName" 
                            onChange={onChange}
                            value={values.lastName}
                            autoComplete="off"
                        />

                        <Form.Input 
                            fluid 
                            icon="user" 
                            iconPosition="left" 
                            placeholder="Benutername" 
                            name="username" 
                            onChange={onChange}
                            value={values.username}
                            autoComplete="off"
                        />

                        <Form.Input 
                            fluid 
                            icon="mail" 
                            iconPosition="left" 
                            placeholder="E-Mail Adresse" 
                            name="email" 
                            onChange={onChange}
                            value={values.email}
                            autoComplete="off"
                        />

                        <Form.Input 
                            fluid 
                            icon="lock" 
                            iconPosition="left" 
                            placeholder="Passwort" 
                            name="password" 
                            onChange={onChange}
                            value={values.password}
                            autoComplete="off"
                            type="password"
                        />
                        <Form.Input 
                            fluid 
                            icon="lock" 
                            iconPosition="left" 
                            placeholder="Passwort wiederholen" 
                            name="passwordConfirm" 
                            onChange={onChange}
                            value={values.passwordConfirm}
                            autoComplete="off"
                            type="password"
                        />

                        <Button color="teal" fluid size="large" type="submit">
                            Konto erstellen
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    <Link to="/login">Mit bestehendem Konto anmelden</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}
export default Register;