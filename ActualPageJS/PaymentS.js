document.getElementById("payment-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form's default submission behavior

    // Gather form values
    const cardName = document.getElementById("card-name").value.trim();
    const cardNumber = document.getElementById("card-number").value.trim();
    const expiryDate = document.getElementById("expiry-date").value.trim();
    const securityCode = document.getElementById("security-code").value.trim();
    const billingAddress = document.getElementById("billing-address").value.trim();

    // Validate form fields
    if (cardName && cardNumber && expiryDate && securityCode && billingAddress) {
        // Redirect user to a confirmation page if all fields are filled
        window.location.href = "/ActualPageHTML/LastStep.html";
    } else {
        alert("Please fill out all fields before submitting.");
    }
});