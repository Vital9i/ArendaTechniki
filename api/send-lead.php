<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$configPath = __DIR__ . '/telegram-config.php';
if (!file_exists($configPath)) {
    http_response_code(503);
    echo json_encode(['ok' => false, 'error' => 'Создайте api/telegram-config.php']);
    exit;
}

$config = require $configPath;
$botToken = trim($config['bot_token'] ?? '');
$chatId = trim($config['chat_id'] ?? '');

if (!$botToken || !$chatId || str_contains($botToken, 'YOUR_')) {
    http_response_code(503);
    echo json_encode(['ok' => false, 'error' => 'Укажите bot_token и chat_id в api/telegram-config.php']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

$name = trim((string)($data['name'] ?? ''));
$phoneRaw = trim((string)($data['phone'] ?? ''));
$phoneDigits = preg_replace('/\D/', '', $phoneRaw);
$equipment = trim((string)($data['equipment'] ?? ''));
$source = trim((string)($data['source'] ?? 'Сайт'));
$source = preg_replace('/\s*Источник:\s*.+$/iu', '', $source);
$host = preg_replace('/^www\./', '', $_SERVER['HTTP_HOST'] ?? '');
$isLocalHost = $host === ''
    || $host === 'localhost'
    || $host === '127.0.0.1'
    || $host === '[::1]'
    || $host === '::1'
    || str_ends_with(strtolower($host), '.local');
if ($host !== '' && !$isLocalHost && stripos($source, $host) === false) {
    $source = $source !== '' ? "{$source} · {$host}" : $host;
}

if (strlen($phoneDigits) < 9) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Укажите корректный телефон']);
    exit;
}

$nameLine = $name !== '' ? htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') : 'не указано';
$phoneLine = htmlspecialchars('+' . $phoneDigits, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$sourceLine = htmlspecialchars($source, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$time = (new DateTime('now', new DateTimeZone('Europe/Minsk')))->format('d.m.Y H:i');

$message = "🔔 <b>Новая заявка с сайта АРЕНДА!</b>\n\n";
$message .= "👤 <b>Имя:</b> {$nameLine}\n";
$message .= "📱 <b>Телефон:</b> {$phoneLine}\n";

if ($equipment !== '') {
    $equipmentLine = htmlspecialchars($equipment, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $message .= "🚜 <b>Техника:</b> {$equipmentLine}\n";
}

$message .= "📍 <b>Источник:</b> {$sourceLine}\n";
$message .= "🕐 <b>Время:</b> {$time}";

$payload = json_encode([
    'chat_id' => $chatId,
    'text' => $message,
    'parse_mode' => 'HTML',
    'disable_web_page_preview' => true,
], JSON_UNESCAPED_UNICODE);

$context = stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/json\r\n",
        'content' => $payload,
        'timeout' => 15,
        'ignore_errors' => true,
    ],
]);

$response = file_get_contents("https://api.telegram.org/bot{$botToken}/sendMessage", false, $context);
$result = json_decode($response ?: '', true);

if (!$result || empty($result['ok'])) {
    http_response_code(502);
    echo json_encode([
        'ok' => false,
        'error' => $result['description'] ?? 'Ошибка Telegram API',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
