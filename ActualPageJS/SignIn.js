// Signin.js
function toggleForm(formId) {
    const createAccountForm = document.getElementById("create-account");
    const loginForm = document.getElementById("log-in");

    if (formId === "login") {
        createAccountForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
    } else if (formId === "create-account") {
        loginForm.classList.add("hidden");
        createAccountForm.classList.remove("hidden");
    }
}