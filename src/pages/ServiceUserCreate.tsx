import React, { useState } from "react";
import { Container, Dropdown, Form, Segment } from "semantic-ui-react";
import useForm from "../hooks/useForm";
import API, { CreateServiceUserInput } from "../API";
import useUsers from "../hooks/useUsers";
import { Redirect, RouteChildrenProps } from "react-router-dom";
import useServices from "../hooks/useServices";

const ServiceUserCreate = (props: RouteChildrenProps<{id: string}>) => {
    const userId = props.match?.params.id;

    const [redirect, setRedirect] = useState(false);
    const {invalidate} = useUsers();
    

    const {users, loading: usersLoading} = useUsers();

    const userDropdownOptions = users?.map(user => {
        return {
            key: user.id,
            value: user.id,
            text: user.username,
        }
    })

    const {services, loading: servicesLoading} = useServices();

    const serviceDropdownOptions = services?.map(service => {
        return {
            key: service.id,
            value: service.id,
            text: service.id,
        };
    })

    const onSubmitCb = async (values: CreateServiceUserInput) => {
        const res = await API.createServiceUser(values);

        if(res.type === "success") {
            invalidate();
            setRedirect(true);
        }
    }

    const {values, onChange, onSubmit, setValue} = useForm<CreateServiceUserInput>({
        username: "",
        password: "",
        userId: userId || "",
        serviceId: "",
    }, onSubmitCb);

    return (
        <Container text>
            {redirect && (
                <Redirect to="/" />
            )}
            <h1>Service Benutzer erstellen</h1>
            <Form onSubmit={onSubmit}>
                <Segment>
                    <Form.Input 
                        fluid
                        label="Benutzername"
                        placeholder="Benutzername" 
                        name="username"
                        onChange={onChange}
                        value={values.username}
                        autoComplete="off"
                    />
                    <Form.Input 
                        fluid
                        placeholder="Passwort" 
                        name="password"
                        type="password"
                        label="Passwort"
                        onChange={onChange}
                        value={values.password}
                        autoComplete="off"
                    />
                    <Form.Dropdown
                        fluid
                        placeholder="Service"
                        label="Service"
                        options={serviceDropdownOptions}
                        value={values.serviceId}
                        onChange={(_e, data) => setValue("serviceId", data.value)}
                        loading={servicesLoading}
                    />          
                    <Form.Dropdown
                        fluid
                        placeholder="Benutzer"
                        label="Benutzer"
                        options={userDropdownOptions}
                        value={values.userId}
                        onChange={(_e, data) => setValue("userId", data.value)}
                        loading={usersLoading}
                    />                        
                </Segment>
                <Form.Button type="submit" color="green">
                    Erstellen
                </Form.Button>
            </Form>
        </Container>
    )
}
export default ServiceUserCreate;