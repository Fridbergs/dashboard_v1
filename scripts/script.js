document.addEventListener("DOMContentLoaded", function () {
  //Kontakt med body
  let body = document.body;
  const backgroundBtn = document.getElementById("generateBackground");

  function generateBackgroundImg() {
    // Variabel som genererar en bakgrundsbild
    const imageSrc = `https://api.unsplash.com/`;
    //Källan till bakgrundsbilderna
    body.style.backgroundImage = `url("${imageSrc}")`;

    console.log("knappen har klickats");
  }
  backgroundBtn.addEventListener("click", generateBackgroundImg);
});
