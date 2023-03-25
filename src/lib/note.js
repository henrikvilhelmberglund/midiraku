export class Note {
	constructor(noteValue, channel, program, velocity, startTime, endTime) {
		this.noteValue = noteValue;
		this.channel = channel;
		this.program = program;
		this.velocity = velocity;
		this.startTime = startTime;
		this.endTime = endTime;
	}
}

export const noteList = [
	"C0",
	"C#0",
	"D0",
	"D#0",
	"E0",
	"F0",
	"F#0",
	"G0",
	"G#0",
	"A0",
	"A#0",
  "B0",
  
  "C1",
	"C#1",
	"D1",
	"D#1",
	"E1",
	"F1",
	"F#1",
	"G1",
	"G#1",
	"A1",
	"A#1",
  "B1",
  
  "C2",
	"C#2",
	"D2",
	"D#2",
	"E2",
	"F2",
	"F#2",
	"G2",
	"G#2",
	"A2",
	"A#2",
	"B2",
];

export const sortedNotes = [...noteList].reverse();
