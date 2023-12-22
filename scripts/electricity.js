const apiUrlSe4 = `https://www.elprisetjustnu.se/api/v1/prices/${todayYear}/${todayMonth}-${todayDate}_SE4.json`;
const apiUrlSe3 = `https://www.elprisetjustnu.se/api/v1/prices/${todayYear}/${todayMonth}-${todayDate}_SE3.json`;
const apiUrlSe2 = `https://www.elprisetjustnu.se/api/v1/prices/${todayYear}/${todayMonth}-${todayDate}_SE2.json`;
const apiUrlSe1 = `https://www.elprisetjustnu.se/api/v1/prices/${todayYear}/${todayMonth}-${todayDate}_SE1.json`;

const todayDate = new Date();
const todayMonth = new Date();
const todayYear = new Date();
//Aldors kod
const today = new Date();
const year = today.getFullYear();
console.log(year);

async function getData() {
  try {
    const responseSe4 = await fetch(apiUrlSe4);
    const responseSe3 = await fetch(apiUrlSe3);
    const responseSe2 = await fetch(apiUrlSe2);
    const responseSe1 = await fetch(apiUrlSe1);

    if (
      !responseSe1.ok ||
      !responseSe2.ok ||
      !responseSe3.ok ||
      !responseSe4.ok
    ) {
      throw new Error(`HTTP error! Status: ${response.status} `);
    }

    const dataSe4 = await responseSe4.json();

    //
    const dataSe3 = await responseSe3.json();

    //
    const dataSe2 = await responseSe2.json();

    //
    const dataSe1 = await responseSe1.json();

    //Spara bara de senaste datan
    const latestPrice = data.slice(-1)[0];
    // Handle the array of objects from JSON
    elMarknadSverige(latestPrice);
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
}

function elMarknadSverige(data) {}

//Add the latest Price to the dom
//latestPrice.appendchild("");
getData();
