import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserPayments } from "../api/scheduleApi";
import { Table, Alert, Row, Col, Container } from "react-bootstrap";

const AdminUserPayments = () => {
    const { id } = useParams();
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        const data = await getUserPayments(id);
        setPayments(data);
    }

    if (payments.length === 0) {
        return <Alert variant="info">Inga payments ännu</Alert>;
    }

    return (

        <>
            <Container>
                <Row className="mb-5">
                    <Col>
                        
                        <h2>Ersättningar</h2>
                        <Table striped bordered>
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
        </>
    );
};

export default AdminUserPayments;
