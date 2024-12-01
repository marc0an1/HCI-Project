document.getElementById("manage-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Show available flights section
    document.getElementById("flights-section").classList.remove("hidden");

    // Add sample flight data dynamically
    const flights = [
        { from: "New York", to: "Miami", cost: "$450", date: "2024-12-01" },
        { from: "Los Angeles", to: "Chicago", cost: "$300", date: "2024-12-03" },
        { from: "Dallas", to: "Denver", cost: "$200", date: "2024-12-05" }
    ];

    const flightsContainer = document.getElementById("flights-container");
    flightsContainer.innerHTML = ""; // Clear existing flights

    flights.forEach((flight, index) => {
        const flightBox = document.createElement("div");
        flightBox.classList.add("flight-box");

        const flightDetails = `
            <div class="flight-details">
                <p><strong>From:</strong> ${flight.from}</p>
                <p><strong>To:</strong> ${flight.to}</p>
                <p><strong>Cost:</strong> ${flight.cost}</p>
                <p><strong>Date:</strong> ${flight.date}</p>
            </div>
        `;

        const flightActions = `
            <div class="flight-actions">
                <button class="view-button" data-index="${index}">View</button>
                <button class="delete-button" data-index="${index}">X</button>
            </div>
        `;

        flightBox.innerHTML = flightDetails + flightActions;
        flightsContainer.appendChild(flightBox);
    });

    // Handle "View" button
    document.querySelectorAll(".view-button").forEach(button => {
        button.addEventListener("click", () => {
            window.open("/ActualPageCSS/SampleTicket.pdf", "_blank");
        });
    });

    // Handle "Delete" button
    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", (e) => {
            const confirmation = confirm("Are you sure you want to delete this flight?");
            if (confirmation) {
                e.target.closest(".flight-box").remove();
            }
        });
    });
});
