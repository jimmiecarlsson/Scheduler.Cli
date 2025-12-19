import React, { useState } from "react";
import { updateMyContributorProfile } from "../api/scheduleApi";
import { Card, Button, Row, Col, Container } from "react-bootstrap";

const ContributorProfile = ({ user, onProfileUpdated }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        address: user?.address ?? "",
        phone: user?.phone ?? ""
    });

    if (!user) return null;

    function startEdit() {
        setForm({
            address: user.address ?? "",
            phone: user.phone ?? ""
        });
        setIsEditing(true);
    }

    function cancelEdit() {
        setForm({
            address: user.address ?? "",
            phone: user.phone ?? ""
        });
        setIsEditing(false);
    }






    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h1>Min profil</h1>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col className="col-md-6 mx-auto">
                    <Card className="p-4">
                        <p><strong>Email:</strong> {user.email}</p>

                        {!isEditing ? (
                            <>
                                <p><strong>Adress:</strong> {user.address || "-"}</p>
                                <p><strong>Telefon:</strong> {user.phone || "-"}</p>

                                <p><strong>Timpris:</strong> {user.hourlyRate} kr</p>
                                <p><strong>Eventtillägg:</strong> {user.eventAddon} kr</p>

                                <button
                                    className="btn btn-outline-primary mt-2"
                                    onClick={startEdit}
                                >
                                    Redigera profil
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="mb-2">
                                    <label className="form-label">Adress</label>
                                    <input
                                        className="form-control"
                                        value={form.address}
                                        onChange={e =>
                                            setForm({ ...form, address: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Telefon</label>
                                    <input
                                        className="form-control"
                                        value={form.phone}
                                        onChange={e =>
                                            setForm({ ...form, phone: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="d-flex gap-2">
                                    <button className="btn btn-success"
                                        onClick={async () => {
                                            const updated = await updateMyContributorProfile({
                                                address: form.address,
                                                phone: form.phone
                                            });

                                            onProfileUpdated(updated);
                                            setIsEditing(false);
                                        }}
                                    >
                                        Spara
                                    </button>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={cancelEdit}
                                    >
                                        Avbryt
                                    </button>
                                </div>
                            </>
                        )}
                    </Card>
                    
                </Col>
            </Row>
        </Container>
    );
};

export default ContributorProfile;
