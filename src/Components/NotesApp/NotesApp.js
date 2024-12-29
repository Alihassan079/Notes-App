import React, { useState, useEffect } from "react";
import notesIcon from "../../images/notes.png";
import editIcon from "../../images/edit.png";
import deleteIcon from "../../images/delete.png";
import "../NotesApp/NotesApp.css";

const NotesApp = () => {
  const [notes, setNotes] = useState([]);

  // Load notes from localStorage when the component mounts
  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      try {
        const parsedNotes = JSON.parse(storedNotes);
        // Ensure only the first note remains if it's empty, and remove subsequent empty notes
        const filteredNotes =
          parsedNotes.length > 0
            ? [parsedNotes[0], ...parsedNotes.slice(1).filter((note) => note.trim() !== "")]
            : [""];
        setNotes(filteredNotes);
      } catch (error) {
        console.error("Error parsing notes from localStorage:", error);
        setNotes([""]); // Fallback to a blank note
      }
    } else {
      setNotes([""]); // Initialize with one empty note
    }
  }, []);

  // Update localStorage whenever notes change
  useEffect(() => {
    if (notes.length > 0) {
      // Save only the first note (even if empty) and non-empty subsequent notes
      const filteredNotes = [notes[0], ...notes.slice(1).filter((note) => note.trim() !== "")];
      localStorage.setItem("notes", JSON.stringify(filteredNotes));
    }
  }, [notes]);

  const addNote = () => {
    setNotes([...notes, ""]); // Add a blank note
  };

  const updateNote = (index, newContent) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = newContent;
    setNotes(updatedNotes);
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes.length > 0 ? updatedNotes : [""]); // Ensure at least one note remains
  };

  return (
    <div className="container">
      <h1>
        <img src={notesIcon} alt="notes" /> Notes
      </h1>
      <button className="btn" onClick={addNote}>
        <img src={editIcon} alt="edit" /> Create Notes
      </button>
      <div className="notes-container">
        {notes.map((note, index) => (
          <div key={index} className="note-wrapper">
            <textarea
              className="input-box"
              value={note}
              onChange={(e) => updateNote(index, e.target.value)}
            />
            <img
              src={deleteIcon}
              alt="delete"
              onClick={() => deleteNote(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesApp;  