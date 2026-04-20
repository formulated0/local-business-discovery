const params = new URLSearchParams(window.location.search);
const nextUrl = params.get('next') || '../index.html';

// skip if already logged in
if (getUser()) {
	window.location.href = nextUrl;
}

// show which tab was requested (login or signup)
if (params.get('tab') === 'signup') {
	showTab('signup');
}

let accountType = 'customer';

function showTab(tab) {
	document.getElementById('form-login').style.display = tab === 'login' ? 'flex' : 'none';
	document.getElementById('form-signup').style.display = tab === 'signup' ? 'flex' : 'none';
	document.getElementById('tab-login').classList.toggle('active', tab === 'login');
	document.getElementById('tab-signup').classList.toggle('active', tab === 'signup');
}

function selectType(type) {
	accountType = type;
	document.getElementById('type-customer').classList.toggle('selected', type === 'customer');
	document.getElementById('type-business').classList.toggle('selected', type === 'business');
	const hints = {
		customer: 'Browse and review local businesses.',
		business: 'Publish and manage your business listing.'
	};
	document.getElementById('type-hint').textContent = hints[type];
}

function doLogin() {
	const email = document.getElementById('login-email').value.trim();
	const password = document.getElementById('login-password').value;
	const errorEl = document.getElementById('login-error');
	errorEl.textContent = '';

	// load accounts from storage
	const accounts = JSON.parse(localStorage.getItem('lbd_accounts') || '{}');
	const user = accounts[email];

	if (!user || user.password !== password) {
		errorEl.textContent = 'Incorrect email or password.';
		return;
	}

	saveUser({ email, name: user.name, type: user.type });
	window.location.href = nextUrl;
}

function doSignup() {
	const name = document.getElementById('signup-name').value.trim();
	const email = document.getElementById('signup-email').value.trim();
	const password = document.getElementById('signup-password').value;
	const errorEl = document.getElementById('signup-error');
	errorEl.textContent = '';

	if (!name || !email || !password) {
		errorEl.textContent = 'Please fill in all fields.';
		return;
	}

	const accounts = JSON.parse(localStorage.getItem('lbd_accounts') || '{}');
	if (accounts[email]) {
		errorEl.textContent = 'An account with that email already exists.';
		return;
	}

	// save account and log in immediately
	accounts[email] = { name, password, type: accountType };
	localStorage.setItem('lbd_accounts', JSON.stringify(accounts));

	saveUser({ email, name, type: accountType });
	window.location.href = nextUrl;
}
