const todayDate = new Date().getDate();

const todayMonth = String(new Date().getMonth() + 1).padStart(2, "0");

const todayYear = new Date().getFullYear();

const apiUrlSe4 = `https://www.elprisetjustnu.se/api/v1/prices/${todayYear}/${todayMonth}-${todayDate}_SE4.json`;
const apiUrlSe3 = `https://www.elprisetjustnu.se/api/v1/prices/${todayYear}/${todayMonth}-${todayDate}_SE3.json`;
const apiUrlSe2 = `https://www.elprisetjustnu.se/api/v1/prices/${todayYear}/${todayMonth}-${todayDate}_SE2.json`;
const apiUrlSe1 = `https://www.elprisetjustnu.se/api/v1/prices/${todayYear}/${todayMonth}-${todayDate}_SE1.json`;

async function getData() {
  try {
    const responseSe4 = await fetch(apiUrlSe4);
    const responseSe3 = await fetch(apiUrlSe3);
    const responseSe2 = await fetch(apiUrlSe2);
    const responseSe1 = await fetch(apiUrlSe1);

    if (!responseSe1.ok) {
      throw new Error(`HTTP error! Status: ${responseSe1.status}`);
    }
    if (!responseSe2.ok) {
      throw new Error(`HTTP error! Status: ${responseSe2.status}`);
    }
    if (!responseSe3.ok) {
      throw new Error(`HTTP error! Status: ${responseSe3.status}`);
    }
    if (!responseSe4.ok) {
      throw new Error(`HTTP error! Status: ${responseSe4.status}`);
    }

    //Hitta varje enskild data att appenda
    const dataSe4 = await responseSe4.json();
    const latestPriceSe4 = dataSe4.slice(1)[1]?.SEK_per_kWh;
    const formattedPriceSe4 = parseFloat(latestPriceSe4).toFixed(3); // Ser till så att det endast visas två decimaler

    //Hitta varje enskild data att appenda
    const dataSe3 = await responseSe3.json();
    const latestPriceSe3 = dataSe3.slice(0)[0]?.SEK_per_kWh;
    const formattedPriceSe3 = parseFloat(latestPriceSe3).toFixed(3); // Ser till så att det endast visas två decimaler

    //Hitta varje enskild data att appenda
    const dataSe2 = await responseSe2.json();
    const latestPriceSe2 = dataSe2.slice(0)[0]?.SEK_per_kWh;
    const formattedPriceSe2 = parseFloat(latestPriceSe2).toFixed(3); // Ser till så att det endast visas två decimaler

    //Hitta varje enskild data att appenda
    const dataSe1 = await responseSe1.json();
    const latestPriceSe1 = dataSe1.slice(0)[0]?.SEK_per_kWh;
    const formattedPriceSe1 = parseFloat(latestPriceSe1).toFixed(3); // Ser till så att det endast visas två decimaler

    const priceSe1 = document.getElementById("price1");
    const priceSe2 = document.getElementById("price2");
    const priceSe3 = document.getElementById("price3");
    const priceSe4 = document.getElementById("price4");

    if ((priceSe1, priceSe2, priceSe3, priceSe4)) {
      priceSe1.textContent = ` Norra Sverige: 
      ${formattedPriceSe1} öre/kWh`;
      priceSe2.textContent = ` Norra Mellansverige: 
      ${formattedPriceSe2} öre/kWh`;
      priceSe3.textContent = ` Södra Mellansverige: 
      ${formattedPriceSe3} öre/kWh`;
      priceSe4.textContent = ` Södra Sverige: 
      ${formattedPriceSe4} öre/kWh`;
    } else {
      console.error("Element not found");
    }
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
}

getData();
