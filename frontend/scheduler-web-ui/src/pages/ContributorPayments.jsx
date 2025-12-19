import React, { useEffect, useState } from "react";
import { getMyPayments } from "../api/scheduleApi";
import { Table, Alert, Row, Col, Container } from "react-bootstrap";

const ContributorPayments = () => {
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        loadPayments();
    }, []);

    async function loadPayments() {
        try {
            const data = await getMyPayments();
            setPayments(data);
        } catch {
            setError("Kunde inte hämta ersättningar");
        }
    }

    return (
        <Container>  
            <Row>
                <Col>
                    <h1>Mina ersättningar</h1>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Table striped bordered hover className="mt-3">
                        <thead>
                            <tr>
                                <th>Månad</th>
                                <th>Timmar</th>
                                <th>Event</th>
                                <th>Summa</th>
                                <th>Moms</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center">
                                        Inga ersättningar ännu
                                    </td>
                                </tr>
                            )}

                            {payments.map((p, i) => (
                                <tr key={i}>
                                    <td>{p.month}</td>
                                    <td>{p.hours}</td>
                                    <td>{p.events}</td>
                                    <td>{p.totalAmount}</td>
                                    <td>{p.vatAmount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
       
    );
};

export default ContributorPayments;
