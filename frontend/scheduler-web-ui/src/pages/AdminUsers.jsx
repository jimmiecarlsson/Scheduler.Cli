import React, { useEffect, useState } from "react";
import { getUsers, makeContributor } from "../api/scheduleApi";
import { Table, Button, Alert } from "react-bootstrap";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        const data = await getUsers();
        setUsers(data);
    }

    async function handleMakeContributor(id) {
        try {
            await makeContributor(id);
            setMessage("Användaren är nu Contributor");
            loadUsers(); // uppdatera listan
        } catch {
            setMessage("Kunde inte uppdatera användaren");
        }
    }

    return (
        <div>
            <h2>Administrera användare</h2>

            {message && (
                <Alert variant="info" className="mt-3">
                    {message}
                </Alert>
            )}

            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>E-post</th>
                        <th>Roller</th>
                        <th>Åtgärd</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>{u.email}</td>
                            <td>{u.roles.join(", ")}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    disabled={u.roles.includes("Contributor")}
                                    onClick={() => handleMakeContributor(u.id)}
                                >
                                    Gör Contributor
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AdminUsers;
