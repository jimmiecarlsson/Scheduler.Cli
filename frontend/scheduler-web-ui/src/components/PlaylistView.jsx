import { useEffect, useState } from "react";
import { Card, ListGroup, Button, ButtonGroup } from "react-bootstrap";
import { generateSongs, getAllPlaylist } from "../api/scheduleApi";



const PlaylistView = () => {


    const [songs, setSongs] = useState([]);

    useEffect(() => {
        getAllPlaylist().then(setSongs);
    }, []);

    const formatDuration = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };





    const handleGenerate = async (count) => {
        await generateSongs(`${count} låtar`);
        // valfritt: ladda om listan efteråt
        const updated = await getAllPlaylist();
        setSongs(updated);
    };


    return (
        <>
            <ButtonGroup className="mb-3">
                <Button size="sm" onClick={() => handleGenerate(5)}>
                    5 låtar
                </Button>
                <Button size="sm" onClick={() => handleGenerate(10)}>
                    10 låtar
                </Button>
            </ButtonGroup>

            <Card className="mb-4">

                <ListGroup variant="flush">
                    {songs.map(song => (
                        <ListGroup.Item key={song.id}>
                            <strong>{song.title}</strong> - {song.artist} - {formatDuration(song.durationSeconds)}
                        </ListGroup.Item>
                    ))}
                </ListGroup>

            </Card>
        </>
    );


};

export default PlaylistView;
