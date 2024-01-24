function getClientInfo() {
  return {
    name: "SeEn: selectPrevNote",
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
  const firstNoteIndex = selectedNotes.reduce(function (p, note) {
    const i = note.getIndexInParent();
    return p < i ? p : i;
  }, Infinity);

  const prevNoteIndex = selectedNotes.length === 1 ? firstNoteIndex - 1 : firstNoteIndex;
  const prevNote = currentGroup.getNote(prevNoteIndex);

  if (prevNote) {
    selection.clearNotes();
    selection.selectNote(prevNote);
  }

  return SV.finish();
}

if ('module' in globalThis) module.exports = { getClientInfo, main }
