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