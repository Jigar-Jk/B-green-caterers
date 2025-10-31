<?php
/**
 * Categories API
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/database.php';

try {
    $pdo = getDBConnection();
    
    $stmt = $pdo->query("
        SELECT id, name, slug, description, display_order
        FROM menu_categories 
        WHERE is_active = TRUE
        ORDER BY display_order, name
    ");
    
    $categories = $stmt->fetchAll();
    echo json_encode($categories);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
