async function getApiKey() {
  try {
    const response = await fetch("variables.json");
    if (response.ok) {
      const variables = await response.json();
      const unsplashAccessKey = variables["allApis"].accessKey;
      generateBackgroundImg(unsplashAccessKey);
      console.log("knappen har klickats");
    } else {
      console.log(`HTTP error message: ${response.status}`);
    }
  } catch (error) {
    console.error("Linus Error fetching API key:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  //Kontakt med body
  let body = document.body;
  const backgroundBtn = document.getElementById("generateBackground");

  function generateBackgroundImg(unsplashAccessKey) {
    // Variabel som genererar en bakgrundsbild
    const imageSrc = `https://api.unsplash.com/photos/random?client_id=${unsplashAccessKey}`;
    //Källan till bakgrundsbilderna
    body.style.backgroundImage = `url("${imageSrc}")`;

    console.log("knappen har klickats");
  }
  backgroundBtn.addEventListener("click", getApiKey);
});
