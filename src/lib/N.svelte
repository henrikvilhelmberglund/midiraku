<script>
	import { Note, sortedNotes, noteList } from "./note";
	export let songNote;
	export let noteValue;

	let moving = 0;
	let startX;
	let startY;

	let m = { x: 0, y: 0 };

	function handleMousemove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}

	function setInitialValues(event) {
		m.x = event.clientX;
		m.y = event.clientY;
		startX = m.x;
		startY = m.y;
	}

	function moveNote() {
		console.log("what");

		console.table(`startY: ${startY} y: ${m.y}`);

		// TODO fix (songNote probably doesn't update)
		if (startY - m.y < -20) {
			songNote.noteValue = noteList[noteList.indexOf(songNote.noteValue) - 1];
		}
	}
</script>

<button
	draggable="true"
	on:mousedown|stopPropagation={() => (moving = 1)}
	on:mouseup={() => (moving = 0)}
	on:dragstart={(e) => setInitialValues(e)}
	on:drag={(e) => {
		handleMousemove(e);
		moveNote();
	}}
	class="absolute bottom-0 left-0 rounded bg-blue-400 p-1">{noteValue}</button>

<style>
</style>
