// read url params
const params = new URLSearchParams(window.location.search);
const category = params.get('category') || 'restaurants';
const id = parseInt(params.get('id'), 10);

// set back link to return to the right category listing
document.getElementById('back-link').href = `listings.html?category=${category}`;

// placeholder for actual data 
//   document.getElementById('business-name').textContent = biz.name;
//   document.getElementById('business-description').textContent = biz.description;
//   document.getElementById('business-stars').innerHTML = starsHtml(biz.rating) + ` <span>${biz.rating}</span>`;
