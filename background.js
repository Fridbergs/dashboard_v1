//Gör Body tillgänglig globalt
let body;

function generateBackgroundImg(unsplashAccessKey) {
  // Variabel som genererar en bakgrundsbild
  const imageSrc = `https://api.unsplash.com/photos/random?client_id=${unsplashAccessKey}`;
  //Källan till bakgrundsbilderna
  body.style.backgroundImage = `url("${imageSrc}")`;

  console.log("knappen har klickats - Linus ");
}

async function getApiKey() {
  try {
    //Använder fetch för att hämta data från variables.json
    const response = await fetch("variables.json");

    //Kontrollerar om förfrågan var framgångsrik - Har vi kontakt med variables.json?
    if (response.ok) {
      //Konverterar datan i variables.json till json
      const variables = await response.json();
      const unsplashAccessKey = variables["allApis"].accessKey;
      console.log(unsplashAccessKey);
      // Anropa generateBackgroundImg med den hämtade API-nyckeln
      generateBackgroundImg(unsplashAccessKey);
    } else {
      console.log(`HTTP error message: ${response.status}`);
    }
  } catch (error) {
    console.error("Linus Error fetching API key:", error);
  }
}

//anropar funktionen getApiKey - Hämtar Api Nyckeln

document.addEventListener("DOMContentLoaded", function () {
  //Kontakt med body
  body = document.body;
  const backgroundBtn = document.getElementById("generateBackground");

  backgroundBtn.addEventListener("click", getApiKey);
});
