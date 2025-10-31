-- Database Maintenance Script
-- Use this script for maintenance and complete data cleanup

USE b_green_caterers;

-- Function to completely delete all menu items (use with caution)
-- TRUNCATE TABLE menu_items;

-- Function to completely delete all categories and items (use with extreme caution)
-- SET FOREIGN_KEY_CHECKS = 0;
-- TRUNCATE TABLE menu_items;
-- TRUNCATE TABLE menu_categories;
-- SET FOREIGN_KEY_CHECKS = 1;

-- Reset auto increment counters
-- ALTER TABLE menu_items AUTO_INCREMENT = 1;
-- ALTER TABLE menu_categories AUTO_INCREMENT = 1;

-- Check database integrity
SELECT 
    'menu_categories' as table_name,
    COUNT(*) as total_records,
    COUNT(CASE WHEN is_active = TRUE THEN 1 END) as active_records
FROM menu_categories
UNION ALL
SELECT 
    'menu_items' as table_name,
    COUNT(*) as total_records,
    COUNT(CASE WHEN is_available = TRUE THEN 1 END) as active_records  
FROM menu_items;

-- Check orphaned records (menu items without valid categories)
SELECT mi.id, mi.name, mi.category_id
FROM menu_items mi
LEFT JOIN menu_categories mc ON mi.category_id = mc.id
WHERE mc.id IS NULL;

-- Clean up orphaned records automatically
-- DELETE mi FROM menu_items mi
-- LEFT JOIN menu_categories mc ON mi.category_id = mc.id
-- WHERE mc.id IS NULL;