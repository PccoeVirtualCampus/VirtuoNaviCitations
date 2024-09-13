// Toggle dark mode
document.getElementById('modeToggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
});

// Handle the dropdown menu selection
function handleYearOptions() {
    const yearOption = document.getElementById("yearOptions").value;
    const yearRangeInputs = document.getElementById("yearRangeInputs");
    
    // Hide the range inputs by default
    yearRangeInputs.style.display = "none";

    // Handle the dropdown options
    switch (yearOption) {
        case "sortAsc":
            sortTableByYear(true);  // Sort in ascending order
            break;
        case "sortDesc":
            sortTableByYear(false); // Sort in descending order
            break;
        case "filterRange":
            yearRangeInputs.style.display = "block"; // Show year range inputs for filtering
            break;
        case "reset":
            resetTable(); // Reset table to initial condition (sorted by Paper no.)
            break;
    }
}

// Function to sort the table by year (ascending or descending)
function sortTableByYear(ascending) {
    const table = document.querySelector('.table tbody');
    const rowsArray = Array.from(table.getElementsByTagName('tr'));
    
    // Sort rows based on the year (third column, index 2)
    rowsArray.sort((rowA, rowB) => {
        const yearA = parseInt(rowA.getElementsByTagName('td')[2].textContent);
        const yearB = parseInt(rowB.getElementsByTagName('td')[2].textContent);
        return ascending ? yearA - yearB : yearB - yearA;
    });

    // Re-insert rows in the sorted order
    rowsArray.forEach(row => table.appendChild(row));
}

// Function to filter the table by a year range
function filterByYearRange() {
    const startYear = parseInt(document.getElementById("startYear").value);
    const endYear = parseInt(document.getElementById("endYear").value);
    
    const table = document.querySelector('.table tbody');
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const yearCell = rows[i].getElementsByTagName('td')[2];
        const yearValue = parseInt(yearCell.textContent);

        // Show row if year is within the specified range, hide it otherwise
        if (yearValue >= startYear && yearValue <= endYear) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

// Function to reset the table to its initial condition (sorted by Paper no.)
function resetTable() {
    const table = document.querySelector('.table tbody');
    const rowsArray = Array.from(table.getElementsByTagName('tr'));

    // Sort rows based on the Paper no. (first column, index 0)
    rowsArray.sort((rowA, rowB) => {
        const paperNoA = parseInt(rowA.getElementsByTagName('td')[0].textContent);
        const paperNoB = parseInt(rowB.getElementsByTagName('td')[0].textContent);
        return paperNoA - paperNoB;
    });

    // Re-insert rows in the sorted order (by Paper no.)
    rowsArray.forEach(row => table.appendChild(row));

    // Hide the range input fields and reset the dropdown selection
    document.getElementById("yearOptions").value = '';
    document.getElementById('yearRangeInputs').style.display = 'none';
    console.log("Table reset to initial condition and sorted by Paper no.");
}

// Function to reset the filter inputs and show all table rows
function resetFilter() {
    // Reset the input fields
    document.getElementById("startYear").value = '';
    document.getElementById("endYear").value = '';

    // Show all rows in the table
    const table = document.querySelector('.table tbody');
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        rows[i].style.display = ''; // Show all rows
    }

    // Optionally reset table sorting if required
    resetTable();
}

// Initialize event listeners for year range inputs
document.getElementById('applyFilter').addEventListener('click', filterByYearRange);
document.getElementById('resetFilter').addEventListener('click', resetFilter);

// Ensure the correct mode (dark/light) is applied on page load
window.addEventListener('DOMContentLoaded', function () {
    const modeToggle = document.getElementById('modeToggle');
    if (modeToggle.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});
