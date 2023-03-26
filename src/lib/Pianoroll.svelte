<script>
	import { Note, sortedNotes, noteList } from "./note";
	import N from "./N.svelte";
	export let song = [];
	export let songMeasures = 1;
	$: songBars = songMeasures * 4;
	export let channel;
	export let selectedChannel = 0;
	let beats = 4;

	let currentPlayingNote;

	function addNote(note, measure, bar, beat) {
		let newNote = new Note(note, selectedChannel, 0, measure, bar, beat, 80, 4, 7);
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

<div class="flex flex-col">
	{#each sortedNotes as note}
		<div class="flex-row">
			{#each Array(songMeasures) as _, measure}
				{#each Array(songBars) as _, bar}
					{#each Array(beats) as _, beat}
						<div
							on:mousedown={() => addNote(note, measure, bar, beat)}
							on:mouseup={() => stopNote()}
              class:border-l-slate-400={beat!==0}
              class:border-b-slate-400={true}
							class="flex border-l border-b h-10 w-12 flex-row bg-blue-200">
							{#each song as songNote}
								<div class="relative">
									{#if note === songNote.noteValue && measure === songNote.measure && bar === songNote.bar && beat === songNote.beat}
										<N {songNote} noteValue={songNote.noteValue} />
									{/if}
								</div>
							{/each}
						</div>
					{/each}
				{/each}
			{/each}
		</div>
	{/each}
</div>

<style>
</style>
