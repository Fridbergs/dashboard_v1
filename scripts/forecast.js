const wApi = "3653d921ebc80597604e07c2f06fa3b6";

// let lat = browserlocation.coords.latitude;
// console.log(lat);

// let long = browserlocation.coords.longitude;
// console.log(long);

//URL Path
const urlPath = `https://api.openweathermap.org/data/2.5/weather?lat=57.17045815854641&lon=17.01533275182965&units=metric&appid=${wApi}`;

console.log(urlPath);

async function getWeather() {
  try {
    //Använder fetch för att hämta data från variables.json
    const response = await fetch(urlPath);

    //Kontrollerar om förfrågan var framgångsrik - Har vi kontakt med variables.json?
    if (response.ok) {
      //Konverterar datan i variables.json till json
      const variables = await response.json();
      console.log(variables);
    } else {
      console.log(`HTTP error message: ${response.status}`);
    }
  } catch (error) {
    console.error("Linus Error fetching API key:", error);
  }
}
getWeather();

//Hämtar användarens location direkt när window objektet har laddats
window.addEventListener("load", getLocation);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Funktion för att hitta browserns location
function showPosition(browserlocation) {
  // Hittar latitude and longitude från positions objektet
  let lat = browserlocation.coords.latitude;
  let long = browserlocation.coords.longitude;

  // Display an alert with the user's latitude and longitude.
  //alert(
  console.log(
    "Latitude: " +
      lat +
      "\nLongitude: " +
      long +
      "\nDessa koordinatoer används för att se vädret där du befinner dig"
  );
  return [lat, long];
}

// Denna function tar hand om eventuella fel - förser användaren med felmeddelanden.
function showError(error) {
  // Detta kodblock hanterar felmeddelanden.
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("Användaren vägrade dela med sig av sin plats");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Platsdelning är inte tillgänglig.");
      break;
    case error.TIMEOUT:
      alert("Det tog för lång tid för användaren att svara.");
      break;
    case error.UNKNOWN_ERROR:
      alert("oops något oväntat hände.");
      break;
  }
}
