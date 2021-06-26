import React from "react";
import { Loader, Table } from "semantic-ui-react";
import useServiceUsers from "../hooks/useServiceUsers";
import ServiceUserDeleteButton from "./ServiceUserDeleteButton";
import ServiceUserUpdateButton from "./ServiceUserUpdateButton";

type ServiceUsersTableProps = {
    userId: string;
}

const ServiceUsersTable = ({userId}: ServiceUsersTableProps) => {
    const {serviceUsers, invalidate} = useServiceUsers(userId);

    return (
        <>
            {serviceUsers ? (
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Service ID</Table.HeaderCell>
                            <Table.HeaderCell>Benutzername</Table.HeaderCell>
                            <Table.HeaderCell>SerUser Benutzername</Table.HeaderCell>
                            <Table.HeaderCell>SerUser Passwort</Table.HeaderCell>
                            <Table.HeaderCell>Aktionen</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {serviceUsers.map(serviceUser => (
                            <Table.Row key={serviceUser.id}>
                                <Table.Cell>{serviceUser.service.id}</Table.Cell>
                                <Table.Cell>{serviceUser.user.username}</Table.Cell>
                                <Table.Cell>{serviceUser.username}</Table.Cell>
                                <Table.Cell>{serviceUser.password}</Table.Cell>
                                <Table.Cell>
                                    <ServiceUserDeleteButton onClick={invalidate} id={serviceUser.id} />
                                    <ServiceUserUpdateButton id={serviceUser.id} />
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
export default ServiceUsersTable;