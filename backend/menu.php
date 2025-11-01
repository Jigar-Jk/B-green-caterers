<?php
include_once __DIR__ . '/_headers.php';
/**
 * Menu API - CRUD Operations
 * GET    /api/menu.php - Get all menu items
 * GET    /api/menu.php?id=1 - Get single item
 * POST   /api/menu.php - Create menu item
 * PUT    /api/menu.php - Update menu item
 * DELETE /api/menu.php?id=1 - Delete menu item
 */

// Enhanced CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: false');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/database.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDBConnection();

try {
    switch ($method) {
        case 'GET':
            handleGet($pdo);
            break;
        case 'POST':
            handlePost($pdo);
            break;
        case 'PUT':
            handlePut($pdo);
            break;
        case 'DELETE':
            handleDelete($pdo);
            break;
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

function handleGet($pdo) {
    $id = $_GET['id'] ?? null;
    
    if ($id) {
        $stmt = $pdo->prepare("
            SELECT mi.*, mc.name as category_name 
            FROM menu_items mi 
            LEFT JOIN menu_categories mc ON mi.category_id = mc.id 
            WHERE mi.id = ?
        ");
        $stmt->execute([$id]);
        $item = $stmt->fetch();
        
        if ($item) {
            echo json_encode($item);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Item not found']);
        }
    } else {
        $stmt = $pdo->query("
            SELECT mi.*, mc.name as category_name 
            FROM menu_items mi 
            LEFT JOIN menu_categories mc ON mi.category_id = mc.id 
            ORDER BY mc.display_order, mi.display_order, mi.name
        ");
        $items = $stmt->fetchAll();
        echo json_encode($items);
    }
}

function handlePost($pdo) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data || !isset($data['name']) || !isset($data['category_id']) || !isset($data['price'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        return;
    }
    
    $stmt = $pdo->prepare("
        INSERT INTO menu_items 
        (category_id, name, description, price, image_url, is_chefs_pick, is_popular, is_available) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");
    
    $stmt->execute([
        $data['category_id'],
        $data['name'],
        $data['description'] ?? '',
        $data['price'],
        $data['image'] ?? null,
        $data['is_chefs_pick'] ?? 0,
        $data['is_popular'] ?? 0,
        $data['is_available'] ?? 1
    ]);
    
    $itemId = $pdo->lastInsertId();
    
    $stmt = $pdo->prepare("
        SELECT mi.*, mc.name as category_name 
        FROM menu_items mi 
        LEFT JOIN menu_categories mc ON mi.category_id = mc.id 
        WHERE mi.id = ?
    ");
    $stmt->execute([$itemId]);
    $item = $stmt->fetch();
    
    http_response_code(201);
    echo json_encode($item);
}

function handlePut($pdo) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data || !isset($data['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing item ID']);
        return;
    }
    
    $updates = [];
    $params = [];
    
    if (isset($data['name'])) {
        $updates[] = 'name = ?';
        $params[] = $data['name'];
    }
    if (isset($data['category_id'])) {
        $updates[] = 'category_id = ?';
        $params[] = $data['category_id'];
    }
    if (isset($data['description'])) {
        $updates[] = 'description = ?';
        $params[] = $data['description'];
    }
    if (isset($data['price'])) {
        $updates[] = 'price = ?';
        $params[] = $data['price'];
    }
    if (isset($data['image'])) {
        $updates[] = 'image_url = ?';
        $params[] = $data['image'];
    }
    if (isset($data['is_chefs_pick'])) {
        $updates[] = 'is_chefs_pick = ?';
        $params[] = $data['is_chefs_pick'];
    }
    if (isset($data['is_popular'])) {
        $updates[] = 'is_popular = ?';
        $params[] = $data['is_popular'];
    }
    if (isset($data['is_available'])) {
        $updates[] = 'is_available = ?';
        $params[] = $data['is_available'];
    }
    
    if (empty($updates)) {
        http_response_code(400);
        echo json_encode(['error' => 'No fields to update']);
        return;
    }
    
    $params[] = $data['id'];
    $sql = "UPDATE menu_items SET " . implode(', ', $updates) . " WHERE id = ?";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    
    $stmt = $pdo->prepare("
        SELECT mi.*, mc.name as category_name 
        FROM menu_items mi 
        LEFT JOIN menu_categories mc ON mi.category_id = mc.id 
        WHERE mi.id = ?
    ");
    $stmt->execute([$data['id']]);
    $item = $stmt->fetch();
    
    echo json_encode($item);
}

function handleDelete($pdo) {
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing item ID']);
        return;
    }
    
    try {
        // Start transaction to ensure complete deletion
        $pdo->beginTransaction();
        
        // Get item details before deletion (for image cleanup if needed)
        $stmt = $pdo->prepare("SELECT image_url FROM menu_items WHERE id = ?");
        $stmt->execute([$id]);
        $item = $stmt->fetch();
        
        if (!$item) {
            $pdo->rollBack();
            http_response_code(404);
            echo json_encode(['error' => 'Item not found']);
            return;
        }
        
        // Delete the menu item (this will completely remove it from database)
        $deleteStmt = $pdo->prepare("DELETE FROM menu_items WHERE id = ?");
        $deleteStmt->execute([$id]);
        
        // Commit transaction
        $pdo->commit();
        
        // Optional: Clean up image file if it exists and is stored locally
        if ($item['image_url'] && strpos($item['image_url'], '/uploads/') !== false) {
            $imagePath = __DIR__ . '/../uploads/' . basename($item['image_url']);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }
        
        echo json_encode([
            'success' => true, 
            'message' => 'Item completely deleted from database',
            'deleted_id' => $id
        ]);
        
    } catch (Exception $e) {
        $pdo->rollBack();
        throw $e;
    }
}
