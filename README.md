# ТОПАГРОБЕЛ — сайт аренды спецтехники

## Выгрузка на хостинг

### 1. Загрузите файлы

Структура на сервере (в корень домена `topagrobel.by`):

```
index.html
.htaccess
css/style.css
js/main.js
js/equipment.js
js/map.js
js/telegram.js
js/config.js          ← обязательно (см. ниже)
images/               ← всю папку
api/                  ← если используете PHP-прокси
```

**Не загружайте:** `.git`, `.env`, `node_modules`, `.env.example`, `js/config.example.js`, `api/telegram-config.example.php`.

Неиспользуемые картинки (можно не заливать): `images/Crashed.webp`, `images/All.webp`, `images/image 4 .webp`.

### 2. Заявки в Telegram (обязательно)

Файл `js/config.js` **не в Git** — создайте на сервере:

1. Скопируйте `js/config.example.js` → `js/config.js`
2. Укажите `BOT_TOKEN` бота **@ARENDA_TECHNIKI_bot** и `CHAT_ID` группы `-1003248332317`

Сайт должен открываться по **https://**, не `file://`.

### 3. Яндекс.Карта (желательно)

В `js/map.js` укажите ключ API: [developer.tech.yandex.ru](https://developer.tech.yandex.ru/) → переменная `YANDEX_MAPS_API_KEY`.

Без ключа карта может не загрузиться на части хостингов.

### 4. PHP-прокси (опционально)

Если не хотите хранить токен в браузере:

1. `api/telegram-config.example.php` → `api/telegram-config.php` (токен и chat_id)
2. В `js/config.js` раскомментируйте: `const LEAD_ENDPOINT = 'api/send-lead.php';`

### 5. Проверка после выгрузки

- [ ] Главная открывается по HTTPS
- [ ] Картинки открываются по URL без кириллицы (проверьте 2–3 в браузере)
- [ ] Тестовая заявка из формы «Остались вопросы?»
- [ ] Тестовая заявка из «Заказать» в каталоге
- [ ] Карта и маркеры
- [ ] Мобилка: меню, скрытие шапки, нижняя панель звонка

### Локальная проверка

```bash
npx serve .
```
