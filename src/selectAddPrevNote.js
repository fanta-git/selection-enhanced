function getClientInfo() {
  return {
    name: "SeEn: selectAddPrevNote",
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
  const firstNoteIndex = selection.getSelectedNotes().reduce(function (p, note) {
    const i = note.getIndexInParent();
    return p < i ? p : i;
  }, Infinity);

  const prevNote = currentGroup.getNote(firstNoteIndex - 1);
  if (prevNote) {
    selection.selectNote(prevNote);
  }

  return SV.finish();
}

if ('module' in globalThis) module.exports = { getClientInfo, main }
