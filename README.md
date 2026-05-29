# ТопАгроБел — сайт аренды спецтехники

Обычный сайт: HTML, CSS, JavaScript + PHP для заявок в Telegram.

## Заявки в Telegram

По умолчанию форсхема как в TopBuilding: прямой запрос из браузера к Telegram API.

1. Скопируйте `js/config.example.js` → `js/config.js`
2. Укажите `BOT_TOKEN` бота **@ARENDA_TECHNIKI_bot** и `CHAT_ID` группы
3. **Загрузите `js/config.js` на хостинг** (файл в `.gitignore`, в Git его нет)

Откройте сайт через веб-сервер (Live Server, хостинг), не через `file://`.

### PHP-прокси (опционально)

Если не хотите хранить токен в браузере, раскомментируйте в `config.js`:

```js
const LEAD_ENDPOINT = 'api/send-lead.php';
```

И настройте `api/telegram-config.php` (см. `api/telegram-config.example.php`).

### Локальная проверка

Live Server в VS Code / Cursor или:

```bash
npx serve .
```
