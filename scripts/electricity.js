const todayDate = new Date().getDate();

const todayMonth = String(new Date().getMonth() + 1).padStart(2, "0");

const todayYear = new Date().getFullYear();

const apiUrlSe4 = `https://www.elprisetjustnu.se/api/v1/prices/${todayYear}/${todayMonth}-${todayDate}_SE4.json`;

async function getData() {
  try {
    const responseSe4 = await fetch(apiUrlSe4);

    if (!responseSe4.ok) {
      throw new Error(`HTTP error! Status: ${responseSe4.status}`);
    }

    //Hitta varje enskild data att appenda
    const dataSe4 = await responseSe4.json();
    const latestPriceSe4 = dataSe4.slice(1)[1]?.SEK_per_kWh;
    const formattedPriceSe4 = parseFloat(latestPriceSe4).toFixed(3); // Ser till så att det endast visas två decimaler

    const priceSe4 = document.getElementById("price4");

    if (priceSe4) {
      priceSe4.textContent = ` ${formattedPriceSe4} öre/kWh`;
    } else {
      console.error("Element not found");
    }
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
}

getData();
