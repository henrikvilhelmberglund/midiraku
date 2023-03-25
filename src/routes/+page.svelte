<script>
	import Footer from "$lib/Footer.svelte";
	import { Note, sortedNotes, noteList } from "../lib/note";
	import { WebMidi } from "webmidi";

	WebMidi.enable()
		.then(() => onEnabled())
		.catch((err) => console.log(err));

	let output;
	let channel;
	// channel.playNote(["C3", "D#3", "G3"]);

	let song = [];

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

	function playNote(note) {
		channel.playNote(note);
		currentPlayingNote = note;
	}

	function stopNote() {
		channel.stopNote(currentPlayingNote);
	}
</script>

<main class="[&>*]:m-0">
	{#each sortedNotes as note}
		<div
			on:mousedown={() => playNote(note)}
			on:mouseup={() => stopNote()}
			class="h-10 w-full border bg-slate-200">
			{note}
		</div>
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
