# midiraku

Goal is to create an online (and offline) MIDI editor that has less janky mouse note editing than in Reaper, more keyboard shortcuts and faster output rendering than in FL and is easier to use than Domino.

The name midiraku is a combination of "MIDI" and the Japanese word "raku" 楽 meaning simple, easy which is the main focus.

Stuff I will need: (WIP)

## Main UI display
- y axis for notes
- x axis for timeline (start to end of song)
- Timeline to be scrollable (automatic when playing back) and panable (aka possible to move the screen left to right and up to down)
- ghost notes

## Playback engine
- when playing back, the playback cursor goes to the right in a speed decided by the tempo and triggers notes on the timeline
- should support 1x, 0.5, 2x rate playback (and more)
- should have a mixer of some sort to prevent clipping
- able to play back the song using some sort of sampled waveforms (or just MIDI output)

## Nice graphics
- big enough notes to be able to grab them easily (unlike in Reaper)
- able to see velocity/modulation and so on easily on the notes themselves
- smooth scrolling and playback cursor
- animations when dragging note lengths, when notes are played and so on (and a feature to disable them)

## UI interaction
- efficient MIDI editing with mouse
  - click to add notes, drag to move them
  - click edges of notes to resize them
  - shift click and drag to copy and move
- efficient MIDI editing with keyboard + mouse
  - panning and zooming
  - copy paste, cut
- efficient MIDI editing with keyboard
  - some sort of MIDI recording using a keyboard, probably not realtime but instead step-by-step recording
  - probably some inspiration to be found in LSDj

## MIDI support
- able to import and export MIDI that is read correctly by DAWs like Reaper
- able to program automation like velocity, modulation, patch changes and so on
- support several MIDI channels
- support tempo changes

## Responsive design
- should be able to do at least something on mobile (although main focus is PC)

## "Would be nice to have" features
- patterns (like FL patterns)
- nice looking video output
- fancy synthesia like viewing mode

Nice links:
https://www.keithmcmillen.com/blog/making-music-in-the-browser-web-midi-api/
https://webmidi-examples.glitch.me
