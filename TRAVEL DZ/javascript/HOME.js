document.addEventListener("DOMContentLoaded", () => {
  const plansGrid = document.getElementById("plans-grid");
  const searchInput = document.getElementById("search-input");
  const categorySelect = document.getElementById("category-select");
  const searchBtn = document.getElementById("search-btn");
  function renderDestinations() {
    plansGrid.innerHTML = "";
    const usdToDzdRate = 10;
    const destinationsArray = Object.values(DESTINATIONS);
    if (destinationsArray.length === 0) {
      plansGrid.innerHTML = `
        <div class="no-results glass-panel" style="grid-column: 1/-1; padding: 40px; text-align: center; color: var(--text-secondary);">
          <i class="fa-solid fa-plane-slash" style="font-size: 2.5rem; color: var(--accent-gold-start); margin-bottom: 15px;"></i>
          <h3>No luxury packages found</h3>
          <p style="margin-top: 5px;">Try refining your search terms or selecting another category.</p>
        </div>
      `;
      return;
    }
    destinationsArray.forEach(dest => {
      const card = document.createElement("div");
      card.className = "plan-card glass-panel";
      card.setAttribute("data-id", dest.id);
      card.setAttribute("data-category", dest.category);
      card.setAttribute("data-name", dest.name.toLowerCase());
      card.setAttribute("data-tagline", dest.tagline.toLowerCase());
      
      const daPrice = dest.basePrice * usdToDzdRate;
      
      card.innerHTML = `
        <div class="card-img-wrapper">
                  <img src="${dest.image}" alt="${dest.name}" onerror="this.src='hero.png'">
          <span class="card-badge">${dest.category}</span>
        </div>
        <div class="card-content">
          <span class="card-tagline">${dest.tagline}</span>
          <h3>${dest.name}</h3>
          <p class="card-desc">${dest.description.substring(0, 110)}...</p>
          <div class="card-footer">
            <div class="card-price">
              <span class="price-lbl">Bespoke pricing</span>
              <span class="price-val">${daPrice.toLocaleString()} <span>DA / base</span></span>
            </div>
            <a href="plan.html?id=${dest.id}" class="btn-primary" style="padding: 8px 16px; font-size: 0.75rem;">View Plan <i class="fa-solid fa-chevron-right"></i></a>
          </div>
        </div>
      `;
      plansGrid.appendChild(card);
    });
  }
  function filterDestinations() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categorySelect.value;
    const cards = plansGrid.getElementsByClassName("plan-card");
    let visibleCount = 0;
    if (cards.length === 0) return;
    Array.from(cards).forEach(card => {
      const name = card.getAttribute("data-name");
      const category = card.getAttribute("data-category");
      const tagline = card.getAttribute("data-tagline");
      const matchesSearch = name.includes(searchText) || tagline.includes(searchText) || category.toLowerCase().includes(searchText);
      const matchesCategory = selectedCategory === "All" || category === selectedCategory;
      if (matchesSearch && matchesCategory) {
        card.style.display = "flex";
        card.style.opacity = "1";
        visibleCount++;
      } else {
        card.style.display = "none";
        card.style.opacity = "0";
      }
    });
    const existingNoResults = document.getElementById("no-results-msg");
    if (existingNoResults) {
      existingNoResults.remove();
    }
    if (visibleCount === 0) {
      const msg = document.createElement("div");
      msg.id = "no-results-msg";
      msg.className = "glass-panel";
      msg.style.cssText = "grid-column: 1/-1; padding: 60px 40px; text-align: center; color: var(--text-secondary); width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 15px;";
      msg.innerHTML = `
        <i class="fa-solid fa-compass" style="font-size: 3rem; color: var(--text-muted); animation: pulse 2s infinite;"></i>
        <h3>No journeys match your filters</h3>
        <p>Try resetting the category dropdown or checking your spelling.</p>
        <button class="btn-secondary" id="reset-filters-btn" style="margin-top: 10px;">Reset Filters</button>
      `;
      plansGrid.appendChild(msg);

      document.getElementById("reset-filters-btn").addEventListener("click", () => {
        searchInput.value = "";
        categorySelect.value = "All";
        filterDestinations();
      });
    }
  }
  searchInput.addEventListener("input", filterDestinations);
  categorySelect.addEventListener("change", filterDestinations);
  searchBtn.addEventListener("click", filterDestinations);
  renderDestinations();
});