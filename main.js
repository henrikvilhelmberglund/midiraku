let noteDivs = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function addDivs() {
  noteDivs.forEach((div) => {
    let noteDiv = document.createElement("div");
    noteDiv.id = div;
    document.body.append(noteDiv);
  });
}

addDivs();

function addNote(params) {
  let newNote = document.createElement("button");
  newNote.innerText("Note");
  newNote.addEventListener("click", (e) => moveNote(e));
}

