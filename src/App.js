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

/**
 * Challenge:
 * Lazily initialize our `notes` state so it doesn't
 * reach into localStorage on every single re-render
 * of the App component
 */

/**
 * Challenge: When the user edits a note, reposition
 * it in the list of notes to the top of the list
 */
export default function App() {
  console.log("rendered");

  //Lazy state
  // const [state, setState] = React.useState(() =>
  //   console.log("State initialization")
  // );

  const parsedLST = JSON.parse(localStorage.getItem("notes"));
  const [notes, setNotes] = React.useState(() => {
    return parsedLST || [];
  });
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  ); // before access to the note[0].id 하기 전에 먼저 체크

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes)); // note 변경될 때 마다 로컬스토리지에 저장
  }, [notes]);

  function createNewNote() {
    console.log("createNewNote");
    const newNote = {
      id: nanoid(),
      body: "#Type it !",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]); //최신값 제일 위에
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    // 설계부터 하는게 그래서 중요
    // 현재 수정 노트를 담을 변수만들고
    // 노트아이디 값으로 현재 수정노트 인덱스 찾기
    // map 돌면서 해당 인덱스가 아닐경우에만 retrun하고
    // 마지막에 배열에 수정노트를 언쉬프트로

    setNotes((oldNotes) => {
      // 방법1
      const newArray = [];
      oldNotes.map((oldNote) => {
        return oldNote.id === currentNoteId
          ? newArray.unshift({ ...oldNote, body: text })
          : newArray.push(oldNote);
      });

      console.log("newArray, ", newArray);

      // 방법2
      oldNotes = oldNotes.map((oldNote) => {
        return oldNote.id === currentNoteId
          ? { ...oldNote, body: text }
          : oldNote;
      });

      const firstNoteIndex = oldNotes.findIndex(
        (element, index) => element.id === currentNoteId
      );

      const firstNote = oldNotes[firstNoteIndex];
      oldNotes.splice(firstNoteIndex, 1);
      oldNotes.unshift(firstNote);

      return oldNotes;
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
  /**
   * Challenge: complete and implement the deleteNote function
   *
   * Hints:
   * 1. What array method can be used to return a new
   *    array that has filtered out an item based
   *    on a condition?
   * 2. Notice the parameters being based to the function
   *    and think about how both of those parameters
   *    can be passed in during the onClick event handler
   */

  function deleteNote(event, noteId) {
    event.stopPropagation();
    const newNote = notes.filter((elem) => elem.id !== noteId);
    setNotes(newNote);
    currentNoteId === noteId && setCurrentNoteId(notes[0]);
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
            deleteNote={deleteNote}
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
