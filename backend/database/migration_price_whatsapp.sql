-- Migration to allow WhatsApp as price option
-- This changes the price column from DECIMAL to VARCHAR to support both numeric and text values

USE b_green_caterers;

-- Modify the price column to VARCHAR to support "WhatsApp" text
ALTER TABLE menu_items 
MODIFY COLUMN price VARCHAR(50) NOT NULL;

-- Update any existing NULL or invalid prices to 0.00
UPDATE menu_items 
SET price = '0.00' 
WHERE price IS NULL OR price = '';

-- Note: Existing numeric prices will be automatically converted to strings
-- Example: 250.00 becomes "250.00"
-- New items can now have price = "WhatsApp" or numeric values like "350.00"
