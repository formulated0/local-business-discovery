const AUTH_KEY = 'lbd_user';

// returns the logged-in user object or null
function getUser() {
	const raw = localStorage.getItem(AUTH_KEY);
	return raw ? JSON.parse(raw) : null;
}

// saves user to local storage after successful login/signup
function saveUser(user) {
	localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

function logout() {
	localStorage.removeItem(AUTH_KEY);
}

// redirects to login if not logged in
// this is only for the parts that require auth
function requireAuth(role = null) {
	const user = getUser();
	if (!user) {
		const next = encodeURIComponent(window.location.href);
		window.location.href = `/pages/login.html?next=${next}`;
		return false;
	}
	if (role && user.type !== role) {
		alert(`This feature requires a ${role} account.`);
		return false;
	}
	return true;
}

// updates the header action link depending on login state
function updateHeaderAuthLink() {
	const link = document.getElementById('header-auth-link');
	if (!link) return;
	const user = getUser();
	if (user) {
		link.textContent = user.name;
		link.href = '/pages/account.html';
	} else {
		link.textContent = 'Sign in';
		link.href = '/pages/login.html';
	}
}
