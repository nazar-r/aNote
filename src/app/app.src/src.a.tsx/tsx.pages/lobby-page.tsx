import { useState } from "react";
import { useCreatingNote } from "../tsx.extensions/setApi/use.send.content.api";
import Navbar from '../tsx.items/navbar';
import NotesContainer from '../tsx.items/notes';

const LobbyPagePrevContent = () => {
    const [text, setText] = useState("");
    const { mutate } = useCreatingNote(() => setText(""));

    const handleSubmit = () => {
        if (!text.trim()) return;
        mutate({ content: text });
    };

    return (
        <div>
            <div className="lobby-page">
                <div className="lobby-page__title">Your Notes</div>
                <div className="lobby-page__container">
                    <NotesContainer />
                    <NotesContainer />
                    <NotesContainer />
                </div>
            </div>
            <Navbar />
        </div>
    );
};

export default LobbyPagePrevContent;