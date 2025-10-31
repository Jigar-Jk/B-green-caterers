-- B Green Caterers Database Schema
-- Admin Dashboard Menu Management

CREATE DATABASE IF NOT EXISTS b_green_caterers CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE b_green_caterers;

-- Menu categories table
CREATE TABLE IF NOT EXISTS menu_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Menu items table
CREATE TABLE IF NOT EXISTS menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    is_available BOOLEAN DEFAULT TRUE,
    is_chefs_pick BOOLEAN DEFAULT FALSE,
    is_popular BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES menu_categories(id) ON DELETE CASCADE,
    INDEX idx_category (category_id),
    INDEX idx_chefs_pick (is_chefs_pick),
    INDEX idx_popular (is_popular),
    INDEX idx_available (is_available)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default categories
INSERT INTO menu_categories (name, slug, description, display_order) VALUES
('Starters', 'starters', 'Appetizers and starters', 1),
('Chicken', 'chicken', 'Chicken dishes', 2),
('Mutton', 'mutton', 'Mutton specialties', 3),
('Seafood', 'seafood', 'Fresh seafood dishes', 4),
('Combos', 'combos', 'Combination meals', 5),
('Desserts', 'desserts', 'Sweet endings', 6);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample menu items
INSERT INTO menu_items (category_id, name, description, price, image_url, is_chefs_pick, is_popular, display_order) VALUES
(1, 'Tandoori Chicken', 'Marinated chicken grilled to perfection', 250.00, 'DSC_0548.JPG', FALSE, TRUE, 1),
(2, 'Butter Chicken', 'Creamy tomato-based curry with tender chicken', 270.00, 'DSC_0083.JPG', TRUE, TRUE, 2),
(3, 'Mutton Biryani', 'Aromatic basmati rice with tender mutton', 300.00, 'DSC_0450.JPG', TRUE, FALSE, 3),
(4, 'Grilled Prawns', 'Fresh prawns marinated with herbs', 280.00, 'IMG_20240317_180326858.jpg', FALSE, TRUE, 4),
(1, 'Chicken Wings', 'Crispy wings tossed in special sauce', 200.00, 'IMG_20240319_173008270_HDR.jpg', FALSE, FALSE, 5),
(6, 'Gulab Jamun', 'Sweet dumplings in rose syrup', 150.00, '02 Tava Fry Menu.jpg', FALSE, FALSE, 6);

-- Insert default admin user
-- Password: admin123 (hashed with password_hash)
INSERT INTO admin_users (email, password, name) VALUES
('admin@bgcaterers.com', '$2y$10$JLkAM6D.1d85hNrGzHyng.m0XxqIGv6AKoe.9FqVzseEw8JRs/KWi', 'Admin User');
