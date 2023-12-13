const newh1Text = localStorage.getItem("dashboarNameText");
//
const editableDashboardName = document.getElementById("dashboardName");
//Använder originaltexten eller nya texten
editableDashboardName.innerText = newh1Text || "Click to edit me!";

//Måste lyssna på h1 elementet
editableDashboardName.addEventListener("click", function () {
  editableDashboardName.contentEditable = true;
  editableDashboardName.focus();
});

//Måste göra något som indikerar att du inte längre har fokus på h1
editableDashboardName.addEventListener("blur", function () {
  localStorage.setItem("dashboarNameText", editableDashboardName.innerText);
  editableDashboardName.contentEditable = false;
});
