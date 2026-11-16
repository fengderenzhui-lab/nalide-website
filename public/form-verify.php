<?php
// SPDX-FileCopyrightText: 2026 NALIDE
// SPDX-License-Identifier: MIT
// NALIDE contact-form gate: verifies a Cloudflare Turnstile token
// server-side and rate-limits attempts per visitor IP.
// The browser POSTs {"token": "..."} here before the form hands the
// visitor to their mail app. The Turnstile secret lives outside the
// webroot (/www/turnstile/secret.txt) and never ships with this file.
declare(strict_types=1);

function respond(int $code, array $body): void
{
    http_response_code($code);
    header('Content-Type: application/json');
    header('Cache-Control: no-store');
    echo json_encode($body);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

$raw = file_get_contents('php://input', false, null, 0, 4096);
$data = json_decode((string) $raw, true);
$token = is_array($data) ? (string) ($data['token'] ?? '') : '';
if ($token === '' || strlen($token) > 2048) {
    respond(400, ['ok' => false, 'error' => 'bad_request']);
}

$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');

// Rate limit: at most 5 verification attempts per 10 minutes per IP.
$limitDir = '/www/turnstile/ratelimit';
$limitFile = $limitDir . '/' . hash('sha256', $ip) . '.json';
$now = time();
$fp = @fopen($limitFile, 'c+');
if ($fp !== false) {
    flock($fp, LOCK_EX);
    $stored = stream_get_contents($fp);
    $stamps = json_decode((string) $stored, true);
    if (!is_array($stamps)) {
        $stamps = [];
    }
    $stamps = array_values(array_filter(
        $stamps,
        static fn ($t) => is_int($t) && $t > $now - 600
    ));
    if (count($stamps) >= 5) {
        flock($fp, LOCK_UN);
        fclose($fp);
        respond(429, ['ok' => false, 'error' => 'rate_limited']);
    }
    $stamps[] = $now;
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($stamps));
    flock($fp, LOCK_UN);
    fclose($fp);
}

$secret = trim((string) @file_get_contents('/www/turnstile/secret.txt'));
if ($secret === '') {
    respond(500, ['ok' => false, 'error' => 'server_misconfigured']);
}

$ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query([
        'secret' => $secret,
        'response' => $token,
        'remoteip' => $ip,
    ]),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
]);
$result = curl_exec($ch);
curl_close($ch);
if ($result === false) {
    respond(502, ['ok' => false, 'error' => 'verification_unreachable']);
}
$verdict = json_decode((string) $result, true);
$ok = is_array($verdict) && ($verdict['success'] ?? false) === true;
respond($ok ? 200 : 403, ['ok' => $ok]);
