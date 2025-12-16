import React, { useEffect, useState } from "react";
import { getUsers, makeContributor, updateContributorRates } from "../api/scheduleApi";
import { Table, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const AdminUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");

    const [editingUserId, setEditingUserId] = useState(null);
    const [rates, setRates] = useState({ hourlyRate: "", eventAddon: "" });

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
                        <th>Timpris</th>
                        <th>Enhetspris</th>
                        <th>Åtgärd</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <React.Fragment key={u.id}>
                            <tr>
                                <td>{u.email}</td>
                                <td>{u.roles.join(", ")}</td>
                                <td>{u.hourlyRate ?? "-"}</td>
                                <td>{u.eventAddon ?? "-"}</td>
                                <td>
                                    {u.roles.includes("Contributor") ? (
                                        <div className="d-flex gap-2">
                                            <Button
                                                variant="secondary"
                                                onClick={() => {
                                                    setEditingUserId(u.id);
                                                    setRates({
                                                        hourlyRate: u.hourlyRate ?? "",
                                                        eventAddon: u.eventAddon ?? ""
                                                    });
                                                }}
                                            >
                                                Ändra taxa
                                            </Button>
                                            <Button
                                                variant="outline-primary"
                                                onClick={() => navigate(`/admin/users/${u.id}/payments`)}
                                            >
                                                Payments
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            variant="primary"
                                            onClick={() => handleMakeContributor(u.id)}
                                        >
                                            Gör Contributor
                                            </Button>

                                    )}
                                </td>
                            </tr>

                            {editingUserId === u.id && (
                                <tr>
                                    <td colSpan={5}>
                                        <div className="d-flex gap-2">
                                            <input
                                                className="form-control"
                                                placeholder="Timpris"
                                                value={rates.hourlyRate}
                                                onChange={e =>
                                                    setRates({ ...rates, hourlyRate: e.target.value })
                                                }
                                            />
                                            <input
                                                className="form-control"
                                                placeholder="Enhetspris"
                                                value={rates.eventAddon}
                                                onChange={e =>
                                                    setRates({ ...rates, eventAddon: e.target.value })
                                                }
                                            />
                                            <Button
                                                variant="success"
                                                onClick={async () => {
                                                    await updateContributorRates(u.id, {
                                                        hourlyRate: Number(rates.hourlyRate),
                                                        eventAddon: Number(rates.eventAddon)
                                                    });
                                                    setEditingUserId(null);
                                                    loadUsers();
                                                }}
                                            >
                                                Spara
                                            </Button>
                                            <Button
                                                variant="outline-secondary"
                                                onClick={() => {
                                                    setEditingUserId(null);
                                                }}
                                            >
                                                Avbryt
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>


            </Table>
        </div>
    );
};

export default AdminUsers;
