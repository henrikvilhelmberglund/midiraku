<script>
	import Footer from "$lib/Footer.svelte";
	import { Note, sortedNotes, noteList } from "../lib/note";
	import { WebMidi } from "webmidi";
	import N from "$lib/N.svelte";
	import Pianoroll from "$lib/Pianoroll.svelte";

	WebMidi.enable()
		.then(() => onEnabled())
		.catch((err) => console.log(err));

	let output;
	let channel;

	let selectedChannel = 0;
	let selectedDuration = 2;
	// channel.playNote(["C3", "D#3", "G3"]);

	let song = [];
	let songMeasures = 1;

	

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

<div class="h-32">
	{JSON.stringify(song)}
</div>

<main class="flex w-[3000px] flex-col [&>*]:m-0">
	<div class="flex-row">
		<div>
			{#each sortedNotes as note}
				<div class="h-10 w-10 border bg-slate-200">
					{note}
				</div>
			{/each}
		</div>
		<Pianoroll {channel} {selectedChannel} {songMeasures} {song} />
	</div>
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
