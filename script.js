/**
 * Mehta Trading Agency – Premium Website Script  (v2 – STATIC PRODUCTS)
 * script.js | Industrial Hardware Supplier, Mumbai
 *
 * ARCHITECTURE:
 *  ✅ Products  → loaded from STATIC_PRODUCTS array (hardcoded below, zero network calls)
 *  ✅ Enquiries → saved to Google Sheets via Apps Script POST (leads only, never displayed)
 *
 * Features:
 *  – Preloader
 *  – Sticky navbar + active link highlighting
 *  – Hero auto-slider with dot controls
 *  – Hamburger menu
 *  – Scroll reveal + counter animations
 *  – Static product rendering, search, category filter
 *  – Enquiry form validation + EmailJS + Google Sheets lead capture
 *  – Floating WhatsApp button
 *  – Back-to-top button
 *  – Footer year, smooth scrolling
 */

'use strict';

/* ============================================================
   STATIC PRODUCT CATALOG
   ── Edit this array to change what appears on the website.
   ── Google Sheets has NO involvement in product display.
   ============================================================ */
const STATIC_PRODUCTS = [

  /* ── FASTENERS ──────────────────────────────────────────── */
  {
    name:         'SS Nut Bolts',
    category:     'Fasteners',
    price:        '',
    description:  'High-grade stainless steel nut bolts available in SS 304 & SS 316. Corrosion-resistant, ideal for marine, food-grade, and industrial environments.',
    image:        'image26.png',
    availability: 'In Stock'
  },
  {
    name:         'SS Machine Screws',
    category:     'Fasteners',
    price:        '',
    description:  'Stainless steel machine screws for precision assemblies. Available in pan head, countersunk, and hex head variants across all metric sizes.',
    image:        'image16.png',
    availability: 'In Stock'
  },
  {
    name:         'SS Washers',
    category:     'Fasteners',
    price:        '',
    description:  'Plain, spring and lock washers in stainless steel grades. Essential components for secure, vibration-resistant fastener assemblies.',
    image:        'image14.png',
    availability: 'In Stock'
  },
  {
    name:         'MS Machine Screws',
    category:     'Fasteners',
    price:        '',
    description:  'Mild steel machine screws for general engineering applications. Cost-effective, reliable, and available in bulk quantities for large projects.',
    image:        'image10.png',
    availability: 'In Stock'
  },
  {
    name:         'MS Nut Bolts',
    category:     'Fasteners',
    price:        '',
    description:  'Mild steel nut bolts for structural and general applications. Zinc-plated options available for added corrosion protection.',
    image:        'image12.png',
    availability: 'In Stock'
  },
  {
    name:         'SS Allen Cap Screws',
    category:     'Fasteners',
    price:        '',
    description:  'Stainless steel socket head cap screws for machinery and equipment. High torque, clean finish, available M3 to M24.',
    image:        'image15.png',
    availability: 'In Stock'
  },
  {
    name:         'SS Allen Grub Screws',
    category:     'Fasteners',
    price:        '',
    description:  'Stainless steel set screws (grub screws) for securing rotating parts. Cup point, flat point, and cone point variants available.',
    image:        'image27.png',
    availability: 'In Stock'
  },
  {
    name:         'High Tensile Allen Cap Screws',
    category:     'Fasteners',
    price:        '',
    description:  'Grade 8.8 and 12.9 high tensile socket head screws for heavy machinery, automotive, and structural applications.',
    image:        'image30.png',
    availability: 'In Stock'
  },
  {
    name:         'High Tensile Grub Screws',
    category:     'Fasteners',
    price:        '',
    description:  'High tensile grade grub screws for industrial drives, pulleys, and mechanical couplings. Superior holding power and vibration resistance.',
    image:        'image32.png',
    availability: 'In Stock'
  },
  {
    name:         'Sheet Metal Screws',
    category:     'Fasteners',
    price:        '',
    description:  'Self-tapping sheet metal screws for thin metal sheets, enclosures, and HVAC applications. Pan head and CSK variants available.',
    image:        'image34.png',
    availability: 'In Stock'
  },
  {
    name:         'Wood Screws',
    category:     'Fasteners',
    price:        '',
    description:  'Wood and chipboard screws with yellow zinc finish. Suitable for furniture, carpentry, and interior fit-out projects.',
    image:        'image33.png',
    availability: 'In Stock'
  },

  /* ── ANCHORS ─────────────────────────────────────────────── */
  {
    name:         'Wedge Anchors',
    category:     'Anchors',
    price:        '',
    description:  'Heavy-duty wedge anchors for structural concrete fixing. Ideal for machinery bases, handrails, brackets. Available in SS and carbon steel.',
    image:        'image1.png',
    availability: 'In Stock'
  },
  {
    name:         'Pin Type Anchors',
    category:     'Anchors',
    price:        '',
    description:  'Hammer-set pin anchors for quick installation in concrete and masonry. Used widely in MEP works, light fixture mounting, and cable support.',
    image:        'image18.png',
    availability: 'In Stock'
  },
  {
    name:         'Drop-In Anchors',
    category:     'Anchors',
    price:        '',
    description:  'Internal thread drop-in anchors for flush concrete applications. Perfect for overhead installations and suspended systems.',
    image:        'image24.png',
    availability: 'In Stock'
  },
  {
    name:         'Rawl Bolts (Expansion Anchors)',
    category:     'Anchors',
    price:        '',
    description:  'Sleeve-type expansion bolts for concrete and brick applications. Reliable holding capacity for shelving and wall-mounted fixtures.',
    image:        'image22.png',
    availability: 'In Stock'
  },
  {
    name:         'Eye Hook Anchors',
    category:     'Anchors',
    price:        '',
    description:  'Screw-in eye hook anchors for suspended loads, cable support, and hanging applications in concrete ceilings and walls.',
    image:        'image17.png',
    availability: 'In Stock'
  },
  {
    name:         'Sleeve Anchors',
    category:     'Anchors',
    price:        '',
    description:  'Sleeve anchors with nut and bolt for medium-to-heavy loads in concrete, natural stone, and solid masonry. Removable & reusable.',
    image:        'image6.png',
    availability: 'In Stock'
  },

  /* ── TOOLS ───────────────────────────────────────────────── */
  {
    name:         'Cutting Tools',
    category:     'Tools',
    price:        '',
    description:  'End mills, reamers, and milling cutters for precision machining. Available in HSS and carbide grades for various cutting applications.',
    image:        'image20.png',
    availability: 'In Stock'
  },
  {
    name:         'HSS Drills & Taps',
    category:     'Tools',
    price:        '',
    description:  'High-speed steel twist drills and machine taps for accurate hole-making and thread-cutting. Metric and BSW thread taps in all sizes.',
    image:        'image3.png',
    availability: 'In Stock'
  },

  /* ── ELECTRICAL ──────────────────────────────────────────── */
  {
    name:         'Braco Cable Lugs',
    category:     'Electrical',
    price:        '',
    description:  'Copper and aluminium cable lugs (Braco brand) for electrical terminations. Tinned copper lugs available in all cable sizes for superior conductivity.',
    image:        'image5.png',
    availability: 'In Stock'
  },
  {
    name:         'Jainson Lugs & DC Glands',
    category:     'Electrical',
    price:        '',
    description:  'Jainson brand cable lugs, double compression (DC) cable glands, and professional crimping tools for secure electrical terminations.',
    image:        'image8.png',
    availability: 'In Stock'
  },
  {
    name:         'Nylon Cable Ties',
    category:     'Electrical',
    price:        '',
    description:  'Self-locking nylon cable ties in white and black, UV-resistant grades. All lengths and widths for cable management and bundling.',
    image:        'image28.png',
    availability: 'In Stock'
  },
  {
    name:         'Wires & Cables',
    category:     'Electrical',
    price:        '',
    description:  'FR and FRLS grade electrical wires for residential, commercial, and industrial applications. Multi-core and armoured variants available.',
    image:        'image13.png',
    availability: 'In Stock'
  },
  {
    name:         'BCH Switchgear',
    category:     'Electrical',
    price:        '',
    description:  'BCH brand MCBs, isolators, and switchgear for panel building and electrical installations. IS-certified, authorised dealer supply.',
    image:        'image31.png',
    availability: 'In Stock'
  },
  {
    name:         'PVC Cable Channels',
    category:     'Electrical',
    price:        '',
    description:  'PVC cable management channels, trunking, and ducts for neat electrical installations. Snap-fit, slotted, and plain versions in various widths.',
    image:        'image19.png',
    availability: 'In Stock'
  },
  {
    name:         'Spiral Caps & Ferrules',
    category:     'Electrical',
    price:        '',
    description:  'End-feed ferrules and wire-end terminals for panel wiring. Colour-coded by cross-section for easy identification. Copper and aluminium.',
    image:        'image23.png',
    availability: 'In Stock'
  },
  {
    name:         'Semiconductor Fuses',
    category:     'Electrical',
    price:        '',
    description:  'HRC semiconductor protection fuses for VFDs, thyristor drives, and power converters. Ultra-fast acting for power electronics protection.',
    image:        'image9.png',
    availability: 'In Stock'
  },

  /* ── OTHERS ──────────────────────────────────────────────── */
  {
    name:         'V-Belts',
    category:     'Others',
    price:        '',
    description:  'Industrial V-belts for power transmission in motors, pumps, compressors, and machinery drives. Available in A, B, C, and D sections.',
    image:        'image11.png',
    availability: 'In Stock'
  },
  {
    name:         'Ceramic Beads',
    category:     'Others',
    price:        '',
    description:  'High-temperature ceramic insulation beads for wire insulation in furnaces and industrial heating applications. Alumina and mullite grades.',
    image:        'image29.png',
    availability: 'In Stock'
  },
  {
    name:         'All Types of Adhesives',
    category:     'Others',
    price:        '',
    description:  'Industrial adhesives, epoxy compounds, thread-locking sealants, and structural bonding agents. Araldite, Loctite, and other leading brands.',
    image:        'image21.png',
    availability: 'In Stock'
  }

];

/* ============================================================
   ENQUIRY CONFIG  (Google Sheets = lead capture ONLY)
   ── This config block has zero connection to product display.
   ============================================================ */
const ENQUIRY_CONFIG = {
  emailjsPublicKey:        'Fy2YdTzk0o9wWPqZA',
  emailjsServiceId:        'service_7v9ntu8',
  emailjsTemplateCustomer: 'template_s7wijll',
  emailjsTemplateAdmin:    'template_bwwqbef',
  googleSheetWebAppUrl:    'https://script.google.com/macros/s/AKfycbzJlZh5tngkriC1yLA5PuzzXr7clbyzJABiyOX159cuWsyl7a4-i0ycLF2AnP2tVwfP/exec'
};

/* ============================================================
   CONSTANTS
   ============================================================ */
const IMG_FOLDER = 'images/';

/* ============================================================
   FILTER STATE
   ============================================================ */
let activeFilter = 'all';
let searchQuery  = '';

/* ============================================================
   PRELOADER
   ============================================================ */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  setTimeout(() => preloader.classList.add('hidden'), 1300);
});

/* ============================================================
   NAVBAR
   ============================================================ */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  if (!navbar) return;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 90;
      if (window.scrollY >= top && window.scrollY < top + sec.offsetHeight) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ============================================================
   HAMBURGER MENU
   ============================================================ */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const nav       = document.getElementById('nav-links');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ============================================================
   HERO AUTO-SLIDER
   ============================================================ */
(function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.dot');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function autoPlay() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 4500);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index, 10));
      autoPlay();
    });
  });

  autoPlay();
})();

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
(function initScrollReveal() {
  const els = document.querySelectorAll('.scroll-reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = [
        ...(entry.target.parentElement?.querySelectorAll('.scroll-reveal:not(.visible)') || [])
      ];
      const delay = Math.min(siblings.indexOf(entry.target) * 100, 400);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => obs.observe(el));
})();

/* ============================================================
   COUNTER ANIMATION  (trust section)
   ============================================================ */
(function initCounters() {
  const counters = document.querySelectorAll('.tn-num');
  if (!counters.length) return;

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10) || 0;
      const dur    = 1800;
      const start  = performance.now();

      (function tick(now) {
        const pct = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(easeOut(pct) * target).toLocaleString();
        if (pct < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString();
      })(start);

      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => obs.observe(c));
})();

/* ============================================================
   PRODUCT SECTION  ── STATIC ONLY, NO NETWORK CALLS
   ============================================================ */

/** Convert category name → stable CSS/filter key */
function toCatKey(cat) {
  return (cat || 'others').toLowerCase().replace(/\s+/g, '').replace(/s$/, '');
}

/** Build a single product <article> card */
function buildProductCard(product) {
  const { name, category, price, description, image, availability } = product;

  // Availability badge
  const avail = (availability || '').toLowerCase();
  let availClass = 'avail-in',  availIcon = 'fa-circle-check', availText = 'In Stock';
  if (avail.includes('out') || avail.includes('unavail')) {
    availClass = 'avail-out';     availIcon = 'fa-circle-xmark'; availText = 'Out of Stock';
  } else if (avail.includes('limited') || avail.includes('low')) {
    availClass = 'avail-limited'; availIcon = 'fa-clock';        availText = 'Limited Stock';
  }

  const imgSrc    = image ? `${IMG_FOLDER}${image}` : `${IMG_FOLDER}image26.png`;
  const priceHTML = price ? `<div class="product-price">&#8377;${price}</div>` : '';

  const card = document.createElement('article');
  card.className        = 'product-card scroll-reveal';
  card.dataset.category = toCatKey(category);
  card.dataset.name     = name.toLowerCase();

  card.innerHTML = `
    <div class="product-img">
      <img src="${imgSrc}" alt="${name}" loading="lazy"
           onerror="this.src='${IMG_FOLDER}image26.png'" />
    </div>
    <div class="product-body">
      <h3 class="product-title">${name}</h3>
      ${priceHTML}
      <p class="product-desc">${description || 'Contact us for product specifications and pricing.'}</p>
      <span class="product-availability ${availClass}">
        <i class="fa-solid ${availIcon}"></i> ${availText}
      </span>
    </div>
    <div class="product-footer">
      <a href="#enquiry" class="btn-enquire" data-product="${name}">
        Enquire Now <i class="fa-solid fa-arrow-right"></i>
      </a>
    </div>
  `;

  return card;
}

/** Build category filter tabs + mobile select from the static product list */
function buildCategoryFilters() {
  const tabsEl   = document.getElementById('filterTabs');
  const selectEl = document.getElementById('categoryFilter');
  const cats     = [...new Set(STATIC_PRODUCTS.map(p => p.category))].filter(Boolean);

  if (tabsEl) {
    // Remove dynamic tabs but keep the "All" tab
    tabsEl.querySelectorAll('.filter-tab:not([data-filter="all"])').forEach(t => t.remove());

    cats.forEach(cat => {
      const btn = document.createElement('button');
      btn.className      = 'filter-tab';
      btn.dataset.filter = toCatKey(cat);
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', 'false');
      btn.textContent    = cat;
      tabsEl.appendChild(btn);
    });

    tabsEl.addEventListener('click', e => {
      const tab = e.target.closest('.filter-tab');
      if (!tab) return;
      tabsEl.querySelectorAll('.filter-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeFilter = tab.dataset.filter;
      if (selectEl) selectEl.value = activeFilter;
      filterProducts();
    });
  }

  if (selectEl) {
    while (selectEl.options.length > 1) selectEl.remove(1);
    cats.forEach(cat => selectEl.appendChild(new Option(cat, toCatKey(cat))));

    selectEl.addEventListener('change', () => {
      activeFilter = selectEl.value;
      tabsEl?.querySelectorAll('.filter-tab').forEach(t => {
        const a = t.dataset.filter === activeFilter;
        t.classList.toggle('active', a);
        t.setAttribute('aria-selected', String(a));
      });
      filterProducts();
    });
  }
}

/** Live-filter product cards by activeFilter + searchQuery */
function filterProducts() {
  const grid  = document.getElementById('productsGrid');
  const noRes = document.getElementById('noResults');
  if (!grid) return;

  let visible = 0;

  grid.querySelectorAll('.product-card').forEach(card => {
    const cat      = card.dataset.category || '';
    const fullText = [
      card.dataset.name || '',
      (card.querySelector('.product-title')?.textContent || '').toLowerCase(),
      (card.querySelector('.product-desc')?.textContent  || '').toLowerCase()
    ].join(' ');

    const matchFilter = activeFilter === 'all' || cat === activeFilter;
    const matchSearch = !searchQuery  || fullText.includes(searchQuery);

    const show = matchFilter && matchSearch;
    card.classList.toggle('hidden', !show);
    if (show) visible++;
  });

  if (noRes) noRes.style.display = visible === 0 ? 'block' : 'none';
}

/** Clear all active filters — called by the "Clear Filters" button */
window.resetFilters = function () {
  activeFilter = 'all';
  searchQuery  = '';

  const inp = document.getElementById('productSearch');
  if (inp) inp.value = '';

  const clr = document.getElementById('searchClear');
  if (clr) clr.style.display = 'none';

  document.querySelectorAll('.filter-tab').forEach(t => {
    const isAll = t.dataset.filter === 'all';
    t.classList.toggle('active', isAll);
    t.setAttribute('aria-selected', String(isAll));
  });

  const sel = document.getElementById('categoryFilter');
  if (sel) sel.value = 'all';

  filterProducts();
};

/** Main product init — fully synchronous, instant render */
function initProducts() {
  const grid    = document.getElementById('productsGrid');
  const loading = document.getElementById('productsLoading');
  const errEl   = document.getElementById('productsError');

  if (!grid) return;

  // Hide loader + error banners immediately (nothing to load asynchronously)
  if (loading) loading.style.display = 'none';
  if (errEl)   errEl.style.display   = 'none';

  // Build filter controls from static categories
  buildCategoryFilters();

  // Render all cards in one DOM write
  const frag = document.createDocumentFragment();
  STATIC_PRODUCTS.forEach(p => frag.appendChild(buildProductCard(p)));
  grid.appendChild(frag);
  grid.style.display = 'grid';

  // Search box wiring
  const searchInput = document.getElementById('productSearch');
  const clearBtn    = document.getElementById('searchClear');

  if (searchInput) {
    let debounce;
    searchInput.addEventListener('input', e => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        searchQuery = e.target.value.trim().toLowerCase();
        if (clearBtn) clearBtn.style.display = searchQuery ? 'flex' : 'none';
        filterProducts();
      }, 220);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      clearBtn.style.display = 'none';
      filterProducts();
    });
  }

  // Intersection observer for card reveal animations
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  grid.querySelectorAll('.scroll-reveal').forEach(el => revealObs.observe(el));

  // "Enquire Now" → pre-fill enquiry message
  grid.addEventListener('click', e => {
    const btn = e.target.closest('.btn-enquire');
    if (!btn) return;
    const productName = btn.dataset.product;
    const msgEl = document.getElementById('fmessage');
    if (productName && msgEl && !msgEl.value.trim()) {
      msgEl.value = `Hi, I am interested in: ${productName}. Please send more details and pricing.`;
    }
  });
}

// Kick off — runs synchronously, page is fully rendered before any user interaction
initProducts();

/* ============================================================
   ENQUIRY FORM
   ── SOLE purpose: validate inputs → send emails via EmailJS
      → fire-and-forget POST to Google Apps Script (lead save).
   ── Does NOT read from or write to the product catalog.
   ── Does NOT alter any product cards.
   ============================================================ */
(function initEnquiryForm() {
  const form = document.getElementById('enquiryForm');
  if (!form) return;

  // Boot EmailJS once
  if (typeof emailjs !== 'undefined') {
    emailjs.init(ENQUIRY_CONFIG.emailjsPublicKey);
  }

  /* Validation helpers */
  function setError(id, msg) {
    const field = document.getElementById(id);
    const err   = document.getElementById(id + 'Err');
    if (field) field.classList.toggle('error', !!msg);
    if (err)   err.textContent = msg || '';
  }

  function validateField(id) {
    const el  = document.getElementById(id);
    if (!el) return true;
    const val = el.value.trim();

    if (id === 'fname') {
      if (!val)           { setError(id, 'Name is required.');                              return false; }
      if (val.length < 2) { setError(id, 'Please enter a valid name.');                     return false; }
    }
    if (id === 'fphone') {
      if (!val)           { setError(id, 'Phone number is required.');                      return false; }
      if (!/^[6-9]\d{9}$/.test(val)) {
        setError(id, 'Enter a valid 10-digit Indian mobile number.');                        return false;
      }
    }
    if (id === 'femail') {
      if (!val)           { setError(id, 'Email address is required.');                     return false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        setError(id, 'Enter a valid email address.');                                        return false;
      }
    }
    if (id === 'fmessage') {
      if (!val)           { setError(id, 'Please enter your message.');                     return false; }
      if (val.length < 10){ setError(id, 'Message must be at least 10 characters.');        return false; }
    }

    setError(id, '');
    return true;
  }

  // Inline clear on input; validate on blur
  ['fname', 'fphone', 'femail', 'fmessage'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => setError(id, ''));
    el.addEventListener('blur',  () => validateField(id));
  });

  /* Submit */
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const valid = ['fname', 'fphone', 'femail', 'fmessage'].every(validateField);
    if (!valid) { form.querySelector('.error')?.focus(); return; }

    // Lead data — goes to Google Sheets and EmailJS only
    const leadData = {
      name:    document.getElementById('fname').value.trim(),
      email:   document.getElementById('femail').value.trim(),
      phone:   document.getElementById('fphone').value.trim(),
      product: document.getElementById('fproduct').value || 'Not specified',
      title:   document.getElementById('fmessage').value.trim()
    };

    const submitBtn  = form.querySelector('button[type="submit"]');
    const btnText    = submitBtn?.querySelector('.btn-text');
    const btnSuccess = submitBtn?.querySelector('.btn-success');

    if (submitBtn) submitBtn.disabled = true;
    if (btnText)   btnText.style.display = 'none';

    try {
      /* ── Step 1: Save lead to Google Sheets (fire-and-forget) ── */
      fetch(ENQUIRY_CONFIG.googleSheetWebAppUrl, {
        method:  'POST',
        mode:    'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(leadData)
      }).catch(err => console.warn('Sheet save (non-critical):', err));

      /* ── Step 2: Email customer auto-reply ───────────────────── */
      if (typeof emailjs !== 'undefined') {
        await emailjs.send(
          ENQUIRY_CONFIG.emailjsServiceId,
          ENQUIRY_CONFIG.emailjsTemplateCustomer,
          leadData
        );

        /* ── Step 3: Email admin notification ─────────────────── */
        await emailjs.send(
          ENQUIRY_CONFIG.emailjsServiceId,
          ENQUIRY_CONFIG.emailjsTemplateAdmin,
          leadData
        );
      }

      // Success feedback
      if (btnSuccess) btnSuccess.style.display = '';

      setTimeout(() => {
        form.reset();
        if (submitBtn)  submitBtn.disabled       = false;
        if (btnText)    btnText.style.display    = '';
        if (btnSuccess) btnSuccess.style.display = 'none';
      }, 3200);

    } catch (err) {
      console.error('Enquiry submission error:', err);

      if (submitBtn) submitBtn.disabled    = false;
      if (btnText)   btnText.style.display = '';

      const formErrEl = document.getElementById('formError');
      if (formErrEl) {
        formErrEl.textContent   = 'Something went wrong. Please WhatsApp or call us directly.';
        formErrEl.style.display = 'block';
        setTimeout(() => { formErrEl.style.display = 'none'; }, 5000);
      }
    }
  });
})();

/* ============================================================
   BACK TO TOP
   ============================================================ */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ============================================================
   FOOTER YEAR
   ============================================================ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 78;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
