<?php
// Common headers for API responses
// Sets JSON content type and basic CORS for the production domain.
// Update the ALLOWED_ORIGIN constant if you need to allow additional origins.
define('ALLOWED_ORIGIN', 'https://bgreencaterers.com');

header('Content-Type: application/json; charset=utf-8');
// Allow the production frontend origin. For testing you can use '*'.
header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle OPTIONS preflight requests quickly
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit(0);
}

// Small helper: send JSON error and exit
function api_error($message, $code = 400) {
    http_response_code($code);
    echo json_encode(['error' => $message]);
    exit;
}
