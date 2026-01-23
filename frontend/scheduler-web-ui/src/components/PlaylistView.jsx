import { useEffect, useState } from "react";
import { Card, ListGroup, Button, ButtonGroup } from "react-bootstrap";
import { generateSongs, getAllPlaylist, addPlaylistSong } from "../api/scheduleApi";



const PlaylistView = () => {

    const [songs, setSongs] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadPlaylist();
    }, []);

    const formatDuration = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };


    const addToPlaylist = async (song) => {
        await addPlaylistSong({
            title: song.title,
            artist: song.artist,
            durationSeconds: song.durationSeconds
        });

        // Tabort i listan med förslag
        setSuggestions(prev => prev.filter(s => s !== song));

        // Hämta en uppdaterad lista från DB
        await loadPlaylist();
    };

    const existingSongsText = songs
        .map(s => `${s.title} - ${s.artist}`)
        .join(", ");

    const handleGenerate = async (count) => {
        setIsLoading(true);
        try {
            const result = await generateSongs(`Ge mig ${count} rocklåtar.
            Välj INTE någon av följande låtar ${existingSongsText} `);
            setSuggestions(result.songs);
        } finally {
            setIsLoading(false);
        }
    };

    const loadPlaylist = async () => {
        const data = await getAllPlaylist();
        setSongs(data);
    }

    return (
        <>
            {isLoading ? (
                <div className="mb-3 text-muted">
                    Laddar förslag...
                </div>
            ) : (
                    <ButtonGroup className="mb-3">
                        <Button size="sm" variant="outline-secondary" onClick={() => handleGenerate(3)}>
                            3 låtar
                        </Button>
                        <Button size="sm" variant="outline-secondary" onClick={() => handleGenerate(5)}>
                            5 låtar
                        </Button>
                        <Button size="sm" variant="outline-success" onClick={() => handleGenerate(10)}>
                            10 låtar
                        </Button>
                </ButtonGroup>
            )}

            {suggestions.length > 0 && (
                <Card className="mb-4">
                    <Card.Header>
                        Förslag
                    </Card.Header>

                    <ListGroup variant="flush">
                        {suggestions.map((song, index) => (
                            <ListGroup.Item key={index}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{song.title}</strong> - {song.artist} - {formatDuration(song.durationSeconds)}
                                    </div>

                                    <Button
                                        size="sm"
                                        variant="outline-success"
                                        onClick={() => addToPlaylist(song)}
                                    >
                                        Lägg till
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    <Card.Footer className="text-muted">
                        Klicka på en låt för att lägga till i playlist
                    </Card.Footer>
                </Card>
            )}

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
