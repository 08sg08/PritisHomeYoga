function toggleAddress() {
    const mode = document.getElementById('mode').value;
    const addressField = document.getElementById('addressField');
    addressField.style.display = (mode === 'Offline') ? "block" : "none";
}

function goToPage2() {
    const gender = document.getElementById('gender').value.trim();
    const name = document.getElementById('name').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const mode = document.getElementById('mode').value;
    const address = document.getElementById('address').value.trim();
    const people = document.getElementById('people').value.trim();

    if (!gender || !name || !mobile || !mode || !people || (mode === "Offline" && !address)) {
        alert('Please fill in all required fields.');
        return;
    }

    // Validate mobile
    if (!/^\+?\d{10,15}$/.test(mobile)) {
        alert('Please enter a valid mobile number.');
        return;
    }

    const modeSelect = document.getElementById('mode');
    if (mobile.startsWith('+') && !mobile.startsWith('+91')) {
        modeSelect.value = 'Online';
        modeSelect.disabled = true;
        toggleAddress();
    } else {
        modeSelect.disabled = false;
    }

    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'block';
}

function limitDaysSelection() {
    const maxDays = parseInt(document.getElementById('classesPerWeek').value) || 0;
    const checkboxes = document.querySelectorAll('input[name="days"]');
    let selectedCount = 0;
    
    checkboxes.forEach(cb => cb.disabled = false);
    
    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            selectedCount = document.querySelectorAll('input[name="days"]:checked').length;
            checkboxes.forEach(c => c.disabled = selectedCount >= maxDays && !c.checked);
        });
    });
}

document.getElementById('classesPerWeek').addEventListener('input', () => {
    const checkboxes = document.querySelectorAll('input[name="days"]');
    checkboxes.forEach(cb => {
        cb.checked = false;
        cb.disabled = false;
    });
    limitDaysSelection();
});

document.getElementById('enquiryForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const age = parseInt(document.getElementById('age').value);

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (isNaN(age) || age < 18) {
        alert('You must be at least 18 years old to register.');
        return;
    }

    document.getElementById('enquiryForm').style.display = "none";
    document.getElementById('thankYouMessage').style.display = "block";
});
