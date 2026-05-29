let activeEquipmentId = FLEET[0].id;
let heroBannerSwiper = null;
let closeMobileNavFn = null;

document.addEventListener('DOMContentLoaded', () => {
  setHeaderHeight();
  initHeroBanner();
  initAboutCards();
  initFactoryDrivers();
  initCatalog();
  initForms();
  initModal();
  initOrderModal();
  initScrollButtons();
  initSmoothScroll();
  initMobileNav();
  initMessengerLinks();
  window.addEventListener('resize', setHeaderHeight);

  if (location.hash.startsWith('#eq-')) {
    history.replaceState(null, '', location.pathname + location.search);
  }
});

function initMessengerLinks() {
  if (typeof CONTACT === 'undefined') return;

  document.querySelectorAll('[data-messenger-links]').forEach(container => {
    container.innerHTML = buildMessengerLinksHtml(container);
  });
}

function buildMessengerLinksHtml(container) {
  const compact = container.hasAttribute('data-messenger-compact');
  const inline = container.hasAttribute('data-messenger-inline');
  const nav = container.hasAttribute('data-messenger-nav');
  const classes = ['messenger-links'];
  if (compact) classes.push('messenger-links--compact');
  if (inline) classes.push('messenger-links--inline');
  if (nav) classes.push('messenger-links--nav');

  return `
    <div class="${classes.join(' ')}" role="group" aria-label="Написать Олегу">
      <a href="${CONTACT.whatsappUrl}" class="messenger-link messenger-link--whatsapp" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
      <a href="${CONTACT.telegramUrl}" class="messenger-link messenger-link--telegram" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
      </a>
      <a href="${CONTACT.viberUrl}" class="messenger-link messenger-link--viber" target="_blank" rel="noopener noreferrer" aria-label="Viber">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.177.693 6.698.623 9.82c-.06 2.724-.13 7.837 4.777 9.203h.004l-.004 2.315s-.037.98.588 1.177c.75.233 1.2-.484 1.912-1.254.395-.43.944-1.054 1.356-1.536 3.736.323 6.598-.414 6.92-.525.752-.247 5.026-.793 5.726-6.504.744-6.037-.358-9.868-2.317-11.52C19.586.442 15.669.016 11.398.002zm.093 1.947c3.883.015 7.244.39 8.858 1.689 1.533 1.227 2.402 4.597 1.767 9.718-.566 4.578-3.814 4.988-4.527 5.213-.276.09-2.778.724-5.932.412 0 0-2.348 2.826-3.078 3.552-.115.117-.247.163-.338.152-.117-.015-.15-.168-.148-.375l.021-3.676c-3.923-1.036-3.686-5.338-3.634-7.605.055-2.468.523-4.654 1.93-6.017C6.9 2.367 10.385 1.964 11.491 1.949zM12.062 5.5c-.094 0-.184.013-.27.037-.456.126-.718.588-.582 1.044.135.456.588.718 1.044.582.456-.135.718-.588.582-1.044a.832.832 0 0 0-.774-.619zm-2.562 1.01a.832.832 0 0 0-.619 1.394c1.877 1.877 1.877 4.926 0 6.803a.832.832 0 1 0 1.177 1.177c2.512-2.512 2.512-6.645 0-9.157a.828.828 0 0 0-.558-.217zm5.124 0c-.2 0-.401.076-.558.217-2.512 2.512-2.512 6.645 0 9.157a.832.832 0 1 0 1.177-1.177c-1.877-1.877-1.877-4.926 0-6.803a.832.832 0 0 0-.619-1.394zm-2.562 1.562c-.094 0-.184.013-.27.037-.456.126-.718.588-.582 1.044.338 1.138.338 2.366 0 3.504-.135.456.126.909.582 1.044.456.135.909-.126 1.044-.582a5.18 5.18 0 0 0 0-5.468.832.832 0 0 0-.774-.579z"/></svg>
      </a>
    </div>
  `;
}

function setHeaderHeight() {
  const header = document.querySelector('.header');
  if (header) {
    document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
  }
}

function renderHeroMedia(banner) {
  const knockout = banner.equipmentImage.startsWith('images/')
    ? ' hero-banner__equipment--knockout'
    : '';
  const maskWide = banner.maskWideHorizontal ? ' hero-banner__equipment--mask-wide-h' : '';
  const scaleStyle = banner.equipmentScale
    ? ` style="transform: scale(${banner.equipmentScale}); transform-origin: center center;"`
    : '';

  if (banner.comboMedia && banner.addonImage) {
    const addonKnockout = banner.addonImage.startsWith('images/')
      ? ' hero-banner__equipment--knockout'
      : '';

    return `
      <div class="hero-banner__combo">
        <img
          class="hero-banner__equipment hero-banner__equipment--addon${addonKnockout}"
          src="${banner.addonImage}"
          alt="${banner.addonAlt || ''}"
          loading="lazy"
        >
        <span class="hero-banner__combo-plus" aria-hidden="true">+</span>
        <img
          class="hero-banner__equipment${knockout}${maskWide}"
          src="${banner.equipmentImage}"
          alt="${banner.equipmentAlt}"
          loading="lazy"${scaleStyle}
        >
      </div>
    `;
  }

  return `
    <img
      class="hero-banner__equipment${knockout}${maskWide}"
      src="${banner.equipmentImage}"
      alt="${banner.equipmentAlt}"
      loading="lazy"${scaleStyle}
    >
  `;
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
              <h2 class="hero-banner__title">${banner.title || banner.slogan || ''}</h2>
              ${banner.description ? `<p class="hero-banner__desc">${banner.description}</p>` : ''}
              <button type="button" class="btn btn--brown hero-banner__order" data-order="${banner.fleetId}" data-order-from="Главная">Заказать</button>
            </div>
            <div class="hero-banner__card-media">
              ${renderHeroMedia(banner)}
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
  return FLEET.find(eq => eq.id === id);
}

function initAboutCards() {
  const grid = document.getElementById('aboutCardsGrid');
  if (!grid || typeof ABOUT_TEXT_CARDS === 'undefined') return;

  grid.innerHTML = ABOUT_TEXT_CARDS.map(card => `
    <article class="about-card">
      <div class="about-card__body">
        <h3 class="about-card__title">${card.title}</h3>
        <div class="about-card__text">${card.text}</div>
        ${card.cta ? '<button type="button" class="btn btn--primary btn--sm" data-scroll="cta">Оставить заявку</button>' : ''}
      </div>
    </article>
  `).join('');
}

function initFactoryDrivers() {
  const container = document.getElementById('factoryDrivers');
  if (!container || typeof FACTORY_DRIVERS === 'undefined') return;

  container.innerHTML = FACTORY_DRIVERS.map(driver => `
    <figure class="factory-video__driver">
      <div class="factory-video__driver-photo">
        <img src="${driver.photo}" alt="${driver.name}" loading="lazy" width="120" height="120">
      </div>
      <figcaption class="factory-video__driver-name">${driver.namePatronymic}</figcaption>
    </figure>
  `).join('');
}

function initCatalog() {
  renderCatalogGrid('catalogGridEquipment', FLEET);

  const footerLinks = document.getElementById('footerCatalogLinks');
  if (footerLinks) {
    footerLinks.innerHTML = FLEET.filter(item => item.id !== 'hmb68').map(item =>
      `<li><a href="#eq-${item.id}" data-id="${item.id}">${shortName(item.name)}</a></li>`
    ).join('');
    footerLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        openModal(link.dataset.id);
      });
    });
  }
}

function getCardPriceLabel(item) {
  if (item.priceAddon) return `+${item.priceAddon} руб`;
  return `от ${item.priceFrom ?? 90} руб`;
}

function renderCardSpecs(item) {
  const lines = [];

  if (item.cardMass) lines.push(`Масса: ${item.cardMass}`);
  if (item.cardBucket) lines.push(`Ковш: ${item.cardBucket}`);
  if (item.hammerOption) lines.push(`Гидромолот: +${FLEET_HAMMER_ADDON} руб`);
  if (item.cardNote) lines.push(item.cardNote);

  if (!lines.length) return '';

  return `
    <div class="product-card__specs">
      ${lines.map(line => `<p class="product-card__spec">${line}</p>`).join('')}
    </div>
  `;
}

function renderCatalogGrid(containerId, items) {
  const grid = document.getElementById(containerId);
  if (!grid) return;

  grid.innerHTML = items.map(item => {
    const priceLabel = getCardPriceLabel(item);
    const cardClass = 'product-card product-card--equipment';
    const imgKnockout = item.image.startsWith('images/') ? ' product-card__img--knockout' : '';

    return `
      <article class="${cardClass}" data-id="${item.id}">
        <div class="product-card__visual">
          <div class="product-card__image">
            <img class="${imgKnockout.trim()}" src="${item.image}" alt="${item.name}" loading="lazy">
          </div>
        </div>
        <div class="product-card__body">
          <h3 class="product-card__title">${item.name}</h3>
          ${renderCardSpecs(item)}
          <div class="product-card__footer">
            <p class="product-card__price">${priceLabel}</p>
            <div class="product-card__actions">
              <button type="button" class="btn btn--brown btn--sm" data-order="${item.id}" data-order-from="Каталог">Заказать</button>
              <button type="button" class="btn btn--brown btn--sm" data-open="${item.id}">Подробнее</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  grid.querySelectorAll('[data-open]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.open));
  });

}

function getModalSpecs(specs) {
  const exclude = new Set(['Гос. номер', 'Машинист']);
  return specs.filter(([label]) => !exclude.has(label));
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
    ${item.description ? `<p class="modal__desc">${item.description}</p>` : ''}
    <table class="specs">
      <tbody>
        ${getModalSpecs(item.specs).map(([l, v]) => `<tr><td>${l}</td><td>${v}</td></tr>`).join('')}
      </tbody>
    </table>
    <button type="button" class="btn btn--brown btn--full" data-order="${item.id}" data-close-modal>Заказать</button>
  `;

  content.querySelector('[data-order]')?.addEventListener('click', () => {
    closeModal();
    openOrderModal(item.id, 'Подробнее');
  });

  document.getElementById('equipmentModal').classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('equipmentModal').classList.remove('is-open');
  if (!document.getElementById('orderModal')?.classList.contains('is-open')) {
    document.body.style.overflow = '';
  }
}

function openOrderModal(id, pageSource = 'Модальное окно') {
  const form = document.getElementById('orderForm');
  const modal = document.getElementById('orderModal');
  if (!form || !modal) return;

  const equipmentInput = form.querySelector('[name="equipment"]');
  const item = id ? findCatalogItem(id) : null;

  if (item) {
    setActiveEquipment(id);
    equipmentInput.value = item.name;
  } else {
    equipmentInput.value = 'Не выбрана — перезвоним';
  }

  form.dataset.source = pageSource;

  closeModal();
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  const phoneInput = form.querySelector('[name="phone"]');
  (phoneInput?.value.trim() ? phoneInput : form.querySelector('[name="name"]'))?.focus();
}

function closeOrderModal() {
  const modal = document.getElementById('orderModal');
  if (!modal) return;

  modal.classList.remove('is-open');
  if (!document.getElementById('equipmentModal')?.classList.contains('is-open')) {
    document.body.style.overflow = '';
  }
}

function initOrderModal() {
  document.addEventListener('click', e => {
    const orderBtn = e.target.closest('[data-order]');
    if (orderBtn && !orderBtn.closest('#equipmentModal .modal__content')) {
      e.preventDefault();
      openOrderModal(orderBtn.dataset.order, orderBtn.dataset.orderFrom || 'Каталог');
      closeMobileNav();
      return;
    }

    const openOrderBtn = e.target.closest('[data-open-order]');
    if (openOrderBtn) {
      e.preventDefault();
      openOrderModal(null, openOrderBtn.dataset.orderFrom || 'Заказать звонок');
      if (openOrderBtn.hasAttribute('data-close-nav')) closeMobileNav();
    }
  });

  document.querySelectorAll('[data-close-order-modal]').forEach(el => {
    el.addEventListener('click', closeOrderModal);
  });
}

function initModal() {
  document.querySelectorAll('#equipmentModal [data-close-modal]').forEach(el => {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (document.getElementById('orderModal')?.classList.contains('is-open')) {
      closeOrderModal();
    } else {
      closeModal();
    }
  });
}

const PHONE_PREFIX = '+375 ';

function getPhoneDigits(value) {
  let digits = String(value).replace(/\D/g, '');

  if (digits.startsWith('80')) digits = '375' + digits.slice(2);
  else if (digits.startsWith('0') && digits.length > 1) digits = '375' + digits.slice(1);
  else if (digits.length > 0 && !digits.startsWith('375')) digits = '375' + digits;

  return digits.slice(0, 12);
}

function getNationalDigits(value) {
  return getPhoneDigits(value).slice(3, 12);
}

function formatNationalPhone(digits) {
  const d = digits.slice(0, 9);
  if (!d.length) return '';

  let formatted = `(${d.slice(0, 2)}`;
  if (d.length >= 3) {
    formatted += `) ${d.slice(2, 5)}`;
    if (d.length > 5) formatted += `-${d.slice(5, 7)}`;
    if (d.length > 7) formatted += `-${d.slice(7, 9)}`;
  }

  return formatted;
}

function formatBelarusPhone(value) {
  const national = getNationalDigits(value);
  return national.length ? PHONE_PREFIX + formatNationalPhone(national) : PHONE_PREFIX.trim();
}

function isValidBelarusPhone(value) {
  const digits = getPhoneDigits(value);
  return digits.length === 12 && digits.startsWith('375');
}

function initPhoneInputs(form) {
  const phoneInput = form.querySelector('[name="phone"]');
  if (!phoneInput) return;

  const applyFormat = () => {
    const national = getNationalDigits(phoneInput.value);
    phoneInput.value = national.length
      ? PHONE_PREFIX + formatNationalPhone(national)
      : PHONE_PREFIX;
  };

  phoneInput.addEventListener('focus', () => {
    if (!phoneInput.value.trim()) phoneInput.value = PHONE_PREFIX;
  });

  phoneInput.addEventListener('keydown', e => {
    const start = phoneInput.selectionStart ?? 0;
    const end = phoneInput.selectionEnd ?? 0;

    if (e.key === 'Backspace' && start <= PHONE_PREFIX.length && end <= PHONE_PREFIX.length) {
      e.preventDefault();
    }

    if (e.key === 'Delete' && start < PHONE_PREFIX.length) {
      e.preventDefault();
    }
  });

  phoneInput.addEventListener('input', applyFormat);

  phoneInput.addEventListener('blur', () => {
    if (!getNationalDigits(phoneInput.value).length) {
      phoneInput.value = '';
    } else {
      applyFormat();
    }
  });
}

async function submitLeadForm(form) {
  const phoneInput = form.querySelector('[name="phone"]');
  const phoneRaw = phoneInput?.value.trim() || '';
  const phone = formatBelarusPhone(phoneRaw);
  const name = form.querySelector('[name="name"]')?.value.trim();
  let equipment = form.querySelector('[name="equipment"]')?.value?.trim() || '';
  if (equipment.startsWith('Не выбрана')) equipment = '';
  const submitBtn = form.querySelector('[type="submit"]');

  if (!getNationalDigits(phoneRaw).length) {
    alert('Пожалуйста, укажите номер телефона');
    phoneInput?.focus();
    return;
  }

  if (!isValidBelarusPhone(phoneRaw)) {
    alert('Введите полный номер: +375 (XX) XXX-XX-XX');
    phoneInput?.focus();
    return;
  }

  if (phoneInput) phoneInput.value = phone;

  const source = form.dataset.source || 'Сайт';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.dataset.originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка…';
  }

  try {
    await sendLeadToTelegram({ name: name || '', phone, equipment, source });

    const greeting = name ? `${name}, спасибо` : 'Спасибо';
    alert(`${greeting}! Олег свяжется с вами: ${phone}.`);
    form.reset();
    if (form.id === 'orderForm') closeOrderModal();
  } catch (error) {
    console.error(error);
    const details = error?.message ? `\n\n${error.message}` : '';
    alert(`Не удалось отправить заявку. Позвоните: +375 29 128-62-17${details}`);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = submitBtn.dataset.originalText || 'Отправить';
    }
  }
}

function initForms() {
  ['#ctaForm', '#orderForm'].forEach(selector => {
    const form = document.querySelector(selector);
    if (!form) return;

    initPhoneInputs(form);
    form.addEventListener('submit', e => {
      e.preventDefault();
      submitLeadForm(form);
    });
  });
}

function initScrollButtons() {
  document.querySelectorAll('[data-scroll]').forEach(btn => {
    if (btn.hasAttribute('data-close-modal')) return;
    btn.addEventListener('click', () => {
      document.getElementById(btn.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' });
      if (btn.hasAttribute('data-close-nav')) closeMobileNav();
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
        closeMobileNav();
        return;
      }

      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      closeMobileNav();
    });
  });
}

function initMobileNav() {
  const burger = document.getElementById('headerBurger');
  const nav = document.getElementById('navMobile');
  if (!burger || !nav) return;

  const open = () => {
    nav.classList.add('is-open');
    nav.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  };

  const close = () => {
    nav.classList.remove('is-open');
    nav.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };

  closeMobileNavFn = close;

  burger.addEventListener('click', () => {
    if (nav.classList.contains('is-open')) close();
    else open();
  });

  nav.querySelectorAll('[data-close-nav]').forEach(el => {
    el.addEventListener('click', close);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
}

function closeMobileNav() {
  closeMobileNavFn?.();
}

function shortName(name) {
  return name
    .replace('Экскаватор-погрузчик ', '')
    .replace('Погрузчик-экскаватор ', '')
    .replace('Погрузчик фронтальный ', '')
    .replace('Экскаватор гусеничный ', '')
    .replace('Минипогрузчик ', '');
}
