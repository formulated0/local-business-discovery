const LISTING_PREFIX = 'lbd_listing_';
const REVIEWS_PREFIX = 'lbd_reviews_';

// returns all published listings for a given category
function getListings(category) {
	const listings = [];
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (!key.startsWith(LISTING_PREFIX)) continue;
		const listing = JSON.parse(localStorage.getItem(key));
		if (listing.published && listing.category === category) {
			listing.ownerEmail = key.replace(LISTING_PREFIX, '');
			listings.push(listing);
		}
	}
	return listings;
}

// returns all published listings across every category
function getAllListings() {
	const listings = [];
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (!key.startsWith(LISTING_PREFIX)) continue;
		const listing = JSON.parse(localStorage.getItem(key));
		if (listing.published) {
			listing.ownerEmail = key.replace(LISTING_PREFIX, '');
			listings.push(listing);
		}
	}
	return listings;
}

// returns a single listing by owner email
function getListing(ownerEmail) {
	const raw = localStorage.getItem(LISTING_PREFIX + ownerEmail);
	return raw ? JSON.parse(raw) : null;
}

// returns all reviews for a listing (by owner email)
function getReviews(ownerEmail) {
	const raw = localStorage.getItem(REVIEWS_PREFIX + ownerEmail);
	return raw ? JSON.parse(raw) : [];
}

// saves a new review for a listing
function saveReview(ownerEmail, review) {
	const reviews = getReviews(ownerEmail);
	reviews.unshift(review); // newest first
	localStorage.setItem(REVIEWS_PREFIX + ownerEmail, JSON.stringify(reviews));
}

// calculates average otherwise null
function avgRating(reviews) {
	if (!reviews.length) return null;
	const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
	return Math.round((sum / reviews.length) * 10) / 10; // this was stupid
}

// returns star string for a numeric rating
function starsHtml(rating) {
	const full = Math.floor(rating);
	const empty = 5 - full;
	return '★'.repeat(full) + '☆'.repeat(empty);
}