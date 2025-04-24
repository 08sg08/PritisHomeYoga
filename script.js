function toggleAddress() {
    const mode = document.getElementById("mode").value;
    const addressField = document.getElementById("addressField");
    addressField.style.display = (mode === "Offline") ? "block" : "none";
}

function goToPage2() {
    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const mode = document.getElementById("mode").value;
    const people = document.getElementById("people").value.trim();
    const address = document.getElementById("address").value.trim();

    // Name validation: only letters and spaces, min 2 characters
    if (!/^[A-Za-z ]{2,}$/.test(name)) {
        alert("Please enter a valid name (at least 2 letters, no numbers).");
        return;
    }

    // Mobile validation: 10-digit or +countrycode+number (min 11 digits after +)
    const mobileValid = (/^\d{10}$/).test(mobile) || (/^\+\d{11,}$/).test(mobile);
    if (!mobileValid) {
        alert("Please enter a valid mobile number.");
        return;
    }

    // Auto-switch mode if international number
    const modeSelect = document.getElementById("mode");
    if (mobile.startsWith("+") && !mobile.startsWith("+91")) {
        modeSelect.value = "Online";
        modeSelect.disabled = true;
        toggleAddress();
    } else {
        modeSelect.disabled = false;
    }

    if (!mode || !people || (mode === "Offline" && address.length < 2)) {
        alert("Please fill in all required fields.");
        return;
    }

    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "block";
}

// Email validation unlocks DOB
document.getElementById("email").addEventListener("input", function () {
    const email = this.value.trim();
    const dob = document.getElementById("dob");
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        dob.disabled = false;
    } else {
        dob.disabled = true;
        dob.value = "";
    }
});

// DOB age validation: must be 18+
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

// Classes per week: only allow 1–6 and reset days
document.getElementById("classesPerWeek").addEventListener("input", function () {
    const value = parseInt(this.value);
    if (value < 1 || value > 6) {
        alert("Please enter a number between 1 and 6.");
        this.value = "";
    }

    // Reset all checkboxes
    document.querySelectorAll("input[name='days']").forEach(cb => {
        cb.checked = false;
        cb.disabled = false;
    });
});

// Day selection limiter
document.querySelectorAll("input[name='days']").forEach(cb => {
    cb.addEventListener("change", () => {
        const maxDays = parseInt(document.getElementById("classesPerWeek").value);
        const selected = document.querySelectorAll("input[name='days']:checked").length;

        document.querySelectorAll("input[name='days']").forEach(cb => {
            cb.disabled = selected >= maxDays && !cb.checked;
        });
    });
});

// Form submission
document.getElementById("enquiryForm").addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("enquiryForm").style.display = "none";
    document.getElementById("thankYouMessage").style.display = "block";
});
