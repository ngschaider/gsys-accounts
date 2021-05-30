
import React from "react";
const Dummy = () => {
    return (
        <h1>Dummy</h1>
    );
}
export default Dummy;

/*import React, { PropsWithChildren, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form as SemanticForm, Grid, Header, Image, Message, Segment } from "semantic-ui-react";
import API, { LoginInput } from "../API";
import DataStore from "../DataStore";
import useForm from "../hooks/useForm";
import { setCookie } from "../utils/cookie";
import { getQueryParameter } from "../utils/query";

type FormProps<T> = {
    defaultValues: T
    onChangeCb?: (values: T) => void,
    onSubmitCb?: (values: T) => void,
}

function Form<T> ({defaultValues, onChangeCb, onSubmitCb}: PropsWithChildren<FormProps<T>>) {
    const [error, setError] = useState<string|null>(null);

    const {onChange, onSubmit, values} = useForm<T>(defaultValues, async (values) => {
        setError(null);
        const data = await API.login(values);
        
        if(data.type === "success" && data.token) {
            setCookie("GSYSAuthCookie", data.token);

            const origin = getQueryParameter("origin");
            if(origin) {
                window.location.replace(origin);
            } else {
                DataStore.loggedIn = true;
            }
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
                <SemanticForm size="large" onSubmit={onSubmit}>
                    <Segment>
                        <SemanticForm.Input 
                            fluid 
                            icon="user" 
                            iconPosition="left" 
                            placeholder="E-Mail Adresse oder Benutzername" 
                            name="usernameOrEmail"
                            onChange={onChange}
                            value={values.usernameOrEmail}
                            autoComplete="off"
                        />

                        <SemanticForm.Input 
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
                </SemanticForm>
                <Message>
                    <Link to="/register">Neues Konto anlegen</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}
export default Form;*/