document.addEventListener("DOMContentLoaded", () => {
  const articlesGrid = document.getElementById("articles-grid");
  const searchInput = document.getElementById("article-search-input");
  function renderArticles() {
    articlesGrid.innerHTML = "";
    if (ARTICLES.length === 0) {
      articlesGrid.innerHTML = `
        <div class="no-articles glass-panel" style="grid-column: 1/-1; padding: 40px; text-align: center; color: var(--text-secondary);">
          <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 15px;"></i>
          <h3>No chronicles found</h3>
          <p>Please check back later for new updates.</p>
        </div>
      `;
      return;
    }
    ARTICLES.forEach(article => {
      const card = document.createElement("div");
      card.className = "article-card glass-panel";
      card.setAttribute("data-title", article.title.toLowerCase());
      card.setAttribute("data-excerpt", article.excerpt.toLowerCase());
      card.innerHTML = `
        <div class="article-img-wrap">
          <img src="${article.images[0]}" alt="${article.title}>
        </div>
        <div class="article-body">
          <div class="article-meta">
            <span><i class="fa-regular fa-user"></i> ${article.author}</span>
            <span><i class="fa-regular fa-calendar"></i> ${article.date}</span>
          </div>
          <h3><a href="article.html?id=${article.id}">${article.title}</a></h3>
          <p class="article-excerpt">${article.excerpt}</p>
          <div class="article-action-row">
            <a href="article.html?id=${article.id}" class="btn-secondary" style="padding: 8px 16px; font-size: 0.75rem; border-color: var(--border-glass-bright);">Read Article <i class="fa-solid fa-arrow-right-long"></i></a>
          </div>
        </div>
      `;
      articlesGrid.appendChild(card);
    });
  }
  function filterArticles() {
    const query = searchInput.value.toLowerCase().trim();
    const cards = articlesGrid.getElementsByClassName("article-card");
    let matchCount = 0;
    Array.from(cards).forEach(card => {
      const title = card.getAttribute("data-title");
      const excerpt = card.getAttribute("data-excerpt");
      if (title.includes(query) || excerpt.includes(query)) {
        card.style.display = "flex";
        card.style.opacity = "1";
        matchCount++;
      } else {
        card.style.display = "none";
        card.style.opacity = "0";
      }
    });
    const existingMsg = document.getElementById("no-blog-results");
    if (existingMsg) {
      existingMsg.remove();
    }
    if (matchCount === 0) {
      const msg = document.createElement("div");
      msg.id = "no-blog-results";
      msg.className = "glass-panel animate-fade-in";
      msg.style.cssText = "grid-column: 1/-1; padding: 60px 40px; text-align: center; color: var(--text-secondary); width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 15px;";
      msg.innerHTML = `
        <i class="fa-solid fa-book-open" style="font-size: 3rem; color: var(--text-muted);"></i>
        <h3>No matching chronicles</h3>
        <p>No articles found for "${searchInput.value}". Please try another keyword.</p>
        <button class="btn-secondary" id="reset-blog-btn" style="margin-top: 10px;">View All Articles</button>
      `;
      articlesGrid.appendChild(msg);
      document.getElementById("reset-blog-btn").addEventListener("click", () => {
        searchInput.value = "";
        filterArticles();
      });
    }
  }
  searchInput.addEventListener("input", filterArticles);
  renderArticles();
});