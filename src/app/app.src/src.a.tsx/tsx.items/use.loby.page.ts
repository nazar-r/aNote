import { useQuery } from "@tanstack/react-query";
import { fetchingNotes } from '../tsx.extensions/getApi/get.content.api';
import { useRemovingNotes } from '../tsx.extensions/setApi/use.remove.content.api';
import { useCreatingNote } from "../tsx.extensions/setApi/use.send.content.api";
import { useRef, useState } from 'react';
import type { notesData } from '../tsx.extensions/types';

export const useLobbyPage = () => {
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const removeNoteMutation = useRemovingNotes();
    const { data: notes = [] } = useQuery<notesData[]>(["notes"], fetchingNotes);
    const [localNotes, setLocalNotes] = useState<notesData[]>(notes);

    const [defEdit, setEdit] = useState(false);
    const [text, setText] = useState("");
    const { mutate } = useCreatingNote(() => setText(""));

    const switchEdit = (e: React.MouseEvent) => { 
        e.stopPropagation(); 
        setEdit(prev => !prev); 
    };

    const scroll = (dir: "left" | "right") => 
        viewportRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });

    const createNote = () => {
        const newNote: notesData = { noteId: "temp-" + Date.now(), content: "" };
        setLocalNotes(prev => [...prev, newNote]);
        setText("");
    };

    const saveNote = (note: notesData) => 
        note.content.trim() && mutate(
            { noteId: "", content: note.content },
            { onSuccess: (createdNote) => setLocalNotes(prev => prev.map(n => n.noteId === note.noteId ? createdNote : n)) }
        );

    const deleteNote = (noteId: string) => {
        const element = document.getElementById(noteId);
        element?.classList.add("lobby-note--fade");
        setTimeout(() => {
            removeNoteMutation.mutate(noteId);
            setLocalNotes(prev => prev.filter(note => note.noteId !== noteId));
        }, 200);
    };

    return {
        viewportRef,
        trackRef,
        localNotes,
        defEdit,
        text,
        switchEdit,
        scroll,
        createNote,
        saveNote,
        deleteNote,
        setLocalNotes
    };
};