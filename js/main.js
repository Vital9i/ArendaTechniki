let activeEquipmentId = FLEET[0].id;
let heroBannerSwiper = null;

document.addEventListener('DOMContentLoaded', () => {
  setHeaderHeight();
  initHeroBanner();
  initCatalog();
  initForms();
  initModal();
  initScrollButtons();
  initSmoothScroll();
  window.addEventListener('resize', setHeaderHeight);

  if (location.hash.startsWith('#eq-')) {
    history.replaceState(null, '', location.pathname + location.search);
  }
});

function setHeaderHeight() {
  const header = document.querySelector('.header');
  if (header) {
    document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
  }
}

function initHeroBanner() {
  const wrapper = document.getElementById('heroBannerWrapper');
  if (!wrapper || typeof HERO_BANNERS === 'undefined') return;

  wrapper.innerHTML = HERO_BANNERS.map(banner => `
    <div class="swiper-slide hero-banner__slide">
      <div class="hero-banner__content">
        <div class="hero-banner__card" style="background-image: url('${HERO_CARD_IMAGE}')">
          <div class="hero-banner__card-inner">
            <div class="hero-banner__card-copy">
              <h1 class="hero-banner__title">${banner.slogan || HERO_SLOGAN}</h1>
              <a href="#cta" class="btn btn--brown hero-banner__order" data-fleet="${banner.fleetId}">Заказать</a>
            </div>
            <div class="hero-banner__card-media">
              <img
                class="hero-banner__equipment${banner.equipmentImage.startsWith('images/') ? ' hero-banner__equipment--knockout' : ''}${banner.maskWideHorizontal ? ' hero-banner__equipment--mask-wide-h' : ''}"
                src="${banner.equipmentImage}"
                alt="${banner.equipmentAlt}"
                loading="lazy"
                ${banner.equipmentScale ? `style="transform: scale(${banner.equipmentScale}); transform-origin: center center;"` : ''}
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  heroBannerSwiper = new Swiper('.hero-banner-swiper', {
    loop: true,
    speed: 800,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    pagination: {
      el: '.hero-banner__pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.hero-banner__arrow--next',
      prevEl: '.hero-banner__arrow--prev'
    }
  });
}

function setActiveEquipment(id) {
  const item = FLEET.find(eq => eq.id === id);
  if (!item) return;

  activeEquipmentId = id;
}

function findCatalogItem(id) {
  return FLEET.find(eq => eq.id === id) || (typeof ADDONS !== 'undefined' ? ADDONS.find(a => a.id === id) : null);
}

function initCatalog() {
  renderCatalogGrid('catalogGridEquipment', FLEET, false);
  if (typeof ADDONS !== 'undefined') {
    renderCatalogGrid('catalogGridAddons', ADDONS, true);
  }

  const footerLinks = document.getElementById('footerCatalogLinks');
  if (footerLinks) {
    footerLinks.innerHTML = FLEET.map(item =>
      `<li><a href="#eq-${item.id}" data-id="${item.id}">${shortName(item.name)}</a></li>`
    ).join('');
    footerLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        openModal(link.dataset.id);
      });
    });
  }

  document.querySelectorAll('.catalog-tabs__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.catalog-tabs__btn').forEach(b => b.classList.remove('catalog-tabs__btn--active'));
      btn.classList.add('catalog-tabs__btn--active');
      const isAddons = btn.dataset.tab === 'addons';
      document.getElementById('catalogGridEquipment').classList.toggle('catalog-grid--hidden', isAddons);
      document.getElementById('catalogGridAddons').classList.toggle('catalog-grid--hidden', !isAddons);
    });
  });
}

function renderCatalogGrid(containerId, items, isAddons) {
  const grid = document.getElementById(containerId);
  if (!grid) return;

  grid.innerHTML = items.map(item => {
    const priceLabel = isAddons ? 'Стоимость: по запросу' : 'Аренда: по запросу';
    const specLine = item.quick[0] || '';
    const specLine2 = item.quick[1] && !isAddons ? item.quick[1] : (isAddons && item.quick[1] ? item.quick[1] : '');
    return `
      <article class="product-card" data-id="${item.id}">
        <div class="product-card__image">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <h3 class="product-card__title">${item.name}</h3>
        ${item.reg && item.reg !== '—' ? `<p class="product-card__reg">${item.reg}</p>` : ''}
        ${item.driver && item.driver !== '—' ? `<p class="product-card__driver">Машинист: ${item.driver}</p>` : ''}
        <p class="product-card__spec">${specLine}</p>
        ${specLine2 ? `<p class="product-card__spec">${specLine2}</p>` : ''}
        <p class="product-card__spec">${priceLabel}</p>
        <div class="product-card__actions">
          <button type="button" class="btn btn--brown btn--sm" data-open="${item.id}">Подробнее</button>
        </div>
      </article>
    `;
  }).join('');

  grid.querySelectorAll('[data-open]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.open));
  });
}

function openModal(id) {
  const item = findCatalogItem(id);
  if (!item) return;

  if (FLEET.some(eq => eq.id === id)) {
    setActiveEquipment(id);
  }

  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <h3 class="modal__title">${item.name}</h3>
    ${item.reg && item.reg !== '—' ? `<p class="modal__meta">Гос. номер: ${item.reg}</p>` : ''}
    ${item.driver && item.driver !== '—' ? `<p class="modal__driver"><strong>Машинист:</strong> ${item.driver}</p>` : ''}
    <table class="specs">
      <tbody>
        ${item.specs.map(([l, v]) => `<tr><td>${l}</td><td>${v}</td></tr>`).join('')}
      </tbody>
    </table>
    <button type="button" class="btn btn--brown btn--full" data-scroll="cta" data-close-modal>Заказать технику</button>
  `;

  content.querySelector('[data-scroll]')?.addEventListener('click', () => {
    closeModal();
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  });

  content.querySelector('[data-close-modal]')?.addEventListener('click', closeModal);

  document.getElementById('equipmentModal').classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('equipmentModal').classList.remove('is-open');
  document.body.style.overflow = '';
}

function initModal() {
  document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

function initForms() {
  ['#ctaForm', '#footerForm'].forEach(selector => {
    const form = document.querySelector(selector);
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const phone = form.querySelector('[name="phone"]').value.trim();
      const name = form.querySelector('[name="name"]')?.value.trim();
      const equipment = form.querySelector('[name="equipment"]')?.value;

      if (!phone) {
        alert('Пожалуйста, укажите номер телефона');
        return;
      }

      const greeting = name ? `${name}, спасибо` : 'Спасибо';
      const note = equipment ? `\nТехника: ${equipment}` : '';
      alert(`${greeting}! Олег свяжется с вами: ${phone}.${note}`);
      form.reset();
    });
  });
}

function initScrollButtons() {
  document.querySelectorAll('[data-scroll]').forEach(btn => {
    if (btn.hasAttribute('data-close-modal')) return;
    btn.addEventListener('click', () => {
      document.getElementById(btn.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      if (href.startsWith('#eq-')) {
        e.preventDefault();
        const id = href.replace('#eq-', '');
        if (findCatalogItem(id)) {
          if (FLEET.some(item => item.id === id)) setActiveEquipment(id);
          openModal(id);
        }
        return;
      }

      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function shortName(name) {
  return name
    .replace('Экскаватор-погрузчик ', '')
    .replace('Погрузчик-экскаватор ', '')
    .replace('Погрузчик фронтальный ', '')
    .replace('Экскаватор гусеничный ', '')
    .replace('Минипогрузчик ', '');
}
