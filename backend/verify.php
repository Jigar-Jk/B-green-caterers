<?php
/**
 * Production Deployment Verification Script
 * Upload this to public_html/api/verify.php and run it to check deployment
 */

echo "<h1>🔧 B Green Caterers - Production Verification</h1>";

echo "<h2>1. Environment Check</h2>";
echo "<strong>PHP Version:</strong> " . phpversion() . "<br>";
echo "<strong>Server:</strong> " . $_SERVER['SERVER_SOFTWARE'] . "<br>";
echo "<strong>Document Root:</strong> " . $_SERVER['DOCUMENT_ROOT'] . "<br>";

echo "<h2>2. File Structure Check</h2>";

// Check if required files exist
$requiredFiles = [
    '../index.html' => 'Frontend index.html',
    '../.htaccess' => 'Frontend .htaccess',
    './.htaccess' => 'Backend .htaccess',
    './.env' => 'Backend .env file',
    './database.php' => 'Database config',
    './auth.php' => 'Auth API',
    './menu.php' => 'Menu API',
    './categories.php' => 'Categories API'
];

foreach ($requiredFiles as $file => $description) {
    $status = file_exists($file) ? "✅ EXISTS" : "❌ MISSING";
    echo "<strong>$description:</strong> $status<br>";
}

echo "<h2>3. Environment Variables Check</h2>";
if (file_exists('./.env')) {
    echo "✅ .env file found<br>";
    
    // Load .env
    $envContent = file_get_contents('./.env');
    $hasDbHost = strpos($envContent, 'DB_HOST') !== false;
    $hasDbName = strpos($envContent, 'DB_NAME') !== false;
    $hasDbUser = strpos($envContent, 'DB_USER') !== false;
    $hasDbPass = strpos($envContent, 'DB_PASS') !== false;
    
    echo "<strong>DB_HOST defined:</strong> " . ($hasDbHost ? "✅ YES" : "❌ NO") . "<br>";
    echo "<strong>DB_NAME defined:</strong> " . ($hasDbName ? "✅ YES" : "❌ NO") . "<br>";
    echo "<strong>DB_USER defined:</strong> " . ($hasDbUser ? "✅ YES" : "❌ NO") . "<br>";
    echo "<strong>DB_PASS defined:</strong> " . ($hasDbPass ? "✅ YES" : "❌ NO") . "<br>";
} else {
    echo "❌ .env file not found<br>";
}

echo "<h2>4. Database Connection Test</h2>";
try {
    require_once './database.php';
    $pdo = getDBConnection();
    echo "✅ Database connection successful!<br>";
    
    // Check if tables exist
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    echo "<strong>Tables found:</strong> " . implode(', ', $tables) . "<br>";
    
    // Check admin users
    if (in_array('admin_users', $tables)) {
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM admin_users");
        $adminCount = $stmt->fetch()['count'];
        echo "<strong>Admin users:</strong> $adminCount found<br>";
    }
    
} catch (Exception $e) {
    echo "❌ Database connection failed: " . $e->getMessage() . "<br>";
}

echo "<h2>5. API Endpoints Test</h2>";

// Test menu endpoint
echo "<strong>Menu API:</strong> ";
try {
    $menuContent = file_get_contents($_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . '/api/menu.php');
    $isJson = json_decode($menuContent) !== null;
    echo $isJson ? "✅ Working (JSON response)" : "❌ Not working (HTML response)";
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage();
}
echo "<br>";

echo "<h2>✅ Verification Complete</h2>";
echo "<p>If all items show ✅, your deployment is ready!</p>";
echo "<p><strong>Admin Login:</strong> <a href='/admin'>https://bgreencaterers.com/admin</a></p>";
echo "<p><strong>Credentials:</strong> admin@bgcaterers.com / admin123</p>";
?>