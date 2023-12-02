const greetingElement = document.getElementById('greeting');
const buttonContainer = document.getElementById('buttonContainer');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const messageElement = document.getElementById('message');
const forgotPasswordButton = document.getElementById('forgotPassword');

document.getElementById('registerToggle').addEventListener('click', () => toggleForm('registerForm'));
document.getElementById('loginToggle').addEventListener('click', () => toggleForm('loginForm'));
forgotPasswordButton.addEventListener('click', forgotPassword);

function toggleForm(formId) {
    const forms = [registerForm, loginForm];
    forms.forEach(form => form.style.display = form.id === formId ? 'block' : 'none');
    clearMessage();
}

function clearMessage() {
    messageElement.innerText = '';
    messageElement.classList.remove('error');
}

function showMessage(message, isError) {
    messageElement.innerText = message;
    messageElement.className = isError ? 'error' : '';
}

function register() {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    if (!validateInput(newUsername, newPassword)) {
        return;
    }
    if (userExists(newUsername)) {
        showMessage('Username already exists', true);
        return;
    }
    const hashedPassword = hashPassword(newPassword);
    showMessage('Registration successful', false);
    clearRegistrationForm();
}

function clearRegistrationForm() {
    document.getElementById('newUsername').value = '';
    document.getElementById('newPassword').value = '';
}

function userExists(username) {
    return false;
}

// Login logic
function login() {
    const existingUsername = document.getElementById('existingUsername').value;
    const existingPassword = document.getElementById('existingPassword').value;

    if (!validateInput(existingUsername, existingPassword)) {
        return;
    }
    const authenticationSuccessful = true;
    if (authenticationSuccessful) {
        showMessage('Login successful', false);
    } else {
        showMessage('Invalid username or password', true);
    }
}

function forgotPassword() {
    const username = prompt('Enter your username:');
    
    if (username) {
        showMessage('Password reset instructions sent to your email.', false);
    }
}

function validateInput(username, password) {
    if (username.trim() === '' || password.trim() === '') {
        showMessage('Please enter both username and password.', true);
        return false;
    }
    return true;
}

function hashPassword(password) {
    return password.split('').reverse().join('');
}