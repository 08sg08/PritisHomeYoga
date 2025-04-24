function toggleAddress() {
  const mode = document.getElementById("mode").value;
  const addressField = document.getElementById("addressField");
  addressField.style.display = mode === "Offline" ? "block" : "none";
}

function goToPage2() {
  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const mode = document.getElementById("mode").value;
  const people = document.getElementById("people").value.trim();
  const address = document.getElementById("address").value.trim();

  // Name check: at least 2 characters, no numbers
  if (!/^[A-Za-z\s]{2,}$/.test(name)) {
    alert("Please enter a valid name with at least 2 characters (no numbers).");
    return;
  }

  // Mobile number check: 10-digit or valid international starting with +
  if (!/^\+?\d{10,15}$/.test(mobile)) {
    alert("Please enter a valid mobile number.");
    return;
  }

  // Auto set mode if outside India
  if (mobile.startsWith("+") && !mobile.startsWith("+91")) {
    document.getElementById("mode").value = "Online";
    document.getElementById("mode").disabled = true;
    toggleAddress();
  } else {
    document.getElementById("mode").disabled = false;
  }

  if (!mobile || !mode || !people || (mode === "Offline" && address.length < 2)) {
    alert("Please fill in all required fields.");
    return;
  }

  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "block";
}

// Limit days selection based on number
function limitDaysSelection() {
  const maxDays = parseInt(document.getElementById("classesPerWeek").value) || 0;
  const checkboxes = document.querySelectorAll("input[name='days']");
  let selected = document.querySelectorAll("input[name='days']:checked").length;

  checkboxes.forEach(cb => {
    cb.disabled = selected >= maxDays && !cb.checked;
  });
}

// Reset day checkboxes on number change
document.getElementById("classesPerWeek").addEventListener("input", function () {
  let val = parseInt(this.value);
  if (val < 1 || val > 6) {
    alert("Please select a value between 1 and 6 for classes per week.");
    this.value = "";
  }
  const checkboxes = document.querySelectorAll("input[name='days']");
  checkboxes.forEach(cb => {
    cb.checked = false;
    cb.disabled = false;
  });
});

// Only allow numbers in classes/week
document.getElementById("classesPerWeek").addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
});

// Email validation to enable DOB
document.getElementById("email").addEventListener("input", function () {
  const dob = document.getElementById("dob");
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
  dob.disabled = !emailValid;
  if (!emailValid) {
    dob.value = "";
  }
});

// Check age only after selection (mobile fix)
document.getElementById("dob").addEventListener("change", function () {
  const dobValue = this.value;
  if (!dobValue) return;

  const dob = new Date(dobValue);
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

// Final submission
document.getElementById("enquiryForm").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("page2").style.display = "none";
  document.getElementById("thankYouMessage").style.display = "block";
});
