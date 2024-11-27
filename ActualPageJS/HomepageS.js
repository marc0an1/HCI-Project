function toggleReturnDate() {
    const tripType = document.getElementById('trip-type').value;
    const returnDate = document.getElementById('return-date');

    if (tripType === 'oneway') {
        returnDate.style.display = 'none'; // Completely hide the return date input
    } else {
        returnDate.style.display = 'block'; // Show the return date input
    }
}

function handleSearchSubmit(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const from = document.getElementById('from-location').value.trim();
    const to = document.getElementById('to-location').value.trim();
    const departDate = document.getElementById('depart-date').value.trim();
    const tripType = document.getElementById('trip-type').value;
    const returnDate = document.getElementById('return-date').value.trim();
    const adults = document.getElementById('adults').value.trim();
    const children = document.getElementById('children').value.trim();

    // Validate if all required fields are filled
    if (!from || !to || !departDate || (tripType === 'roundtrip' && !returnDate)) {
        alert('Please fill out all required fields, including departure and return dates for roundtrip.');
        return; // Stop the function if validation fails
    }

    // Validate if locations are valid
    const validLocations = ['Miami, Florida', 'San Antonio, Texas'];
    if (!validLocations.includes(from) || !validLocations.includes(to)) {
        alert('Please select valid locations: Miami, Florida or San Antonio, Texas.');
        return; // Stop the function if locations are invalid
    }

    // Save data to localStorage
    localStorage.setItem(
        'flightData',
        JSON.stringify({
            from,
            to,
            departDate,
            returnDate: tripType === 'roundtrip' ? returnDate : null,
            adults,
            children,
        })
    );

    // Redirect to the departing flight page
    window.location.href = '/ActualPageHTML/DepartingFlightS.html';
}

document.querySelector('.search-form form').addEventListener('submit', handleSearchSubmit);

document.querySelector('.search-form form').addEventListener('submit', handleSearchSubmit);


function updateTravelerText(type) {
    const input = document.getElementById(type);
    const value = parseInt(input.value);

    if (type === 'adults') {
        input.placeholder = value === 1 ? '1 Adult' : `${value} Adults`;
    } else if (type === 'children') {
        input.placeholder = value === 1 ? '1 Child' : `${value} Children`;
    }
}

document.querySelector('form').addEventListener('submit', (e) => {
    const validLocations = ['Miami, Florida', 'San Antonio, Texas'];
    const fromLocation = document.getElementById('from-location').value;
    const toLocation = document.getElementById('to-location').value;

    if (!validLocations.includes(fromLocation) || !validLocations.includes(toLocation)) {
        e.preventDefault(); // Prevent form submission
        alert('Please select valid locations: Miami, Florida or San Antonio, Texas.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for the search form
    const searchForm = document.querySelector('.search-form form');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearchSubmit);
    }

    // Add event listener for updating traveler text
    const travelerForm = document.querySelector('form');
    if (travelerForm) {
        travelerForm.addEventListener('submit', (e) => {
            const validLocations = ['Miami, Florida', 'San Antonio, Texas'];
            const fromLocation = document.getElementById('from-location').value;
            const toLocation = document.getElementById('to-location').value;

            if (!validLocations.includes(fromLocation) || !validLocations.includes(toLocation)) {
                e.preventDefault(); // Prevent form submission
                alert('Please select valid locations: Miami, Florida or San Antonio, Texas.');
            }
        });
    }
});

