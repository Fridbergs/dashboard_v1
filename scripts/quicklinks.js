// Array for storing saved quick links
let quickLinks = [];

// Get references to modal elements
const modal = document.getElementById("myModal");

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target === modal) {
    closeModal();
  }
};

function insertURL() {
  let urlInput = document.getElementById("urlInput");
  let urlValue = urlInput.value.trim();

  if (urlValue !== "") {
    // Save URL to local storage
    quickLinks.push(urlValue);
    localStorage.setItem("quickLinks", JSON.stringify(quickLinks));

    // Display the saved URL on the page
    appendSavedURL(urlValue);

    // Clear the input field
    urlInput.value = "";

    closeModal(); // Close the modal after inserting the URL
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve saved quick links from local storage
  let savedQuickLinks = localStorage.getItem("quickLinks");
  if (savedQuickLinks) {
    quickLinks = JSON.parse(savedQuickLinks);

    // Display saved quick links on the page
    quickLinks.forEach((url) => {
      appendSavedURL(url);
    });
  }
});

function appendSavedURL(url) {
  let quickCardDiv = document.getElementById("quickCardDiv");

  // Create an <a> element
  let newAnchorTag = document.createElement("a");
  newAnchorTag.textContent = url;
  newAnchorTag.href = url;
  newAnchorTag.target = "_blank"; // Open link in a new tab (optional)

  // Add a delete button for each saved URL
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    deleteSavedURL(url);
  });

  // Append the <a> element and the delete button to the container
  quickCardDiv.appendChild(newAnchorTag);
  quickCardDiv.appendChild(deleteButton);

  // Add a line break for better spacing (optional)
  quickCardDiv.appendChild(document.createElement("br"));
}

function deleteSavedURL(url) {
  // Remove the URL from the quickLinks array
  quickLinks = quickLinks.filter((link) => link !== url);

  // Update local storage with the modified quickLinks array
  localStorage.setItem("quickLinks", JSON.stringify(quickLinks));

  // Clear the displayed quick links and re-display the updated list
  clearQuickLinks();
  quickLinks.forEach((savedURL) => {
    appendSavedURL(savedURL);
  });

  // Open the modal after deletion
  openModal();
}

function clearQuickLinks() {
  let quickCardDiv = document.getElementById("quickCardDiv");
  quickCardDiv.innerHTML = ""; // Clear the content of the container
}
