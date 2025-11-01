<?php
include_once __DIR__ . '/_headers.php';
/**
 * Image Upload API
 */

// Enhanced CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: false');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

try {
    if (!isset($_FILES['image'])) {
        http_response_code(400);
        echo json_encode(['error' => 'No image file provided']);
        exit();
    }
    
    $file = $_FILES['image'];
    
    // Validate
    $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    $maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!in_array($file['type'], $allowedTypes)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid file type']);
        exit();
    }
    
    if ($file['size'] > $maxSize) {
        http_response_code(400);
        echo json_encode(['error' => 'File too large. Max 5MB']);
        exit();
    }
    
    // Generate filename
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = 'menu_' . time() . '_' . uniqid() . '.' . $extension;
    
    // Upload directory - for production (Hostinger: public_html/images/)
    // Try production path first (one level up from api/ folder)
    $uploadDir = __DIR__ . '/../images/';
    
    // Fallback to alternative path if production path doesn't exist
    if (!file_exists($uploadDir)) {
        // Try local development path
        $uploadDir = __DIR__ . '/../../frontend/public/images/';
    }
    
    // Create directory if it doesn't exist
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    $uploadPath = $uploadDir . $filename;
    
    // Check if directory is writable
    if (!is_writable($uploadDir)) {
        http_response_code(500);
        echo json_encode([
            'error' => 'Upload directory is not writable',
            'debug' => [
                'uploadDir' => $uploadDir,
                'exists' => file_exists($uploadDir),
                'writable' => is_writable($uploadDir)
            ]
        ]);
        exit();
    }
    
    if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
        // Verify file was actually saved
        if (file_exists($uploadPath)) {
            echo json_encode([
                'success' => true,
                'filename' => $filename,
                'url' => '/images/' . $filename,
                'path' => $uploadPath
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'File upload completed but file not found at destination']);
        }
    } else {
        http_response_code(500);
        $errorMsg = 'Failed to save image';
        if (!empty($file['error'])) {
            $errorMsg .= ': ' . $file['error'];
        }
        echo json_encode([
            'error' => $errorMsg,
            'debug' => [
                'tmp_name' => $file['tmp_name'],
                'uploadPath' => $uploadPath,
                'uploadDir' => $uploadDir,
                'php_errors' => error_get_last()
            ]
        ]);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => $e->getMessage(),
        'trace' => $e->getTraceAsString()
    ]);
}
