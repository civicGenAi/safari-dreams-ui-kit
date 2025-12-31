# Advanced Admin Dashboard Guide

## Overview

The DeMi Tours admin dashboard is a comprehensive package management system with:

### ✨ **Key Features**
- 📊 **Dashboard** - Statistics and analytics
- 📦 **Package Management** - Create, edit, delete packages with ease
- 🖼️ **Image Upload** - Drag & drop multiple images
- 📄 **Bulk Import** - Import packages from Word documents
- 🎨 **User-Friendly Interface** - Step-by-step wizards
- 🔐 **Secure Authentication** - Login-only access

## Getting Started

### 1. Access the Admin Panel

Navigate to: **`http://your-domain.com/admin/login`**

**Default Credentials:**
- Email: `admin@demitours.com`
- Password: (Set during Supabase setup)

### 2. Dashboard Overview

After login, you'll see:
- Total packages count
- Number of destinations
- Categories offered
- Average pricing
- Visual breakdowns by destination and category
- Recent packages

## Navigation

The sidebar provides quick access to:

### 📊 **Dashboard**
- Overview & statistics
- Package distribution charts
- Recent activity

### 📦 **Packages**
- View all packages
- Add new packages
- Edit existing packages
- Delete packages
- Search and filter

### 📤 **Bulk Import**
- Upload Word documents
- Auto-parse package information
- Import multiple packages at once

## Creating a Package (Step-by-Step)

### Step 1: Basic Information

**Required Fields:**
1. **Package Title** - e.g., "5-Day Serengeti Safari Adventure"
   - Slug is auto-generated from title
   - Preview URL shown below

2. **Destination** - Select from:
   - 🇹🇿 Tanzania
   - 🇰🇪 Kenya
   - 🇷🇼 Rwanda
   - 🇺🇬 Uganda
   - 🇿🇦 South Africa
   - 🇳🇦 Namibia
   - 🇧🇼 Botswana

3. **Category** - Choose tour type:
   - 🦁 Safari
   - 🥾 Trekking
   - 🦒 Wildlife
   - 🏖️ Beach
   - 💎 Luxury
   - ⛰️ Adventure

4. **Difficulty** - Select appropriate level:
   - 😊 **Easy** - Suitable for all
   - 😅 **Moderate** - Some fitness required
   - 💪 **Challenging** - Good fitness needed

5. **Price** - Enter price per person in USD
6. **Duration** - Number of days
7. **Description** - Compelling description (tip provided)

### Step 2: Images

**Upload Package Photos:**

1. **Drag & Drop Zone**
   - Drag images from your computer
   - Or click to browse

2. **Supported Formats**
   - PNG, JPG, JPEG, WebP

3. **Multiple Upload**
   - Upload multiple images at once
   - First image becomes primary image
   - Preview all uploaded images
   - Remove unwanted images

4. **Storage**
   - Images stored in Supabase Storage
   - Public URLs generated automatically
   - Fast CDN delivery

### Step 3: Inclusions

**What's Included:**
- Click "Add Item" to add included items
- Examples:
  - Park entrance fees
  - Professional safari guide
  - Accommodation (specify type)
  - Meals (breakfast, lunch, dinner)
  - Safari vehicle with pop-up roof
  - Airport transfers
  - Bottled water

**What's NOT Included:**
- Click "Add Item" to add excluded items
- Examples:
  - International flights
  - Travel insurance
  - Tips for guide and staff
  - Personal expenses
  - Optional activities

### Step 4: Itinerary

**Day-by-Day Schedule:**

1. Click "Add Day" for each day
2. For each day enter:
   - **Day Title** - e.g., "Arrival in Arusha"
   - **Description** - Detail the day's activities

**Example:**
```
Day 1: Arrival in Arusha
Meet and greet at Kilimanjaro Airport. Transfer to hotel in Arusha for overnight stay and briefing about the safari.

Day 2: Tarangire National Park
Morning departure to Tarangire. Full day game drive viewing elephants and baobab trees. Picnic lunch in the park.

Day 3: Serengeti National Park
Drive to Serengeti with game viewing en route. Afternoon game drive in central Serengeti.
```

### Final Step: Review & Save

- Review all information
- Click "Create Package" or "Update Package"
- Package appears immediately on the website

## Editing Packages

1. Go to **Packages** page
2. Find the package you want to edit
3. Click **Edit** button
4. Modify any fields
5. Upload new images if needed
6. Click **Update Package**

## Deleting Packages

1. Go to **Packages** page
2. Find the package
3. Click **Delete** button
4. Confirm deletion

**⚠️ Warning:** Deletion is permanent!

## Bulk Import from Word Documents

### Document Format

Your Word document (.docx) should follow this structure:

```
Package 1:
Title: 5-Day Serengeti Safari Adventure
Description: Experience the breathtaking Serengeti wilderness with expert guides...
Price: $1850
Duration: 5 days
Destination: Tanzania
Category: Safari
Difficulty: Moderate

Included:
- Park entrance fees
- Professional safari guide
- Accommodation in lodges/tented camps
- All meals (breakfast, lunch, dinner)
- Safari vehicle with pop-up roof
- Airport transfers
- Bottled water during safari

Excluded:
- International flights
- Travel insurance
- Tips for guide and staff
- Personal expenses
- Optional activities

Itinerary:
Day 1: Arrival in Arusha
Meet and greet at Kilimanjaro Airport. Transfer to hotel in Arusha for overnight stay.

Day 2: Tarangire National Park
Morning departure to Tarangire. Full day game drive viewing elephants and baobab trees.

Day 3: Serengeti National Park
Drive to Serengeti with game viewing en route. Afternoon game drive in central Serengeti.

Day 4: Ngorongoro Crater
Descend into the crater for wildlife viewing. Picnic lunch on crater floor.

Day 5: Departure
Morning at leisure. Transfer to airport for departure flight.

Package 2:
Title: Next Package Name
Description: ...
[Continue with same format]
```

### Using Bulk Import

1. Go to **Bulk Import** page
2. Review the format guide
3. **Upload Document(s)**:
   - Drag & drop .docx files
   - Or click to browse
   - Can upload multiple files

4. **Review Parsed Packages**:
   - System automatically extracts information
   - Shows all found packages
   - Displays warnings for missing data

5. **Import**:
   - Click "Import All Packages"
   - Progress bar shows status
   - Success/error status for each package

6. **After Import**:
   - Add images to packages (required)
   - Review and edit as needed

## Tips for Success

### Writing Great Descriptions
- **Start with a hook** - "Experience...", "Discover...", "Journey through..."
- **Highlight unique features** - What makes this special?
- **Include specifics** - Wildlife, landscapes, cultural experiences
- **Keep it concise** - 2-3 paragraphs maximum

### Choosing Images
- ✅ High resolution (at least 1920x1080)
- ✅ Well-lit, sharp photos
- ✅ Show activities, wildlife, landscapes
- ✅ Authentic, real photos from tours
- ❌ Avoid stock photos when possible
- ❌ No blurry or dark images

### Pricing Strategy
- Research competitor pricing
- Consider all-inclusive vs. optional extras
- Factor in seasonality
- Offer early bird discounts
- Group discounts for larger parties

### Itinerary Writing
- **Be specific** - Times, locations, activities
- **Set expectations** - Travel times, difficulty
- **Include highlights** - What they'll see/do
- **Mention logistics** - Transfers, accommodations
- **Keep realistic** - Don't overpromise

## Troubleshooting

### Image Upload Issues
**Problem:** Images not uploading

**Solutions:**
1. Check file format (PNG, JPG, WebP only)
2. Ensure file size < 10MB
3. Verify internet connection
4. Check Supabase Storage bucket is created
5. Confirm you're logged in

### Bulk Import Not Working
**Problem:** Document not parsing correctly

**Solutions:**
1. **Follow exact format** - See format guide
2. **Check field names** - "Title:", "Description:", etc.
3. **Use consistent spacing** - One blank line between sections
4. **Validate prices** - Use numbers only (e.g., 1850 not $1,850)
5. **Check duration** - Format: "5 days" or "5"

### Package Not Showing on Website
**Problem:** Created package doesn't appear

**Solutions:**
1. **Refresh the page** - Clear browser cache
2. **Check filters** - Ensure category/destination filters include it
3. **Verify creation** - Go to Packages page and confirm it's listed
4. **Check slug** - Ensure slug is unique

## Storage Management

### Image Storage
- All images stored in Supabase Storage
- Bucket name: `package-images`
- Public access enabled
- CDN-optimized delivery

### Storage Limits
- Supabase Free Tier: 1GB storage
- Paid plans: More storage available
- Images automatically optimized

## Security

### Access Control
- Login required for all admin pages
- Session-based authentication
- Auto-logout after inactivity
- Secure password requirements

### Best Practices
- ✅ Use strong passwords
- ✅ Don't share admin credentials
- ✅ Log out when finished
- ✅ Regularly update packages
- ✅ Review analytics regularly

## Support

### Common Questions

**Q: Can I have multiple admins?**
A: Yes! Create additional users in Supabase Auth dashboard.

**Q: Can I customize categories/destinations?**
A: Yes! Edit the select options in the PackageForm component.

**Q: How do I backup my data?**
A: Use Supabase dashboard to export your database.

**Q: Can customers book directly?**
A: Packages lead to contact/booking forms. Integrate with booking system as needed.

### Need Help?

1. **Documentation** - Check `/SETUP-INSTRUCTIONS.md`
2. **Supabase Docs** - https://supabase.com/docs
3. **Support** - Contact your developer

## Quick Reference

### Admin URLs
- Login: `/admin/login`
- Dashboard: `/admin/dashboard`
- Packages: `/admin/packages`
- Bulk Import: `/admin/bulk-import`

### Keyboard Shortcuts
- `Esc` - Close dialogs
- `Ctrl/Cmd + Enter` - Submit forms
- `Tab` - Navigate between fields

### File Formats
- **Images:** PNG, JPG, JPEG, WebP
- **Documents:** DOCX (Word 2007+)
- **Max Size:** 10MB per file

---

**Last Updated:** 2025-12-31
**Version:** 2.0
