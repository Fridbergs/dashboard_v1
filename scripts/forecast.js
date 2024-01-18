const wApi = "3653d921ebc80597604e07c2f06fa3b6";

// URL Path for browser location
const browserLocationUrlPath = `https://api.openweathermap.org/data/2.5/weather?lat=57.17045815854641&lon=17.01533275182965&units=metric&appid=${wApi}`;

// Display browser location name and weather information in the DOM
const locationNameElement = document.getElementById("locationName");
const weatherDataElement = document.getElementById("weatherData");
const searchLocationNameElement = document.getElementById("searchLocationName");
const searchWeatherDataElement = document.getElementById("searchWeatherData");

locationNameElement.textContent = "Temperaturen hos dig är"; // You can customize this text
weatherDataElement.textContent = "..."; // Initial loading message
searchLocationNameElement.textContent = "";
searchWeatherDataElement.textContent = "";

// Funktion för att hämta användarens plats och uppdatera väderdata
function updateWeatherWithCurrentLocation() {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // Uppdaterar URL Path med användarens plats
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const browserLocationUrlPath = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${wApi}`;

      // Anropa getBrowserLocationWeather med den nya URL Path
      getBrowserLocationWeather(browserLocationUrlPath);
    },
    function (error) {
      console.error("Error getting location:", error);
    }
  );
}

// Function to get browser location weather
async function getBrowserLocationWeather(url) {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const latestWeather = data.main.temp;

      // Display browser location weather information
      locationNameElement.textContent = `Temperaturen i ${data.name} är`;
      weatherDataElement.textContent = latestWeather
        ? `${latestWeather}°`
        : "N/A";
    } else {
      console.log(`HTTP error message: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching browser location weather data:", error);
  }
}

// Call the getBrowserLocationWeather function on window load
window.addEventListener("load", updateWeatherWithCurrentLocation);

// Event listener for the search input
const placeQueryInput = document.getElementById("placeQueryInput");

placeQueryInput.addEventListener("keyup", function (event) {
  // Check if the Enter key is pressed
  if (event.keyCode === 13) {
    performSearch();
  }
});

// Event listener for the search button
const getPlaceButton = document.getElementById("getPlaceButton");

getPlaceButton.addEventListener("click", performSearch);

// Function to perform the search
function performSearch() {
  const cityQuery = placeQueryInput.value;

  // Check if the input is not empty
  if (cityQuery.trim() === "") {
    alert("Du måste skriva in ett platsnamn");
    return;
  }

  console.log("Search query:", cityQuery);

  // URL Path for search query location
  const cityUrlPath = `https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&units=metric&appid=${wApi}`;

  // Fetch weather data for the search query location
  fetch(cityUrlPath)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        alert("Stad inte hittad, skriv in en giltig plats");
      } else {
        // Update the UI with weather information for the search query location
        searchLocationNameElement.textContent = `Det är ${data.main.temp}° i ${data.name} nu`;
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data. Please try again later.");
    });
}
