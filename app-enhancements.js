// app-enhancements.js
(function () {
  'use strict';
  // ── Scroll-to-top button ──────────────────────────────
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ── View toggle (grid / list) ─────────────────────────
  const viewGrid = document.getElementById('viewGrid');
  const viewList = document.getElementById('viewList');
  const menuGrid = document.getElementById('menuGrid');
  if (viewGrid && viewList && menuGrid) {
    viewGrid.addEventListener('click', () => {
      menuGrid.setAttribute('data-view', 'grid');
      viewGrid.classList.add('active');
      viewList.classList.remove('active');
      viewGrid.setAttribute('aria-pressed', 'true');
      viewList.setAttribute('aria-pressed', 'false');
    });
    viewList.addEventListener('click', () => {
      menuGrid.setAttribute('data-view', 'list');
      viewList.classList.add('active');
      viewGrid.classList.remove('active');
      viewList.setAttribute('aria-pressed', 'true');
      viewGrid.setAttribute('aria-pressed', 'false');
    });
  }

  // ── Dietary filter chips ──────────────────────────────
  const dietChips = document.getElementById('dietChips');
  if (dietChips) {
    let activeDiet = null;
    dietChips.addEventListener('click', (e) => {
      const chip = e.target.closest('.diet-chip');
      if (!chip) return;
      const diet = chip.dataset.diet;
      if (activeDiet === diet) {
        chip.setAttribute('aria-pressed', 'false');
        activeDiet = null;
      } else {
        dietChips.querySelectorAll('.diet-chip').forEach(c => c.setAttribute('aria-pressed', 'false'));
        chip.setAttribute('aria-pressed', 'true');
        activeDiet = diet;
      }
      filterByDiet(activeDiet);
    });
  }

  function filterByDiet(diet) {
    const cards = document.querySelectorAll('.menu-card');
    cards.forEach(card => {
      if (!diet) {
        card.style.display = '';
        return;
      }
      // Read dietary info from the data-diet attributes inside the card
      const dots = card.querySelectorAll('.diet-dot');
      const hasDiet = Array.from(dots).some(dot => dot.dataset.diet === diet);
      card.style.display = hasDiet ? '' : 'none';
    });
    // Update result count
    const visible = document.querySelectorAll('.menu-card[style*="display: none"], .menu-card[data-hidden="true"]').length;
    const total = document.querySelectorAll('.menu-card').length;
    const countEl = document.getElementById('resultCount');
    if (countEl) countEl.textContent = `${total - visible} items`;
  }

  // ── Spotlight section ──────────────────────────────────
  function buildSpotlight() {
    const grid = document.getElementById('spotlightGrid');
    if (!grid) return;
    const featured = window.MENU_ITEMS?.filter(i => i.badge) || [];
    const frag = document.createDocumentFragment();
    featured.slice(0, 3).forEach(item => {
      const card = document.createElement('div');
      card.className = 'spotlight-card';
      card.style.cursor = 'pointer';
      card.innerHTML = `
        <img src="${window.IMG_BASE || ''}${item.img}" alt="${item.en}" loading="lazy">
        <div class="spotlight-card-overlay">
          <span class="spotlight-badge">${item.badge}</span>
          <p class="spotlight-name">${item.en}</p>
          <span class="spotlight-price">${item.price} QAR</span>
        </div>
      `;
      card.addEventListener('click', () => {
        // Open item modal using existing function (if accessible)
        if (typeof window.openItemModal === 'function') {
          window.openItemModal(item.id, card);
        }
      });
      frag.appendChild(card);
    });
    grid.appendChild(frag);
  }

  // ── Smart nav (hide on scroll down, show on scroll up) ─
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    const currentScroll = window.scrollY;
    if (currentScroll <= 60) {
      header.classList.remove('nav-hidden');
    } else if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add('nav-hidden');
    } else if (currentScroll < lastScroll) {
      header.classList.remove('nav-hidden');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      buildSpotlight();
      // Expose global functions for item modal if needed
      window.openItemModal = window.openItemModal; // already defined? but from app.js scope
    });
  } else {
    buildSpotlight();
  }
})();