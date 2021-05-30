import React, { useEffect, useState } from "react";
import { Container, Form, Segment } from "semantic-ui-react";
import useForm from "../hooks/useForm";
import API, { UpdateUserInput } from "../API";
import useUsers from "../hooks/useUsers";
import { Redirect, RouteChildrenProps } from "react-router-dom";

const UserUpdate = (props: RouteChildrenProps<{id: string}>) => {

    const id = props?.match?.params.id as string;

    const [redirect, setRedirect] = useState(false);
    const {users, invalidate, loading} = useUsers();

    const onSubmitCb = async (values: UpdateUserInput) => {
        API.updateUser(id, values).then(res => {
            if(res.type === "success") {
                invalidate();
                setRedirect(true);
            }
        });
    }

    const {values, onChange, onSubmit, onCheckboxChange, setValues} = useForm<UpdateUserInput>({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        isAdmin: false,
        changePasswordOnLogin: true,
    }, onSubmitCb);

    useEffect(() => {
        const user = users?.find(user => user.id === id);
        if(user) {
            setValues({
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isAdmin: user.isAdmin,
                changePasswordOnLogin: user.changePasswordOnLogin,
            });
        }
    }, [users, id, setValues]);    

    return (
        <Container text>
            {redirect && (
                <Redirect to="/" />
            )}
            <h1>Benutzer erstellen</h1>
            <Form onSubmit={onSubmit} loading={loading}>
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
                    <Form.Checkbox
                        label="Ist Administrator?"
                        name="isAdmin"
                        onChange={onCheckboxChange}
                        checked={values.isAdmin}
                        autoComplete="off"
                    />
                    <Form.Checkbox
                        name="changePasswordOnLogin"
                        onChange={onCheckboxChange}
                        checked={values.changePasswordOnLogin}
                        autoComplete="off"
                        label="Passwort muss geändert werden"
                    />
                </Segment>
                <Form.Button type="submit" color="green">
                    Spechern
                </Form.Button>
            </Form>
        </Container>
    )
}
export default UserUpdate;