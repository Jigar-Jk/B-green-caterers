-- Add Degs category to existing database
-- Run this script if you already have a database setup

USE b_green_caterers;

-- Insert Degs category as the first category
INSERT INTO menu_categories (name, slug, description, display_order) 
SELECT 'Degs', 'degs', 'Traditional degs dishes', 0
WHERE NOT EXISTS (
    SELECT 1 FROM menu_categories WHERE slug = 'degs'
);

-- Update display order of existing categories to make room for Degs at the top
UPDATE menu_categories 
SET display_order = display_order + 1 
WHERE slug != 'degs' AND display_order >= 0;

-- Ensure Degs has display_order of 1
UPDATE menu_categories 
SET display_order = 1 
WHERE slug = 'degs';