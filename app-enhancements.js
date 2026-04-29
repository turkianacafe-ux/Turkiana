/* ============================================================
   TURKIANA — app-enhancements.js
   Scroll-to-top, view toggle, dietary filter, spotlight,
   and smart nav hide-on-scroll.
============================================================ */
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
  let activeDiet = null;

  if (dietChips) {
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
    let visible = 0;
    cards.forEach(card => {
      // Respect main filter (category/search)
      if (card.dataset.hidden === 'true') {
        card.style.display = 'none';
        return;
      }
      if (!diet) {
        card.style.display = '';
        visible++;
      } else {
        const dots = card.querySelectorAll('.diet-dot');
        const hasDiet = Array.from(dots).some(dot => dot.dataset.diet === diet);
        card.style.display = hasDiet ? '' : 'none';
        if (hasDiet) visible++;
      }
    });

    // Update result count
    const t = (window.I18N || {})[window.state?.lang] || { resultSingular: 'item', resultPlural: 'items' };
    const countEl = document.getElementById('resultCount');
    if (countEl) countEl.textContent = `${visible} ${visible === 1 ? t.resultSingular : t.resultPlural}`;
  }

  // Expose a global function to reset the diet filter
  window.resetDietFilter = function() {
    activeDiet = null;
    const dietChips = document.getElementById('dietChips');
    if (dietChips) {
      dietChips.querySelectorAll('.diet-chip').forEach(c => c.setAttribute('aria-pressed', 'false'));
    }
    filterByDiet(null);
  };

  // ── Spotlight section (Chef's Recommendations) ────────
  function buildSpotlight() {
    const grid = document.getElementById('spotlightGrid');
    if (!grid || !window.MENU_ITEMS) return;

    const featured = window.MENU_ITEMS.filter(i => i.badge === 'bestseller' || i.badge === 'signature');
    const itemsToShow = featured.slice(0, 3);
    const frag = document.createDocumentFragment();

    itemsToShow.forEach(item => {
      const card = document.createElement('div');
      card.className = 'spotlight-card';
      card.style.cursor = 'pointer';

      const img = document.createElement('img');
      img.src = (window.IMG_BASE || '') + item.img;
      img.alt = item.en;
      img.loading = 'lazy';
      img.onload = () => img.classList.add('is-loaded');
      img.onerror = () => { img.style.opacity = '0.3'; };
      card.appendChild(img);

      const overlay = document.createElement('div');
      overlay.className = 'spotlight-card-overlay';
      overlay.innerHTML = `
        <span class="spotlight-badge">${item.badge}</span>
        <p class="spotlight-name">${item.en}</p>
        <span class="spotlight-price">${item.price} QAR</span>
      `;
      card.appendChild(overlay);

      card.addEventListener('click', () => {
        if (typeof window.openItemModal === 'function') {
          window.openItemModal(item.id, card);
        }
      });
      frag.appendChild(card);
    });

    grid.innerHTML = '';
    grid.appendChild(frag);
  }

  // ── Smart nav hide on scroll down ──────────────────────
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

  // ── Init ──────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildSpotlight);
  } else {
    buildSpotlight();
  }
})();
