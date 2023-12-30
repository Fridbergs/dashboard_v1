const wApi = "3653d921ebc80597604e07c2f06fa3b6";

// URL Path for browser location
const browserLocationUrlPath = `https://api.openweathermap.org/data/2.5/weather?lat=57.17045815854641&lon=17.01533275182965&units=metric&appid=${wApi}`;

// Display browser location name and weather information in the DOM
const locationNameElement = document.getElementById("locationName");
const weatherDataElement = document.getElementById("weatherData");
const searchLocationNameElement = document.getElementById("searchLocationName");
const searchWeatherDataElement = document.getElementById("searchWeatherData");

locationNameElement.textContent = "Din plats"; // You can customize this text
weatherDataElement.textContent = "Loading..."; // Initial loading message
searchLocationNameElement.textContent = "";
searchWeatherDataElement.textContent = "";

// Function to get browser location weather
async function getBrowserLocationWeather() {
  try {
    const response = await fetch(browserLocationUrlPath);

    if (response.ok) {
      const data = await response.json();
      const latestWeather = data.main.temp;

      // Display browser location weather information
      locationNameElement.textContent = `Vädret i ${data.name}, ${data.sys.country}`;
      weatherDataElement.textContent = latestWeather
        ? `${latestWeather}°C`
        : "N/A";
    } else {
      console.log(`HTTP error message: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching browser location weather data:", error);
  }
}

// Call the getBrowserLocationWeather function on window load
window.addEventListener("load", getBrowserLocationWeather);

// Event listener for the search input
const placeQueryInput = document.getElementById("placeQueryInput");

placeQueryInput.addEventListener("keyup", function (event) {
  // Check if the Enter key is pressed (key code 13)
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
    alert("Du måste skriva in ett platsnamn.");
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
        alert("City not found. Please enter a valid city name.");
      } else {
        // Update the UI with weather information for the search query location
        searchLocationNameElement.textContent = `Vädret i ${data.name}, ${data.sys.country}`;
        searchWeatherDataElement.textContent = `Temperatur: ${data.main.temp}°C, ${data.weather[0].description}`;
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data. Please try again later.");
    });
}
