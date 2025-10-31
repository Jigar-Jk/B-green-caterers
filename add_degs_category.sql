-- Run this script in phpMyAdmin or MySQL to add Degs category
-- This will ensure Degs appears in admin panel dropdown

USE b_green_caterers;

-- Add Degs category if it doesn't exist
INSERT IGNORE INTO menu_categories (name, slug, description, display_order) VALUES
('Degs', 'degs', 'Traditional degs dishes', 1);

-- Update display order to make sure Degs is first
UPDATE menu_categories SET display_order = display_order + 1 WHERE slug != 'degs';
UPDATE menu_categories SET display_order = 1 WHERE slug = 'degs';

-- Check current categories
SELECT id, name, slug, display_order FROM menu_categories ORDER BY display_order;