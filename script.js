// ================================================
//  WILIAM -- Encyclopedie  |  script.js
// ================================================

// --- Sommaire automatique (TOC) ---
function buildTOC() {
  const container = document.getElementById("toc-list");
  if (!container) return;
  container.innerHTML = "";
  const article = document.getElementById("article-content");
  if (!article) return;
  const headings = article.querySelectorAll("h3, h4");
  headings.forEach(function(h, i) {
    if (!h.id) h.id = "sec-" + i;
    var a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.textContent;
    var div = document.createElement("div");
    div.className = h.tagName === "H4" ? "toc-sub" : "toc-item";
    div.appendChild(a);
    container.appendChild(div);
  });
}

// --- Recherche dans l'article ---
function highlightMatches(query) {
  const article = document.getElementById("article-content");
  if (!article) return;
  const text = query.trim().toLowerCase();
  article.querySelectorAll("p, li, h3, h4").forEach(function(el) {
    el.classList.remove("highlight");
    if (text && el.textContent.toLowerCase().includes(text)) {
      el.classList.add("highlight");
    }
  });
}

// --- Initialisation ---
document.addEventListener("DOMContentLoaded", function() {
  buildTOC();

  // Barre de recherche
  var searchBox = document.getElementById("searchBox");
  var searchBtn = document.getElementById("searchBtn");
  if (searchBtn && searchBox) {
    searchBtn.addEventListener("click", function() { highlightMatches(searchBox.value); });
    searchBox.addEventListener("keyup", function(e) {
      if (e.key === "Enter") highlightMatches(searchBox.value);
      if (searchBox.value === "") highlightMatches("");
    });
  }

  // Tiroir sommaire (mobile)
  var sidebar   = document.getElementById("toc-sidebar");
  var toggleBtn = document.getElementById("btn-toc-toggle");
  var backdrop  = document.getElementById("toc-backdrop");
  var closeBtn  = document.getElementById("btn-toc-close");

  function openTOC() {
    if (!sidebar) return;
    sidebar.classList.add("is-open");
    if (backdrop) backdrop.classList.add("is-active");
    document.body.style.overflow = "hidden";
  }

  function closeTOC() {
    if (!sidebar) return;
    sidebar.classList.remove("is-open");
    if (backdrop) backdrop.classList.remove("is-active");
    document.body.style.overflow = "";
  }

  if (toggleBtn) toggleBtn.addEventListener("click", openTOC);
  if (backdrop)  backdrop.addEventListener("click", closeTOC);
  if (closeBtn)  closeBtn.addEventListener("click", closeTOC);

  if (sidebar) {
    sidebar.addEventListener("click", function(e) {
      if (e.target.tagName === "A" && window.innerWidth <= 768) {
        setTimeout(closeTOC, 80);
      }
    });
  }
});
