// from https://webmidijs.org/docs/getting-started/basics
// Enable WEBMIDI.js and trigger the onEnabled() function when ready

//const myMidi = await WebMidi.enable();
const myMidi = JZZ().openMidiOut();

//JZZ().or('Cannot start MIDI engine!')
//  .openMidiOut().or('Cannot open MIDI Out port!')
//myMidi.openMidiOut().send([0x90, 60, 127]).wait(500).send([0x80, 60, 0]);  // note off
//console.log(midiOut);
/*
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
*/

//console.log(midiOut);

let noteDivs = ["C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5", "C6"].reverse();
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

//myMidi.openMidiOut().send([0x90, 60, 127]).wait(500).send([0x80, 60, 0]);  // note off


function addNote(e) {
  let newNote = document.createElement("button");
  newNote.innerText = "Note";
  newNote.addEventListener("click", (e) => editNote(e));
  newNote.addEventListener("mousedown", (e) => moveNote(e, true));
  newNote.addEventListener("mouseup", (e) => moveNote(e, false));

  if (e.target.className === "vertical-note-div" || e.target.className === "horizontal-note-div") {
    if (e.target.children.length < 1) {
      myMidi.note(0, e.target.parentElement.id, 127, 200);
      e.target.append(newNote);
    }
  }
}

function editNote(e) {
  if (e.altKey) {
    e.target.remove(e.target);
  }
}

let myTimer;

// TODO: fix interval

function moveNote(e, isHolding) {
  if (isHolding) {
    myTimer = setInterval(() => {
      if (isHolding) {
        let hoverArray = document.querySelectorAll(":hover");
        console.log(hoverArray);
        hoverArray[4].append(e.target);
        console.log("");
      }
      else {
        isHolding = false;
      }

    }, 100);
  }
  else if (!isHolding) {
    clearInterval(myTimer);
    console.log("let go");
  }
}
  // test
  //connect();
  //sendMidiMessage(61, 100, 100);


