document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const destParam = urlParams.get("id");
  const hotelParam = urlParams.get("hotel");
  const durationParam = urlParams.get("duration");
  const tierParam = urlParams.get("tier");
  const priceParam = urlParams.get("price");
  const receiptBanner = document.getElementById("receipt-banner");
  const receiptDest = document.getElementById("receipt-dest");
  const receiptHotel = document.getElementById("receipt-hotel");
  const receiptDays = document.getElementById("receipt-days");
  const receiptTier = document.getElementById("receipt-tier");
  const receiptPrice = document.getElementById("receipt-price");
  const bookingForm = document.getElementById("booking-form");
  const clientName = document.getElementById("client-name");
  const clientEmail = document.getElementById("client-email");
  const clientPhone = document.getElementById("client-phone");
  const travelClass = document.getElementById("travel-class");
  const travelDate = document.getElementById("travel-date");
  const guestCount = document.getElementById("guest-count");
  const termsAgree = document.getElementById("terms-agree");
  const errorName = document.getElementById("error-name");
  const errorEmail = document.getElementById("error-email");
  const errorPhone = document.getElementById("error-phone");
  const errorDate = document.getElementById("error-date");
  const errorGuests = document.getElementById("error-guests");
  const errorTerms = document.getElementById("error-terms");
  const successToast = document.getElementById("success-toast");
  let activeDestId = "algiers";
  let activeHotelName = "";
  let activeDuration = 5;
  let activeTier = "Premium";
  let activePrice = 0;
  const today = new Date().toISOString().split("T")[0];
  const usdToDzdRate = 10;
  travelDate.setAttribute("min", today);

  function initReceipt() {
    const dest = (destParam && DESTINATIONS[destParam]) ? DESTINATIONS[destParam] : DESTINATIONS["algiers"];
    activeDestId = dest.id;
    receiptDest.textContent = dest.name;
    if (receiptBanner) {
      receiptBanner.style.backgroundImage = `url('${dest.image}')`;
    }
    if (hotelParam) {
      const hotel = dest.hotels.find(h => h.id === hotelParam);
      activeHotelName = hotel ? hotel.name : dest.hotels[0].name;
    } else {
      activeHotelName = dest.hotels[0].name;
    }
    receiptHotel.textContent = activeHotelName;
    activeDuration = durationParam ? parseInt(durationParam) : 5;
    receiptDays.textContent = `${activeDuration} Days`;
    activeTier = tierParam || "Premium";
    receiptTier.textContent = `${activeTier} Tier`;

    if (priceParam) {
  
      activePrice = parseInt(priceParam);
    } else {
    
      const hotel = dest.hotels.find(h => h.id === hotelParam) || dest.hotels[0];
      const hotelSurcharge = hotel.priceModifier * activeDuration;
      let multiplier = 1.0;
      if (activeTier === "Premium") multiplier = 1.25;
      if (activeTier === "VIP")     multiplier = 1.6;
      activePrice = Math.round((dest.basePrice + hotelSurcharge) * multiplier);
    }
  
    receiptPrice.innerText = `${activePrice * usdToDzdRate} DA`;
  }
  function validateForm() {
    let isValid = true;
    if (!clientName.value.trim()) {
      clientName.parentElement.classList.add("invalid");
      isValid = false;
    } else {
      clientName.parentElement.classList.remove("invalid");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!clientEmail.value.trim() || !emailRegex.test(clientEmail.value.trim())) {
      clientEmail.parentElement.classList.add("invalid");
      isValid = false;
    } else {
      clientEmail.parentElement.classList.remove("invalid");
    }
    const phoneDigits = clientPhone.value.trim().replace(/\D/g, "");
    if (!clientPhone.value.trim() || phoneDigits.length < 8) {
      clientPhone.parentElement.classList.add("invalid");
      isValid = false;
    } else {
      clientPhone.parentElement.classList.remove("invalid");
    }
    if (!travelDate.value) {
      travelDate.parentElement.classList.add("invalid");
      isValid = false;
    } else {
      const selectedDate = new Date(travelDate.value);
      const currentDate = new Date(today);
      if (selectedDate < currentDate) {
        travelDate.parentElement.classList.add("invalid");
        errorDate.textContent = "Travel date cannot be in the past.";
        isValid = false;
      } else {
        travelDate.parentElement.classList.remove("invalid");
      }
    }
    const count = parseInt(guestCount.value);
    if (!guestCount.value || count < 1 || count > 12) {
      guestCount.parentElement.classList.add("invalid");
      isValid = false;
    } else {
      guestCount.parentElement.classList.remove("invalid");
    }
    if (!termsAgree.checked) {
      errorTerms.style.display = "block";
      isValid = false;
    } else {
      errorTerms.style.display = "none";
    }
    return isValid;
  }
  const inputs = [clientName, clientEmail, clientPhone, travelDate, guestCount];
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      input.parentElement.classList.remove("invalid");
    });
  });
  termsAgree.addEventListener("change", () => {
    if (termsAgree.checked) {
      errorTerms.style.display = "none";
    }
  });
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm()) {
      bookingForm.style.animation = 'none';
      bookingForm.offsetHeight;
      bookingForm.style.animation = 'shake 0.4s ease';
      return;
    }
    const booking = {
      bookingId: "BK-" + Math.floor(Math.random() * 900000 + 100000),
      clientName: clientName.value.trim(),
      clientEmail: clientEmail.value.trim(),
      clientPhone: clientPhone.value.trim(),
      travelClass: travelClass.value,
      travelDate: travelDate.value,
      guestCount: parseInt(guestCount.value),
      destinationId: activeDestId,
      destinationName: receiptDest.textContent,
      hotelName: receiptHotel.textContent,
      duration: receiptDays.textContent,
      tier: receiptTier.textContent,
      price: receiptPrice.textContent,
      timestamp: new Date().toISOString()
    };
    saveBooking(booking);
    successToast.classList.add("show");
    setTimeout(() => {
      window.location.href = "../content/confirmationbooking.html";
    }, 2000);
  });
  initReceipt();
});