// mock data
const categoryData = {
  restaurants: {
    title: "Restaurants",
    icon: `<path d="M3 2v7c0 2.2 1.8 4 4 4h1v9h2V2H8v9H7C5.9 11 5 10.1 5 9V2H3zM16 2c-2.4 0-4 1.6-4 5v6h3v9h2V2h-1z"/>`,
    businesses: [
      {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        rating: 4.5,
        review: "TEMPLATE REVIEW",
      },
      {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        rating: 4.2,
        review: "TEMPLATE REVIEW",
      },
      {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        rating: 3.8,
        review: "TEMPLATE REVIEW",
      },
      {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        rating: 4.7,
        review: "TEMPLATE REVIEW",
      },
      {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        rating: 4.0,
        review: "TEMPLATE REVIEW",
      },
      {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        rating: 4.4,
        review: "TEMPLATE REVIEW",
      },
      {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        rating: 3.9,
        review: "TEMPLATE REVIEW",
      },
    ],
  },
  shopping: {
    title: "Shopping",
    icon: `<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>`,
    businesses: [
      {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        rating: 4.3,
        review: "TEMPLATE REVIEW",
      },
      {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        rating: 4.6,
        review: "TEMPLATE REVIEW",
      },
      {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        rating: 3.7,
        review: "TEMPLATE REVIEW",
      },
      {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        rating: 4.8,
        review: "TEMPLATE REVIEW",
      },
      {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        rating: 4.5,
        review: "TEMPLATE REVIEW",
      },
      {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        rating: 4.0,
        review: "TEMPLATE REVIEW",
      },
      {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        rating: 4.2,
        review: "TEMPLATE REVIEW",
      },
    ],
  },
  travel: {
    title: "Travel",
    icon: `<path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>`,
    businesses: [
      {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        rating: 4.6,
        review: "TEMPLATE REVIEW",
      },
      {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        rating: 4.3,
        review: "TEMPLATE REVIEW",
      },
      {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        rating: 4.7,
        review: "TEMPLATE REVIEW",
      },
      {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        rating: 4.1,
        review: "TEMPLATE REVIEW",
      },
      {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        rating: 3.8,
        review: "TEMPLATE REVIEW",
      },
      {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        rating: 4.4,
        review: "TEMPLATE REVIEW",
      },
      {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        rating: 4.2,
        review: "TEMPLATE REVIEW",
      },
      {
        name: "TEMPLATE",
        address: "TEMPLATE ADDR",
        rating: 4.0,
        review: "TEMPLATE REVIEW",
      },
    ],
  },
};

// rating -> stars
function starsHtml(rating) {
  const full = Math.floor(rating);
  const empty = 5 - full;
  return "★".repeat(full) + "☆".repeat(empty); // i dont know how to make it show half stars so this is fine for now
}

// build card
function createCard(biz) {
  const card = document.createElement("div");
  card.className = "business-card";
  card.innerHTML = `
    <div class="card-image">No image yet</div>
    <div class="card-body">
      <div class="card-name">${biz.name}</div>
      <div class="card-address">${biz.address}</div>
      <div class="card-rating">
        <span class="stars">${starsHtml(biz.rating)}</span> ${biz.rating}
      </div>
      <div class="card-review">${biz.review}</div>
    </div>
  `;
  return card;
}

// push list of businesses into grid
function renderListings(list) {
  const grid = document.getElementById("listings-grid");
  grid.innerHTML = "";
  if (list.length === 0) {
    grid.innerHTML =
      '<p style="padding:20px;color:var(--text-muted)">No results found.</p>';
    return;
  }
  list.forEach((biz) => grid.appendChild(createCard(biz)));
}

// read category from url
const params = new URLSearchParams(window.location.search);
const categoryKey = params.get("category") || "restaurants";
const category = categoryData[categoryKey] || categoryData.restaurants; // fall back to restaurants

// update page title header text and icon
document.title = `${category.title} – Local Business Discovery`;
document.getElementById("category-title").textContent = category.title;
document.getElementById("category-icon").innerHTML = category.icon;

// live search filter
document.querySelector(".search-bar input").addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();
  renderListings(
    category.businesses.filter(
      (b) =>
        b.name.toLowerCase().includes(q) || b.address.toLowerCase().includes(q),
    ),
  );
});

renderListings(category.businesses);
