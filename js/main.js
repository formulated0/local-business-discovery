updateHeaderAuthLink(); // had to reorder this otherwise things got a little fucky

// search
const searchInput = document.querySelector(".search-bar input");
const categoryCards = document.querySelectorAll(".category-card");

searchInput.addEventListener("input", (e) => {
	const query = e.target.value.toLowerCase();
	categoryCards.forEach((card) => {
		const label = card.textContent.trim().toLowerCase();
		card.style.opacity = label.includes(query) ? "1" : "0.4";
	});
});

// render top 3 rated businesses for each category
function renderTopListings(category, containerId) {
	const container = document.getElementById(containerId);
	const listings = getListings(category);

	// sort by average rating, descending
	const sorted = listings.sort((a, b) => {
		const ra = avgRating(getReviews(a.ownerEmail)) ?? -1;
		const rb = avgRating(getReviews(b.ownerEmail)) ?? -1;
		return rb - ra;
	}).slice(0, 3);

	if (sorted.length === 0) {
		container.innerHTML = '<p class="service-card-empty">No listings yet.</p>';
		return;
	}

	sorted.forEach(listing => {
		const rating = avgRating(getReviews(listing.ownerEmail));
		const ratingText = rating !== null ? `★ ${rating}` : 'No reviews';

		const link = document.createElement('a');
		link.className = 'mini-card';
		link.href = `pages/business.html?owner=${encodeURIComponent(listing.ownerEmail)}`;
		link.innerHTML = `
			<span class="mini-card-name">${listing.name}</span>
			<span class="mini-card-rating">${ratingText}</span>
		`;
		container.appendChild(link);
	});
}

renderTopListings('restaurants', 'top-restaurants');
renderTopListings('shopping', 'top-shopping');
renderTopListings('travel', 'top-travel');