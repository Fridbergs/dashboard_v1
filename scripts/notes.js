let notesTextarea = document.getElementById("allNotes");

// Add a keydown event listener to the textarea
notesTextarea.addEventListener("keydown", function (event) {
  // Check if the pressed key is the Tab key
  if (event.key === "Tab") {
    // Prevent the default Tab behavior (focus switching)
    event.preventDefault();

    // Save the content of the textarea (you can customize this part)
    saveNotes(notesTextarea.value);
  }
});

// Function to save the notes (customize this function according to your needs)
function saveNotes(notes) {
  // Example: Save notes to local storage
  localStorage.setItem("userNotes", notes);
  console.log("Notes saved:", notes);
}
