document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const registerCard = document.getElementById("register-card");
  const firstName = document.getElementById("reg-firstname");
  const lastName = document.getElementById("reg-lastname");
  const emailInput = document.getElementById("reg-email");
  const passwordInput = document.getElementById("reg-password");
  const confirmInput = document.getElementById("reg-confirm");
  const termsCheckbox = document.getElementById("terms-agree-check");
  const submitBtn = document.getElementById("reg-submit-btn");
  const registerToast = document.getElementById("register-toast");
  termsCheckbox.addEventListener("change", () => {
    submitBtn.disabled = !termsCheckbox.checked;
  });
  const fields = [firstName, lastName, emailInput, passwordInput, confirmInput];
  fields.forEach(field => {
    field.addEventListener("input", () => {
      field.parentElement.classList.remove("invalid");
    });
  });
  function validate() {
    let isValid = true;
    if (!firstName.value.trim()) {
      firstName.parentElement.classList.add("invalid");
      isValid = false;
    } else {
      firstName.parentElement.classList.remove("invalid");
    }
    if (!lastName.value.trim()) {
      lastName.parentElement.classList.add("invalid");
      isValid = false;
    } else {
      lastName.parentElement.classList.remove("invalid");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      emailInput.parentElement.parentElement.classList.add("invalid");
      isValid = false;
    } else {
      emailInput.parentElement.parentElement.classList.remove("invalid");
    }
    if (!passwordInput.value || passwordInput.value.length < 6) {
      passwordInput.parentElement.parentElement.classList.add("invalid");
      isValid = false;
    } else {
      passwordInput.parentElement.parentElement.classList.remove("invalid");
    }

    if (!confirmInput.value || confirmInput.value !== passwordInput.value) {
      confirmInput.parentElement.parentElement.classList.add("invalid");
      isValid = false;
    } else {
      confirmInput.parentElement.parentElement.classList.remove("invalid");
    }
    return isValid;
  }
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (submitBtn.disabled) return;
    if (!validate()) {
      registerCard.classList.remove("shake-anim");
      void registerCard.offsetWidth; 
      registerCard.classList.add("shake-anim");
      setTimeout(() => {
        registerCard.classList.remove("shake-anim");
      }, 400);
      return;
    }
    registerToast.classList.add("show");
    setTimeout(() => {
      window.location.href = "../content/login.html";
    }, 2000);
  });
});