document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("enquiryForm");
    const page1 = document.getElementById("page1");
    const page2 = document.getElementById("page2");
    const thankyouMessage = document.getElementById("message");

    const nameField = document.getElementById("name");
    const mobileField = document.getElementById("mobile");
    const emailField = document.getElementById("email");
    const modeSelect = document.getElementById("mode");
    const addressFieldWrapper = document.getElementById("addressField");
    const addressField = document.getElementById("address");
    const dobField = document.getElementById("dob");
    const classesPerWeekField = document.getElementById("classesPerWeek");
    const daysCheckboxes = document.querySelectorAll("input[name='days']");

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function resetDaysSelection() {
        daysCheckboxes.forEach(cb => {
            cb.checked = false;
            cb.disabled = false;
        });
    }

    emailField.addEventListener("input", function () {
        if (validateEmail(this.value)) {
            dobField.disabled = false;
        } else {
            dobField.disabled = true;
            dobField.value = "";
        }
    });

    dobField.addEventListener("change", function () {
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

    classesPerWeekField.addEventListener("input", function () {
        let val = parseInt(this.value, 10);
        if (val < 1 || val > 6) {
            this.value = "";
        }
        resetDaysSelection();
    });

    daysCheckboxes.forEach(cb => {
        cb.addEventListener("change", function () {
            const max = parseInt(classesPerWeekField.value, 10) || 0;
            const selected = [...daysCheckboxes].filter(c => c.checked);
            if (selected.length > max) {
                this.checked = false;
                alert(`You can only select up to ${max} day(s).`);
            }
        });
    });

    mobileField.addEventListener("input", function () {
        const val = this.value;
        if (!/^[+\d]*$/.test(val)) {
            this.value = val.replace(/[^+\d]/g, '');
        }
        if (val.startsWith('+') && !val.startsWith('+91')) {
            modeSelect.value = "Online";
            modeSelect.disabled = true;
            addressFieldWrapper.style.display = "none";
        } else {
            modeSelect.disabled = false;
        }
    });

    modeSelect.addEventListener("change", function () {
        addressFieldWrapper.style.display = this.value === "Offline" ? "block" : "none";
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        page1.style.display = "none";
        page2.style.display = "none";
        thankyouMessage.style.display = "block";
    });

    document.getElementById("nextButton").addEventListener("click", function () {
        const name = nameField.value.trim();
        const mobile = mobileField.value.trim();
        const gender = document.getElementById("gender").value.trim();
        const people = document.getElementById("people").value;
        const mode = modeSelect.value;
        const address = addressField.value.trim();

        if (name.length < 2 || !/^[a-zA-Z\s]+$/.test(name)) {
            alert("Please enter a valid name with at least 2 characters.");
            return;
        }
        if (!/^([+]\d{1,3})?\d{10}$/.test(mobile)) {
            alert("Please enter a valid mobile number.");
            return;
        }
        if (!gender) {
            alert("Please enter your gender.");
            return;
        }
        if (!people || parseInt(people, 10) < 1) {
            alert("Please enter the number of people.");
            return;
        }
        if (mode === "Offline" && address.length < 2) {
            alert("Please enter a valid address for offline mode.");
            return;
        }
        if (!validateEmail(emailField.value)) {
            alert("Please enter a valid email address.");
            return;
        }
        page1.style.display = "none";
        page2.style.display = "block";
    });
});
