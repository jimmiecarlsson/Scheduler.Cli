import { Container, Row, Col } from "react-bootstrap";
import PlaylistView from "../components/PlaylistView";


const Playlist = () => {
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h5 className="mt-0 mb-4">I Playlist</h5>
                    <PlaylistView />
                </Col>
            </Row>
        </Container>
    );
};

export default Playlist;
