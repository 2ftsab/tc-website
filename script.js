// ─── FEEDBACK FORM ───────────────────────────────────────

// Step 1: Grab the form elements from the HTML page
const form = document.querySelector('form');
const nameInput = document.querySelector('input[type="text"]');
const emailInput = document.querySelector('input[type="email"]');
const feedbackInput = document.querySelector('textarea');

// Step 2: Listen for the form button click
form.addEventListener('submit', function(event) {

    // Stop the page from reloading on submit
    event.preventDefault();

    // Step 3: Grab what the user typed
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const feedbackValue = feedbackInput.value.trim();

    // Step 4: Validate — check nothing is empty
    if (nameValue === '' || emailValue === '' || feedbackValue === '') {
        showMessage('Please fill out all fields before submitting.', 'error');
        return;
    }

    // Step 5: If all good — show success and clear the form
    showMessage(`Thank you ${nameValue}! Your feedback has been received.`, 'success');
    form.reset();
});

// ─── HELPER FUNCTION ─────────────────────────────────────

// This function creates and shows a message below the form
function showMessage(message, type) {

    // Remove any existing message first
    const existing = document.getElementById('form-message');
    if (existing) existing.remove();

    // Create a new message box
    const msgBox = document.createElement('div');
    msgBox.id = 'form-message';
    msgBox.textContent = message;

    // Style based on success or error
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

    // Insert the message box after the form
    form.after(msgBox);
}

// ─── SMOOTH SCROLL + ACTIVE NAV ──────────────────────────

// Grab all nav links
const navLinks = document.querySelectorAll('nav ul a');

// Highlight the active nav link based on scroll position
window.addEventListener('scroll', function() {

    // ── Active nav link ──
    let currentSection = '';

    document.querySelectorAll('section').forEach(function(section) {
        const sectionTop = section.offsetTop - 80;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });

    // ── Fade in sections on scroll ──
    document.querySelectorAll('section').forEach(function(section) {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 100) {
            section.classList.add('visible');
        }
    });
});

// ─── RUN FADE IN ON PAGE LOAD ────────────────────────────
// Trigger for sections already visible when page first loads
window.dispatchEvent(new Event('scroll'));

// ─── BACK TO TOP BUTTON ──────────────────────────────────

const backToTopBtn = document.getElementById('back-to-top');

// Show button when user scrolls down 300px
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Smooth scroll to top on click — GitHub Pages compatible
backToTopBtn.addEventListener('click', function() {
    document.querySelector('html').scrollIntoView({ 
        behavior: 'smooth' 
    });
});