import React, { useEffect, useState } from "react";
import { getUsers, makeContributor, updateContributorRates } from "../api/scheduleApi";
import { Table, Button, Alert, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const AdminUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");

    const [editingUserId, setEditingUserId] = useState(null);

    const [rates, setRates] = useState({
        hourlyRate: "",
        eventAddon: "",
        displayName: ""
    });

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

        <Container>
            <Row>
                <Col>

           
            <div>
                <h2>Administrera frilans</h2>

                {message && (
                    <Alert variant="info" className="mt-3">
                        {message}
                    </Alert>
                )}

                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>Namn</th>
                            <th>E-post</th>
                            <th>Roll</th>
                            <th>Timpris</th>
                            <th>Enhetspris</th>
                            <th>Åtgärd</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <React.Fragment key={u.id}>
                                <tr>
                                    <td>{u.displayName ?? "-"}</td>
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
                                                            eventAddon: u.eventAddon ?? "",
                                                            displayName: u.displayName ?? ""
                                                        });
                                                    }}
                                                >
                                                    Ändra
                                                </Button>
                                                <Button
                                                    variant="outline-primary"
                                                    disabled={!u.contributorId}
                                                    onClick={() => navigate(`/admin/users/${u.contributorId}/payments`)}
                                                >
                                                    Ersättningar
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button
                                                variant="primary"
                                                onClick={() => handleMakeContributor(u.id)}
                                            >
                                                Gör till Frilans
                                                </Button>

                                        )}
                                    </td>
                                </tr>

                                {editingUserId === u.id && (
                                    <tr>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <input
                                                    className="form-control"
                                                    placeholder="Namn"
                                                    value={rates.displayName}
                                                    onChange={e =>
                                                        setRates({ ...rates, displayName: e.target.value })
                                                    }
                                                />
                                        
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
                                                            eventAddon: Number(rates.eventAddon),
                                                            displayName: rates.displayName
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
                </Col>
            </Row>
        </Container>

    );
};

export default AdminUsers;
