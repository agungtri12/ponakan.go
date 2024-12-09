// Append value to display
function appendValue(value) {
    const display = document.getElementById('display');
    display.value += value;
}

// Clear the display
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Toggle positive/negative sign
function toggleSign() {
    const display = document.getElementById('display');
    if (display.value) {
        display.value = display.value.startsWith('-')
            ? display.value.slice(1)
            : '-' + display.value;
    }
}

// Calculate the result
function calculate() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value); // Use eval for simplicity
    } catch (error) {
        display.value = 'Error';
    }
}

// Calculate square root
function calculateSquareRoot() {
    const display = document.getElementById('display');
    if (!isNaN(display.value) && display.value >= 0) {
        display.value = Math.sqrt(parseFloat(display.value)).toFixed(5);
    } else {
        display.value = 'Error';
    }
}

// Convert currency
function convertCurrency() {
    const display = document.getElementById('display');
    const currency = document.getElementById('currency').value;

    if (!display.value || isNaN(display.value)) {
        alert("Masukkan angka yang valid untuk dikonversi.");
        return;
    }

    let amount = parseFloat(display.value);
    let convertedValue;

    if (currency === 'usdToIdr') {
        convertedValue = amount * 15000; // Kurs tetap USD ke IDR
    } else if (currency === 'idrToUsd') {
        convertedValue = amount / 15000; // Kurs tetap IDR ke USD
    }

    display.value = convertedValue.toFixed(2); // Hasil konversi
}

// Toggle dropdown visibility
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Close dropdown if clicking outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropdown a')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display === "block") {
                openDropdown.style.display = "none";
            }
        }
    }
};

// Set active class on clicked menu item
function setActive(element) {
    // Remove 'active' class from all links
    const links = document.querySelectorAll('.navbar a');
    links.forEach(link => {
        link.classList.remove('active');
    });

    // Add 'active' class to the clicked link
    element.classList.add('active');
}
