// home page search handler
const searchInput = document.querySelector(".search-bar input");
const categoryCards = document.querySelectorAll(".category-card");

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  categoryCards.forEach((card) => {
    const label = card.textContent.trim().toLowerCase();
    card.style.opacity = label.includes(query) ? "1" : "0.4";
  });
});
