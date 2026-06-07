document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  let destId = urlParams.get("id");
  if (!destId || !DESTINATIONS[destId]) {
    destId = "algiers";
  }
  const currentDest = DESTINATIONS[destId];
  const usdToDzdRate = 10;
  const destBanner    = document.getElementById("dest-banner");
  const destCategory  = document.getElementById("dest-category");
  const destTagline   = document.getElementById("dest-tagline");
  const destName      = document.getElementById("dest-name");
  const destDesc      = document.getElementById("dest-desc");
  const hotelsGrid        = document.getElementById("hotels-grid");
  const durationSelect    = document.getElementById("duration-select");
  const serviceSelect     = document.getElementById("service-select");
  const breakdownBase     = document.getElementById("breakdown-base");
  const breakdownHotel    = document.getElementById("breakdown-hotel");
  const breakdownDuration = document.getElementById("breakdown-duration");
  const breakdownTier     = document.getElementById("breakdown-tier");
  const totalPriceVal     = document.getElementById("total-price-val");
  const perksList         = document.getElementById("perks-list");
  const confirmBookingBtn = document.getElementById("confirm-booking-btn");
  const planTimelineContainer = document.getElementById("plan-timeline-container");
  let selectedHotel   = null;
  let selectedDuration = parseInt(durationSelect.value);
  let selectedTier     = serviceSelect.value;
  let computedTotalPrice = 0;
  function init() {

    destBanner.style.backgroundImage =
      `linear-gradient(to bottom, rgba(2,6,23,0.2), rgba(2,6,23,0.8)), url('${currentDest.image}')`;
    destCategory.textContent = currentDest.category;
    destTagline.textContent  = currentDest.tagline;
    destName.textContent     = `${currentDest.name} Customized Package`;
    destDesc.textContent     = currentDest.description;

    renderHotels();
    updatePerks();
    updateTimeline();
    calculatePrice();

    durationSelect.addEventListener("change", () => {
      selectedDuration = parseInt(durationSelect.value);
      updateTimeline();
      calculatePrice();
    });

    serviceSelect.addEventListener("change", () => {
      selectedTier = serviceSelect.value;
      updatePerks();
      calculatePrice();
    });

    confirmBookingBtn.addEventListener("click", () => {
      const hotelId = selectedHotel ? selectedHotel.id : currentDest.hotels[0].id;
      window.location.href =
        `booking.html?id=${currentDest.id}&hotel=${hotelId}&duration=${selectedDuration}&tier=${selectedTier}&price=${computedTotalPrice}`;
    });
  }

  function renderHotels() {
    hotelsGrid.innerHTML = "";

    currentDest.hotels.forEach((hotel, idx) => {
      const card = document.createElement("div");
      card.className = `hotel-card glass-panel ${idx === 0 ? "active" : ""}`;
      card.setAttribute("data-id", hotel.id);
      card.setAttribute("data-modifier", hotel.priceModifier);

      if (idx === 0) selectedHotel = hotel;

      const starsHtml  = '<i class="fa-solid fa-star"></i>'.repeat(hotel.stars);
      const hotelImg   = hotel.image || currentDest.image || "hero.png";
      const priceText  = hotel.priceModifier === 0
        ? "Included in package"
        : `+ ${(hotel.priceModifier * usdToDzdRate).toLocaleString()} DA / night`;

      card.innerHTML = `
        <div class="hotel-img-wrapper">
          <img src="${hotelImg}" alt="${hotel.name}" onerror="this.src='${currentDest.image}'">
        </div>
        <div class="hotel-stars">${starsHtml}</div>
        <h4>${hotel.name}</h4>
        <p>Featuring exquisite interior designs, private balconies, and premier concierge service.</p>
        <span class="hotel-badge-price">${priceText}</span>
      `;

      card.addEventListener("click", () => {
        document.querySelectorAll(".hotel-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        selectedHotel = hotel;
        calculatePrice();
      });

      hotelsGrid.appendChild(card);
    });
  }
  function calculatePrice() {
    const baseVal       = currentDest.basePrice;
    const hotelSurcharge = selectedHotel ? selectedHotel.priceModifier * selectedDuration : 0;

    let multiplier = 1.0;
    if (selectedTier === "Premium") multiplier = 1.25;
    if (selectedTier === "VIP")     multiplier = 1.6;

    computedTotalPrice = Math.round((baseVal + hotelSurcharge) * multiplier);

    breakdownBase.textContent     = `${(baseVal * usdToDzdRate)} DA`;
    breakdownHotel.textContent    = hotelSurcharge === 0 ? "Included" : `+${(hotelSurcharge * usdToDzdRate)} DA`;
    breakdownDuration.textContent = `${selectedDuration} Days`;
    breakdownTier.textContent     = selectedTier;
    totalPriceVal.textContent     = (computedTotalPrice * usdToDzdRate);
  }
  function updatePerks() {
    perksList.innerHTML = "";

    const tierPerks = {
      Standard: [
        "5-Star standard room accommodation",
        "Private airport transfers (luxury sedan)",
        "Daily gourmet hotel buffet breakfast",
        "Expert bilingual private tour guide (4 hrs/day)",
        "Standard museum & monument entry cards"
      ],
      Premium: [
        "Upgrade to Executive Suite or Deluxe Villa",
        "Private VIP Chauffeur (Mercedes E-Class) 10h/day",
        "Daily half-board luxury dining",
        "Dedicated private tour guide (full day)",
        "Premium ticket fast-pass access to all sites",
        "24/7 VIP Concierge helpline support"
      ],
      VIP: [
        "Presidential Suite / Elite private Saharan glamping camp",
        "Private helicopter transfers or domestic flights",
        "Personal travel host & private security escort",
        "All-inclusive 5-star custom chef menu & open bar",
        "Full-day luxury yacht cruise excursion",
        "Airport VIP salon & fast-track passport access"
      ]
    };

    (tierPerks[selectedTier] || tierPerks.Standard).forEach(perk => {
      const li = document.createElement("li");
      li.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${perk}</span>`;
      perksList.appendChild(li);
    });
  }
  function updateTimeline() {
    planTimelineContainer.innerHTML = "";

    currentDest.itinerary.slice(0, selectedDuration).forEach(dayText => {
      const parts    = dayText.split(":");
      const dayLabel = parts[0] || "Day";
      const dayInfo  = parts.slice(1).join(":") || "";

      const item = document.createElement("div");
      item.className = "timeline-item";
      item.innerHTML = `
        <div class="timeline-badge"></div>
        <div class="timeline-content">
          <h4>${dayLabel}</h4>
          <p>${dayInfo.trim()}</p>
        </div>
      `;
      planTimelineContainer.appendChild(item);
    });
  }

  init();
});