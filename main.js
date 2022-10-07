// from https://webmidi-examples.glitch.me

let midiIn = [];
let midiOut = [];
let selectedIndex = 0;

export function connect() {
  navigator.requestMIDIAccess()
    .then(
      (midi) => midiReady(midi),
      (err) => console.log('Something went wrong', err));
}

export function midiReady(midi) {
  // Also react to device changes.
  midi.addEventListener('statechange', (event) => initDevices(event.target));
  initDevices(midi); // see the next section!
}

export function initDevices(midi) {
  // Reset.
  midiIn = [];
  midiOut = [];

  // MIDI devices that send you data.
  const inputs = midi.inputs.values();
  for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
    midiIn.push(input.value);
  }

  // MIDI devices that you send data to.
  const outputs = midi.outputs.values();
  for (let output = outputs.next(); output && !output.done; output = outputs.next()) {
    midiOut.push(output.value);
  }

  displayDevices();
  startListening();
}


// Start listening to MIDI messages.
export function startListening() {
  for (const input of midiIn) {
    input.addEventListener('midimessage', midiMessageReceived);
  }
}

export function midiMessageReceived(event) {
  // MIDI commands we care about. See
  // http://webaudio.github.io/web-midi-api/#a-simple-monophonic-sine-wave-midi-synthesizer.
  const NOTE_ON = 9;
  const NOTE_OFF = 8;

  const cmd = event.data[0] >> 4;
  const pitch = event.data[1];
  const velocity = (event.data.length > 2) ? event.data[2] : 1;

  // You can use the timestamp to figure out the duration of each note.
  const timestamp = Date.now();

  // Note that not all MIDI controllers send a separate NOTE_OFF command for every NOTE_ON.
  if (cmd === NOTE_OFF || (cmd === NOTE_ON && velocity === 0)) {
    console.log(`🎧 from ${event.srcElement.name} note off: pitch:${pitch}, velocity: ${velocity}`);

    // Complete the note!
    const note = notesOn.get(pitch);
    if (note) {
      console.log(`🎵 pitch:${pitch}, duration:${timestamp - note} ms.`);
      notesOn.delete(pitch);
    }
  } else if (cmd === NOTE_ON) {
    console.log(`🎧 from ${event.srcElement.name} note off: pitch:${pitch}, velocity: {velocity}`);

    // One note can only be on at once.
    notesOn.set(pitch, timestamp);
  }
}

export function sendMidiMessage(pitch, velocity, duration) {
  const NOTE_ON = 0x90;
  const NOTE_OFF = 0x80;

  // const device = midiOut[selectOut.selectedIndex];
  const device = midiOut[selectedIndex];
  const msgOn = [NOTE_ON, pitch, velocity];
  const msgOff = [NOTE_ON, pitch, velocity];

  // First send the note on;
  device.send(msgOn);

  // Then send the note off. You can send this separately if you want 
  // (i.e. when the button is released)
  device.send(msgOff, Date.now() + duration);
}

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
connect();
sendMidiMessage(61, 100, 100);

