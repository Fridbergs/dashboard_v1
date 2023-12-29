const unsplashAccessKey = "7Ov5vewtA_HqGfVs-hDfvY_hTBwu6X-nIB5kcmgF5IA";
const queryWord = "barcelona";

const imageSrc = `https://api.unsplash.com/search/photos?query=${queryWord}&client_id=${unsplashAccessKey}`;

const getImagesButton = document.querySelector("body");
const imageContainer = document.body;

getImagesButton.addEventListener("click", async () => {
  try {
    let randomImage = await getNewImage();
    setBodyBackground(randomImage);
  } catch (error) {
    console.error("Error fetching image:", error);
  }
});

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
  // Set the background image of the body
  document.body.style.backgroundImage = `url('${imageUrl}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
}
