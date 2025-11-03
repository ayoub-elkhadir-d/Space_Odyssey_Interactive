const input_fr_name = document.getElementById("First_name");
const input_ls_name = document.getElementById("last_name");
const input_email   = document.getElementById("email");
const input_number  = document.getElementById("number");
const buton_submit  = document.getElementById("btn_submit");
const inputs_card  = document.getElementById("right-panel");
const regex_mail   = /^[A-Za-z0-9._-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,4}$/;
const regex_number = /^[0-9 +\-]{5,15}$/;  
function setValidStyle(input, isValid) {
  input.style.boxShadow = isValid
    ? "1px 1px 10px 5px rgba(0, 255, 17, 1)"   
    : "1px 1px 10px 5px rgba(255, 0, 0, 1)";
}


input_fr_name.addEventListener("keyup", function() {
  setValidStyle(input_fr_name, input_fr_name.value.trim() != "");
});

input_ls_name.addEventListener("keyup", function() {
  setValidStyle(input_ls_name, input_ls_name.value.trim() != "");
});

input_email.addEventListener("keyup", function() {
  setValidStyle(input_email, regex_mail.test(input_email.value));
});

input_number.addEventListener("keyup", function() {
  setValidStyle(input_number, regex_number.test(input_number.value));
});

//
buton_submit.addEventListener("click", function(e) {
  e.preventDefault(); 
  const validFirst  = input_fr_name.value.trim() !== "";
  const validLast   = input_ls_name.value.trim() !== "";
  const validEmail  = regex_mail.test(input_email.value);
  const validNumber = regex_number.test(input_number.value);

  if (validFirst && validLast && validEmail && validNumber) {
   console.log("yes")
  } else {
   console.log("no")
  }
});