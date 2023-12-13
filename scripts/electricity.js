const apiUrl =
  "https://www.elprisetjustnu.se/api/v1/prices/2023/12-13_SE4.json";

async function getData() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    //Spara bara de senaste datan
    const latestPrice = data.slice(-1)[0];
    // Handle the array of objects from JSON
    elMarknadSverige(latestPrice);
    console.log(latestPrice.SEK_per_kWh);
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
}

function elMarknadSverige(data) {}

//Add the latest Price to the dom
//latestPrice.appendchild("");
getData();
