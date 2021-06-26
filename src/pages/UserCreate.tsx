import React, { useState } from "react";
import { Container, Form, Segment } from "semantic-ui-react";
import useForm from "../hooks/useForm";
import API, { CreateUserInput } from "../API";
import useUsers from "../hooks/useUsers";
import { Redirect } from "react-router-dom";

const UserCreate = () => {

    const [redirect, setRedirect] = useState(false);
    const {invalidate} = useUsers();

    const onSubmitCb = async (values: CreateUserInput) => {
        API.createUser(values).then(res => {
            if(res.type === "success") {
                invalidate();
                setRedirect(true);
            }
        });
    }

    const {values, onChange, onSubmit, onCheckboxChange} = useForm<CreateUserInput>({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        isAdmin: false,
        resetPasswordOnLogin: true,
    }, onSubmitCb);

    return (
        <Container text>
            {redirect && (
                <Redirect to="/" />
            )}
            <h1>Benutzer erstellen</h1>
            <Form onSubmit={onSubmit}>
                <Segment>
                    <Form.Input 
                        fluid
                        placeholder="Benutzername" 
                        name="username"
                        onChange={onChange}
                        value={values.username}
                        autoComplete="off"
                    />
                    <Form.Input 
                        fluid
                        placeholder="E-Mail Adresse" 
                        name="email"
                        onChange={onChange}
                        value={values.email}
                        autoComplete="off"
                    />
                    <Form.Input 
                        fluid
                        placeholder="Vorname" 
                        name="firstName"
                        onChange={onChange}
                        value={values.firstName}
                        autoComplete="off"
                    />
                    <Form.Input 
                        fluid
                        placeholder="Nachname" 
                        name="lastName"
                        onChange={onChange}
                        value={values.lastName}
                        autoComplete="off"
                    />
                    <Form.Input 
                        fluid
                        placeholder="Passwort" 
                        name="password"
                        type="password"
                        onChange={onChange}
                        value={values.password}
                        autoComplete="off"
                    />
                    <Form.Checkbox
                        label="Ist Administrator?"
                        name="isAdmin"
                        onChange={onCheckboxChange}
                        checked={values.isAdmin}
                        autoComplete="off"
                    />
                    <Form.Checkbox
                        name="resetPasswordOnLogin"
                        onChange={onCheckboxChange}
                        checked={values.resetPasswordOnLogin}
                        autoComplete="off"
                        label="Passwort muss geändert werden"
                    />
                </Segment>
                <Form.Button type="submit" color="green">
                    Erstellen
                </Form.Button>
            </Form>
        </Container>
    )
}
export default UserCreate;