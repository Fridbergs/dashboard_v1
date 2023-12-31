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
  let url = document.getElementById("urlInput").value;
  let title = document.getElementById("titleInput").value;

  // Validate that both URL and title are not empty
  if (url.trim() === "" || title.trim() === "") {
    return;
  }

  // Check if the URL starts with "http://" or "https://", if not, add "http://"
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "http://" + url;
  }

  // Create a new div for the quick link
  let newQuickLink = document.createElement("div");
  newQuickLink.className = "quick-link-item";

  // Create an anchor element for the title
  let titleLink = document.createElement("a");
  titleLink.textContent = title;
  titleLink.href = url;
  titleLink.target = "_blank"; // Open in a new tab

  // Create a button for deleting the quick link
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.onclick = (function (title, url) {
    return function () {
      // Remove the quick link from the DOM
      newQuickLink.remove();

      // Delete the quick link data from LocalStorage
      deleteQuickLink(title, url);
    };
  })(title, url);

  // Append the title link and delete button to the quick link div
  newQuickLink.appendChild(titleLink);
  newQuickLink.appendChild(deleteButton);

  // Append the new quick link to the quickLinksStored div
  document.getElementById("quickLinksStored").appendChild(newQuickLink);

  // Save the quick link data to LocalStorage
  saveToLocalStorage(title, url);

  // Clear the input fields after adding the quick link
  document.getElementById("urlInput").value = "";
  document.getElementById("titleInput").value = "";

  // Close the modal
  closeModal();
}

// Function to save quick link data to LocalStorage
function saveToLocalStorage(title, url) {
  if (title.trim() !== "" && url.trim() !== "") {
    // Retrieve existing quick links from LocalStorage or initialize an empty array
    let existingQuickLinks =
      JSON.parse(localStorage.getItem("quickLinks")) || [];

    // Add the new quick link to the array
    existingQuickLinks.push({ title: title, url: url });

    // Save the updated array back to LocalStorage
    localStorage.setItem("quickLinks", JSON.stringify(existingQuickLinks));
  }
}

// Function to delete a quick link
function deleteQuickLink(title, url) {
  // Retrieve existing quick links from LocalStorage
  let existingQuickLinks = JSON.parse(localStorage.getItem("quickLinks")) || [];

  // Remove the quick link from the array based on title and URL
  existingQuickLinks = existingQuickLinks.filter(function (link) {
    return !(link.title === title && link.url === url);
  });

  // Save the updated array back to LocalStorage
  localStorage.setItem("quickLinks", JSON.stringify(existingQuickLinks));
}

// Function to display quick links from LocalStorage
function displayQuickLinks() {
  // Retrieve existing quick links from LocalStorage
  let existingQuickLinks = JSON.parse(localStorage.getItem("quickLinks")) || [];

  // Reference to the quickLinksStored div
  let quickLinksStoredDiv = document.getElementById("quickLinksStored");

  // Clear the existing content in the quickLinksStored div
  quickLinksStoredDiv.innerHTML = "";

  // Iterate through the quick links and create DOM elements
  existingQuickLinks.forEach(function (link) {
    let newQuickLink = document.createElement("div");
    newQuickLink.className = "quick-link-item";

    let titleLink = document.createElement("a");
    titleLink.textContent = link.title;
    titleLink.href = link.url;
    titleLink.target = "_blank";

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.onclick = (function (title, url) {
      return function () {
        // Find the parent div (quick-link-item) and remove it
        let parentDiv = deleteButton.closest(".quick-link-item");
        if (parentDiv) {
          parentDiv.remove();

          // Delete the quick link data from LocalStorage
          deleteQuickLink(title, url);
        }
      };
    })(link.title, link.url);

    newQuickLink.appendChild(titleLink);
    newQuickLink.appendChild(deleteButton);

    // Append the new quick link to the quickLinksStored div
    quickLinksStoredDiv.appendChild(newQuickLink);
  });
}

// Attach event listeners after the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".add-site").addEventListener("click", openModal);
  document.querySelector("#saveUrlButton").addEventListener("click", insertURL);

  // Display quick links from LocalStorage
  displayQuickLinks();
});
