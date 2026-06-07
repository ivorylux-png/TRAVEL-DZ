document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const loginCard = document.getElementById("login-card");
  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-password");
  
  const passwordToggleBtn = document.getElementById("password-toggle-btn");
  const toggleIcon = document.getElementById("toggle-icon");
  
  const loginToast = document.getElementById("login-toast");

  passwordToggleBtn.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleIcon.className = "fa-regular fa-eye-slash";
    } else {
      passwordInput.type = "password";
      toggleIcon.className = "fa-regular fa-eye";
    }
  });
  const fields = [emailInput, passwordInput];
  fields.forEach(field => {
    field.addEventListener("input", () => {
      field.parentElement.parentElement.classList.remove("invalid");
    });
  });
  function validate() {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      document.getElementById("group-email").classList.add("invalid");
      isValid = false;
    } else {
      document.getElementById("group-email").classList.remove("invalid");
    }

    if (!passwordInput.value || passwordInput.value.length < 6) {
      document.getElementById("group-password").classList.add("invalid");
      isValid = false;
    } else {
      document.getElementById("group-password").classList.remove("invalid");
    }
    return isValid;
  }
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) {
      loginCard.classList.remove("shake-anim");
      void loginCard.offsetWidth;
      loginCard.classList.add("shake-anim");
      setTimeout(() => {
        loginCard.classList.remove("shake-anim");
      }, 400);
      return;
    }
    loginToast.classList.add("show");
    setTimeout(() => {
      window.location.href = "HOME.html";
    }, 2000);
  });
});