import * as midi from "./webmidi.js";

let noteDivs = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].reverse();
let mainDiv = document.createElement("div");
mainDiv.id = "main-div";
document.body.append(mainDiv);

let horizontalDivision = 8;



function addVerticalDivs() {
  noteDivs.forEach((div) => {
    let noteDiv = document.createElement("div");
    noteDiv.id = div;

    noteDiv.className = "vertical-note-div";
    noteDiv.addEventListener("mousedown", (e) => addNote(e));
    mainDiv.append(noteDiv);
    for (let i = 0; i < horizontalDivision; i++) {
      let horizontalDiv = document.createElement("div");
      horizontalDiv.className = "horizontal-note-div";
      noteDiv.append(horizontalDiv);
    }
  });
}

addVerticalDivs();

function addNote(e) {
  let newNote = document.createElement("button");
  newNote.innerText = "Note";
  newNote.addEventListener("click", (e) => moveNote(e));
  if (e.target.className === "vertical-note-div" || e.target.className === "horizontal-note-div") {
    if (e.target.children.length < 1) {
      e.target.append(newNote);
    }
  }
}
// test
midi.connect;
midi.sendMidiMessage(61, 100, 100);

