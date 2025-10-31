import { useState } from "react";
import { Form, Button, Alert, Row, Col, Container } from "react-bootstrap";
import { createBlock, updateBlock } from "../api/scheduleApi";



import React from 'react'

const CreateBlockForm = ({ isEdit = false, blockId = null, initialData = {}, onSaved }) => {

    const [formData, setFormData] = useState({
        date: initialData.date || "",
        startTime: initialData.startTime || "",
        endTime: initialData.endTime || "",
        title: initialData.title || "",
        studio: initialData.studio || ""
    });

    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (isEdit) {
                await updateBlock(blockId, formData);
                setStatus("Blocket uppdaterades!");
            } else {
                await createBlock(formData);
                setStatus("Block sparat!");
            }

            if (onSaved) onSaved();
        } catch (err) {
            setStatus("Fel: " + err.message);
        }

        setFormData({
            date: "",
            startTime: "",
            endTime: "",
            title: "",
            studio: ""
        });
    };



    return (
        <>
            <Container className="mt-4">
                <Row>
                    <Col>
                        {status && (
                            <Alert variant={status.startsWith("Fel") ? "danger" : "success"}>
                                {status}
                            </Alert>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Datum</Form.Label>
                                <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Titel</Form.Label>
                                <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Starttid</Form.Label>
                                <Form.Control type="time" name="startTime" value={formData.startTime} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Sluttid</Form.Label>
                                <Form.Control type="time" name="endTime" value={formData.endTime} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Studio</Form.Label>
                                <Form.Control type="text" name="studio" value={formData.studio} onChange={handleChange} />
                            </Form.Group>

                            <Button type="submit" variant="primary">Spara</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>



    )
}

export default CreateBlockForm
