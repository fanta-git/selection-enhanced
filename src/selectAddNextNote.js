function getClientInfo() {
  return {
    name: "SeEn: selectAddNextNote",
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
  const lastNoteIndex = selection.getSelectedNotes().reduce(function (p, note) {
    const i = note.getIndexInParent();
    return p > i ? p : i;
  }, -Infinity);

  const nextNote = currentGroup.getNote(lastNoteIndex + 1);
  if (nextNote) {
    selection.selectNote(nextNote);
  }

  return SV.finish();
}

if ('module' in globalThis) module.exports = { getClientInfo, main }
