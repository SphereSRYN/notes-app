import React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css"; //이거 추가 필

// Showdown is a JavaScript Markdown to HTML converter,
// based on the original works by John Gruber.
//Showdown can be used client side(in the browser) or server side(with Node.js).

export default function Editor({ currentNote, updateNote }) {
  //   console.log("Editor");
  const [selectedTab, setSelectedTab] = React.useState("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  // React Markdown Editor
  //https://bestofreactjs.com/repo/andrerpena-react-mde--react-rich-text-editing

  return (
    <section className="pane editor">
      <ReactMde
        value={currentNote.body}
        onChange={updateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={100}
        heightUnits="vh"
      />
    </section>
  );
}
