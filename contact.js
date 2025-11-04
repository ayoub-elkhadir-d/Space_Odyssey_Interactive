var input_fr_name = document.getElementById("First_name");
var input_ls_name = document.getElementById("last_name");
var input_email = document.getElementById("email");
var input_number = document.getElementById("number");
var buton_submit = document.getElementById("btn_submit");
var inputs_card = document.getElementById("right-panel");

var regex_mail = /^[A-Za-z0-9._-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,4}$/;
var regex_number = /^[0-9 +\-]{5,15}$/;

function setValidStyle(input, isValid) {
    if (isValid) {
        input.style.boxShadow = "1px 1px 10px 5px rgba(0, 255, 17, 1)";
        input.style.border = "1px solid rgba(0, 255, 17, 1)";
    } else {
        input.style.boxShadow = "1px 1px 10px 5px rgba(255, 0, 0, 1)";
        input.style.border = "1px solid rgba(255, 0, 0, 1)";
    }
}

function showError(elementId, message, show) {
    var errorElement = document.getElementById(elementId + "_error");
    if (!errorElement) {
        errorElement = document.createElement("span");
        errorElement.id = elementId + "_error";
        errorElement.style.color = "red";
        errorElement.style.fontSize = "12px";
        errorElement.style.marginTop = "5px";
        errorElement.style.display = "block";
        var parent = document.getElementById(elementId).parentNode;
        parent.appendChild(errorElement);
    }
    if (show) {
        errorElement.textContent = message;
        errorElement.style.display = "block";
    } else {
        errorElement.textContent = "";
        errorElement.style.display = "none";
    }
}

input_fr_name.addEventListener("keyup", function() {
    var value = input_fr_name.value.trim();
    var isValid = value.length >= 2;
    setValidStyle(input_fr_name, isValid);
    showError("First_name", "First name required and at least 2 characters", !isValid);
});

input_ls_name.addEventListener("keyup", function() {
    var value = input_ls_name.value.trim();
    var isValid = value.length >= 2;
    setValidStyle(input_ls_name, isValid);
    showError("last_name", "Last name required and at least 2 characters", !isValid);
});

input_email.addEventListener("keyup", function() {
    var value = input_email.value.trim();
    var isValid = regex_mail.test(value) && value.length > 0;
    setValidStyle(input_email, isValid);
    showError("email", "Invalid email address", !isValid);
});

input_number.addEventListener("keyup", function() {
    var value = input_number.value.trim();
    var isValid = regex_number.test(value);
    setValidStyle(input_number, isValid);
    showError("number", "Invalid phone number (5-15 digits with spaces or dashes)", !isValid);
});

buton_submit.addEventListener("click", function(e) {
    e.preventDefault();
    
    var validFirst = input_fr_name.value.trim().length >= 2;
    var validLast = input_ls_name.value.trim().length >= 2;
    var validEmail = regex_mail.test(input_email.value.trim());
    var validNumber = regex_number.test(input_number.value.trim());
    
    showError("First_name", "First name required and at least 2 characters", !validFirst);
    showError("last_name", "Last name required and at least 2 characters", !validLast);
    showError("email", "Invalid email address", !validEmail);
    showError("number", "Invalid phone number (5-15 digits with spaces or dashes)", !validNumber);
    
    if (validFirst && validLast && validEmail && validNumber) {
        showError("First_name", "", false);
        showError("last_name", "", false);
        showError("email", "", false);
        showError("number", "", false);
        
        var formData = {
            firstName: input_fr_name.value.trim(),
            lastName: input_ls_name.value.trim(),
            email: input_email.value.trim(),
            number: input_number.value.trim()
        };
        console.log("Form submitted successfully:", formData);
        
        alert("Form submitted successfully!");
        
        input_fr_name.value = "";
        input_ls_name.value = "";
        input_email.value = "";
        input_number.value = "";
        
        setValidStyle(input_fr_name, false);
        setValidStyle(input_ls_name, false);
        setValidStyle(input_email, false);
        setValidStyle(input_number, false);
    } else {
        console.log("Form invalid, please fix errors");
        alert("Please fix the errors in the form");
    }
});

input_fr_name.addEventListener("blur", function() {
    var value = input_fr_name.value.trim();
    if (value === "") {
        showError("First_name", "First name required", true);
    }
});
input_ls_name.addEventListener("blur", function() {
    var value = input_ls_name.value.trim();
    if (value === "") {
        showError("last_name", "Last name required", true);
    }
});
input_email.addEventListener("blur", function() {
    var value = input_email.value.trim();
    if (value === "") {
        showError("email", "Email required", true);
    }
});
input_number.addEventListener("blur", function() {
    var value = input_number.value.trim();
    if (value === "") {
        showError("number", "Phone number required", true);
    }
});