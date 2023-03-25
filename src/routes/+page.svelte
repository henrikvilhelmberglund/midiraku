<script>
	import Footer from "$lib/Footer.svelte";
	import { Note, sortedNotes, noteList } from "../lib/note";
	import { WebMidi } from "webmidi";
	import N from "$lib/N.svelte";

	WebMidi.enable()
		.then(() => onEnabled())
		.catch((err) => console.log(err));

	let output;
	let channel;

	let selectedChannel = 0;
	let selectedDuration = 2;
	// channel.playNote(["C3", "D#3", "G3"]);

	let song = [];

	let m = { x: 0, y: 0 };

	function handleMousemove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}

	function onEnabled() {
		// Inputs
		WebMidi.inputs.forEach((input) => console.log(`inputs: ${input.manufacturer}, ${input.name}`));
		output = WebMidi.outputs[0];
		channel = output.channels[1];

		// Outputs
		WebMidi.outputs.forEach((output) =>
			console.log(`outputs: ${output.manufacturer}, ${output.name}`)
		);
	}

	let currentPlayingNote;

	function addNote(note) {
		let newNote = new Note(note, selectedChannel, 0, 80, 4, 7);
		song.push(newNote);
		song = song;
		console.log(song);
		channel.playNote(note);
		currentPlayingNote = note;
	}

	function playNote(note) {
		channel.playNote(note);
		currentPlayingNote = note;
	}

	function stopNote() {
		channel.stopNote(currentPlayingNote);
	}
</script>

<div class="h-32">
	{JSON.stringify(song)}
</div>

<main on:mousemove={handleMousemove} class="[&>*]:m-0 w-[3000px]">
	The mouse position is {m.x} x {m.y}
	{#each sortedNotes as note}
		<div
			on:mousedown={() => addNote(note)}
			on:mouseup={() => stopNote()}
			class="h-10 w-full border bg-slate-200">
			{note}
		</div>
		{#each song as songNote}
			{#if note === songNote.noteValue}
				<div class="relative">
					<N noteValue={songNote.noteValue} />
				</div>
			{/if}
		{/each}
	{/each}
</main>

<aside class="flex">
	<!-- keyboard at bottom -->
	{#each noteList as note, i}
		{#if !note.includes("#")}
			<div
				on:mousedown={() => playNote(note)}
				on:mouseup={() => stopNote()}
				class="h-52 w-10 border bg-white" />
			<span style="left: {i * 23.3}px" class="pointer-events-none absolute pt-44 pl-1">{note}</span>
		{:else}
			<div
				on:mousedown={() => playNote(note)}
				on:mouseup={() => stopNote()}
				style="left: {i * 23.3}px"
				class="absolute h-36 w-7 bg-black" />
		{/if}
	{/each}
</aside>

<Footer />
