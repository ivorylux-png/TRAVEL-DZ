document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const submitBtn = document.getElementById("contact-submit-btn");
  const btnText = document.getElementById("btn-text");
  const btnLoading = document.getElementById("btn-loading");
  const successPanel = document.getElementById("form-success-panel");
  const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; 
  const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";   
  const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; 

  if (typeof emailjs !== "undefined" && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    btnText.style.display = "none";
    btnLoading.style.display = "inline-flex";
    successPanel.style.display = "none";

    const nameVal = document.getElementById("contact-name").value.trim();
    const emailVal = document.getElementById("contact-email").value.trim();
    const messageVal = document.getElementById("contact-message").value.trim();

    if (typeof emailjs !== "undefined" && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
        .then(() => {
          handleSuccess();
        }, (error) => {
          console.error("EmailJS failed to send:", error);
          alert("We encountered a connectivity issue sending your message. Please reach out directly via concierge@traveldz.com.");
          resetButton();
        });
    } else {
      console.log(`[EmailJS Simulation] Sending email:
        Name: ${nameVal}
        Email: ${emailVal}
        Message: ${messageVal}
      `);

      setTimeout(() => {
        handleSuccess();
      }, 1500); 
    }
  });

  function handleSuccess() {

    resetButton();
    contactForm.reset();
    
    successPanel.style.display = "block";
    successPanel.style.animation = "fadeInUp 0.5s ease forwards";
    setTimeout(() => {
      successPanel.style.animation = "fadeOut 0.5s ease forwards";
      setTimeout(() => {
        successPanel.style.display = "none";
      }, 500);
    }, 8000);
  }

  function resetButton() {
    submitBtn.disabled = false;
    btnText.style.display = "inline-flex";
    btnLoading.style.display = "none";
  }
});