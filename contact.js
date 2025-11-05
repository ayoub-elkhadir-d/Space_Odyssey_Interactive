const input_fr_name = document.getElementById("First_name");
const input_ls_name = document.getElementById("last_name");
const input_email   = document.getElementById("email");
const input_number  = document.getElementById("number");
const buton_submit  = document.getElementById("btn_submit");
const inputs_card  = document.getElementById("right-panel");

const regex_mail   = /^[A-Za-z0-9._-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,4}$/;
const regex_number = /^[0-9 +\-]{5,15}$/;
const regex_name   = /^[A-Za-z\s]+$/; // Only letters and spaces, no numbers

function setValidStyle(input, isValid) {
  input.style.boxShadow = isValid
    ? "1px 1px 5px 5px rgba(0, 255, 17, 1)"   
    : "1px 1px 5px 5px rgba(255, 0, 0, 1)";
}

function updateSubmitButton() {
  const validFirst  = input_fr_name.value.trim() !== "" && regex_name.test(input_fr_name.value.trim());
  const validLast   = input_ls_name.value.trim() !== "" && regex_name.test(input_ls_name.value.trim());
  const validEmail  = regex_mail.test(input_email.value);
  const validNumber = regex_number.test(input_number.value);

  if (validFirst && validLast && validEmail && validNumber) {
    buton_submit.style.display = "block"; // Show submit button
    buton_submit.disabled = false;
  } else {
    buton_submit.style.display = "none"; // Hide submit button
    buton_submit.disabled = true;
  }
}

input_fr_name.addEventListener("keyup", function() {
  const isValid = input_fr_name.value.trim() !== "" && regex_name.test(input_fr_name.value.trim());
  setValidStyle(input_fr_name, isValid);
  updateSubmitButton();
});

input_ls_name.addEventListener("keyup", function() {
  const isValid = input_ls_name.value.trim() !== "" && regex_name.test(input_ls_name.value.trim());
  setValidStyle(input_ls_name, isValid);
  updateSubmitButton();
});

input_email.addEventListener("keyup", function() {
  setValidStyle(input_email, regex_mail.test(input_email.value));
  updateSubmitButton();
});

input_number.addEventListener("keyup", function() {
  setValidStyle(input_number, regex_number.test(input_number.value));
  updateSubmitButton();
});

// Initially hide the submit button
updateSubmitButton();

//
buton_submit.addEventListener("click", function(e) {
  e.preventDefault(); 
  const validFirst  = input_fr_name.value.trim() !== "" && regex_name.test(input_fr_name.value.trim());
  const validLast   = input_ls_name.value.trim() !== "" && regex_name.test(input_ls_name.value.trim());
  const validEmail  = regex_mail.test(input_email.value);
  const validNumber = regex_number.test(input_number.value);

  if (validFirst && validLast && validEmail && validNumber) {
    // Collect form data
    const formData = {
      firstName: input_fr_name.value.trim(),
      lastName: input_ls_name.value.trim(),
      email: input_email.value.trim(),
      number: input_number.value.trim()
    };

    alert('Form submitted successfully!');
    
    // Reset form
    input_fr_name.value = '';
    input_ls_name.value = '';
    input_email.value = '';
    input_number.value = '';
    updateSubmitButton();
    
    // Reset styles
    setValidStyle(input_fr_name, false);
    setValidStyle(input_ls_name, false);
    setValidStyle(input_email, false);
    setValidStyle(input_number, false);
  } else {
    alert('Please fill all fields correctly.');
  }
});