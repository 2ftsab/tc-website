// ─── GRAB ALL ELEMENTS ───────────────────────────────────
const form = document.querySelector('form');
const nameInput = document.querySelector('input[type="text"]');
const emailInput = document.querySelector('input[type="email"]');
const feedbackInput = document.querySelector('textarea');
const navLinks = document.querySelectorAll('nav ul a');
const backToTopBtn = document.getElementById('back-to-top');

// ─── SCROLL HANDLER ──────────────────────────────────────
function handleScroll() {
    const scrollY = document.documentElement.scrollTop;

    // ── Active nav link ──
    let currentSection = '';
    document.querySelectorAll('section').forEach(function(section) {
        if (scrollY >= section.offsetTop - 80) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });

    // ── Fade in sections ──
    document.querySelectorAll('section').forEach(function(section) {
        if (section.getBoundingClientRect().top < window.innerHeight - 100) {
            section.classList.add('visible');
        }
    });

}

// ─── ATTACH SCROLL LISTENER ──────────────────────────────
window.addEventListener('scroll', handleScroll);

// ─── POLL AS BACKUP (handles GitHub Pages SES lockdown) ──
setInterval(handleScroll, 500);

// ─── RUN ONCE ON LOAD ────────────────────────────────────
handleScroll();

// ─── FEEDBACK FORM ───────────────────────────────────────
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const feedbackValue = feedbackInput.value.trim();

    if (nameValue === '' || emailValue === '' || feedbackValue === '') {
        showMessage('Please fill out all fields before submitting.', 'error');
        return;
    }

    showMessage(`Thank you ${nameValue}! Your feedback has been received.`, 'success');
    form.reset();
});

// ─── HELPER FUNCTION ─────────────────────────────────────
function showMessage(message, type) {
    const existing = document.getElementById('form-message');
    if (existing) existing.remove();

    const msgBox = document.createElement('div');
    msgBox.id = 'form-message';
    msgBox.textContent = message;

    msgBox.style.padding = '12px';
    msgBox.style.borderRadius = '6px';
    msgBox.style.marginTop = '15px';
    msgBox.style.fontFamily = 'Arial, sans-serif';
    msgBox.style.fontSize = '1rem';

    if (type === 'success') {
        msgBox.style.backgroundColor = '#d4edda';
        msgBox.style.color = '#155724';
        msgBox.style.border = '1px solid #c3e6cb';
    } else {
        msgBox.style.backgroundColor = '#f8d7da';
        msgBox.style.color = '#721c24';
        msgBox.style.border = '1px solid #f5c6cb';
    }

    form.after(msgBox);
}

// ─── DARK MODE TOGGLE ────────────────────────────────────
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Remember user preference on page load
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
    darkModeToggle.textContent = '☀️';
}

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        darkModeToggle.textContent = '☀️';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeToggle.textContent = '🌙';
        localStorage.setItem('darkMode', 'disabled');
    }
});