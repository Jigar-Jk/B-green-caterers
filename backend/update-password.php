<?php
/**
 * Update admin password in database
 */

require_once __DIR__ . '/config/database.php';

$email = 'admin@bgcaterers.com';
$password = 'admin123';
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

try {
    $pdo = getDBConnection();
    
    // Update password
    $stmt = $pdo->prepare("UPDATE admin_users SET password = ? WHERE email = ?");
    $stmt->execute([$hashedPassword, $email]);
    
    echo "✓ Password updated successfully!\n";
    echo "Email: $email\n";
    echo "Password: $password\n";
    echo "Hash: $hashedPassword\n\n";
    
    // Verify it works
    $stmt = $pdo->prepare("SELECT password FROM admin_users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    $isValid = password_verify($password, $user['password']);
    echo "Verification: " . ($isValid ? '✓ SUCCESS' : '✗ FAILED') . "\n";
    
} catch (Exception $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
}
