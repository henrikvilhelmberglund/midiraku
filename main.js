let noteDivs = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].reverse();
let mainDiv = document.createElement("div");
document.body.append(mainDiv);


function addDivs() {
  noteDivs.forEach((div) => {
    let noteDiv = document.createElement("div");
    noteDiv.id = div;
    noteDiv.className = "note-div";
    noteDiv.addEventListener("click", (e) => addNote(e));
    mainDiv.append(noteDiv);
  });
}

addDivs();

function addNote(e) {
  let newNote = document.createElement("button");
  newNote.innerText = "Note";
  newNote.addEventListener("click", (e) => moveNote(e));
  if (e.target.className === "note-div") {
    e.target.append(newNote);
  }

}

