// ─── FEEDBACK FORM ───────────────────────────────────────

// ─── GRAB ALL ELEMENTS ───────────────────────────────────
const form = document.querySelector('form');
const nameInput = document.querySelector('input[type="text"]');
const emailInput = document.querySelector('input[type="email"]');
const feedbackInput = document.querySelector('textarea');
const navLinks = document.querySelectorAll('nav ul a');
const backToTopBtn = document.getElementById('back-to-top');

// ─── SINGLE SCROLL LISTENER ──────────────────────────────
window.addEventListener('scroll', function() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // ── Active nav link ──
    let currentSection = '';
    document.querySelectorAll('section').forEach(function(section) {
        const sectionTop = section.offsetTop - 80;
        if (scrollY >= sectionTop) {
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
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 100) {
            section.classList.add('visible');
        }
    });

    // ── Back to top button ──
    if (scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// ─── FORCE SCROLL CHECK ──────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
    setInterval(function() {
        const scrollY = window.pageYOffset || 
                        document.documentElement.scrollTop || 
                        document.body.scrollTop || 0;
        if (scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }, 300);
});

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

// ─── BACK TO TOP CLICK ───────────────────────────────────
backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
});