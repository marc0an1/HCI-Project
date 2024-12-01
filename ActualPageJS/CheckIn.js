document.addEventListener("DOMContentLoaded", () => {
    const formSection = document.getElementById("form-section");
    const flightsSection = document.getElementById("flights-section");
    const flightsContainer = document.getElementById("flights-container");

    const flightData = [
        { from: "Miami", to: "New York", date: "2024-12-15" },
    ];

    const createFlightBox = (flight) => {
        const flightBox = document.createElement("div");
        flightBox.className = "flight-box";

        flightBox.innerHTML = `
            <p><strong>From:</strong> ${flight.from}</p>
            <p><strong>To:</strong> ${flight.to}</p>
            <p><strong>Date:</strong> ${flight.date}</p>
            <div class="flight-actions">
                <button class="toggle-checkin">Check In</button>
                <button class="cancel-flight">Cancel</button>
            </div>
        `;

        // Add event listeners
        flightBox.querySelector(".toggle-checkin").addEventListener("click", () => {
            flightBox.classList.toggle("checked-in");
        });

        flightBox.querySelector(".cancel-flight").addEventListener("click", () => {
            if (confirm("Are you sure you want to cancel this flight?")) {
                flightBox.remove();
            }
        });

        return flightBox;
    };

    document.getElementById("checkin-form").addEventListener("submit", (e) => {
        e.preventDefault();

        // Hide form section and show flights section
        formSection.classList.add("hidden");
        flightsSection.classList.remove("hidden");

        // Populate flight boxes
        flightsContainer.innerHTML = ""; // Clear any existing content
        flightData.forEach((flight) => {
            flightsContainer.appendChild(createFlightBox(flight));
        });
    });
});
