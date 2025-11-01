<?php
/**
 * Main API Entry Point
 * Routes requests to appropriate endpoints
 */

// Include headers for CORS
include_once __DIR__ . '/_headers.php';

// Get the request URI and method
$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Remove query string and decode URI
$path = parse_url($requestUri, PHP_URL_PATH);
$path = urldecode($path);

// Remove /backend/ prefix if present
$path = preg_replace('/^\/backend/', '', $path);

// Route to appropriate endpoint
switch ($path) {
    case '/auth':
    case '/auth.php':
        include __DIR__ . '/auth.php';
        break;
        
    case '/menu':
    case '/menu.php':
        include __DIR__ . '/menu.php';
        break;
        
    case '/categories':
    case '/categories.php':
        include __DIR__ . '/categories.php';
        break;
        
    case '/upload':
    case '/upload.php':
        include __DIR__ . '/upload.php';
        break;
        
    case '/admin-maintenance':
    case '/admin-maintenance.php':
        include __DIR__ . '/admin-maintenance.php';
        break;
        
    case '/verify':
    case '/verify.php':
        include __DIR__ . '/verify.php';
        break;
        
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
        break;
}
?>