const LISTING_KEY = 'lbd_listing_';

if (!requireAuth()) {
	// requireAuth handles redirect
}

const user = getUser();

// populate profile
document.getElementById('profile-name').textContent = user.name;
document.getElementById('profile-email').textContent = user.email;
document.getElementById('profile-type').textContent =
	user.type === 'business' ? 'Business owner account' : 'Customer account';

if (user.type === 'business') {
	document.getElementById('listing-section').style.display = 'block';
	loadListing();
	initImageUpload();
}

function loadListing() {
	const raw = localStorage.getItem(LISTING_KEY + user.email);
	if (!raw) return;
	const listing = JSON.parse(raw);
	document.getElementById('listing-name').value = listing.name || '';
	document.getElementById('listing-category').value = listing.category || 'restaurants';
	document.getElementById('listing-address').value = listing.address || '';
	document.getElementById('listing-description').value = listing.description || '';
	setListingStatus(listing.published);

	// show existing image preview if one was saved
	if (listing.image) {
		showPreview(listing.image);
	}
}

function initImageUpload() {
	document.getElementById('listing-image').addEventListener('change', (e) => {
		const file = e.target.files[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (ev) => showPreview(ev.target.result);
		reader.readAsDataURL(file);
	});
}

function showPreview(src) {
	document.getElementById('image-preview-img').src = src;
	document.getElementById('image-preview').style.display = 'block';
}

function setListingStatus(published) {
	const el = document.getElementById('listing-status');
	el.textContent = published ? 'Published' : 'Draft';
	el.className = 'listing-status ' + (published ? 'published' : 'draft');
}

function saveListing(publish) {
	const name = document.getElementById('listing-name').value.trim();
	const address = document.getElementById('listing-address').value.trim();
	const feedback = document.getElementById('save-feedback');

	if (!name || !address) {
		feedback.textContent = 'Please fill in at least a name and address.';
		feedback.style.color = '#c0392b';
		return;
	}

	// read existing to preserve image if no new one selected
	const existing = JSON.parse(localStorage.getItem(LISTING_KEY + user.email) || '{}');
	const newImageSrc = document.getElementById('image-preview-img').src;
	const image = newImageSrc && newImageSrc !== window.location.href ? newImageSrc : (existing.image || null);

	const listing = {
		name,
		category: document.getElementById('listing-category').value,
		address,
		description: document.getElementById('listing-description').value.trim(),
		published: publish,
		ownerEmail: user.email,
		ownerName: user.name,
		image,
	};

	localStorage.setItem(LISTING_KEY + user.email, JSON.stringify(listing));
	setListingStatus(publish);

	feedback.style.color = '#276232';
	feedback.textContent = publish ? 'Listing published!' : 'Draft saved.';
	setTimeout(() => { feedback.textContent = ''; }, 3000);
}

function doLogout() {
	logout();
	window.location.href = '../index.html';
}
