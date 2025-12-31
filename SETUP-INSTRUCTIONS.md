# Dynamic Package Management System - Setup Instructions

## What Was Implemented

### 1. **Supabase Integration**
   - Installed `@supabase/supabase-js`
   - Created Supabase client configuration in `src/lib/supabase.ts`
   - Environment variables configured in `.env`

### 2. **Database Schema**
   - Created `packages` table with all tour/package fields
   - Created `admin_users` table for authentication
   - SQL schema available in `supabase-schema.sql`

### 3. **Admin System**
   - **Login Page**: `/admin/login` - Secure authentication
   - **Dashboard**: `/admin/dashboard` - Protected route for managing packages
   - Full CRUD operations: Create, Read, Update, Delete packages

### 4. **Dynamic Frontend**
   - **Home Page**: Fetches packages from Supabase with simple category filtering
   - **Tours Page**: Advanced filtering (category, destination, price, duration, difficulty)
   - **Tour Detail Page**: Dynamically loads package data by slug
   - **Travel Ideas Page**: Added "Get Offer" buttons to promotional images

### 5. **Authentication & Authorization**
   - Auth context for managing user sessions
   - Protected routes using ProtectedRoute component
   - Login-only access (no registration page)

## Setup Steps

### Step 1: Execute Database Schema

1. Go to your Supabase project: https://yrgukueewkqgxwpbssub.supabase.co
2. Navigate to SQL Editor
3. Copy the contents of `supabase-schema.sql`
4. Execute the SQL to create tables and policies

### Step 2: Create Admin User

Since we're using Supabase Auth, you need to create an admin user:

**Option A: Using Supabase Dashboard**
1. Go to Authentication > Users in Supabase dashboard
2. Click "Add User"
3. Enter email: `admin@demitours.com`
4. Enter password: `your-secure-password`
5. Click "Create User"

**Option B: Using Supabase CLI**
```bash
supabase auth create-user admin@demitours.com --password your-secure-password
```

### Step 3: Add Sample Packages (Optional)

Use the admin dashboard to add packages, or insert directly via SQL:

```sql
INSERT INTO packages (
  title, slug, description, price, duration, image,
  destination, category, difficulty, included, excluded, itinerary
) VALUES (
  '5-Day Serengeti Safari',
  '5-day-serengeti-safari',
  'Experience the breathtaking Serengeti with expert guides',
  1850,
  5,
  '/src/assets/tours/serengeti-safari.jpg',
  'Tanzania',
  'Safari',
  'Moderate',
  '["Park fees", "Accommodation", "Meals", "Safari vehicle", "Professional guide"]'::jsonb,
  '["International flights", "Tips", "Personal items"]'::jsonb,
  '[
    {"day": 1, "title": "Arrival in Arusha", "description": "Meet and greet at airport, transfer to hotel"},
    {"day": 2, "title": "Serengeti National Park", "description": "Full day game drive"},
    {"day": 3, "title": "Serengeti Game Drives", "description": "Morning and afternoon game drives"},
    {"day": 4, "title": "Ngorongoro Crater", "description": "Descend into the crater for wildlife viewing"},
    {"day": 5, "title": "Departure", "description": "Transfer to airport"}
  ]'::jsonb
);
```

### Step 4: Environment Variables

The `.env` file is already configured with your Supabase credentials:
```
VITE_SUPABASE_URL=https://yrgukueewkqgxwpbssub.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_OB2v9QawAgqHgE2x6p5L4A_tqJU6X17
```

### Step 5: Test the System

1. **Test Admin Login**: Navigate to `/admin/login`
   - Email: `admin@demitours.com`
   - Password: (the password you set)

2. **Test Admin Dashboard**: After login, you'll be redirected to `/admin/dashboard`
   - Click "Add Package" to create a new package
   - Fill in all required fields
   - Save and verify it appears on the home page

3. **Test Frontend**:
   - Home page should show packages under "Popular Safari Packages"
   - Category filters should work
   - Click "View All Tours" to see the advanced filtering page
   - Test all filters (category, destination, price, duration, difficulty)

## Admin Dashboard Features

### Adding a Package
- **Title**: Display name
- **Slug**: URL-friendly version (e.g., "5-day-serengeti-safari")
- **Price**: Numeric value
- **Duration**: Number of days
- **Image**: Path to image (e.g., "/src/assets/tours/image.jpg")
- **Destination**: Tanzania, Kenya, Rwanda, Uganda, etc.
- **Category**: Safari, Trekking, Beach, Wildlife, Luxury, Adventure
- **Difficulty**: Easy, Moderate, Challenging
- **Included**: One item per line
- **Excluded**: One item per line
- **Itinerary**: JSON format:
  ```json
  [
    {"day": 1, "title": "Arrival", "description": "Transfer to hotel"},
    {"day": 2, "title": "Safari", "description": "Full day game drive"}
  ]
  ```

### Editing a Package
- Click "Edit" button on any package
- Modify fields as needed
- Click "Update Package"

### Deleting a Package
- Click "Delete" button
- Confirm deletion

## File Structure

```
├── .env                           # Environment variables
├── supabase-schema.sql           # Database schema
├── src/
│   ├── lib/
│   │   └── supabase.ts           # Supabase client & types
│   ├── contexts/
│   │   └── AuthContext.tsx       # Authentication context
│   ├── components/
│   │   ├── ProtectedRoute.tsx    # Route protection
│   │   └── ToursSection.tsx      # Updated to fetch from Supabase
│   ├── pages/
│   │   ├── AdminLogin.tsx        # Admin login page
│   │   ├── AdminDashboard.tsx    # Package management dashboard
│   │   ├── Tours.tsx             # Updated with Supabase filtering
│   │   └── TourDetail.tsx        # Updated to fetch single package
│   └── App.tsx                   # Updated with admin routes
```

## Security Notes

1. **Row Level Security (RLS)** is enabled on both tables
2. Packages are publicly readable but require authentication to modify
3. Admin users table is protected - users can only read their own data
4. `.env` file should be added to `.gitignore` (already done)

## Next Steps

1. Add more packages via admin dashboard
2. Upload package images to `/src/assets/tours/`
3. Customize package categories as needed
4. Test all filtering and sorting functionality
5. Consider adding image upload functionality to admin dashboard

## Support

If you encounter issues:
- Check browser console for errors
- Verify Supabase connection in Network tab
- Ensure database tables were created correctly
- Check that admin user was created successfully
