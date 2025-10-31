import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getById } from "../api/scheduleApi";
import CreateBlockForm from "../components/CreateBlockForm";

const EditBlock = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [block, setBlock] = useState(null);

    useEffect(() => {
        getById(id).then(setBlock).catch(console.error);
    }, [id]);

    if (!block) return <p>Laddar...</p>;

    return (

        <CreateBlockForm
            isEdit={true}
            blockId={id}
            initialData={block}
            onSaved={() => navigate("/all")}
        />

    )
}

export default EditBlock
