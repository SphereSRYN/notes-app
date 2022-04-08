import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { data } from "./data";
import Split from "react-split";
import { nanoid } from "nanoid";
import "./App.css";

/**
 * Challenge: Spend 10-20+ minutes reading through the code
 * and trying to understand how it's currently working. Spend
 * as much time as you need to feel confident that you
 * understand the existing code (although you don't need
 * to fully understand everything to move on)
 */
/**
 * Challenge:
 * 1. Every time the `notes` array changes, save it
 *    in localStorage. You'll need to use JSON.stringify()
 *    to turn the array into a string to save in localStorage.
 * 2. When the app first loads, initialize the notes state
 *    with the notes saved in localStorage. You'll need to
 *    use JSON.parse() to turn the stringified array back
 *    into a real JS array.
 */

export default function App() {
  console.log("rendered");

  const parsedLST = JSON.parse(localStorage.getItem("notes"));
  console.log("parsedLST", parsedLST);

  const [notes, setNotes] = React.useState(parsedLST || []);
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[notes.length - 1] && notes[notes.length - 1].id) || ""
  ); // before access to the note[0].id 하기 전에 먼저 체크

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes)); // note 변경될 때 마다 로컬스토리지에 저장
  }, [notes]);

  function createNewNote() {
    alert("createNewNote");
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    console.log("setnotes done, newNote.id: " + newNote.id); //최신값 제일 밑에

    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    console.log("text", text);
    setNotes((oldNotes) => {
      let upNote = oldNotes.map((oldNote) => {
        return oldNote.id === currentNoteId
          ? { ...oldNote, body: text }
          : oldNote;
      });
      return upNote;
    });
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        // console.log("note.id , ", note.id, " currentNoteId,", currentNoteId);
        return note.id === currentNoteId;
      }) || notes[notes.length - 1] // 젤 밑에 있는 값
    );
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
