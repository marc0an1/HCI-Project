document.addEventListener("DOMContentLoaded", () => {
    const seats = document.querySelectorAll(".seat.available");
    const selectedSeatDisplay = document.getElementById("selected-seat");

    seats.forEach(seat => {
        seat.addEventListener("click", () => {
            // Remove 'selected' class from previously selected seats
            document.querySelectorAll(".seat.selected").forEach(selected => {
                selected.classList.remove("selected");
            });

            // Mark the clicked seat as selected
            seat.classList.add("selected");

            // Update the selected seat display
            const seatNumber = seat.getAttribute("data-seat");
            selectedSeatDisplay.textContent = `Selected Seat: ${seatNumber}`;
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const seats = document.querySelectorAll(".seat"); // Select all seat elements
    const selectedSeatDisplay = document.getElementById("selected-seat");

    // Add click event to each seat
    seats.forEach((seat) => {
        seat.addEventListener("click", () => {
            // If the seat is unavailable, do nothing
            if (seat.classList.contains("unavailable")) return;

            // Remove the "selected" class from all other seats
            seats.forEach((s) => s.classList.remove("selected"));

            // Add the "selected" class to the clicked seat
            seat.classList.add("selected");

            // Update the selected seat display
            const seatLabel = seat.dataset.seat; // Get the seat label (A1, A2, etc.)
            selectedSeatDisplay.textContent = `Selected Seat: ${seatLabel}`;
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    // Bag counts
    const checkedBagCount = document.getElementById("checked-bag-count");
    const carryOnBagCount = document.getElementById("carry-on-bag-count");
    const personalItemCount = document.getElementById("personal-item-count");

    // Increment and decrement buttons
    const incrementButtons = document.querySelectorAll(".bag-increment");
    const decrementButtons = document.querySelectorAll(".bag-decrement");

    // Update bag count function
    const updateBagCount = (element, increment) => {
        let count = parseInt(element.textContent, 10);
        count = increment ? count + 1 : Math.max(count - 1, 0); // Ensure count doesn't go below 0
        element.textContent = count;
    };

    // Add event listeners to buttons
    incrementButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const countElement = button.previousElementSibling;
            updateBagCount(countElement, true);
        });
    });

    decrementButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const countElement = button.nextElementSibling;
            updateBagCount(countElement, false);
        });
    });
});
