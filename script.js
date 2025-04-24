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
    const email = document.getElementById("email").value.trim();

    const nameRegex = /^[a-zA-Z ]{2,}$/;
    const mobileRegex = /^(\+\d{1,3})?\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(name)) {
        alert("Please enter a valid name (only letters, minimum 2 characters).");
        return;
    }

    if (!mobileRegex.test(mobile)) {
        alert("Please enter a valid mobile number (10 digits or with +country code).");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!name || !mobile || !mode || !people || (mode === "Offline" && (!address || address.length < 2))) {
        alert("Please fill in all required fields.");
        return;
    }

    form.style.display = "none";
    document.getElementById("page2").style.display = "block";
    document.getElementById("dob").disabled = false;
}

function limitDaysSelection() {
    const maxDays = parseInt(document.getElementById("classesPerWeek").value) || 0;
    const checkboxes = document.querySelectorAll("input[type='checkbox'][name='days']");
    checkboxes.forEach(cb => cb.disabled = false);
    const selected = Array.from(checkboxes).filter(cb => cb.checked).length;
    if (selected >= maxDays) {
        checkboxes.forEach(cb => {
            if (!cb.checked) cb.disabled = true;
        });
    }
}

// Restrict mode for international numbers
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

// Only allow numbers in classes/week
document.getElementById("classesPerWeek").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
});

// Check if age is at least 18
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

document.getElementById("enquiryForm").addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("enquiryForm").style.display = "none";
    document.getElementById("thankYouMessage").style.display = "block";
});
