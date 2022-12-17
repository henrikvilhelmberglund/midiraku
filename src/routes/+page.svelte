<script>
	import JZZ from "jzz";
	import { RangeSlider } from "@skeletonlabs/skeleton";
	import { instruments } from "./instruments.js";
	let midi = JZZ().openMidiOut();
	// midi;

	// midi
	// 	.wait(500)
	// 	.send([0x90, 61, 127]) // note on
	// 	.wait(500)
	// 	.send([0x80, 61, 0]); // note off
	let notes = [
		"C4",
		"C#4",
		"D4",
		"D#4",
		"E4",
		"F4",
		"F#4",
		"G4",
		"G#4",
		"A4",
		"A#4",
		"B4",
		"C5",
		"C#5",
		"D5",
		"D#5",
		"E5",
		"F5",
		"F#5",
		"G5",
		"G#5",
		"A5",
		"A#5",
		"B5",
		"C6",
		"C#6",
		"D6",
		"D#6",
		"E6"
	];
	let noteKeys = [
		{ key: "KeyZ", note: "C4" },
		{ key: "KeyS", note: "C#4" },
		{ key: "KeyX", note: "D4" },
		{ key: "KeyD", note: "D#4" },
		{ key: "KeyC", note: "E4" },
		{ key: "KeyV", note: "F4" },
		{ key: "KeyG", note: "F#4" },
		{ key: "KeyB", note: "G4" },
		{ key: "KeyH", note: "G#4" },
		{ key: "KeyN", note: "A4" },
		{ key: "KeyJ", note: "A#4" },
		{ key: "KeyM", note: "B4" },
		{ key: "Comma", note: "C5" },
		{ key: "KeyL", note: "C#5" },
		{ key: "Period", note: "D5" },
		{ key: "Semicolon", note: "D#5" },
		{ key: "Slash", note: "E5" },
		{ key: "KeyQ", note: "B4" },
		{ key: "KeyW", note: "C5" },
		{ key: "Digit3", note: "C#5" },
		{ key: "KeyE", note: "D5" },
		{ key: "Digit4", note: "D#5" },
		{ key: "KeyR", note: "E5" },
		{ key: "KeyT", note: "F5" },
		{ key: "Digit6", note: "F#5" },
		{ key: "KeyY", note: "G5" },
		{ key: "Digit7", note: "G#5" },
		{ key: "KeyU", note: "A5" },
		{ key: "Digit8", note: "A#5" },
		{ key: "KeyI", note: "B5" },
		{ key: "KeyO", note: "C6" },
		{ key: "Digit0", note: "C#6" },
		{ key: "KeyP", note: "D6" },
		{ key: "Minus", note: "D#6" },
		{ key: "BracketLeft", note: "E6" }
		// "Digit6",
		// "KeyY",
		// "Digit7",
		// "KeyU",
		// "KeyI",
		// "Digit9",
		// "KeyO",
		// "Digit0",
		// "KeyP",
		// "BracketLeft",
		// "Equal",
		// "BracketRight"
	];
	let pressedKey;
	let releasedKey;
	let currentProgram = 0;
	let mouseDown;

	// function changeProgram(program) {
	// 	midi.program = program;
	// 	console.log(program);
	// }

	$: {
		midi.program(0, currentProgram);
	}

	function playNote(note) {
		if (mouseDown) {
			midi.send([0x90, note, 127]); // note off
			pressedKey = document.querySelector("#" + note.replace("#", "-"));
			if (note.includes("#")) {
				pressedKey.classList.add("pressed2");
			} else {
				pressedKey.classList.add("pressed");
			}
		}
	}

	function releaseNote(note) {
		midi.send([0x80, note, 0]); // note off
		pressedKey = document.querySelector("#" + note.replace("#", "-"));
		if (note.includes("#")) {
			pressedKey.classList.remove("pressed2");
		} else {
			pressedKey.classList.remove("pressed");
		}
	}

	function playNoteKey(code) {
		let finalNoteIndex = noteKeys.findIndex((i) => i.key === code);
		let finalNote = noteKeys[finalNoteIndex].note;
		pressedKey = document.querySelector("#" + finalNote.replace("#", "-"));
		if (pressedKey.classList.contains("pressed")) {
			return;
		} else {
			// const pos = myArray.map((e) => e.hello).indexOf("stevie");
			// console.log(finalNote);
			midi.send([0x90, finalNote, 127]); // note off
			pressedKey.classList.add("pressed");
		}
	}

	function keyDebug(e) {
		// console.log(e);
	}
	function keyUp(code) {
		// console.log(code);
		let finalNoteIndex = noteKeys.findIndex((i) => i.key === code);
		let finalNote = noteKeys[finalNoteIndex].note;
		midi.send([0x80, finalNote, 0]);
		releasedKey = document.querySelector("#" + finalNote.replace("#", "-"));
		releasedKey.classList.remove("pressed");
	}
</script>

<main class="flex h-full flex-col items-center justify-center">
	<RangeSlider bind:value={currentProgram} max={127} step={1} ticked class="w-3/4"
		>{instruments[currentProgram]}</RangeSlider>
	<div>
		<article
			on:mouseup={() => {
				mouseDown = false;
			}}
			class="flex h-full flex-row items-center justify-center">
			{#each notes as note}
				{#if note.includes("#")}
					<div
						class="relative"
						on:mousedown={() => {
							mouseDown = true;
							playNote(note);
						}}
						on:mouseup={() => {
							mouseDown = false;
							releaseNote(note);
						}}
						on:mouseenter={() => playNote(note)}
						on:mouseleave={() => releaseNote(note)}
						on:keydown={(e) => playNoteKey(e.code)}
						on:keyup={(e) => keyUp(e.code)}>
						<button
							id={note.replace("#", "-")}
							class="absolute -bottom-14 -right-8 z-10 m-0.5 h-64 w-12 rounded-lg bg-black text-white">
							<span class="relative -bottom-16">{note}</span></button>
					</div>
				{:else}
					<div
						class="relative"
						on:mousedown={() => {
							mouseDown = true;
							playNote(note);
						}}
						on:mouseup={() => {
							mouseDown = false;
							releaseNote(note);
						}}
						on:mouseenter={() => playNote(note)}
						on:mouseleave={() => releaseNote(note)}
						on:keydown={(e) => playNoteKey(e.code)}
						on:keyup={(e) => keyUp(e.code)}>
						<button
							id={note.replace("#", "-")}
							class="z-20 m-0.5 h-96 w-16 rounded-lg bg-white text-black">
							<span class="relative -bottom-32">{note}</span></button>
					</div>
				{/if}
			{/each}
		</article>
	</div>
</main>

<style>
	:global(.pressed) {
		@apply scale-95 bg-blue-300 transition-all duration-100;
	}
	/* scale messed up mouseenter etc because of absolute children so remove scale*/
	:global(.pressed2) {
		@apply bg-blue-300 transition-all duration-100;
	}
</style>
