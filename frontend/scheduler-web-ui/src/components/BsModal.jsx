import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { getById, deleteBlock } from "../api/scheduleApi";
import { useNavigate } from "react-router-dom";

function BsModal({ show, onHide, id, onDeleted }) {

    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        getById(id).then(setData).catch(console.error);
    }, [id]);

    const handleDelete = async () => {
        if (!id) return;
        if (!confirm("Är du säker på att du vill ta bort detta block?")) return;

        try {
            await deleteBlock(id);
            onHide(); // stäng modalen
            onDeleted();
        } catch (err) {
            console.error("Fel vid borttagning:", err);
        }
    };


    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{data?.title || "Detaljer"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {data ? (
                    <>
                        <p><strong>Datum:</strong> {data.date}</p>
                        <p>
                            <strong>Tid:</strong> {data.startTime} – {data.endTime}
                        </p>
                        <p><strong>Studio:</strong> {data.studio}</p>
                        <p>
                            <strong>Programledare:</strong>{" "}
                            {data.presenters?.length > 0
                                ? data.presenters.map(p => p.name).join(", ")
                                : "–"}
                        </p>

                        <p>
                            <strong>Gäster:</strong>{" "}
                            {data.guests?.length > 0
                                ? data.guests.map(g => g.name).join(", ")
                                : "–"}
                        </p>
                    </>
                ) : (
                    <p>Laddar...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => {
                    onHide(); navigate(`/edit/${data.id}`);
                }}>
                    Redigera
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Ta bort
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Stäng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BsModal;
