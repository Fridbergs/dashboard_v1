// scripts/background.js

document.addEventListener("DOMContentLoaded", () => {
  const unsplashAccessKey = "7Ov5vewtA_HqGfVs-hDfvY_hTBwu6X-nIB5kcmgF5IA";
  const queryWord = "london";

  const imageSrc = `https://api.unsplash.com/search/photos?query=${queryWord}&client_id=${unsplashAccessKey}`;

  const getImagesButton = document.querySelector(".getImagesButton");

  getImagesButton.addEventListener("click", async () => {
    try {
      let randomImage = await getNewImage();
      setBodyBackground(randomImage);
      saveBackgroundImage(randomImage);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  });

  // On page load, retrieve the background image from localStorage and set it
  const savedBackground = getSavedBackgroundImage();
  if (savedBackground) {
    setBodyBackground(savedBackground);
  }

  async function getNewImage() {
    try {
      let randomNumber = Math.floor(Math.random() * 10);
      const response = await fetch(imageSrc);
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
});
