-- Migration to add is_chefs_pick and is_popular columns
-- Run this in phpMyAdmin after importing the base schema

USE b_green_caterers;

-- Add new columns
ALTER TABLE menu_items 
ADD COLUMN is_chefs_pick BOOLEAN DEFAULT FALSE AFTER is_available,
ADD COLUMN is_popular BOOLEAN DEFAULT FALSE AFTER is_chefs_pick;

-- Add indexes for better performance
ALTER TABLE menu_items 
ADD INDEX idx_chefs_pick (is_chefs_pick),
ADD INDEX idx_popular (is_popular);

-- Remove old is_featured column if it exists
ALTER TABLE menu_items DROP COLUMN IF EXISTS is_featured;
ALTER TABLE menu_items DROP INDEX IF EXISTS idx_featured;

-- Update existing data: convert is_featured to popular items
-- (Run this only if you had data with is_featured)
-- UPDATE menu_items SET is_popular = 1 WHERE is_featured = 1;
