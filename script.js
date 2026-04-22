/**
 * Mehta Trading Agency – Premium Website Script
 * script.js | Industrial Hardware Supplier, Mumbai
 *
 * Features:
 *  – Preloader
 *  – Sticky navbar + active link
 *  – Hero auto-slider with dot controls
 *  – Hamburger menu
 *  – Scroll reveal animations
 *  – Counter animations (trust numbers)
 *  – Google Sheets product fetching (dynamic catalog)
 *  – Product search + category filter (live)
 *  – Enquiry form validation + EmailJS
 *  – Back-to-top
 *  – Footer year
 *  – Smooth scrolling
 */

/* ============================================================
   GOOGLE SHEETS CONFIG
   ============================================================ */
// Public Google Sheet published as CSV
// Sheet: https://docs.google.com/spreadsheets/d/1JCyJbh92EDCvh421mBXRvPK5ZkNazF90_gpjJtatpKc/edit
const SHEET_ID   = '1JCyJbh92EDCvh421mBXRvPK5ZkNazF90_gpjJtatpKc';
const SHEET_URL  = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

// Column mappings (0-indexed, must match Sheet columns)
// Adjust if your sheet column order differs:
// Col 0: Product Name | Col 1: Category | Col 2: Price
// Col 3: Description  | Col 4: Image Name | Col 5: Availability
const COLS = {
  name: 0, category: 1, price: 2,
  description: 3, image: 4, availability: 5
};

// Images folder path
const IMG_FOLDER = 'images/';

/* ── Fallback product data (shown if Sheet fails to load) ──── */
const FALLBACK_PRODUCTS = [
  { name:'SS Nut Bolts', category:'Fasteners', price:'', description:'High-grade stainless steel nut bolts in SS 304 & SS 316. Corrosion-resistant, ideal for marine, food-grade and industrial environments.', image:'image26.png', availability:'In Stock' },
  { name:'SS Machine Screws', category:'Fasteners', price:'', description:'Stainless steel machine screws in pan head, countersunk & hex head variants across all metric sizes.', image:'image16.png', availability:'In Stock' },
  { name:'SS Washers', category:'Fasteners', price:'', description:'Plain, spring and lock washers in stainless steel grades. Essential for secure, vibration-resistant assemblies.', image:'image14.png', availability:'In Stock' },
  { name:'MS Machine Screws', category:'Fasteners', price:'', description:'Mild steel machine screws for general engineering. Cost-effective and available in bulk quantities.', image:'image10.png', availability:'In Stock' },
  { name:'MS Nut Bolts', category:'Fasteners', price:'', description:'Mild steel nut bolts for structural applications. Zinc-plated options available for added protection.', image:'image12.png', availability:'In Stock' },
  { name:'SS Allen Cap Screws', category:'Fasteners', price:'', description:'Stainless steel socket head cap screws for machinery. High torque, clean finish, M3 to M24 range.', image:'image15.png', availability:'In Stock' },
  { name:'SS Allen Grub Screws', category:'Fasteners', price:'', description:'Stainless steel set screws for securing rotating parts. Cup point, flat point, and cone point variants.', image:'image27.png', availability:'In Stock' },
  { name:'High Tensile Allen Cap Screws', category:'Fasteners', price:'', description:'Grade 8.8 and 12.9 socket head screws for heavy machinery and automotive applications.', image:'image30.png', availability:'In Stock' },
  { name:'High Tensile Grub Screws', category:'Fasteners', price:'', description:'Grade 12.9 grub screws for industrial drives and couplings. Superior vibration resistance.', image:'image32.png', availability:'In Stock' },
  { name:'Sheet Metal Screws', category:'Fasteners', price:'', description:'Self-tapping sheet metal screws for thin metal sheets, enclosures, and HVAC applications.', image:'image34.png', availability:'In Stock' },
  { name:'Wood Screws', category:'Fasteners', price:'', description:'Wood and chipboard screws with yellow zinc finish. Suitable for carpentry and interior projects.', image:'image33.png', availability:'In Stock' },
  { name:'Wedge Anchors', category:'Anchors', price:'', description:'Heavy-duty wedge anchors for structural concrete fixing. Available in SS and carbon steel.', image:'image1.png', availability:'In Stock' },
  { name:'Pin Type Anchors', category:'Anchors', price:'', description:'Hammer-set pin anchors for quick installation in concrete and masonry walls.', image:'image18.png', availability:'In Stock' },
  { name:'Drop-In Anchors', category:'Anchors', price:'', description:'Internal thread drop-in anchors for flush concrete applications and overhead installations.', image:'image24.png', availability:'In Stock' },
  { name:'Rawl Bolts (Expansion Anchors)', category:'Anchors', price:'', description:'Sleeve-type expansion bolts for concrete and brick. Reliable holding for shelving and equipment.', image:'image22.png', availability:'In Stock' },
  { name:'Eye Hook Anchors', category:'Anchors', price:'', description:'Screw-in eye hook anchors for suspended loads and cable support in ceilings and walls.', image:'image17.png', availability:'In Stock' },
  { name:'Sleeve Anchors', category:'Anchors', price:'', description:'Sleeve anchors with nut and bolt for medium-to-heavy loads. Removable and reusable design.', image:'image6.png', availability:'In Stock' },
  { name:'Cutting Tools', category:'Tools', price:'', description:'End mills, reamers, and milling cutters for precision machining in HSS and carbide grades.', image:'image20.png', availability:'In Stock' },
  { name:'HSS Drills & Taps', category:'Tools', price:'', description:'High-speed steel twist drills and machine taps. Metric and BSW thread taps in all sizes.', image:'image3.png', availability:'In Stock' },
  { name:'Braco Cable Lugs', category:'Electrical', price:'', description:'Copper and aluminium cable lugs (Braco brand) for electrical terminations. All cable sizes.', image:'image5.png', availability:'In Stock' },
  { name:'Jainson Lugs & DC Glands', category:'Electrical', price:'', description:'Jainson cable lugs, double compression cable glands, and crimping tools for electrical work.', image:'image8.png', availability:'In Stock' },
  { name:'Nylon Cable Ties', category:'Electrical', price:'', description:'Self-locking UV-resistant nylon cable ties in white and black. All lengths and widths.', image:'image28.png', availability:'In Stock' },
  { name:'Wires & Cables', category:'Electrical', price:'', description:'FR and FRLS grade electrical wires for residential, commercial, and industrial applications.', image:'image13.png', availability:'In Stock' },
  { name:'BCH Switchgear', category:'Electrical', price:'', description:'BCH brand MCBs, isolators, and switchgear for panel building. IS-certified products.', image:'image31.png', availability:'In Stock' },
  { name:'PVC Cable Channels', category:'Electrical', price:'', description:'PVC cable management channels and trunking for neat electrical installations.', image:'image19.png', availability:'In Stock' },
  { name:'Spiral Caps & Ferrules', category:'Electrical', price:'', description:'End-feed ferrules and wire-end terminals for panel wiring. Colour-coded copper/aluminium.', image:'image23.png', availability:'In Stock' },
  { name:'Semiconductor Fuses', category:'Electrical', price:'', description:'HRC semiconductor protection fuses for VFDs, thyristor drives, and power converters.', image:'image9.png', availability:'In Stock' },
  { name:'V-Belts', category:'Others', price:'', description:'Industrial V-belts for power transmission in motors, pumps, and compressors. A/B/C/D sections.', image:'image11.png', availability:'In Stock' },
  { name:'Ceramic Beads', category:'Others', price:'', description:'High-temperature ceramic insulation beads for furnaces and industrial heating. Alumina & mullite.', image:'image29.png', availability:'In Stock' },
  { name:'All Types of Adhesives', category:'Others', price:'', description:'Industrial adhesives, epoxy compounds, and thread-locking sealants. Araldite, Loctite and more.', image:'image21.png', availability:'In Stock' }
];

/* ============================================================
   STATE
   ============================================================ */
let allProducts = [];
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
   HAMBURGER
   ============================================================ */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const nav       = document.getElementById('nav-links');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open.toString());
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
   HERO SLIDER
   ============================================================ */
(function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.dot');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function autoPlay() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 4500);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index));
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
      if (entry.isIntersecting) {
        const siblings = [...(entry.target.parentElement?.querySelectorAll('.scroll-reveal:not(.visible)') || [])];
        const delay    = Math.min(siblings.indexOf(entry.target) * 100, 400);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => obs.observe(el));
})();

/* ============================================================
   COUNTER ANIMATION (trust numbers)
   ============================================================ */
(function initCounters() {
  const counters = document.querySelectorAll('.tn-num');
  if (!counters.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target) || 0;
      const dur    = 1800;
      const start  = performance.now();

      function tick(now) {
        const pct = Math.min((now - start) / dur, 1);
        const val = Math.round(easeOut(pct) * target);
        el.textContent = val.toLocaleString();
        if (pct < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString();
      }

      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => obs.observe(c));

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
})();

/* ============================================================
   GOOGLE SHEETS — FETCH PRODUCTS
   ============================================================ */
async function fetchProductsFromSheet() {
  try {
    const res  = await fetch(SHEET_URL);
    const text = await res.text();

    // Strip the Google Sheets JSON wrapper
    const json = JSON.parse(text.replace(/^[^\(]+\(/, '').replace(/\);?$/, ''));
    const rows = json.table.rows;

    const products = [];

    rows.forEach((row, i) => {
      if (i === 0) return; // Skip header row

      const cells = row.c;

      // Safe cell reader
      const cell = (idx) => {
        const c = cells[idx];
        return c && c.v !== null && c.v !== undefined ? String(c.v).trim() : '';
      };

      const name = cell(COLS.name);
      if (!name) return; // Skip empty rows

      products.push({
        name:         name,
        category:     cell(COLS.category) || 'Others',
        price:        cell(COLS.price),
        description:  cell(COLS.description),
        image:        cell(COLS.image),
        availability: cell(COLS.availability) || 'In Stock'
      });
    });

    return products;
  } catch (err) {
    console.warn('Google Sheets fetch failed:', err.message);
    return null;
  }
}

/* ============================================================
   BUILD PRODUCT CARDS
   ============================================================ */
function buildProductCard(product) {
  const { name, category, price, description, image, availability } = product;

  // Availability badge
  const avail = availability.toLowerCase();
  let availClass = 'avail-in';
  let availIcon  = 'fa-circle-check';
  let availText  = 'In Stock';
  if (avail.includes('out') || avail.includes('unavail')) {
    availClass = 'avail-out'; availIcon = 'fa-circle-xmark'; availText = 'Out of Stock';
  } else if (avail.includes('limited') || avail.includes('low')) {
    availClass = 'avail-limited'; availIcon = 'fa-clock'; availText = 'Limited Stock';
  }

  // Image path
  const imgSrc = image
    ? `${IMG_FOLDER}${image}`
    : `${IMG_FOLDER}image1.png`;

  // Price display
  const priceHTML = price
    ? `<div class="product-price">₹${price}</div>`
    : '';

  const catKey = category.toLowerCase()
    .replace(/s$/, '')   // plurals
    .replace(/\s+/g, '')
    .replace(/fastener/, 'fastener')
    .replace(/electrical/, 'electrical')
    .replace(/anchor/, 'anchor')
    .replace(/tool/, 'tool');

  const card = document.createElement('article');
  card.className = 'product-card scroll-reveal';
  card.dataset.category = catKey;
  card.dataset.name = name.toLowerCase();

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

/* ============================================================
   POPULATE CATEGORY FILTERS
   ============================================================ */
function populateFilters(products) {
  const tabsContainer = document.getElementById('filterTabs');
  const selectEl      = document.getElementById('categoryFilter');

  // Collect unique categories
  const cats = [...new Set(products.map(p => p.category))].filter(Boolean);

  // Build tabs
  if (tabsContainer) {
    // Clear existing dynamic tabs (keep "All")
    [...tabsContainer.querySelectorAll('.filter-tab:not([data-filter="all"])')].forEach(t => t.remove());

    cats.forEach(cat => {
      const catKey = cat.toLowerCase().replace(/\s+/g, '');
      const btn = document.createElement('button');
      btn.className = 'filter-tab';
      btn.dataset.filter = catKey;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', 'false');
      btn.textContent = cat;
      tabsContainer.appendChild(btn);
    });

    // Re-bind tab events
    tabsContainer.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        tabsContainer.querySelectorAll('.filter-tab').forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        activeFilter = tab.dataset.filter;
        // Sync select
        if (selectEl) selectEl.value = activeFilter;
        filterProducts();
      });
    });
  }

  // Build select options
  if (selectEl) {
    // Clear existing options except first
    while (selectEl.options.length > 1) selectEl.remove(1);

    cats.forEach(cat => {
      const catKey = cat.toLowerCase().replace(/\s+/g, '');
      const opt = new Option(cat, catKey);
      selectEl.appendChild(opt);
    });

    selectEl.addEventListener('change', () => {
      activeFilter = selectEl.value;
      // Sync tabs
      document.querySelectorAll('.filter-tab').forEach(t => {
        const active = t.dataset.filter === activeFilter;
        t.classList.toggle('active', active);
        t.setAttribute('aria-selected', active.toString());
      });
      filterProducts();
    });
  }
}

/* ============================================================
   FILTER PRODUCTS
   ============================================================ */
function filterProducts() {
  const grid     = document.getElementById('productsGrid');
  const noResult = document.getElementById('noResults');
  if (!grid) return;

  const cards = grid.querySelectorAll('.product-card');
  let visible  = 0;

  cards.forEach(card => {
    const cat      = card.dataset.category || '';
    const nameData = (card.dataset.name || '').toLowerCase();
    const titleTxt = (card.querySelector('.product-title')?.textContent || '').toLowerCase();
    const descTxt  = (card.querySelector('.product-desc')?.textContent || '').toLowerCase();
    const fullText = `${nameData} ${titleTxt} ${descTxt}`;

    const matchFilter = activeFilter === 'all' || cat.includes(activeFilter) || activeFilter.includes(cat);
    const matchSearch = !searchQuery || fullText.includes(searchQuery);

    const show = matchFilter && matchSearch;
    card.classList.toggle('hidden', !show);
    if (show) visible++;
  });

  if (noResult) noResult.style.display = visible === 0 ? 'block' : 'none';
}

/* ============================================================
   RESET FILTERS (called by "Clear Filters" button)
   ============================================================ */
window.resetFilters = function() {
  activeFilter = 'all';
  searchQuery  = '';

  const searchInput = document.getElementById('productSearch');
  if (searchInput) searchInput.value = '';

  const clearBtn = document.getElementById('searchClear');
  if (clearBtn) clearBtn.style.display = 'none';

  document.querySelectorAll('.filter-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.filter === 'all');
    t.setAttribute('aria-selected', t.dataset.filter === 'all' ? 'true' : 'false');
  });

  const selectEl = document.getElementById('categoryFilter');
  if (selectEl) selectEl.value = 'all';

  filterProducts();
};

/* ============================================================
   INIT PRODUCTS (fetch or fallback)
   ============================================================ */
async function initProducts() {
  const grid    = document.getElementById('productsGrid');
  const loading = document.getElementById('productsLoading');
  const errEl   = document.getElementById('productsError');
  if (!grid) return;

  // Show loader
  loading.style.display = 'block';
  grid.style.display = 'none';

  // Try Google Sheets
  let products = await fetchProductsFromSheet();
  let usingFallback = false;

  if (!products || products.length === 0) {
    products = FALLBACK_PRODUCTS;
    usingFallback = true;
    if (errEl) errEl.style.display = 'block';
  }

  allProducts = products;

  // Populate filters
  populateFilters(products);

  // Build cards
  const fragment = document.createDocumentFragment();
  products.forEach(p => fragment.appendChild(buildProductCard(p)));

  loading.style.display = 'none';
  grid.appendChild(fragment);
  grid.style.display = 'grid';

  // Bind search
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
      searchInput.value = '';
      searchQuery = '';
      clearBtn.style.display = 'none';
      filterProducts();
    });
  }

  // Re-run scroll reveal for new cards
  const newCards = grid.querySelectorAll('.scroll-reveal:not(.visible)');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  newCards.forEach(el => obs.observe(el));

  // Product enquire pre-fill
  grid.addEventListener('click', e => {
    const btn = e.target.closest('.btn-enquire');
    if (!btn) return;
    const productName = btn.dataset.product;
    const msgEl = document.getElementById('fmessage');
    if (productName && msgEl && !msgEl.value.trim()) {
      msgEl.value = `Hi, I am interested in: ${productName}. Please send more details and pricing.`;
    }
  });

  if (usingFallback) {
    console.info('ℹ️ Using fallback product data. Publish your Google Sheet as CSV and update SHEET_ID in script.js to enable live data.');
  } else {
    console.info(`✅ Loaded ${products.length} products from Google Sheets.`);
  }
}

// Kick off
initProducts();

/* ============================================================
   ENQUIRY FORM
   ============================================================ */
(function initEnquiryForm() {
  const form = document.getElementById('enquiryForm');
  if (!form) return;

  const EMAILJS_PUBLIC_KEY        = 'Fy2YdTzk0o9wWPqZA';
  const EMAILJS_SERVICE_ID        = 'service_7v9ntu8';
  const EMAILJS_TEMPLATE_CUSTOMER = 'template_s7wijll';
  const EMAILJS_TEMPLATE_ADMIN    = 'template_bwwqbef';
  const GOOGLE_SHEET_URL          = 'https://script.google.com/macros/s/AKfycbzJlZh5tngkriC1yLA5PuzzXr7clbyzJABiyOX159cuWsyl7a4-i0ycLF2AnP2tVwfP/exec';

  if (typeof emailjs !== 'undefined') emailjs.init(EMAILJS_PUBLIC_KEY);

  function setError(id, msg) {
    const f = document.getElementById(id);
    const e = document.getElementById(id + 'Err');
    if (f) f.classList.toggle('error', !!msg);
    if (e) e.textContent = msg || '';
  }

  function validate(id) {
    const el  = document.getElementById(id);
    if (!el) return true;
    const val = el.value.trim();

    if (id === 'fname') {
      if (!val) { setError(id, 'Name is required.'); return false; }
      if (val.length < 2) { setError(id, 'Please enter a valid name.'); return false; }
    }
    if (id === 'fphone') {
      if (!val) { setError(id, 'Phone number is required.'); return false; }
      if (!/^[6-9]\d{9}$/.test(val)) { setError(id, 'Enter a valid 10-digit Indian mobile number.'); return false; }
    }
    if (id === 'femail') {
      if (!val) { setError(id, 'Email address is required.'); return false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { setError(id, 'Enter a valid email address.'); return false; }
    }
    if (id === 'fmessage') {
      if (!val) { setError(id, 'Please enter your message.'); return false; }
      if (val.length < 10) { setError(id, 'Message should be at least 10 characters.'); return false; }
    }

    setError(id, '');
    return true;
  }

  ['fname','fphone','femail','fmessage'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => setError(id, ''));
    el.addEventListener('blur', () => validate(id));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const valid = ['fname','fphone','femail','fmessage'].every(validate);
    if (!valid) { form.querySelector('.error')?.focus(); return; }

    const params = {
      name   : document.getElementById('fname').value.trim(),
      email  : document.getElementById('femail').value.trim(),
      phone  : document.getElementById('fphone').value.trim(),
      product: document.getElementById('fproduct').value || 'Not specified',
      title  : document.getElementById('fmessage').value.trim()
    };

    const submitBtn  = form.querySelector('button[type="submit"]');
    const btnText    = submitBtn.querySelector('.btn-text');
    const btnSuccess = submitBtn.querySelector('.btn-success');

    submitBtn.disabled = true;
    if (btnText) btnText.style.display = 'none';

    try {
      // Save to Google Sheet
      fetch(GOOGLE_SHEET_URL, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      }).catch(() => {});

      if (typeof emailjs !== 'undefined') {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_CUSTOMER, params);
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ADMIN, params);
      }

      if (btnSuccess) btnSuccess.style.display = '';

      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        if (btnText)    btnText.style.display    = '';
        if (btnSuccess) btnSuccess.style.display = 'none';
      }, 3000);

    } catch (err) {
      console.error('Email send failed:', err);
      submitBtn.disabled = false;
      if (btnText) btnText.style.display = '';

      const formErr = document.getElementById('formError');
      if (formErr) {
        formErr.textContent = 'Something went wrong. Please WhatsApp or call us directly.';
        formErr.style.display = 'block';
        setTimeout(() => { formErr.style.display = 'none'; }, 5000);
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
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 500), { passive: true });
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
    const offset = 78;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
