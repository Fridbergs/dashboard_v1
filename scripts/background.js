document.addEventListener("DOMContentLoaded", async () => {
  let queryWord; // Inget standardvärde har blivit angettt

  const unsplashAccessKey = await getApiKey(); // Hämtar API-nyckeln från variables.json

  const getImagesButton = document.querySelector(".getImagesButton");
  const queryInput = document.getElementById("queryInput");

  getImagesButton.addEventListener("click", async () => {
    try {
      // Hämtar värdet från input field på sidan
      queryWord = queryInput.value || "random"; // Använder "random" som default sökparameter
      let randomImage = await getNewImage();
      setBodyBackground(randomImage);
      saveBackgroundImage(randomImage);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  });

  // Event listener for Enter key press on the queryInput
  queryInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      // Simulate a click on the getImagesButton
      getImagesButton.click();
    }
  });

  // Hämtar bakgrunden som blibit sparad i localstorage och sätter den som bakgrund även efter refresh eller stängning/öppning av browser
  const savedBackground = getSavedBackgroundImage();
  if (savedBackground) {
    setBodyBackground(savedBackground);
  }

  async function getNewImage() {
    try {
      let randomNumber = Math.floor(Math.random() * 10);
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${queryWord}&client_id=${unsplashAccessKey}`
      );
      const data = await response.json();
      let allImages = data.results[randomNumber];
      return allImages.urls.regular;
    } catch (error) {
      throw new Error("Failed to fetch image");
    }
  }

  function setBodyBackground(imageUrl) {
    document.body.style.backgroundImage = `url('${imageUrl}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
  }

  function saveBackgroundImage(imageUrl) {
    localStorage.setItem("backgroundImage", imageUrl);
  }

  function getSavedBackgroundImage() {
    return localStorage.getItem("backgroundImage");
  }

  async function getApiKey() {
    try {
      const response = await fetch("variables.json");

      if (response.ok) {
        const variables = await response.json();
        const unsplashAccessKey = variables["allApis"].unsplashAccessKey;

        if (unsplashAccessKey) {
          return unsplashAccessKey;
        } else {
          throw new Error("Unsplash API key not found in variables.json");
        }
      } else {
        throw new Error(`HTTP error message: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching API key:", error);
      throw error;
    }
  }
});
