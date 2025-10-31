<?php
// Add Degs category to database
// Visit: http://localhost/B-green-caterers-1/add_degs.php

header('Content-Type: text/html; charset=UTF-8');
echo "<!DOCTYPE html><html><head><title>Add Degs Category</title></head><body>";
echo "<h2>Adding Degs Category to Database</h2>";

try {
    // Connect to database
    $pdo = new PDO('mysql:host=localhost;dbname=b_green_caterers', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Check if Degs already exists
    $checkStmt = $pdo->prepare("SELECT id FROM menu_categories WHERE slug = 'degs'");
    $checkStmt->execute();
    
    if ($checkStmt->rowCount() > 0) {
        echo "<p style='color: orange;'>✓ Degs category already exists!</p>";
    } else {
        // Add Degs category
        $insertStmt = $pdo->prepare("INSERT INTO menu_categories (name, slug, description, display_order) VALUES (?, ?, ?, ?)");
        $insertStmt->execute(['Degs', 'degs', 'Traditional degs dishes', 1]);
        echo "<p style='color: green;'>✓ Degs category added successfully!</p>";
    }
    
    // Update display order to ensure Degs is first
    $pdo->exec("UPDATE menu_categories SET display_order = display_order + 1 WHERE slug != 'degs'");
    $pdo->exec("UPDATE menu_categories SET display_order = 1 WHERE slug = 'degs'");
    
    echo "<p style='color: green;'>✓ Display order updated - Degs is now first!</p>";
    
    // Show current categories
    $stmt = $pdo->query("SELECT id, name, slug, display_order FROM menu_categories ORDER BY display_order");
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "<h3>Current Categories (in order):</h3><ol>";
    foreach ($categories as $cat) {
        $highlight = ($cat['slug'] === 'degs') ? ' style="color: blue; font-weight: bold;"' : '';
        echo "<li{$highlight}>" . htmlspecialchars($cat['name']) . " (ID: {$cat['id']})</li>";
    }
    echo "</ol>";
    
    echo "<h3 style='color: green;'>✅ SUCCESS!</h3>";
    echo "<p><strong>Now refresh your admin panel and you should see 'Degs' in the category dropdown!</strong></p>";
    echo "<p><strong>Users will also see 'Degs' first when they visit the menu page!</strong></p>";
    
} catch (PDOException $e) {
    echo "<p style='color: red;'>❌ Database Error: " . htmlspecialchars($e->getMessage()) . "</p>";
    
    if (strpos($e->getMessage(), "Unknown database") !== false) {
        echo "<p style='color: orange;'>The database 'b_green_caterers' doesn't exist yet.</p>";
        echo "<p>Please run the full schema.sql file first to create the database and tables.</p>";
    }
} catch (Exception $e) {
    echo "<p style='color: red;'>❌ Error: " . htmlspecialchars($e->getMessage()) . "</p>";
}

echo "</body></html>";
?>