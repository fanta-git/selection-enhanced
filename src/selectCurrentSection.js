function getClientInfo() {
  return {
    name: "SeEn: selectCurrentSection",
    category: "Selection Enhanced",
    author: "fanta",
    versionNumber: 1,
    minEditorVersion: 65536
  };
}

function main() {
  const mainEditor = SV.getMainEditor();
  const currentGroup = mainEditor.getCurrentGroup().getTarget();
  const selection = mainEditor.getSelection();
  const selectedNoteIndexes = selection.getSelectedNotes().map(function (note) {
    return note.getIndexInParent();
  });

  if (selectedNoteIndexes.length === 0) return SV.finish();

  const startNoteIndex = Math.min.apply(null, selectedNoteIndexes);
  const lastNoteIndex = Math.max.apply(null, selectedNoteIndexes);
  const startNote = frontBreakIndex(currentGroup, startNoteIndex);
  const endNote = backBreakIndex(currentGroup, lastNoteIndex);

  selection.clearNotes();
  for (var i = startNote; i <= endNote; i++) {
    selection.selectNote(currentGroup.getNote(i));
  }

  return SV.finish();
}

/**
 * @param {NoteGroup} group
 * @param {number} currentIndex
 *
 * @returns {number}
 */
function frontBreakIndex(group, currentIndex) {
  const currentNote = group.getNote(currentIndex);
  const prevNote = group.getNote(currentIndex - 1);
  if (currentNote && prevNote && currentNote.getOnset() <= prevNote.getEnd()) {
    return frontBreakIndex(group, currentIndex - 1);
  }

  return currentIndex;
}

/**
 * @param {NoteGroup} group
 * @param {number} currentIndex
 *
 * @returns {number}
 */
function backBreakIndex(group, currentIndex) {
  const currentNote = group.getNote(currentIndex);
  const nextNote = group.getNote(currentIndex + 1);
  if (currentNote && nextNote && nextNote.getOnset() <= currentNote.getEnd()) {
    return backBreakIndex(group, currentIndex + 1);
  }

  return currentIndex;
}

if ('module' in globalThis) module.exports = { getClientInfo, main }
