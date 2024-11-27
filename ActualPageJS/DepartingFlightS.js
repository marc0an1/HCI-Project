document.addEventListener('DOMContentLoaded', () => {
    const summaryBar = document.querySelector('.summary-bar');
    const flightOptionsContainer = document.querySelector('.flight-options');
    const flightInfoContainer = document.querySelector('.flight-info');
    const priceSection = document.querySelector('.price-section');
    const continueButton = document.querySelector('.price-section button'); // Select the continue button

    // Retrieve the flight data from localStorage
    const flightData = JSON.parse(localStorage.getItem('flightData'));

    if (flightData) {
        const { from, to, departDate, returnDate, adults, children, tripType } = flightData;

        // Update the summary bar
        const totalTravelers = parseInt(adults) + parseInt(children);
        summaryBar.innerHTML = `
            <span><strong>${from} ➜ ${to}</strong></span> ||
            <span><strong>${departDate}${returnDate ? ` || ${returnDate}` : ''}</strong></span> ||
            <span><strong>${totalTravelers} Traveler${totalTravelers > 1 ? 's' : ''}</strong></span>
        `;

        // Generate dynamic flight options
        const selectedDate = new Date(departDate);
        const options = generateFlightOptions(selectedDate);

        // Populate the flight options container
        flightOptionsContainer.innerHTML = '';
        options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = `date-option ${index === 1 ? 'selected' : ''}`; // Default to selecting the middle option
            optionDiv.dataset.date = option.date;
            optionDiv.dataset.price = option.price;
            optionDiv.dataset.timeAndDuration = JSON.stringify(generateTimeAndDuration()); // Generate time and duration
            optionDiv.innerHTML = `
                <div>${option.date}</div>
                <div>$${option.price}</div>
            `;

            // Add click event to update the flight details
            optionDiv.addEventListener('click', () => {
                updateFlightDetails(optionDiv, from, to);
                // Highlight the selected option
                document.querySelectorAll('.date-option').forEach(option => option.classList.remove('selected'));
                optionDiv.classList.add('selected');
            });

            flightOptionsContainer.appendChild(optionDiv);
        });

        // Initialize with the first selected option
        const defaultSelectedOption = flightOptionsContainer.querySelector('.date-option.selected');
        if (defaultSelectedOption) {
            updateFlightDetails(defaultSelectedOption, from, to);
        }

        // Handle Continue button click
        continueButton.addEventListener('click', () => {
            const selectedOption = document.querySelector('.date-option.selected');

            if (!selectedOption) {
                alert('Please select a flight before continuing.');
                return;
            }

            // Save the selected departing flight details in localStorage
            const { startTime, endTime, duration } = JSON.parse(selectedOption.dataset.timeAndDuration);
            const departingFlightDetails = {
                date: selectedOption.dataset.date,
                price: selectedOption.dataset.price,
                time: { startTime, endTime },
                duration
            };

            localStorage.setItem('departingFlight', JSON.stringify(departingFlightDetails));

            // Redirect to the returning flight page if roundtrip, otherwise show a summary
            if (tripType === 'roundtrip' && returnDate) {
                window.location.href = '/ActualPageHTML/ReturningFlightS.html';
            } else {
                window.location.href = '/ActualPageHTML/TripSummaryS.html';
            }
        });
    } else {
        summaryBar.innerHTML = '<span><strong>No Data Available</strong></span>';
    }
});

// Function to generate flight options with random prices
function generateFlightOptions(selectedDate) {
    const options = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = -2; i <= 2; i++) {
        const optionDate = new Date(selectedDate);
        optionDate.setDate(optionDate.getDate() + i);

        const dayName = days[optionDate.getDay()];
        const monthName = months[optionDate.getMonth()];
        const date = `${dayName} ${monthName} ${optionDate.getDate()}`;

        const randomPrice = Math.floor(Math.random() * (900 - 300 + 1)) + 300; // Random price between $300 and $900

        options.push({
            date,
            price: randomPrice
        });
    }

    return options;
}

// Function to generate a random start time and calculate end time (fixed duration: 3h 20m)
function generateTimeAndDuration() {
    const startHour = Math.floor(Math.random() * 12) + 1; // Random hour between 1 and 12
    const startMinute = Math.floor(Math.random() * 60); // Random minute
    const startPeriod = Math.random() > 0.5 ? 'AM' : 'PM';

    // Fixed duration: 3h 20m
    const totalMinutes = startHour * 60 + startMinute + 3 * 60 + 20;
    const endHour = Math.floor((totalMinutes / 60) % 12) || 12;
    const endMinute = totalMinutes % 60;
    const endPeriod = Math.floor(totalMinutes / 720) % 2 === 0 ? startPeriod : startPeriod === 'AM' ? 'PM' : 'AM';

    return {
        startTime: `${startHour}:${startMinute.toString().padStart(2, '0')} ${startPeriod}`,
        endTime: `${endHour}:${endMinute.toString().padStart(2, '0')} ${endPeriod}`,
        duration: `3h 20m`
    };
}

// Function to update flight details
function updateFlightDetails(selectedOption, from, to) {
    const { startTime, endTime, duration } = JSON.parse(selectedOption.dataset.timeAndDuration);
    const price = selectedOption.dataset.price;

    const flightInfoContainer = document.querySelector('.flight-info');
    const priceSection = document.querySelector('.price-section');

    flightInfoContainer.innerHTML = `
        <p><strong>${startTime}</strong> ➜ <strong>${endTime}</strong></p>
        <p>${from} ➜ ${to}</p>
        <p>${duration} | No stops</p>
    `;

    priceSection.innerHTML = `
        <p><strong>From $${price}</strong></p>
        <button id="continueButton">Continue</button>
    `;

    // Dynamically add the event listener for the newly created button
    document.getElementById('continueButton').addEventListener('click', handleContinueButtonClick);
}

// Function to handle the continue button click
function handleContinueButtonClick() {
    const tripType = JSON.parse(localStorage.getItem('flightData'))?.tripType;
    const selectedOption = document.querySelector('.date-option.selected');

    if (!selectedOption) {
        alert('Please select a flight before continuing.');
        return;
    }

    const { startTime, endTime, duration } = JSON.parse(selectedOption.dataset.timeAndDuration);
    const departingFlightDetails = {
        date: selectedOption.dataset.date,
        price: selectedOption.dataset.price,
        time: { startTime, endTime },
        duration,
    };

    // Save the selected departing flight details in localStorage
    localStorage.setItem('departingFlight', JSON.stringify(departingFlightDetails));

    // Redirect based on the trip type
    if (tripType === 'roundtrip') {
        window.location.href = '/ActualPageHTML/ReturningFlightS.html';
    } else {
        window.location.href = '/ActualPageHTML/TripSummaryS.html';
    }
}
