document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch news data
  async function fetchNews(category) {
    try {
      let apikey = "364cd7d81007fb94c7cfeddaa0607a6c";
      // Update the URL with the selected category
      let url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=sv&country=se&max=10&apikey=${apikey}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      displayArticles(data.articles);
    } catch (error) {
      console.error("There was a problem fetching the news data:", error);
    }
  }

  // Function to display articles
  function displayArticles(articles) {
    let trendsDiv = document.getElementById("trends");
    trendsDiv.innerHTML = ""; // Clear existing articles

    articles.forEach((article) => {
      let articleDiv = document.createElement("div");
      articleDiv.className = "article";

      let title = document.createElement("h2");
      title.textContent = article["title"];
      articleDiv.appendChild(title);

      let description = document.createElement("p");
      description.textContent = article["description"];
      articleDiv.appendChild(description);

      // Create a 'Read More' button
      let readMoreButton = document.createElement("button");
      readMoreButton.textContent = "Läs mer";
      readMoreButton.onclick = function () {
        window.open(article["url"], "_blank");
      };
      articleDiv.appendChild(readMoreButton);

      trendsDiv.appendChild(articleDiv);
    });
  }

  // Attach click event listeners to each category
  let categories = document.querySelectorAll(".category");
  categories.forEach((categoryDiv) => {
    categoryDiv.addEventListener("click", function () {
      // Map the ID to the category value expected by the API
      let categoryMap = {
        general: "general",
        sports: "sports",
        entertainment: "entertainment",
      };
      let apiCategory = categoryMap[this.id];
      fetchNews(apiCategory);
    });
  });

  // Fetch default category news on initial load
  fetchNews("general");
});
