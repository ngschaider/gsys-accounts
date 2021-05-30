import React from "react";
import { Container } from "semantic-ui-react";
import UserCreateButton from "../components/UserCreateButton";
import CurrentUser from "../components/CurrentUser";
import UsersTable from "../components/UsersTable";


const Home = () => {

    return (
        <Container>
            <h1>Home</h1>
            <CurrentUser />
            <br />
            <UserCreateButton />
            <UsersTable />
        </Container>
    )
}
export default Home;