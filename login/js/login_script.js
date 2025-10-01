function submit() {
  var emailElement = document.getElementById("email");
  var passwordElement = document.getElementById("password");
  var emailErrorElement = document.getElementById("emailError");
  var passwordErrorElement = document.getElementById("passwordError");

  if (emailElement.value == "prueba@poligran.edu.co") {
    emailErrorElement.classList.add("d-none");
    if (passwordElement.value == "clave123") {
      passwordErrorElement.classList.add("d-none");
      window.location.href = "./html/success.html";
    } else {
      passwordErrorElement.classList.remove("d-none");
    }
  } else {
    emailErrorElement.classList.remove("d-none");
  }
}
