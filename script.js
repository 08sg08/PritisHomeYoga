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

    if (!/^[A-Za-z ]{2,}$/.test(name)) {
        alert("Please enter a valid name (at least 2 letters, no numbers).");
        return;
    }

    if (!/^(\\+\\d{1,3})?\\d{10}$/.test(mobile)) {
        alert("Please enter a valid mobile number.");
        return;
    }

    if (mobile.startsWith("+") && !mobile.startsWith("+91")) {
        document.getElementById("mode").value = "Online";
        document.getElementById("mode").disabled = true;
        toggleAddress();
    } else {
        document.getElementById("mode").disabled = false;
    }

    if (!name || !mobile || !mode || !people || (mode === "Offline" && address.length < 2)) {
        alert("Please fill in all required fields.");
        return;
    }

    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "block";
}

document.getElementById("classesPerWeek").addEventListener("input", function () {
    const value = parseInt(this.value);
    if (value < 1 || value > 6) {
        alert("Please enter a number between 1 and 6.");
        this.value = "";
    }

    // Reset days on change
    document.querySelectorAll("input[name='days']").forEach(cb => {
        cb.checked = false;
        cb.disabled = false;
    });
});

document.querySelectorAll("input[name='days']").forEach(cb => {
    cb.addEventListener("change", () => {
        const maxDays = parseInt(document.getElementById("classesPerWeek").value);
        const selected = document.querySelectorAll("input[name='days']:checked").length;

        document.querySelectorAll("input[name='days']").forEach(cb => {
            cb.disabled = selected >= maxDays && !cb.checked;
        });
    });
});

document.getElementById("email").addEventListener("input", function () {
    const email = this.value.trim();
    const dob = document.getElementById("dob");

    if (/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
        dob.disabled = false;
    } else {
        dob.disabled = true;
        dob.value = "";
    }
});

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
