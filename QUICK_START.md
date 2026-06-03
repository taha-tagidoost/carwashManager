# Quick Start Guide - New Features

## Getting Started in 3 Steps

### Step 1: Set Up Database
1. Open your Supabase project
2. Go to SQL Editor
3. Copy and run each query from `SUPABASE_SETUP.md`:
   - Create `vehicle_brands` table
   - Create `vehicle_models` table
   - Create `tips` table
   - Verify `workers`, `services`, `visits` tables

**Expected time**: 2-3 minutes

### Step 2: Start Using Features
The code is already deployed. Just navigate to:
- **Analytics**: Visit `/analytics` in your app
- **Vehicle Setup**: Go to Settings → "خودروها" (Vehicles)
- **Tips**: Create a customer visit and add tips

**Expected time**: Immediate

### Step 3: Start Entering Data
1. Create a customer (if not already done)
2. Create a visit/invoice with services
3. Add tips for the visit
4. Go to Analytics and select different time periods

**Expected time**: 5 minutes to see first results

---

## New Pages & Features at a Glance

### Analytics Page (`/analytics`)
**What**: Detailed business intelligence dashboard
**URL**: `/analytics`
**What you'll see**:
- Revenue trend chart
- Key business metrics
- Revenue comparison (vs previous period)
- Top customers, services, workers
- Period selector (Daily/Weekly/Monthly/Yearly)

### Settings - Vehicles Tab
**What**: Manage vehicle brands and models
**Location**: Settings page → "خودروها" tab
**What you can do**:
- Add new vehicle brands
- Add models for each brand
- Delete brands/models
- Select brands to filter models

### Dashboard Preview Card
**What**: Quick stats at a glance
**Location**: Main dashboard page (new card below metrics)
**Shows**:
- Revenue (today, week, month)
- Active customers this week
- Top service this month
- Link to detailed analytics

---

## Common Tasks

### View Analytics for a Period
1. Go to `/analytics`
2. Click one of the period buttons: روزانه / هفتگی / ماهانه / سالانه
3. See chart and metrics update
4. Compare with previous period

### Add a Vehicle Brand
1. Go to Settings
2. Click "خودروها" tab
3. Type brand name in input field
4. Click "اضافه کردن" (Add)
5. Brand appears in list

### Add a Model to a Brand
1. Go to Settings → "خودروها" tab
2. Select brand from dropdown in Model section
3. Type model name in input
4. Click "اضافه کردن" (Add)
5. Model appears under that brand

### Record Tips on a Visit
1. Create/open a customer visit
2. Enter tip amount in tip field
3. (Optional) Select which worker earned the tip
4. Tips automatically included in revenue calculations

### See Tips Analytics
1. Go to `/analytics`
2. Tips shown separately in "درآمد" (Revenue) chart (green line)
3. Tips also included in total revenue metrics
4. Top workers ranked by tips earned

---

## Key Metrics Explained

### Revenue Charts
- **Purple line**: Total revenue from services
- **Green line**: Tips collected

### Business Metrics
- **درآمد کل**: Total revenue for selected period
- **انعام‌ها**: Total tips collected
- **تعداد معاملات**: Number of visits/transactions
- **میانگین معامله**: Average revenue per visit
- **مشتریان منحصر**: Unique customers in period

### Revenue Comparison
- **مقایسه درآمد**: Shows current vs previous period
- **Percentage Change**: Growth rate with green (↑) or red (↓) indicator
- **Trend**: "بدون تغییر" (stable) if no change

---

## Troubleshooting

### Analytics Page Shows No Data
**Problem**: Analytics page displays empty charts
**Solution**: 
- Create at least one customer visit with revenue
- Make sure visit has services added
- Check visit date is in selected period

### Vehicle Management Not Working
**Problem**: Can't add brands or models
**Solution**:
- Run SQL setup queries from `SUPABASE_SETUP.md`
- Clear browser cache and refresh
- Check browser console for errors
- Verify Supabase connection

### Tips Not Appearing in Analytics
**Problem**: Tips recorded but not showing in dashboard
**Solution**:
- Refresh the analytics page
- Verify tips were actually saved (check in database)
- Make sure selected period includes the visits with tips

### Settings Tab Not Showing
**Problem**: "خودروها" tab missing from settings
**Solution**:
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache
- Ensure tables were created successfully

---

## What Data to Create for Testing

### Minimum Test Data
1. **Customer**: One customer with phone and car details
2. **Services**: 2-3 services with prices
3. **Workers**: 1-2 workers (optional for tips)
4. **Visit**: Create a visit with 2 services and 50,000 tip
5. **Vehicle Brands/Models**: Add 2-3 brands with models

### Then Check
- Dashboard shows updated stats
- Analytics page shows revenue
- Tip amount appears in tips section
- Top customers/services show data

---

## API Testing

### Test Analytics API
```bash
curl https://your-app.com/api/analytics/detailed?period=monthly
```

### Test Vehicle Brands API
```bash
curl https://your-app.com/api/vehicle-brands
```

### Test Dashboard Summary API
```bash
curl https://your-app.com/api/dashboard-summary
```

---

## File Reference

| File | Purpose | Location |
|------|---------|----------|
| `FEATURES.md` | Complete documentation | Root |
| `SUPABASE_SETUP.md` | Database setup SQL | Root |
| `IMPLEMENTATION_SUMMARY.md` | Implementation details | Root |
| `QUICK_START.md` | This guide | Root |
| Analytics Page | `/analytics` | `/app/analytics/page.tsx` |
| Analytics API | `/api/analytics/detailed` | `/app/api/analytics/detailed/route.ts` |
| Vehicle APIs | `/api/vehicle-*` | `/app/api/vehicle-*/route.ts` |
| Settings Page | `/settings` | `/app/settings/page.tsx` |

---

## Support & Debugging

### Enable Debug Logging
In your browser console:
```javascript
console.log("[v0] Analytics data:", data);
```

### Check API Responses
1. Open browser Dev Tools (F12)
2. Go to Network tab
3. Create a visit or go to analytics
4. Click on API requests to see responses
5. Check Status (should be 200 OK)

### Common Error Responses
- **500**: Database query failed (check schema)
- **400**: Invalid parameters
- **404**: Endpoint not found (check URL)

---

## Next Steps After Setup

1. ✅ Set up database tables
2. ✅ Create test data
3. ✅ Verify analytics page works
4. ✅ Add vehicle brands/models
5. ✅ Record tips on visits
6. ✅ Monitor analytics over time
7. Consider: Export features, advanced filtering, email reports

---

**Ready to go!** 🚀

Start with `/analytics` to see your business data, then explore vehicle management in Settings.
