import { useEffect, useState } from "react";
import Holder from '../components/layout/Holder';

import { getCurrentSong } from "../api/scheduleApi";


const LetsRock = () => {

    const [currentSong, setCurrentSong] = useState(null);

    useEffect(() => {
        const loadSong = async () => {
            try {
                const song = await getCurrentSong();
                setCurrentSong(song);
            } catch {
                setCurrentSong(null);
            }
        };

        loadSong();
        const interval = setInterval(loadSong, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Holder
                title="Let's Rock!"
                subtitle="Live right now! — we’re here to rock around the clock."
                ctaText="Next Coming up!"
                ctaHref="/upcoming"
                currentSong={currentSong}
            />
        </>
    );
}

export default LetsRock
