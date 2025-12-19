
import CreateBlockForm from "../components/CreateBlockForm"
import { Card, Button, Row, Col, Container} from "react-bootstrap";

import React from 'react'

const NewBlock = () => {
    return (
        <Container>
            <Row>
                <h1>Lägg till sändningsblock</h1>
                    <Col className="col-md-4">
                         <CreateBlockForm />
                    </Col>
                </Row>
        </Container>
    )
}

export default NewBlock
