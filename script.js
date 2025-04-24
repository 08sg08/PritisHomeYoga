function toggleAddress() {
    const mode = document.getElementById("mode").value;
    const addressField = document.getElementById("addressField");
    addressField.style.display = mode === "Offline" ? "block" : "none";
}

function goToPage2() {
    const form = document.getElementById("enquiryForm");
    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const mode = document.getElementById("mode").value;
    const people = document.getElementById("people").value.trim();
    const address = document.getElementById("address").value.trim();

    const nameRegex = /^[a-zA-Z ]{2,}$/;
    const mobileRegex = /^(\+\d{1,3})?\d{10}$/;

    if (!nameRegex.test(name)) {
        alert("Please enter a valid name (min 2 letters, only alphabets).");
        return;
    }

    if (!mobileRegex.test(mobile)) {
        alert("Please enter a valid mobile number (10 digits or +country code).");
        return;
    }

    if (!mode) {
        alert("Please select your preferred mode.");
        return;
    }

    if (!people || parseInt(people) <= 0) {
        alert("Please enter number of people.");
        return;
    }

    if (mode === "Offline" && (!address || address.length < 2)) {
        alert("Please enter a valid address.");
        return;
    }

    // Enable DOB only if email is valid
    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();
    const dob = document.getElementById("dob");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    dob.disabled = !emailRegex.test(email);

    // Show Page 2
    form.style.display = "none";
    document.getElementById("page2").style.display = "block";

    // Reset days
    resetDays();
    limitDaysSelection();
}

// Email validation for DOB
document.getElementById("email").addEventListener("input", function () {
    const dob = document.getElementById("dob");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    dob.disabled = !emailRegex.test(this.value.trim());
});

// Age validation
document.getElementById("dob").addEventListener("change", function () {
    const dob = new Date(this.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    if (age < 18) {
        alert("You must be at least 18 years old.");
        this.value = "";
    }
});

// Reset and re-enable all days
function resetDays() {
    const checkboxes = document.querySelectorAll("input[name='days']");
    checkboxes.forEach(cb => {
        cb.checked = false;
        cb.disabled = false;
    });
}

// Limit days based on classes per week
function limitDaysSelection() {
    const maxDays = parseInt(document.getElementById("classesPerWeek").value) || 0;
    const checkboxes = document.querySelectorAll("input[name='days']");
    const selected = Array.from(checkboxes).filter(cb => cb.checked).length;
    checkboxes.forEach(cb => {
        cb.disabled = !cb.checked && selected >= maxDays;
    });
}

// Reset day checkboxes if class number changes
document.getElementById("classesPerWeek").addEventListener("input", function () {
    let value = parseInt(this.value);
    if (value < 1) value = 1;
    if (value > 6) value = 6;
    this.value = value;
    resetDays();
    limitDaysSelection();
});

// Enforce number-only input in classesPerWeek
document.getElementById("classesPerWeek").addEventListener("keypress", function (e) {
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
});

// Re-check on checkbox click
document.querySelectorAll("input[name='days']").forEach(cb => {
    cb.addEventListener("change", limitDaysSelection);
});

// Auto-select Online mode for international numbers
document.getElementById("mobile").addEventListener("input", function () {
    const value = this.value.trim();
    const mode = document.getElementById("mode");
    if (value.startsWith("+") && !value.startsWith("+91")) {
        mode.value = "Online";
        mode.disabled = true;
        toggleAddress();
    } else {
        mode.disabled = false;
    }
});

// Submit form and show thank you message
document.getElementById("enquiryForm").addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("page2").style.display = "none";
    document.getElementById("thankYouMessage").style.display = "block";
});
