function toggleAddress() {
    const mode = document.getElementById("mode").value;
    const addressField = document.getElementById("addressField");
    if (mode === "Offline") {
        addressField.style.display = "block";
    } else {
        addressField.style.display = "none";
    }
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
        alert("Please enter a valid name (only letters, min 2 characters).");
        return;
    }

    if (!mobileRegex.test(mobile)) {
        alert("Please enter a valid mobile number (10 digits or with +country code).");
        return;
    }

    if (!mode || !people || (mode === "Offline" && (!address || address.length < 2))) {
        alert("Please fill in all required fields.");
        return;
    }

    form.style.display = "none";
    document.getElementById("page2").style.display = "block";

    // Enable DOB field based on email validity
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dob = document.getElementById("dob");
    dob.disabled = !emailRegex.test(email);

    limitDaysSelection(); // Ensure day limit is respected on page load
}

document.getElementById("mobile").addEventListener("input", function () {
    const mobile = this.value.trim();
    const modeSelect = document.getElementById("mode");
    if (mobile.startsWith("+") && !mobile.startsWith("+91")) {
        modeSelect.value = "Online";
        modeSelect.disabled = true;
        toggleAddress();
    } else {
        modeSelect.disabled = false;
    }
});

// Email validation: enable/disable DOB field live
document.getElementById("email").addEventListener("input", function () {
    const dob = document.getElementById("dob");
    const email = this.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    dob.disabled = !emailRegex.test(email);
});

// DOB minimum age check (18+)
document.getElementById("dob").addEventListener("change", function () {
    const dob = new Date(this.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    if (age < 18) {
        alert("You must be at least 18 years old to register.");
        this.value = "";
    }
});

// Allow only numbers 1–6 in classesPerWeek and reset day checkboxes
document.getElementById("classesPerWeek").addEventListener("input", function () {
    let value = parseInt(this.value);
    if (value < 1) this.value = 1;
    if (value > 6) this.value = 6;

    // Reset checkboxes
    const checkboxes = document.querySelectorAll("input[type='checkbox'][name='days']");
    checkboxes.forEach(cb => {
        cb.checked = false;
        cb.disabled = false;
    });

    limitDaysSelection();
});

// Reset also on focus (fail-safe)
document.getElementById("classesPerWeek").addEventListener("focus", function () {
    const checkboxes = document.querySelectorAll("input[type='checkbox'][name='days']");
    checkboxes.forEach(cb => {
        cb.checked = false;
        cb.disabled = false;
    });
});

// Limit day selection according to classesPerWeek
function limitDaysSelection() {
    const maxDays = parseInt(document.getElementById("classesPerWeek").value) || 0;
    const checkboxes = document.querySelectorAll("input[type='checkbox'][name='days']");
    const selected = Array.from(checkboxes).filter(cb => cb.checked).length;

    checkboxes.forEach(cb => {
        cb.disabled = !cb.checked && selected >= maxDays;
    });
}

// Re-run limit check on every checkbox change
document.querySelectorAll("input[type='checkbox'][name='days']").forEach(cb => {
    cb.addEventListener("change", limitDaysSelection);
});

// Final form submit
document.getElementById("enquiryForm").addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("enquiryForm").style.display = "none";
    document.getElementById("thankYouMessage").style.display = "block";
});
