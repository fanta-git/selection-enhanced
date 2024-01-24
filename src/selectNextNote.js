function getClientInfo() {
  return {
    name: "SeEn: selectNextNote",
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
  const selectedNotes = selection.getSelectedNotes();
  const lastNoteIndex = selectedNotes.reduce(function (p, note) {
    const i = note.getIndexInParent();
    return p > i ? p : i;
  }, -Infinity);
  const nextNoteIndex = selectedNotes.length === 1 ? lastNoteIndex + 1 : lastNoteIndex;
  const nextNote = currentGroup.getNote(nextNoteIndex);

  if (nextNote) {
    selection.clearNotes();
    selection.selectNote(nextNote);
  }

  return SV.finish();
}

if ('module' in globalThis) module.exports = { getClientInfo, main }
