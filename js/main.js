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

// shared card builder - same html/classes as the listings page to save me work
function createFeaturedCard(listing) {
	const reviews = getReviews(listing.ownerEmail);
	const rating = avgRating(reviews);

	const card = document.createElement('a');
	card.className = 'business-card';
	card.href = `pages/business.html?owner=${encodeURIComponent(listing.ownerEmail)}`;

	const imageHtml = listing.image
		? `<img src="${listing.image}" alt="${listing.name}">`
		: `<span>No image yet</span>`;

	const ratingHtml = rating !== null
		? `<span class="stars">${starsHtml(rating)}</span> ${rating}`
		: `<span style="color:var(--text-muted)">No reviews yet</span>`;

	card.innerHTML = `
		<div class="card-image">${imageHtml}</div>
		<div class="card-body">
			<div class="card-name">${listing.name}</div>
			<div class="card-address">${listing.address}</div>
			<div class="card-rating">${ratingHtml}</div>
		</div>
	`;
	return card;
}

function renderFeaturedSection(containerId, listings) {
	const container = document.getElementById(containerId);
	if (listings.length === 0) {
		container.innerHTML = '<p class="featured-empty">Nothing here yet.</p>';
		return;
	}
	listings.forEach(l => container.appendChild(createFeaturedCard(l)));
}

const all = getAllListings();

// popular: top 5 by average rating, must have at least one review
const popular = all
	.filter(l => getReviews(l.ownerEmail).length > 0)
	.sort((a, b) => {
		const ra = avgRating(getReviews(a.ownerEmail));
		const rb = avgRating(getReviews(b.ownerEmail));
		return rb - ra;
	})
	.slice(0, 5);

// up and coming: 5 listings with the fewest reviews (newest/least discovered)
const upAndComing = all
	.sort((a, b) => getReviews(a.ownerEmail).length - getReviews(b.ownerEmail).length)
	.slice(0, 5);

renderFeaturedSection('popular-listings', popular);
renderFeaturedSection('up-and-coming-listings', upAndComing);