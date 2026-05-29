function escapeTelegramHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildLeadSource(pageSource) {
  let source = String(pageSource || 'Сайт').trim();
  source = source.replace(/\s*Источник:\s*.+$/i, '').trim();

  const site = (location.hostname || 'topagrobel.by').replace(/^www\./, '');
  if (!site || source.includes(site)) return source;

  return `${source} · ${site}`;
}

async function sendLeadToTelegram({ name, phone, equipment, source }) {
  const useProxy = typeof LEAD_ENDPOINT === 'string'
    && LEAD_ENDPOINT.length > 0
    && (typeof TELEGRAM_CONFIG === 'undefined'
      || !TELEGRAM_CONFIG.BOT_TOKEN
      || TELEGRAM_CONFIG.BOT_TOKEN.includes('YOUR_'));

  const payload = {
    name,
    phone,
    equipment,
    source: buildLeadSource(source)
  };

  if (useProxy) {
    return sendLeadViaProxy(payload);
  }

  return sendLeadViaTelegram(payload);
}

async function sendLeadViaProxy({ name, phone, equipment, source }) {
  const endpoint = LEAD_ENDPOINT || 'api/send-lead.php';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, equipment, source })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.ok) {
    throw new Error(data.error || 'Ошибка отправки через сервер');
  }

  return data;
}

async function sendLeadViaTelegram({ name, phone, equipment, source }) {
  if (typeof TELEGRAM_CONFIG === 'undefined') {
    throw new Error('Не найден js/config.js — скопируйте js/config.example.js');
  }

  if (!TELEGRAM_CONFIG.BOT_TOKEN || TELEGRAM_CONFIG.BOT_TOKEN.includes('YOUR_')) {
    throw new Error('Укажите BOT_TOKEN в js/config.js');
  }

  if (!TELEGRAM_CONFIG.CHAT_ID) {
    throw new Error('Укажите CHAT_ID в js/config.js');
  }

  const nameLine = name?.trim() ? escapeTelegramHtml(name.trim()) : 'не указано';
  const sourceLine = escapeTelegramHtml(source);
  const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Minsk' });

  let message = `🔔 <b>Новая заявка с сайта ТОПАГРОБЕЛ!</b>\n\n`
    + `👤 <b>Имя:</b> ${nameLine}\n`
    + `📱 <b>Телефон:</b> ${escapeTelegramHtml(phone)}\n`;

  if (equipment?.trim() && !equipment.startsWith('Не выбрана')) {
    message += `🚜 <b>Техника:</b> ${escapeTelegramHtml(equipment.trim())}\n`;
  }

  message += `📍 <b>Источник:</b> ${sourceLine}\n`
    + `🕐 <b>Время:</b> ${time}`;

  const url = `https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CONFIG.CHAT_ID,
      text: message,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.ok) {
    throw new Error(data.description || 'Ошибка Telegram API');
  }

  return data;
}
