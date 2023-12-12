//Skapa en variable med objectet Date
const currentDate = new Date();

//Array med månader
const months = [
  "januari",
  "februari",
  "mars",
  "april",
  "maj",
  "juni",
  "juli",
  "augusti",
  "september",
  "oktober",
  "november",
  "december",
];

//Hämtar månader från objektet Date
let year = currentDate.getFullYear();

//Hämtar månader från objektet Date
let month = months[currentDate.getMonth()];

//Hämtar dag från objektet Date
let day = currentDate.getDate();

//Hämtar timmar från objektet Date
let hours = currentDate.getHours();
//Hämtar minuter från objektet Date
let minutes = currentDate.getMinutes();

//Sammanfogar timmar och minuter
let time = `${hours}:${minutes}`;

//Sammanfogar månad och dag
let date = `${day} ${month} ${year} `;

function appendTime() {
  //Skapar Kontakt med Time Div
  let timeDiv = document.getElementById("timeDiv");
  let timeInsert = document.createElement("p");
  timeInsert.textContent = time.toLocaleString();
  timeDiv.appendChild(timeInsert);
}

function appendDate() {
  //Skapar Kontakt med Time Div
  let dateDiv = document.getElementById("dateDiv");
  let dateInsert = document.createElement("p");
  dateInsert.textContent = `${date}`;
  dateDiv.appendChild(dateInsert);
}

appendTime();
appendDate();

//Uppdaterar klockan

function updateTime() {
  const currentTime = new Date();
  const options = { hour: "numeric", minute: "numeric" };
  const currentTimeString = currentTime.toLocaleTimeString(undefined, options);

  // Update the DOM element with the current time
  document.getElementById("timeDiv").textContent = currentTimeString;
}

//Uppdaterar klockan varje
setInterval(updateTime, 1000);

// Initial update to display the current time immediately
updateTime();
