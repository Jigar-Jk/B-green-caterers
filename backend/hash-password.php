<?php
/**
 * Helper script to generate password hash
 * Run: php hash-password.php
 */

$password = 'admin123';
$hash = password_hash($password, PASSWORD_DEFAULT);

echo "Password: $password\n";
echo "Hash: $hash\n";
echo "\nCopy this hash and use it in the INSERT statement:\n";
echo "INSERT INTO admin_users (email, password, name) VALUES\n";
echo "('admin@bgcaterers.com', '$hash', 'Admin User');\n";
