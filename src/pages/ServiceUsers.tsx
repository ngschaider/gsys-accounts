import React from "react";
import { Container } from "semantic-ui-react";
import { RouteChildrenProps } from "react-router-dom";
import ServiceUsersTable from "../components/ServiceUsersTable";
import ServiceUserCreateButton from "../components/ServiceUserCreateButton";


const Home = (props: RouteChildrenProps<{id: string}>) => {
    const id = props?.match?.params.id as string;


    return (
        <Container>
            <h1>Service Users ({id})</h1>
            <br />
            <ServiceUserCreateButton />
            <ServiceUsersTable userId={id} />
        </Container>
    )
}
export default Home;