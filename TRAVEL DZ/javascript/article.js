document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  let articleId = urlParams.get("id");
  const articleExists = ARTICLES.some(art => art.id === articleId);
  if (!articleId || !articleExists) {
    articleId = ARTICLES[0].id;
  }
  const currentArticle = ARTICLES.find(art => art.id === articleId);
  const artTitle = document.getElementById("art-title");
  const artAuthor = document.getElementById("art-author");
  const artDate = document.getElementById("art-date");
  const artText = document.getElementById("art-text");
  const slideshowContainer = document.getElementById("slideshow-container");
  const slideshowDots = document.getElementById("slideshow-dots");
  const likeBtn = document.getElementById("like-btn");
  const likeIcon = document.getElementById("like-icon");
  const likeText = document.getElementById("like-text");
  const avgStarsDisplay = document.getElementById("avg-stars-display");
  const commentCount = document.getElementById("comment-count");
  const commentsFeed = document.getElementById("comments-feed");
  const commentForm = document.getElementById("comment-form");
  const reviewName = document.getElementById("review-name");
  const reviewText = document.getElementById("review-text");
  const ratingSelector = document.getElementById("rating-selector");
  let slideIndex = 0;
  let slideshowInterval = null;
  let chosenRating = 5;
  function init() {
    artTitle.textContent = currentArticle.title;
    artAuthor.textContent = `By ${currentArticle.author}`;
    artDate.textContent = currentArticle.date;
    artText.innerHTML = "";
    const paragraphs = currentArticle.content.split("\n\n");
    paragraphs.forEach(pText => {
      if (pText.trim()) {
        const p = document.createElement("p");
        p.textContent = pText.trim();
        artText.appendChild(p);
      }
    });
    setupSlideshow();
    updateLikeState();
    renderComments();
    setupStarSelector();
    likeBtn.addEventListener("click", () => {
      toggleLike(articleId);
      updateLikeState();
    });
    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newComment = {
        name: reviewName.value.trim(),
        rating: chosenRating,
        text: reviewText.value.trim(),
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      };
      saveComment(articleId, newComment);
      reviewName.value = "";
      reviewText.value = "";
      resetRatingSelector();
      renderComments();
    });
  }
  function setupSlideshow() {
    slideshowContainer.innerHTML = "";
    slideshowDots.innerHTML = "";
    currentArticle.images.forEach((imgSrc, idx) => {
      const slide = document.createElement("div");
      slide.className = `slideshow-slide ${idx === 0 ? "active" : ""}`;
      slide.style.backgroundImage = `url('${imgSrc}')`;
      slideshowContainer.appendChild(slide);
      const dot = document.createElement("span");
      dot.className = `dot ${idx === 0 ? "active" : ""}`;
      dot.setAttribute("data-index", idx);
      dot.addEventListener("click", () => {
        jumpToSlide(idx);
      });
      slideshowDots.appendChild(dot);
    });
    startSlideshow();
  }
  function startSlideshow() {
    slideshowInterval = setInterval(() => {
      let nextIndex = slideIndex + 1;
      if (nextIndex >= currentArticle.images.length) {
        nextIndex = 0;
      }
      jumpToSlide(nextIndex);
    }, 5000);
  }
  function stopSlideshow() {
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
    }
  }
  function jumpToSlide(index) {
    stopSlideshow();
    slideIndex = index;
    const slides = document.querySelectorAll(".slideshow-slide");
    const dots = document.querySelectorAll(".dot");
    slides.forEach((slide, idx) => {
      if (idx === slideIndex) slide.classList.add("active");
      else slide.classList.remove("active");
    });
    dots.forEach((dot, idx) => {
      if (idx === slideIndex) dot.classList.add("active");
      else dot.classList.remove("active");
    });
    startSlideshow();
  }
  function updateLikeState() {
    const isLiked = getLikeState(articleId);
    if (isLiked) {
      likeBtn.classList.add("liked");
      likeIcon.className = "fa-solid fa-heart";
      likeText.textContent = "You liked this article";
    } else {
      likeBtn.classList.remove("liked");
      likeIcon.className = "fa-regular fa-heart";
      likeText.textContent = "Like This Article";
    }
  }
  function setupStarSelector() {
    const stars = ratingSelector.querySelectorAll(".star-option");
    stars.forEach(star => {
      star.addEventListener("click", () => {
        const rating = parseInt(star.getAttribute("data-rating"));
        chosenRating = rating;
        stars.forEach(s => {
          const sRating = parseInt(s.getAttribute("data-rating"));
          if (sRating <= rating) {
            s.classList.add("active");
          } else {
            s.classList.remove("active");
          }
        });
      });
    });
  }
  function resetRatingSelector() {
    chosenRating = 5;
    const stars = ratingSelector.querySelectorAll(".star-option");
    stars.forEach(s => s.classList.add("active"));
  }
  function renderComments() {
    commentsFeed.innerHTML = "";
    const list = getComments(articleId);
    commentCount.textContent = list.length;
    if (list.length === 0) {
      commentsFeed.innerHTML = `<p style="color: var(--text-muted); font-size: 0.95rem; text-align: center; padding: 20px 0;">No reviews posted yet. Be the first to share your thoughts!</p>`;
      avgStarsDisplay.innerHTML = '<i class="fa-regular fa-star"></i>'.repeat(5);
      return;
    }
    let totalScore = 0;
    list.forEach(comment => {
      totalScore += comment.rating;
      const card = document.createElement("div");
      card.className = "comment-card glass-panel";
      const initials = comment.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() || "A";
      const starsHtml = '<i class="fa-solid fa-star"></i>'.repeat(comment.rating) + '<i class="fa-regular fa-star"></i>'.repeat(5 - comment.rating);
      card.innerHTML = `
        <div class="comment-avatar">${initials}</div>
        <div class="comment-content">
          <div class="comment-header">
            <div>
              <span class="comment-author-name">${comment.name}</span>
              <div class="gold-stars" style="margin-top: 3px; font-size: 0.75rem;">${starsHtml}</div>
            </div>
            <span class="comment-date">${comment.date}</span>
          </div>
          <p class="comment-text">${comment.text}</p>
        </div>
      `;
      commentsFeed.appendChild(card);
    });
    const avgScore = Math.round(totalScore / list.length);
    const avgStarsHtml = '<i class="fa-solid fa-star"></i>'.repeat(avgScore) + '<i class="fa-regular fa-star"></i>'.repeat(5 - avgScore);
    avgStarsDisplay.innerHTML = avgStarsHtml;
  }
  init();
});