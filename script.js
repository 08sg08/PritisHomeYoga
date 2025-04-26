function toggleAddress() {
  const mode = document.getElementById("mode").value;
  const addressField = document.getElementById("addressField");
  if (mode === "Offline") {
    addressField.style.display = "block";
  } else {
    addressField.style.display = "none";
  }
}

// Limit days selection based on classes per week
function limitDaysSelection() {
  const maxDays = parseInt(document.getElementById("classesPerWeek").value) || 0;
  const checkboxes = document.querySelectorAll('input[name="days"]');

  checkboxes.forEach(cb => {
    cb.checked = false;
    cb.disabled = false;
  });

  let selected = 0;
  checkboxes.forEach(cb => {
    cb.addEventListener('change', function() {
      selected = document.querySelectorAll('input[name="days"]:checked').length;
      checkboxes.forEach(box => {
        if (selected >= maxDays && !box.checked) {
          box.disabled = true;
        } else {
          box.disabled = false;
        }
      });
    });
  });
}

// Restrict mode if international number
document.getElementById("mobile").addEventListener("input", function() {
  const mobile = this.value.trim();
  const modeSelect = document.getElementById("mode");

  if (mobile.startsWith("+") && !mobile.startsWith("+91")) {
    modeSelect.value = "Online";
    modeSelect.disabled = true;
    toggleAddress(); 
  } else {
    modeSelect.disabled = false;
    toggleAddress();
  }
});

// Allow only numbers and '+' in mobile field
document.getElementById("mobile").addEventListener("input", function() {
  this.value = this.value.replace(/[^0-9+]/g, "");
});

// Allow only 1-6 in classes per week field
document.getElementById("classesPerWeek").addEventListener("input", function() {
  this.value = this.value.replace(/[^1-6]/g, "");
  limitDaysSelection();
});

// Check DOB to be minimum 18 years
document.getElementById("dob").addEventListener("change", function() {
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

// Validate email pattern
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// NEXT Button (Page 1)
document.getElementById('nextButton').addEventListener('click', function() {
  const gender = document.getElementById('gender').value.trim();
  const name = document.getElementById('name').value.trim();
  const mobile = document.getElementById('mobile').value.trim();
  const mode = document.getElementById('mode').value;
  const address = document.getElementById('address').value.trim();
  const people = document.getElementById('people').value.trim();

  if (!gender || gender.length < 2) {
    alert('Please enter your gender (minimum 2 characters).');
    return;
  }
  if (!name || name.length < 2) {
    alert('Please enter your name (minimum 2 characters).');
    return;
  }
  if (!mobile || (mobile.length < 10 && !mobile.startsWith("+"))) {
    alert('Please enter a valid mobile number.');
    return;
  }
  if (!mode || (mode === "Offline" && !address)) {
    alert('Please select mode and address properly.');
    return;
  }
  if (!people) {
    alert('Please enter number of people.');
    return;
  }

  document.getElementById('page1').style.display = "none";
  document.getElementById('page2').style.display = "block";
});

// SUBMIT Button (Page 2)
document.getElementById('enquiryForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const dob = document.getElementById('dob').value;

  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  if (!dob) {
    alert('Please select your date of birth.');
    return;
  }

  document.getElementById('enquiryForm').style.display = "none";
  document.getElementById('message').style.display = "block";
});
