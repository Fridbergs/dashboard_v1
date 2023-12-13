async function getApiKey() {
  try {
    //Använder fetch för att hämta data från variables.json
    const response = await fetch("variables.json");

    //Kontrollerar om förfrågan var framgångsrik - Har vi kontakt med variables.json?
    if (response.ok) {
      //Konverterar datan i variables.json till json
      const variables = await response.json();
      const weatherApi = variables["allApis"].weatherApi;
    } else {
      console.log(`HTTP error message: ${response.status}`);
    }
  } catch (error) {
    console.error("Linus Error fetching API key:", error);
  }
}

//Hämtar användarens location direkt när window is loaded
window.addEventListener("load", getLocation);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// This function is the success callback for getCurrentPosition.
function showPosition(browserlocation) {
  // Extract latitude and longitude from the position object.
  var lat = browserlocation.coords.latitude;
  var long = browserlocation.coords.longitude;

  // Display an alert with the user's latitude and longitude.
  console.log(
    "Latitude: " +
      lat +
      "\nLongitude: " +
      long +
      "\nDessa koordinatoer används för att se vädret där du befinner dig"
  );
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
