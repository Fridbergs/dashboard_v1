document.addEventListener("DOMContentLoaded", function () {
  const notesTextarea = document.getElementById("notesTextarea");

  // Use the 'input' event to capture changes in the textarea content
  notesTextarea.addEventListener("input", function () {
    // Save the updated content to local storage
    localStorage.setItem("notes", this.value);
  });

  // Load saved notes from local storage on page load
  window.addEventListener("load", function () {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      notesTextarea.value = savedNotes;
    }
  });
});
