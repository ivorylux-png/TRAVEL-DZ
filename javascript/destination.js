document.addEventListener("DOMContentLoaded", () => {
  const bgSlides = document.getElementById("bg-slides");
  const carouselWrapper = document.getElementById("carousel-wrapper");
  const packageCard = document.getElementById("special-package-card");
  const packageTitle = document.getElementById("package-title");
  const packageTagline = document.getElementById("package-tagline");
  const packageDesc = document.getElementById("package-desc");
  const packagePrice = document.getElementById("package-price");
  const bookPackageBtn = document.getElementById("book-package-btn");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const itineraryModal = document.getElementById("itinerary-modal");
  const viewItineraryBtn = document.getElementById("view-itinerary-btn");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalSubtitle = document.getElementById("modal-subtitle");
  const modalTitle = document.getElementById("modal-title");
  const timelineContainer = document.getElementById("timeline-container");
  const modalBookBtn = document.getElementById("modal-book-btn");
  const destinations = Object.values(DESTINATIONS);
  let currentIndex = 0;
  let autoSlideTimer = null;
  const usdToDzdRate = 10;
  function init() {
    bgSlides.innerHTML = "";
    carouselWrapper.innerHTML = "";

    destinations.forEach((dest, idx) => {
   
      const slide = document.createElement("div");
      slide.className = `slide ${idx === 0 ? "active" : ""}`;
      slide.style.backgroundImage = `url('${dest.image}')`;
      slide.setAttribute("data-id", dest.id);
      bgSlides.appendChild(slide);

      const card = document.createElement("div");
      card.className = `carousel-card ${idx === 0 ? "active" : ""}`;
      card.setAttribute("data-id", dest.id);
      card.setAttribute("data-index", idx);
      card.innerHTML = `
        <div class="carousel-card-bg" style="background-image: url('${dest.image}');"></div>
        <div class="carousel-card-overlay"></div>
        <div class="carousel-card-content">
          <span>${dest.category}</span>
          <h3>${dest.name}</h3>
        </div>
      `;
      carouselWrapper.appendChild(card);
    });
    updateActiveDestination(0);
    startAutoSlide();
    const cards = document.querySelectorAll(".carousel-card");
    cards.forEach(card => {
      card.addEventListener("click", () => {
        const index = parseInt(card.getAttribute("data-index"));
        changeDestination(index);
      });
    });
  }
  function changeDestination(index) {
    if (index === currentIndex) return;
    stopAutoSlide();
    updateActiveDestination(index);
    startAutoSlide();
  }

  function updateActiveDestination(index) {
    currentIndex = index;
    const currentDest = destinations[currentIndex];

    document.querySelectorAll(".slide").forEach((slide, idx) => {
      slide.classList.toggle("active", idx === currentIndex);
    });
    document.querySelectorAll(".carousel-card").forEach((card, idx) => {
      card.classList.toggle("active", idx === currentIndex);
      if (idx === currentIndex) {
        const cardWidth = card.offsetWidth;
        const wrapperWidth = carouselWrapper.offsetWidth;
        carouselWrapper.scrollTo({
          left: card.offsetLeft - (wrapperWidth / 2) + (cardWidth / 2),
          behavior: "smooth"
        });
      }
    });
    packageCard.style.animation = "none";
    packageCard.offsetHeight; 
    packageCard.style.animation = "fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards";
    packageTitle.textContent = currentDest.name;
    packageTagline.textContent = currentDest.tagline;
    packageDesc.textContent = currentDest.description;
    const daPrice = currentDest.basePrice * usdToDzdRate;
    packagePrice.innerHTML = `${daPrice.toLocaleString()} <span>DA</span>`;
    bookPackageBtn.href = `plan.html?id=${currentDest.id}`;
  }
  function nextSlide() {
    let index = currentIndex + 1;
    if (index >= destinations.length) index = 0;
    updateActiveDestination(index);
  }
  function prevSlide() {
    let index = currentIndex - 1;
    if (index < 0) index = destinations.length - 1;
    updateActiveDestination(index);
  }

  function startAutoSlide() {
    autoSlideTimer = setInterval(nextSlide, 6000);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
  }
  prevBtn.addEventListener("click", () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  });
  nextBtn.addEventListener("click", () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });
  carouselWrapper.addEventListener("wheel", (e) => {
    e.preventDefault();
    carouselWrapper.scrollLeft += e.deltaY;
  });
  function openItineraryModal() {
    const currentDest = destinations[currentIndex];

    modalTitle.textContent = `${currentDest.name} Exploration`;
    modalSubtitle.textContent = `${currentDest.itinerary.length}-Day Premium Itinerary`;
    modalBookBtn.href = `plan.html?id=${currentDest.id}`;

    timelineContainer.innerHTML = "";
    currentDest.itinerary.forEach((dayText) => {
      const parts = dayText.split(":");
      const dayHeader = parts[0] || "Day";
      const dayDesc = parts.slice(1).join(":") || "";

      const item = document.createElement("div");
      item.className = "timeline-item";
      item.innerHTML = `
        <div class="timeline-badge"></div>
        <div class="timeline-content">
          <h4 style="color:var(--accent-gold-start);margin-bottom:5px;text-transform:uppercase;font-size:0.85rem;font-weight:600;">${dayHeader}</h4>
          <p>${dayDesc.trim()}</p>
        </div>
      `;
      timelineContainer.appendChild(item);
    });

    itineraryModal.classList.add("show");
    stopAutoSlide();
  }
  function closeItineraryModal() {
    itineraryModal.classList.remove("show");
    startAutoSlide();
  }
  viewItineraryBtn.addEventListener("click", openItineraryModal);
  modalCloseBtn.addEventListener("click", closeItineraryModal);

  itineraryModal.addEventListener("click", (e) => {
    if (e.target === itineraryModal) closeItineraryModal();
  });
  init();
});