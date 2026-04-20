// read owner email from url
const params = new URLSearchParams(window.location.search);
const ownerEmail = params.get('owner');

if (!ownerEmail) {
	window.location.href = '../index.html';
}

const listing = getListing(ownerEmail);

if (!listing) {
	document.getElementById('business-name').textContent = 'Business not found';
} else {
	// populate header
	document.title = `${listing.name} – Local Business Discovery`;
	document.getElementById('business-name').textContent = listing.name;

	// populate description
	document.getElementById('business-description').textContent =
		listing.description || 'No description provided.';

	// populate address
	document.getElementById('business-address').textContent = listing.address;

	// populate image
	const imgEl = document.getElementById('business-image');
	if (listing.image) {
		imgEl.innerHTML = `<img src="${listing.image}" alt="${listing.name}">`;
	} else {
		imgEl.innerHTML = `<span>No image provided</span>`;
	}

	// set back link to correct category (do NOT use history.back)
	document.getElementById('back-link').href = `listings.html?category=${listing.category}`;
}

// load and render reviews
function renderReviews() {
	const reviews = getReviews(ownerEmail);
	const list = document.getElementById('reviews-list');
	const rating = avgRating(reviews);

	// update star display
	const starsEl = document.getElementById('business-stars');
	if (rating !== null) {
		starsEl.innerHTML = `${starsHtml(rating)} <span>${rating} / 5</span>`;
	} else {
		starsEl.innerHTML = `☆☆☆☆☆ <span>No ratings yet</span>`;
	}

	if (reviews.length === 0) {
		list.innerHTML = '<p style="color:var(--text-muted);font-size:0.9rem">No reviews yet. Be the first!</p>';
		return;
	}

	list.innerHTML = '';
	reviews.forEach(r => {
		const card = document.createElement('div');
		card.className = 'review-card';
		card.innerHTML = `
			<div class="review-avatar">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
					<circle cx="12" cy="8" r="4"/>
					<path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
				</svg>
			</div>
			<div class="review-content">
				<div class="review-header">
					<span class="review-author">${r.authorName}</span>
					<span class="review-stars">${starsHtml(r.rating)}</span>
				</div>
				<p class="review-text">${r.text}</p>
				<p class="review-date">${r.date}</p>
			</div>
		`;
		list.appendChild(card);
	});
}

// star picker interaction
let selectedRating = 0;

function initStarPicker() {
	const stars = document.querySelectorAll('.star-pick');
	stars.forEach(star => {
		star.addEventListener('mouseover', () => highlightStars(star.dataset.value));
		star.addEventListener('mouseout', () => highlightStars(selectedRating));
		star.addEventListener('click', () => {
			selectedRating = parseInt(star.dataset.value);
			highlightStars(selectedRating);
		});
	});
}

function highlightStars(upTo) {
	document.querySelectorAll('.star-pick').forEach(star => {
		star.classList.toggle('lit', star.dataset.value <= upTo);
	});
}

function submitReview() {
	if (!requireAuth()) return;

	const user = getUser();
	const text = document.getElementById('review-text').value.trim();

	if (!selectedRating) {
		document.getElementById('review-error').textContent = 'Please select a star rating.';
		return;
	}
	if (!text) {
		document.getElementById('review-error').textContent = 'Please write something before submitting.';
		return;
	}

	// prevent reviewing your own business
	if (user.email === ownerEmail) {
		document.getElementById('review-error').textContent = 'You cannot review your own business.';
		return;
	}

	// prevent duplicate reviews
	const existing = getReviews(ownerEmail).find(r => r.authorEmail === user.email);
	if (existing) {
		document.getElementById('review-error').textContent = 'You have already reviewed this business.';
		return;
	}

	saveReview(ownerEmail, {
		authorEmail: user.email,
		authorName: user.name,
		rating: selectedRating,
		text,
		date: new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' }),
	});

	// reset form
	document.getElementById('review-text').value = '';
	selectedRating = 0;
	highlightStars(0);
	document.getElementById('review-error').textContent = '';
	renderReviews();
}

function startReview() {
	if (!requireAuth()) return;
	document.getElementById('review-form').style.display = 'block';
	document.getElementById('write-review-btn').style.display = 'none';
}

renderReviews();
initStarPicker();

function cancelReview() {
	document.getElementById('review-form').style.display = 'none';
	document.getElementById('write-review-btn').style.display = 'block';
	document.getElementById('review-text').value = '';
	document.getElementById('review-error').textContent = '';
	selectedRating = 0;
	highlightStars(0);
}
