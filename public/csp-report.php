<?php
// SPDX-FileCopyrightText: 2026 NALIDE
// SPDX-License-Identifier: MIT
// NALIDE CSP violation report collector.
// Browsers POST violation reports here (CSP report-uri / report-to).
// Appends one JSON line per report to a log outside the webroot and returns 204.
declare(strict_types=1);

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    exit;
}

$body = file_get_contents('php://input', false, null, 0, 65536);
if ($body === false || $body === '') {
    http_response_code(204);
    exit;
}

$entry = json_encode([
    'time' => gmdate('c'),
    'ip'   => $_SERVER['REMOTE_ADDR'] ?? '',
    'ua'   => substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 200),
    'body' => $body,
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

$logFile = '/www/csp-reports/csp-reports.log';
if ($entry !== false && is_dir(dirname($logFile)) && is_writable(dirname($logFile))) {
    @file_put_contents($logFile, $entry . "\n", FILE_APPEND | LOCK_EX);
}

http_response_code(204);
