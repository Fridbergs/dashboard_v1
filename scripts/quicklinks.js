// Function to open the modal
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

// Function to close the modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

// Function to insert a new quick link
function insertURL() {
  // Get the values from the input fields
  var url = document.getElementById("urlInput").value;
  var title = document.getElementById("titleInput").value;

  // Check if the URL starts with "http://" or "https://", if not, add "http://"
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "http://" + url;
  }

  // Create a new div for the quick link
  var newQuickLink = document.createElement("div");
  newQuickLink.className = "quick-link-item";

  // Create an anchor element for the title
  var titleLink = document.createElement("a");
  titleLink.textContent = title;
  titleLink.href = url;
  titleLink.target = "_blank"; // Open in a new tab

  // Create a button for deleting the quick link
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    // Remove the quick link when the delete button is clicked
    newQuickLink.remove();
  };

  // Append the title link and delete button to the quick link div
  newQuickLink.appendChild(titleLink);
  newQuickLink.appendChild(deleteButton);

  // Append the new quick link to the quickLinksStored div
  document.getElementById("quickLinksStored").appendChild(newQuickLink);

  // Clear the input fields after adding the quick link
  document.getElementById("urlInput").value = "";
  document.getElementById("titleInput").value = "";

  // Close the modal
  closeModal();
}

// Attach event listeners after the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".addButton").addEventListener("click", openModal);
  document.querySelector("#saveUrlButton").addEventListener("click", insertURL);
});
