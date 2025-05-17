# Testing Guide for Expense Tracker Frontend

## Setup
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open http://localhost:3000 in your browser

## Test Flow

### 1. Landing Page
- [ ] Visit http://localhost:3000
- [ ] Enter any email (no validation)
- [ ] Click "Get Started"
- [ ] Should redirect to dashboard

### 2. Dashboard Page
- [ ] Check all summary cards show data
- [ ] Verify pie chart loads with category data
- [ ] Check recent activity list
- [ ] Test "Upload Receipt" button navigation

### 3. Upload Flow
- [ ] Click "Upload Receipt"
- [ ] Select any file (image/PDF)
- [ ] Submit form
- [ ] Should show loading state for 2 seconds
- [ ] Should redirect to categorization page

### 4. Categorization Page
- [ ] Check receipt details are displayed
- [ ] Try changing categories in dropdown
- [ ] Toggle tax deductible checkboxes
- [ ] Click "Save" button
- [ ] Should redirect to dashboard

### 5. Tax Summary Page
- [ ] Verify expense totals
- [ ] Check category breakdown
- [ ] Test "Download Report" link
- [ ] Verify tax savings calculation

### 6. Navigation
- [ ] Test header navigation links
- [ ] Verify breadcrumb navigation
- [ ] Check back buttons work correctly

## Visual Checks
- [ ] Consistent styling across pages
- [ ] Responsive design works
- [ ] Loading states are smooth
- [ ] Transitions feel natural

## Known Limitations
- No real backend integration
- File upload is simulated
- PDF download is static
- No data persistence

## Expected User Flow
Landing → Dashboard → Upload → Categorize → Summary → Download Report
