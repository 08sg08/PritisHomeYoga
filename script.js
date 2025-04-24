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
    const form1 = document.getElementById("page1");
    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const mode = document.getElementById("mode").value;
    const people = document.getElementById("people").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!name || !mobile || !mode || !people || (mode === "Offline" && !address)) {
        alert("Please fill in all required fields.");
        return;
    }
    form1.style.display = "none";
    document.getElementById("page2").style.display = "block";
}

function limitDaysSelection() {
    const maxDays = parseInt(document.getElementById("classesPerWeek").value) || 0;
    const checkboxes = document.querySelectorAll("input[type='checkbox'][name='days']");

    checkboxes.forEach(cb => cb.addEventListener('change', () => {
        const selected = document.querySelectorAll("input[type='checkbox'][name='days']:checked").length;
        checkboxes.forEach(c => {
            if (!c.checked) c.disabled = selected >= maxDays;
        });
    }));
}

document.getElementById("enquiryForm").addEventListener("submit", function(e) {
    e.preventDefault();
    document.getElementById("enquiryForm").style.display = "none";
    document.getElementById("thankYouMessage").style.display = "block";
});
