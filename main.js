let midiOut;
// from https://webmidijs.org/docs/getting-started/basics
// Enable WEBMIDI.js and trigger the onEnabled() function when ready

WebMidi
  .enable()
  .then(onEnabled)
  .then(main)
  .catch(err => alert(err));

// Function triggered when WEBMIDI.js is ready
function onEnabled() {

  // Display available MIDI input devices
  if (WebMidi.outputs.length < 1) {
    document.body.innerHTML += "No device detected.";
  } else {
    WebMidi.outputs.forEach((device, index) => {
      document.body.innerHTML += `${index}: ${device.name} <br>`;
      midiOut = WebMidi.outputs[index];
      console.log(midiOut);
    });
  }
}

function main() {

  console.log(midiOut);

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
  //connect();
  //sendMidiMessage(61, 100, 100);


}