<?php
include_once __DIR__ . '/_headers.php';
/**
 * Admin Maintenance API
 * Complete deletion and cleanup operations
 * DELETE /api/admin-maintenance.php?action=delete_all_items - Delete all menu items
 * DELETE /api/admin-maintenance.php?action=reset_database - Reset entire database
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
$action = $_GET['action'] ?? null;

// Only allow DELETE method for safety
if ($method !== 'DELETE') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Only DELETE is supported.']);
    exit();
}

try {
    $pdo = getDBConnection();
    
    switch ($action) {
        case 'delete_all_items':
            deleteAllMenuItems($pdo);
            break;
        case 'reset_database':
            resetDatabase($pdo);
            break;
        case 'cleanup_orphaned':
            cleanupOrphanedRecords($pdo);
            break;
        default:
            http_response_code(400);
            echo json_encode(['error' => 'Invalid action. Supported: delete_all_items, reset_database, cleanup_orphaned']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

function deleteAllMenuItems($pdo) {
    try {
        $pdo->beginTransaction();
        
        // Get count before deletion
        $countStmt = $pdo->query("SELECT COUNT(*) as count FROM menu_items");
        $count = $countStmt->fetch()['count'];
        
        // Delete all menu items
        $pdo->exec("DELETE FROM menu_items");
        
        // Reset auto increment
        $pdo->exec("ALTER TABLE menu_items AUTO_INCREMENT = 1");
        
        $pdo->commit();
        
        echo json_encode([
            'success' => true,
            'message' => 'All menu items completely deleted from database',
            'deleted_count' => $count
        ]);
        
    } catch (Exception $e) {
        $pdo->rollBack();
        throw $e;
    }
}

function resetDatabase($pdo) {
    try {
        $pdo->beginTransaction();
        
        // Disable foreign key checks temporarily
        $pdo->exec("SET FOREIGN_KEY_CHECKS = 0");
        
        // Get counts before deletion
        $itemsCount = $pdo->query("SELECT COUNT(*) as count FROM menu_items")->fetch()['count'];
        $categoriesCount = $pdo->query("SELECT COUNT(*) as count FROM menu_categories")->fetch()['count'];
        
        // Truncate tables
        $pdo->exec("TRUNCATE TABLE menu_items");
        $pdo->exec("TRUNCATE TABLE menu_categories");
        
        // Re-enable foreign key checks
        $pdo->exec("SET FOREIGN_KEY_CHECKS = 1");
        
        // Reinsert default categories
        $pdo->exec("
            INSERT INTO menu_categories (name, slug, description, display_order) VALUES
            ('Degs', 'degs', 'Traditional degs dishes', 1),
            ('Starters', 'starters', 'Appetizers and starters', 2),
            ('Chicken', 'chicken', 'Chicken dishes', 3),
            ('Mutton', 'mutton', 'Mutton specialties', 4),
            ('Seafood', 'seafood', 'Fresh seafood dishes', 5),
            ('Combos', 'combos', 'Combination meals', 6),
            ('Desserts', 'desserts', 'Sweet endings', 7)
        ");
        
        $pdo->commit();
        
        echo json_encode([
            'success' => true,
            'message' => 'Database completely reset with default categories',
            'deleted_items' => $itemsCount,
            'deleted_categories' => $categoriesCount,
            'restored_categories' => 7
        ]);
        
    } catch (Exception $e) {
        $pdo->rollBack();
        throw $e;
    }
}

function cleanupOrphanedRecords($pdo) {
    try {
        $pdo->beginTransaction();
        
        // Find orphaned menu items
        $orphanedStmt = $pdo->query("
            SELECT COUNT(*) as count FROM menu_items mi
            LEFT JOIN menu_categories mc ON mi.category_id = mc.id
            WHERE mc.id IS NULL
        ");
        $orphanedCount = $orphanedStmt->fetch()['count'];
        
        // Delete orphaned records
        $pdo->exec("
            DELETE mi FROM menu_items mi
            LEFT JOIN menu_categories mc ON mi.category_id = mc.id
            WHERE mc.id IS NULL
        ");
        
        $pdo->commit();
        
        echo json_encode([
            'success' => true,
            'message' => 'Orphaned records cleaned up',
            'cleaned_count' => $orphanedCount
        ]);
        
    } catch (Exception $e) {
        $pdo->rollBack();
        throw $e;
    }
}
?>