// Example flight data (replace with dynamic data if available)
const flightDetails = {
    departing: "Miami to New York, 9:00 AM, Flight 123",
    return: "New York to Miami, 7:00 PM, Flight 456",
    totalAmount: 350.00 // Example total
};

// Populate the Trip Summary Box
document.addEventListener("DOMContentLoaded", () => {
    // Populate departing flight
    document.getElementById("departing-flight").textContent = flightDetails.departing;

    // Populate return flight
    document.getElementById("return-flight").textContent = flightDetails.return;

    // Populate total amount
    document.getElementById("total-amount").textContent = flightDetails.totalAmount.toFixed(2);
});
