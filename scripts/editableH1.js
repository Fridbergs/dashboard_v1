const storedDashboardName = localStorage.getItem("dashboarNameText");
const defaultDashboardName = "Click to edit me!";

// Use the stored text or the default text if it doesn't exist
const newh1Text = storedDashboardName || defaultDashboardName;

const editableDashboardName = document.getElementById("dashboardName");

// Set the text of the element
editableDashboardName.innerText = newh1Text;

// Must listen for click on the h1 element
editableDashboardName.addEventListener("click", function () {
  editableDashboardName.contentEditable = true;
  editableDashboardName.focus();
});

// Must do something to indicate that you no longer have focus on h1
editableDashboardName.addEventListener("blur", function () {
  const updatedDashboardName = editableDashboardName.innerText;
  localStorage.setItem("dashboarNameText", updatedDashboardName);
  editableDashboardName.contentEditable = false;
});
