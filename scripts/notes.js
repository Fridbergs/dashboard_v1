const notesHeader = document.getElementById("notesHeader");
const addNote = document.getElementById("addNoteButton");
// Ladda sparade anteckningar när sidan laddas
window.onload = loadNotes;

// Funktion för att skapa en ny anteckning (textarea)
function createNote() {
  const newNote = document.createElement("div");
  newNote.classList.add("createdDiv");

  // Skapa en ny textarea
  const newTextarea = document.createElement("textarea");
  newTextarea.placeholder = " ";

  // Generera ett slumpmässigt ID för textarea
  const textareaId = randomNoteId();
  newTextarea.id = `noteTextarea_${textareaId}`;

  // Lägg till händelselyssnare för att spara i local storage när du klickar utanför textarea
  newTextarea.addEventListener("blur", function () {
    saveNoteToLocalStorage(textareaId, newTextarea.value);
  });

  // Skapa en "Delete Note" knapp
  const deleteButton = document.createElement("button");
  deleteButton.textContent = " ";
  deleteButton.addEventListener("click", function () {
    deleteNote(newNote, textareaId);
  });

  // Lägg till textarea och "Delete Note" knapp till div
  newNote.appendChild(newTextarea);
  newNote.appendChild(deleteButton);

  // Lägg till div till "allNotes"
  document.getElementById("allNotes").appendChild(newNote);

  // Fokusera på den nya textarean
  newTextarea.focus();
}

// Funktion för att ta bort en anteckning
function deleteNote(noteDiv, textareaId) {
  // Ta bort anteckningen från local storage
  const savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
  const updatedNotes = savedNotes.filter((note) => note.id !== textareaId);
  localStorage.setItem("savedNotes", JSON.stringify(updatedNotes));

  // Ta bort anteckningen från DOM
  noteDiv.remove();
}

// Funktion för att hämta sparade anteckningar från local storage
function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];

  // Loop through saved notes and create divs with textareas
  for (const note of savedNotes) {
    createNoteDiv(note.id, note.content);
  }
}

// Funktion för att spara en anteckning i local storage
function saveNoteToLocalStorage(textareaId, noteContent) {
  // Hämta befintliga anteckningar från local storage
  const savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];

  // Lägg till den nya anteckningen till arrayen
  savedNotes.push({ id: textareaId, content: noteContent });

  // Spara hela arrayen till local storage
  localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
}

// Funktion för att skapa en div med en textarea och en "Delete Note" knapp
function createNoteDiv(textareaId, noteContent) {
  const newNote = document.createElement("div");
  newNote.classList.add("createdDiv");

  const newTextarea = document.createElement("textarea");
  newTextarea.id = `noteTextarea_${textareaId}`;
  newTextarea.value = noteContent;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    deleteNote(newNote, textareaId);
  });

  newNote.appendChild(newTextarea);
  newNote.appendChild(deleteButton);

  document.getElementById("allNotes").appendChild(newNote);
}

// Funktion för att generera ett slumpmässigt ID för anteckningen
function randomNoteId() {
  return Math.floor(Math.random() * 1000 * (Math.random() * 5000));
}
