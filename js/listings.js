// category metadata - icons only, businesses come from localStorage
const categoryMeta = {
	restaurants: {
		title: 'Restaurants',
		icon: `<path d="M3 2v7c0 2.2 1.8 4 4 4h1v9h2V2H8v9H7C5.9 11 5 10.1 5 9V2H3zM16 2c-2.4 0-4 1.6-4 5v6h3v9h2V2h-1z"/>`,
	},
	shopping: {
		title: 'Shopping',
		icon: `<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>`,
	},
	travel: {
		title: 'Travel',
		icon: `<path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>`,
	},
};

function createCard(listing) {
	const reviews = getReviews(listing.ownerEmail);
	const rating = avgRating(reviews);

	const card = document.createElement('a');
	card.className = 'business-card';
	card.href = `business.html?owner=${encodeURIComponent(listing.ownerEmail)}`;

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

function renderListings(list) {
	const grid = document.getElementById('listings-grid');
	grid.innerHTML = '';
	if (list.length === 0) {
		grid.innerHTML = '<p style="padding:20px;color:var(--text-muted)">No businesses listed here yet.</p>';
		return;
	}
	list.forEach(listing => grid.appendChild(createCard(listing)));
}

// read category from url
const params = new URLSearchParams(window.location.search);
const categoryKey = params.get('category') || 'restaurants';
const meta = categoryMeta[categoryKey] || categoryMeta.restaurants;

// update header
document.title = `${meta.title} – Local Business Discovery`;
document.getElementById('category-title').textContent = meta.title;
document.getElementById('category-icon').innerHTML = meta.icon;

// live search
let allListings = getListings(categoryKey);

document.querySelector('.search-bar input').addEventListener('input', (e) => {
	const q = e.target.value.toLowerCase();
	renderListings(allListings.filter(l =>
		l.name.toLowerCase().includes(q) || l.address.toLowerCase().includes(q)
	));
});

renderListings(allListings);
