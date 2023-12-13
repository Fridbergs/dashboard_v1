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
  newTextarea.placeholder = "";

  // Lägg till händelselyssnare för att spara i local storage när du klickar utanför textarea
  newTextarea.addEventListener("blur", function () {
    saveNoteToLocalStorage(newTextarea.value);
  });

  // Skapa en "Delete Note" knapp
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.addEventListener("click", function () {
    deleteNote(newNote);
  });

  // Lägg till textarea och "Delete Note" knapp till div
  newNote.appendChild(newTextarea);
  newNote.appendChild(deleteButton);

  // Lägg till div till "allNotes"
  document.getElementById("allNotes").appendChild(newNote);

  // Fokusera på den nya textarean
  newTextarea.focus();
}

// Funktion för att ta bort en anteckning från DOM
function deleteNote(noteDiv) {
  const noteContent = noteDiv.querySelector("textarea").value;

  // Ta bort anteckningen från local storage
  const savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
  const noteIndex = savedNotes.indexOf(noteContent);
  if (noteIndex !== -1) {
    savedNotes.splice(noteIndex, 1);
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
  }

  // Ta bort anteckningen från DOM
  noteDiv.remove();
}

// Funktion för att hämta sparade anteckningar från local storage
function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];

  // Loop through saved notes and create divs with textareas
  for (const noteContent of savedNotes) {
    createNoteDiv(noteContent);
  }
}

// Funktion för att spara en anteckning i local storage
function saveNoteToLocalStorage(noteContent) {
  const savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
  savedNotes.push(noteContent);
  localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
}

// Funktion för att skapa en div med en textarea och en "Delete Note" knapp
function createNoteDiv(noteContent) {
  const newNote = document.createElement("div");
  newNote.classList.add("createdDiv");

  const newTextarea = document.createElement("textarea");
  newTextarea.value = noteContent;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Note";
  deleteButton.addEventListener("click", function () {
    deleteNote(newNote);
  });

  newNote.appendChild(newTextarea);
  newNote.appendChild(deleteButton);

  document.getElementById("allNotes").appendChild(newNote);
}
