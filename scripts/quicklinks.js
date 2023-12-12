//Får kontakt med modalen som ska öppna ett fönster för att skriva in URL
const modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
function openModal() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closeModal() {
  modal.style.display = "none";
}

// When the user clicks outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    closeModal();
  }
};

// Insert URL function (you can modify this based on your needs)
function insertURL() {
  let urlInput = document.getElementById("urlInput").value;

  //Spara URL till LocalStorage
  localStorage.setItem("savedURL", urlInput);

  // Perform any action with the URL, such as updating a text field or an iframe
  console.log("URL inserted: " + urlInput);

  //Appendar URLen till en p-tagg
  appendSavedURL(urlInput);

  closeModal(); // Close the modal after inserting the URL
}

//Array för att lagra sparade snabblänkar
let quickLinks = [];

//få kontakt med lägg till länk knapp
const addLink = document.getElementById("addButton");
addLink.addEventListener("click", () => {
  console.log("Houston vi har kontakt");
});

//Kollar LocalStorage för att se om det finns någon URL som ska sparas i DOMen
document.addEventListener("DOMContentLoaded", function () {
  let savedURL = localStorage.getItem("savedURL");
  if (savedURL) {
    console.log("Retrieved saved URL from local storage: " + savedURL);

    //Lägg till den sparade URLen till domen
    appendSavedURL(savedURL);
  }
});

//Funktion som skickar den sparade URLen till en div
function appendSavedURL(url) {
  let quickCardDiv = document.getElementById("quickCardDiv");
  let newParahraphTag = document.createElement("p");
  newParahraphTag.textContent = url;
  quickCardDiv.appendChild(newParahraphTag);
}
