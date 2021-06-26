import React from "react";
import { Link } from "react-router-dom";
import { Button, Loader, Table } from "semantic-ui-react";
import useUsers from "../hooks/useUsers";
import UserDeleteButton from "./UserDeleteButton";
import UserUpdateButton from "./UserUpdateButton";

const UsersTable = () => {
    const {users} = useUsers();

    return (
        <>
            {users ? (
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Benutzername</Table.HeaderCell>
                            <Table.HeaderCell>Vorname</Table.HeaderCell>
                            <Table.HeaderCell>Nachname</Table.HeaderCell>
                            <Table.HeaderCell>E-Mail</Table.HeaderCell>
                            <Table.HeaderCell>Berechtigung</Table.HeaderCell>
                            <Table.HeaderCell>Aktionen</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {users?.map(user => (
                            <Table.Row key={user.id}>
                                <Table.Cell>{user.username}</Table.Cell>
                                <Table.Cell>{user.firstName}</Table.Cell>
                                <Table.Cell>{user.lastName}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>{user.isAdmin ? "Admin" : "Benutzer"}</Table.Cell>
                                <Table.Cell>
                                    <Link to={"/serviceUsers/" + user.id}>
                                        <Button color="teal">Service Users</Button>
                                    </Link>
                                    <UserDeleteButton id={user.id} />
                                    <UserUpdateButton id={user.id} />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            ) : (
                <Loader active />
            )}
        </>
    )
}
export default UsersTable;