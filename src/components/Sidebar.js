import React from "react";

/**
 * Challenge: Try to figure out a way to display only the
 * first line of note.body as the note summary in the
 * sidebar.
 *
 * Hint 1: note.body has "invisible" newline characters
 * in the text every time there's a new line shown. E.g.
 * the text in Note 1 is:
 * "# Note summary\n\nBeginning of the note"
 *
 * Hint 2: See if you can split the string into an array
 * using the "\n" newline character as the divider
 */

export default function Sidebar({
  notes,
  currentNote,
  setCurrentNoteId,
  newNote,
  deleteNote,
}) {
  //App에다가 상세기술은 다 기술해두고,
  //하위 컴포넌트에는 그거 프롭으로 넘겨서 갖다 쓰게함.
  // console.log("notes, ", notes);

  const noteElements = notes.map((note, index) => {
    // let summaryArray = note.body.split("\n");
    // console.log(summaryArray);
    return (
      <div key={note.id}>
        <div
          className={`title ${
            note.id === currentNote.id ? "selected-note" : "not-selected-note"
          }`}
          onClick={() => setCurrentNoteId(note.id)}
        >
          <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
          <button
            className="delete-btn"
            // Your onClick event handler here
            //onClick에서 제공하는 event
            onClick={(event) => deleteNote(event, note.id)}
          >
            <i className="gg-trash trash-icon"></i>
          </button>
        </div>
      </div>
    );
  });

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h4>새 노트를 작성해보세요</h4>
        <button className="new-note" onClick={newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}
