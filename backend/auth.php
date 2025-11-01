<?php
include_once __DIR__ . '/_headers.php';
/**
 * Admin Authentication API
 * POST /api/auth.php - Login
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

require_once __DIR__ . '/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data || !isset($data['email']) || !isset($data['password'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Email and password are required']);
        exit();
    }
    
    $pdo = getDBConnection();
    
    // Get admin user by email
    $stmt = $pdo->prepare("
        SELECT id, email, password, name, is_active 
        FROM admin_users 
        WHERE email = ? AND is_active = TRUE
    ");
    $stmt->execute([$data['email']]);
    $user = $stmt->fetch();
    
    if (!$user) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid email or password']);
        exit();
    }
    
    // Verify password
    if (!password_verify($data['password'], $user['password'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid email or password']);
        exit();
    }
    
    // Update last login
    $updateStmt = $pdo->prepare("UPDATE admin_users SET last_login = NOW() WHERE id = ?");
    $updateStmt->execute([$user['id']]);
    
    // Return success with user data (without password)
    echo json_encode([
        'success' => true,
        'user' => [
            'id' => $user['id'],
            'email' => $user['email'],
            'name' => $user['name']
        ]
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
