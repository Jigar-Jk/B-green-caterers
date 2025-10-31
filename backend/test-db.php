<?php
/**
 * Test database connection and check admin users
 */

require_once __DIR__ . '/config/database.php';

try {
    $pdo = getDBConnection();
    echo "✓ Database connection successful!\n\n";
    
    // Check if admin_users table exists
    $stmt = $pdo->query("SHOW TABLES LIKE 'admin_users'");
    $tableExists = $stmt->fetch();
    
    if (!$tableExists) {
        echo "✗ Table 'admin_users' does not exist!\n";
        echo "Please run the schema.sql file in phpMyAdmin\n";
        exit;
    }
    
    echo "✓ Table 'admin_users' exists\n\n";
    
    // Get all admin users
    $stmt = $pdo->query("SELECT id, email, name, is_active, created_at FROM admin_users");
    $users = $stmt->fetchAll();
    
    if (empty($users)) {
        echo "✗ No admin users found!\n";
        echo "Please insert the default admin user:\n";
        echo "INSERT INTO admin_users (email, password, name) VALUES\n";
        echo "('admin@bgcaterers.com', '\$2y\$10\$JLkAM6D.1d85hNrGzHyng.m0XxqIGv6AKoe.9FqVzseEw8JRs/KWi', 'Admin User');\n";
    } else {
        echo "✓ Found " . count($users) . " admin user(s):\n\n";
        foreach ($users as $user) {
            echo "ID: {$user['id']}\n";
            echo "Email: {$user['email']}\n";
            echo "Name: {$user['name']}\n";
            echo "Active: " . ($user['is_active'] ? 'Yes' : 'No') . "\n";
            echo "Created: {$user['created_at']}\n";
            echo "---\n";
        }
        
        // Test password verification
        echo "\nTesting password verification...\n";
        $stmt = $pdo->prepare("SELECT password FROM admin_users WHERE email = ?");
        $stmt->execute(['admin@bgcaterers.com']);
        $user = $stmt->fetch();
        
        if ($user) {
            $testPassword = 'admin123';
            $isValid = password_verify($testPassword, $user['password']);
            echo "Password 'admin123' verification: " . ($isValid ? '✓ VALID' : '✗ INVALID') . "\n";
        }
    }
    
} catch (Exception $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
}
