<script>
	import JZZ from "jzz";
	import TINY from "jzz-synth-tiny";
	TINY(JZZ);
	import { RangeSlider } from "@skeletonlabs/skeleton";
	import { instruments } from "./instruments.js";
	// JZZ.synth.Tiny.register("Web Audio");
	let midi = JZZ().openMidiOut();
	var synth = JZZ.synth.Tiny();

	// midi;

	// midi
	// 	.wait(500)
	// 	.send([0x90, 61, 127]) // note on
	// 	.wait(500)
	// 	.send([0x80, 61, 0]); // note off
	let octaveShift = 0;
	$: notes = [
		`C${4 + octaveShift}`,
		`C#${4 + octaveShift}`,
		`D${4 + octaveShift}`,
		`D#${4 + octaveShift}`,
		`E${4 + octaveShift}`,
		`F${4 + octaveShift}`,
		`F#${4 + octaveShift}`,
		`G${4 + octaveShift}`,
		`G#${4 + octaveShift}`,
		`A${4 + octaveShift}`,
		`A#${4 + octaveShift}`,
		`B${4 + octaveShift}`,
		`C${5 + octaveShift}`,
		`C#${5 + octaveShift}`,
		`D${5 + octaveShift}`,
		`D#${5 + octaveShift}`,
		`E${5 + octaveShift}`,
		`F${5 + octaveShift}`,
		`F#${5 + octaveShift}`,
		`G${5 + octaveShift}`,
		`G#${5 + octaveShift}`,
		`A${5 + octaveShift}`,
		`A#${5 + octaveShift}`,
		`B${5 + octaveShift}`,
		`C${6 + octaveShift}`,
		`C#${6 + octaveShift}`,
		`D${6 + octaveShift}`,
		`D#${6 + octaveShift}`,
		`E${6 + octaveShift}`
	];
	$: noteKeys = [
		{ key: "KeyZ", note: `C${4 + octaveShift}` },
		{ key: "KeyS", note: `C#${4 + octaveShift}` },
		{ key: "KeyX", note: `D${4 + octaveShift}` },
		{ key: "KeyD", note: `D#${4 + octaveShift}` },
		{ key: "KeyC", note: `E${4 + octaveShift}` },
		{ key: "KeyV", note: `F${4 + octaveShift}` },
		{ key: "KeyG", note: `F#${4 + octaveShift}` },
		{ key: "KeyB", note: `G${4 + octaveShift}` },
		{ key: "KeyH", note: `G#${4 + octaveShift}` },
		{ key: "KeyN", note: `A${4 + octaveShift}` },
		{ key: "KeyJ", note: `A#${4 + octaveShift}` },
		{ key: "KeyM", note: `B${4 + octaveShift}` },
		{ key: "Comma", note: `C${5 + octaveShift}` },
		{ key: "KeyL", note: `C#${5 + octaveShift}` },
		{ key: "Period", note: `D${5 + octaveShift}` },
		{ key: "Semicolon", note: `D#${5 + octaveShift}` },
		{ key: "Slash", note: `E${5 + octaveShift}` },
		{ key: "KeyQ", note: `B${4 + octaveShift}` },
		{ key: "KeyW", note: `C${5 + octaveShift}` },
		{ key: "Digit3", note: `C#${5 + octaveShift}` },
		{ key: "KeyE", note: `D${5 + octaveShift}` },
		{ key: "Digit4", note: `D#${5 + octaveShift}` },
		{ key: "KeyR", note: `E${5 + octaveShift}` },
		{ key: "KeyT", note: `F${5 + octaveShift}` },
		{ key: "Digit6", note: `F#${5 + octaveShift}` },
		{ key: "KeyY", note: `G${5 + octaveShift}` },
		{ key: "Digit7", note: `G#${5 + octaveShift}` },
		{ key: "KeyU", note: `A${5 + octaveShift}` },
		{ key: "Digit8", note: `A#${5 + octaveShift}` },
		{ key: "KeyI", note: `B${5 + octaveShift}` },
		{ key: "KeyO", note: `C${6 + octaveShift}` },
		{ key: "Digit0", note: `C#${6 + octaveShift}` },
		{ key: "KeyP", note: `D${6 + octaveShift}` },
		{ key: "Minus", note: `D#${6 + octaveShift}` },
		{ key: "BracketLeft", note: `E${6 + octaveShift}` }
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

	$: {
		midi.program(0, currentProgram);
		synth.program(0, currentProgram);
	}

	function playNote(note) {
		if (mouseDown) {
			midi.send([0x90, note, 127]); // note off
			synth.send([0x90, note, 127]);
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
		synth.send([0x80, note, 0]); // note off

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
			midi.send([0x90, finalNote, 127]); // note off
			synth.send([0x90, finalNote, 127]); // note off
			pressedKey.classList.add("pressed");
		}
	}

	function keyDebug(e) {
		// console.log(e);
	}
	function keyUp(code) {
		let finalNoteIndex = noteKeys.findIndex((i) => i.key === code);
		let finalNote = noteKeys[finalNoteIndex].note;
		midi.send([0x80, finalNote, 0]);
		synth.send([0x80, finalNote, 0]);
		releasedKey = document.querySelector("#" + finalNote.replace("#", "-"));
		releasedKey.classList.remove("pressed");
	}

	function shiftOctave(direction) {
		if (direction === 1) {
			octaveShift += 1;
		} else {
			octaveShift -= 1;
		}
	}
</script>

<div class="absolute">
	{#await midi then value}
		<!-- {console.log(value.info())} -->
		{#each Object.entries(value.info()) as info}
			<p>{info},</p>
		{/each}
	{/await}
</div>
<main class="flex h-full flex-col items-center justify-center">
	<div class="flex flex-col items-center">
		<p>Octave shift</p>
		<div class="flex">
			<button
				class="rounded-lg bg-slate-100 p-1 px-4 text-4xl text-black"
				on:click={() => shiftOctave(-1)}>-</button>
			<p class="p-4 !text-4xl">
				{octaveShift}
			</p>
			<button
				class="rounded-lg bg-slate-100 p-1 px-4 text-4xl text-black"
				on:click={() => shiftOctave(1)}>+</button>
		</div>
	</div>
	<RangeSlider bind:value={currentProgram} max={127} step={1} class="w-3/4 p-2 lg:p-12"
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
						on:touchstart={() => {
							mouseDown = true;
							playNote(note);
						}}
						on:touchend={() => {
							mouseDown = false;
							releaseNote(note);
						}}
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
						on:touchstart={() => {
							mouseDown = true;
							playNote(note);
						}}
						on:touchend={() => {
							mouseDown = false;
							releaseNote(note);
						}}
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

<!-- scale messed up mouseenter etc because of absolute children so remove scale -->
<style>
	:global(.pressed) {
		@apply scale-95 bg-blue-300 transition-all duration-100;
	}
	:global(.pressed2) {
		@apply bg-blue-300 transition-all duration-100;
	}
</style>
