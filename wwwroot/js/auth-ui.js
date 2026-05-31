// Wire-up simple UI -> logic in app.js
document.addEventListener('DOMContentLoaded', () => {
  // Show/hide header user UI
  updateAuthUI?.();

  // Login form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (typeof handleLogin === 'function') handleLogin(e);
    });
    const loginBtn = document.getElementById('loginSubmit');
    if (loginBtn) loginBtn.addEventListener('click', (e) => { e.preventDefault(); if (typeof handleLogin === 'function') handleLogin(e); });
  }

  // Register form
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (typeof handleRegister === 'function') handleRegister(e);
    });
    const registerBtn = document.getElementById('registerSubmit');
    if (registerBtn) registerBtn.addEventListener('click', (e) => { e.preventDefault(); if (typeof handleRegister === 'function') handleRegister(e); });
  }

  // Apply form
  const applyForm = document.getElementById('applyForm');
  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (typeof handleApply === 'function') handleApply(e);
    });
  }

  // Header search button
  const btn = document.getElementById('heroSearchBtn');
  if (btn) btn.addEventListener('click', handleHeroSearch);

  // Ensure UI updates after any change
  window.updateAuthUI = updateAuthUI;
});