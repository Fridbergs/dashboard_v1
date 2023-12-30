const wApi = "3653d921ebc80597604e07c2f06fa3b6";

//URL Path
const urlPath = `https://api.openweathermap.org/data/2.5/weather?lat=57.17045815854641&lon=17.01533275182965&units=metric&appid=${wApi}`;

async function getWeather() {
  try {
    const response = await fetch(urlPath);

    if (response.ok) {
      const data = await response.json();
      const latestWeather = data.main.temp;
      let weatherLocationName = data.name;

      // Display weather location name in the DOM
      const locationNameElement = document.getElementById("locationName");
      locationNameElement.textContent = weatherLocationName;

      // Display latest weather information in the DOM
      const weatherDataElement = document.getElementById("weatherData");
      weatherDataElement.textContent = latestWeather
        ? `${latestWeather}°C`
        : "N/A";
    } else {
      console.log(`HTTP error message: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
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

// Call the getWeather function on window load
window.addEventListener("load", () => {
  getLocation();
  getWeather();
});
