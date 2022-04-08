import React from "react";

export default function Sidebar({
  notes,
  currentNote,
  setCurrentNoteId,
  newNote,
}) {
  //App에다가 상세기술은 다 기술해두고,
  //하위 컴포넌트에는 그거 프롭으로 넘겨서 갖다 쓰게함.
  console.log("notes, ", notes);

  const noteElements = notes.map((note, index) => {
    console.log("index, ", index, " note.id, ", note.id);
    return (
      <div key={note.id}>
        <div
          className={`title ${
            note.id === currentNote.id ? "selected-note" : ""
          }`}
          onClick={() => setCurrentNoteId(note.id)}
        >
          <h4 className="text-snippet">Note {index + 1}</h4>
        </div>
      </div>
    );
  });

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}
