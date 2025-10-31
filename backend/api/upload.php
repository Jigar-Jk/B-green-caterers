<?php
/**
 * Image Upload API
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

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
    
    // Upload directory
    $uploadDir = __DIR__ . '/../../public/images/';
    
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    $uploadPath = $uploadDir . $filename;
    
    if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
        echo json_encode([
            'success' => true,
            'filename' => $filename,
            'url' => '/images/' . $filename
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save image']);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
