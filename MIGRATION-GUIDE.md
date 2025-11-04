# Database Migration Guide - WhatsApp Price Support

## What Changed?
The `price` column in `menu_items` table has been changed from `DECIMAL(10,2)` to `VARCHAR(50)` to support both:
- Numeric prices: "250.00", "350.00", etc.
- Text-based pricing: "WhatsApp"

## How to Apply Migration

### Option 1: Using MySQL Command Line
```bash
mysql -u root -p < backend/database/migration_price_whatsapp.sql
```

### Option 2: Using phpMyAdmin
1. Open phpMyAdmin
2. Select `b_green_caterers` database
3. Go to SQL tab
4. Copy and paste the contents of `migration_price_whatsapp.sql`
5. Click "Go"

### Option 3: Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to your database
3. Open `migration_price_whatsapp.sql` file
4. Execute the script

## Verification
After running the migration, verify with:
```sql
DESCRIBE menu_items;
```
The `price` column should show `varchar(50)` as the type.

## Rollback (if needed)
To revert to numeric-only pricing:
```sql
ALTER TABLE menu_items 
MODIFY COLUMN price DECIMAL(10, 2) NOT NULL;
```
⚠️ Warning: This will fail if any items have "WhatsApp" as price. You'll need to update those first.

## Testing
1. Add a new menu item in admin dashboard
2. Select "WhatsApp" radio button
3. Save the item
4. Check the menu page - it should show WhatsApp contact button
5. Also test adding an item with numeric price to ensure it still works
