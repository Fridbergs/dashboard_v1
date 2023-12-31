const storedDashboardName = localStorage.getItem("dashboarNameText");
const defaultDashboardName = "...";

// Use the stored text or the default text if it doesn't exist
let newh1Text = storedDashboardName || defaultDashboardName;

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
  let updatedDashboardName = editableDashboardName.innerText;

  // Check if the updated name has at least 1 character
  if (updatedDashboardName.length === 0) {
    updatedDashboardName = defaultDashboardName;
  }

  localStorage.setItem("dashboarNameText", updatedDashboardName);
  editableDashboardName.contentEditable = false;

  // Update the displayed text
  editableDashboardName.innerText = updatedDashboardName;
});
