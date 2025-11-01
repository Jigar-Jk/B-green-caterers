# 🚀 PRODUCTION DEPLOYMENT CHECKLIST - B Green Caterers

## ✅ Pre-deployment Verification

### Frontend Build ✅
- [x] Production build completed successfully
- [x] Environment variables configured for production
- [x] .htaccess file configured for SPA routing and API exclusion
- [x] Static assets optimized

### Backend Configuration ✅
- [x] Production .env file created with correct database credentials
- [x] Backend .htaccess configured for PHP execution and CORS
- [x] All API endpoints present and functional
- [x] Database connection configuration verified

## 📋 DEPLOYMENT STEPS

### Step 1: Upload Frontend Files
1. Navigate to Hostinger File Manager → public_html/
2. **DELETE ALL EXISTING FILES** in public_html/ (backup first if needed)
3. Upload ALL files from `/dist/` folder to `public_html/`:
   - index.html
   - 404.html
   - .htaccess
   - assets/ (entire folder)
   - images/ (entire folder)

### Step 2: Upload Backend Files
1. Create `api/` folder inside `public_html/`
2. Upload ALL files from `/backend/` to `public_html/api/`:
   - auth.php
   - menu.php
   - categories.php
   - upload.php
   - admin-maintenance.php
   - _headers.php
   - database.php
   - verify.php (optional, for testing)
3. Upload `/backend/.htaccess` to `public_html/api/.htaccess`

### Step 3: Configure Production Environment
1. **IMPORTANT**: Create `public_html/api/.env` file with these contents:
```
DB_HOST=localhost
DB_NAME=u412954154_bgreencaterers
DB_USER=u412954154_bgreencaterers
DB_PASS=Bgreencaterers2#
API_URL=https://bgreencaterers.com
```

### Step 4: Database Setup
1. Go to Hostinger phpMyAdmin
2. Select database: u412954154_bgreencaterers
3. Import `/backend/database/schema_fixed.sql`
4. Verify admin user exists with email: admin@bgcaterers.com

### Step 5: Test Deployment
1. Visit: https://bgreencaterers.com/
2. Test admin login: https://bgreencaterers.com/admin
   - Email: admin@bgcaterers.com
   - Password: admin123
3. Test API endpoints:
   - https://bgreencaterers.com/api/menu.php
   - https://bgreencaterers.com/api/auth.php

## 🔧 FINAL FILE STRUCTURE ON SERVER

```
public_html/
├── index.html                 (from dist/)
├── 404.html                   (from dist/)
├── .htaccess                  (from dist/)
├── assets/                    (from dist/)
├── images/                    (from dist/)
└── api/
    ├── .env                   (create manually on server)
    ├── .htaccess              (from backend/)
    ├── auth.php
    ├── menu.php
    ├── categories.php
    ├── upload.php
    ├── admin-maintenance.php
    ├── _headers.php
    ├── database.php
    └── verify.php              (optional, for testing)
```

## ⚠️ CRITICAL NOTES

1. **NEVER upload .env files from local machine** - create them directly on server
2. **Backend .htaccess MUST be in api/ folder** to disable URL rewriting for API
3. **Frontend .htaccess MUST be in public_html/** for SPA routing
4. **API folder MUST be inside public_html/** for correct routing
5. **Test all endpoints after deployment** before going live

## 🧪 API Testing Commands (after deployment)

```bash
# Test menu API
curl -X GET "https://bgreencaterers.com/api/menu.php"

# Test auth API
curl -X POST "https://bgreencaterers.com/api/auth.php" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bgcaterers.com","password":"admin123"}'
```

Expected responses should be JSON, not HTML!