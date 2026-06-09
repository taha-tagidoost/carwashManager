<<<<<<< HEAD
# Persian Customer Management Dashboard - Features Overview

## 📋 Complete Feature Set

### 1. **Realistic Persian Mock Data** 🇮🇷
- **24 Pre-generated Customers** with all authentic Iranian details
- **Persian Names**: Authentic first and last names from common Iranian names
  - First names: محمد, علی, فاطمه, زهرا, حسن, حسین, etc.
  - Last names: محمودی, رحیمی, شریفی, کریمی, علوی, etc.

### 2. **Iranian Contact Information** 📱
- **Mobile Numbers**: Valid Iranian format (09XX XXXXXXX)
  - Operator prefixes: 0930-0939 (authentic carriers)
  - Example: 09337503335, 09332784699, 09377089187
- **Email Addresses**: Realistic email domains (gmail.com, yahoo.com, outlook.com, protonmail.com)
- **Join Dates**: Spanning up to 2 years (realistic customer history)

### 3. **Iranian License Plates** 🚗
- **Authentic Format**: Persian numerals + Persian letter + Persian numerals
  - Persian numerals: ۰۱۲۳۴۵۶۷۸۹
  - Sample plates: ۷۴۵ ث ۷۸۴, ۱۱۲ چ ۰۳۳, ۳۱۰ خ ۶۹۸
- **Dynamically Generated**: Unique plate for each customer
- **Realistic Pattern**: Matches actual Iranian vehicle registration format

### 4. **Vehicle Information** 🏎️
- **Common Car Brands** found in Iran:
  - **Toyota** (Corolla, Camry, RAV4, Yaris, Prius)
  - **Hyundai** (Elantra, Santa Fe, Tucson, Accent, Sonata)
  - **Kia** (Optima, Sportage, Cerato, Sorento, Picanto)
  - **Peugeot** (207, 206, 405, 301, 308)
  - **Renault** (Dacia, Symbol, Sandero, Espace, Clio)
  - **BMW** (X5, 520i, 320i, 330i, 730i)
  - **Mercedes** (C300, E350, GLC, GLE, S500)
  - **Nissan** (Altima, Rogue, Sentra, Murano, Pathfinder)

- **Vehicle Details**:
  - Brand and model
  - Model year (2015-2024)
  - Color in Persian (سفید, مشکی, نقره‌ای, خاکستری, قرمز, آبی, سبز, طلایی, بژ, بنفش)
  - License plate

### 5. **Dashboard Statistics** 📊
Real-time counters showing:
- **Total Customers**: 24
- **Active Customers**: 8 (فعال) - Green badge
- **Inactive Customers**: 7 (غیرفعال) - Gray badge
- **Pending Customers**: 9 (در انتظار) - Yellow badge
- Updates instantly based on applied filters

### 6. **Advanced Search & Filtering** 🔍

#### Search Bar (Multi-field)
- Search by customer **name** (Persian)
- Search by **phone number**
- Search by **email address**
- Search by **license plate**
- Real-time results (instant as you type)

#### Status Filter
- **All** (default) - Shows all customers
- **Active** (فعال) - Only active customers (8 results)
- **Inactive** (غیرفعال) - Only inactive customers (7 results)
- **Pending** (در انتظار) - Only pending customers (9 results)

#### Vehicle Brand Filter
- **All** (default) - Shows all brands
- **Individual brand selection**: BMW, Hyundai, Kia, Mercedes, Nissan, Peugeot, Renault, Toyota
- Dynamically generated from actual data

#### Filter Summary
- Shows current result count: "5 از 24 مشتری" (5 out of 24 customers)
- "Clear Filters" button to reset all selections

### 7. **Customer Card Component** 🎴
Each customer card displays:

**Header Section**:
- Customer name (prominent heading)
- Customer ID (CUST-XXXXX)
- Status badge (color-coded)

**Contact Information**:
- Phone number with icon
- Email address with icon
- Join date with icon

**Vehicle Section**:
- "خودرو" (Vehicle) label
- Brand & Model (e.g., "Mercedes GLE")
- Year (e.g., "2021")
- Color (Persian text, e.g., "طلایی")
- License plate in dedicated box with monospace font

### 8. **Responsive Design** 📱💻
- **Mobile**: Single column (full width)
- **Tablet**: 2 columns (md breakpoint)
- **Desktop**: 3 columns (lg breakpoint)
- **Large Desktop**: 4 columns (xl breakpoint)
- Touch-friendly with proper spacing
- Optimized padding and margins

### 9. **UI/UX Features** ✨
- **Color-coded badges** for quick status recognition
- **Icon usage** (lucide-react) for visual clarity
- **Hover effects** on cards for interactivity
- **Gradient backgrounds** for sections
- **Professional typography** with proper hierarchy
- **Empty state message** when no results match filters
- **Smooth transitions** and animations

### 10. **Empty State Handling** 📭
When no customers match the filters:
- Friendly message: "نتیجه ای یافت نشد" (No results found)
- Helpful description in Persian
- "Clear Filters" button to reset filters
- Centered, accessible layout

### 11. **Accessibility** ♿
- Semantic HTML structure
- ARIA labels for form controls
- Proper heading hierarchy
- Color not the only indicator (status labels included)
- Keyboard navigation support
- Screen reader friendly

### 12. **Production-Ready Code** 🏭
- **TypeScript** for type safety
- **React Best Practices**:
  - Functional components with hooks
  - `useMemo` for performance optimization
  - Proper component separation
  - Client-side rendering with `'use client'`
- **Tailwind CSS** for styling consistency
- **Shadcn/UI components** for accessibility
- **Clean, maintainable code** structure

## 🎯 Key Metrics

- **24 Unique Customers** with complete data
- **8 Different Car Brands** with authentic models
- **10+ Persian Colors** for vehicles
- **2-10 Models per Brand** for variety
- **Responsive to 4 Breakpoints** (mobile, tablet, desktop, xl)
- **3 Filter Types** (search, status, brand)
- **Real-time Updates** on filter changes
- **Zero External API Calls** (fully client-side mock data)

## 🚀 Performance Features

- **Instant Search**: No API delays
- **Optimized Filtering**: Uses `useMemo` to prevent unnecessary re-renders
- **Lazy-rendered UI**: Only shows visible customers
- **No Network Requests**: All data is client-side
- **Fast Initial Load**: No data fetching delays

## 🎨 Color Scheme

- **Status Badges**:
  - Green (Active): `bg-green-100 text-green-800`
  - Gray (Inactive): `bg-gray-100 text-gray-800`
  - Yellow (Pending): `bg-yellow-100 text-yellow-800`
- **Cards**: Clean white with subtle borders
- **Accents**: Blue (#0066FF) for icons and highlights
- **Background**: Light gray gradient

## 📦 What's Included

✅ Complete mock data generation system
✅ Production-ready React components
✅ Responsive dashboard layout
✅ Advanced filtering system
✅ Real-time search functionality
✅ TypeScript type definitions
✅ Tailwind CSS styling
✅ Comprehensive documentation
✅ Ready for deployment
✅ Zero dependencies for data (mock data is built-in)

## 🔧 Customization Options

All data can be easily customized by editing `/lib/mock-data.ts`:
- Add/remove Persian names
- Add/remove car brands and models
- Adjust vehicle year ranges
- Modify color options
- Change customer count
- Add more vehicle details
- Create different data patterns

---

**This is a complete, production-ready customer management interface with realistic Persian data!**
=======
# Car Wash CRM - Complete Features Documentation

## System Overview

The Car Wash CRM is a comprehensive business management system for car washing services, built with Next.js 16, TypeScript, Tailwind CSS, and Supabase. It provides customer management, service tracking, worker management, and advanced business analytics.

---

## Core Features (Existing)

### 1. Customer Management
- Add, edit, view, and delete customers
- Track customer contact information and vehicle details
- Search and filter customers in real-time
- Customer visit history

### 2. Service Management
- Define and manage services with pricing
- Mark services as active/inactive
- Service tracking per visit

### 3. Worker Management
- Add and manage workers/employees
- Track worker information
- Worker assignment to visits
- Active/inactive status

### 4. Visit Management
- Create visits/invoices for customers
- Add multiple services per visit
- Track revenue per visit
- Note tracking

---

## New Features (Added in This Release)

### 1. Analytics Dashboard (`/analytics`)

A comprehensive analytics page with detailed business intelligence and performance metrics.

#### Key Metrics (10+ KPIs)
- **Total Revenue**: Complete earnings for the period
- **Total Tips**: All tips collected
- **Average Transaction Value**: Mean revenue per transaction
- **Total Transactions**: Number of visits in period
- **Unique Customers**: Count of different customers
- **Plus Additional Metrics**: Calculated from real data

#### Interactive Charts
- **Revenue Chart**: Line chart showing revenue and tips trends
- **Period Selection**: Switch between Daily, Weekly, Monthly, and Yearly views
- **Smooth Animations**: Recharts integration for smooth data visualization

#### Revenue Comparison
- **Period vs Previous Period**: Compare with previous equivalent period
- **Percentage Change**: Shows increase/decrease with visual indicators
- **Trend Indicators**: Green (up), Red (down), or Stable

#### Business Intelligence
- **Top Customers**: List of best customers by spending and visit count
- **Top Services**: Most popular services by quantity and revenue
- **Top Workers**: Worker performance including revenue, visits, and tips

#### Technical Implementation
- Real-time data calculation from Supabase
- Period-based filtering and aggregation
- RTL layout with Persian language support
- Glassmorphism design matching system theme

**URL:** `/analytics`

### 2. Vehicle Management System

Full database-driven vehicle brand and model management integrated into settings.

#### Features
- **Vehicle Brands**: Add, list, and delete vehicle brands
- **Vehicle Models**: Add, list, and delete vehicle models linked to brands
- **Brand Selection**: Models filter dynamically based on selected brand
- **Database Persistence**: All data stored in Supabase

#### Database Tables
```sql
vehicle_brands (
  id: UUID,
  name: TEXT UNIQUE,
  created_at: TIMESTAMP
)

vehicle_models (
  id: UUID,
  brand_id: UUID FK,
  name: TEXT,
  created_at: TIMESTAMP
)
```

#### Components
- `VehicleBrandsSection` - Brand management UI
- `VehicleModelsSection` - Model management UI

**Location:** Settings page → "خودروها" (Vehicles) tab

### 3. Tips System Integration

Comprehensive tip tracking throughout the system with worker attribution.

#### Features
- **Visit-Level Tips**: Record tips when creating customer visits
- **Worker Association**: Link tips to specific workers for performance tracking
- **Tip History**: View all tips recorded for a visit
- **Analytics Integration**: Tips tracked separately and in total revenue
- **Easy Management**: Add, view, and delete tips through intuitive UI

#### Database Table
```sql
tips (
  id: UUID,
  visit_id: UUID FK,
  worker_id: UUID FK (nullable),
  amount: NUMERIC(10,2),
  created_at: TIMESTAMP
)
```

#### Components
- `VisitTipsSection` - Display and manage tips for visits

#### Features
- Worker selection when recording tips
- View tip history for a visit
- Aggregate tips in analytics
- Track top performers by tips

### 4. Dashboard Analytics Preview

Quick statistics card on the main dashboard showing key metrics at a glance.

#### What's Displayed
- **Today's Revenue**: Current day earnings
- **This Week's Revenue**: Week-to-date earnings
- **This Month's Revenue**: Month-to-date earnings
- **Active Customers This Week**: Unique customers visiting this week
- **Top Service**: Most popular service this month with count

#### Features
- Quick link to full analytics page
- Auto-refreshing data
- Compact card layout
- Icons for visual clarity

**Component:** `DashboardAnalyticsPreview`

### 5. Settings Page Enhancements

New "Vehicles" tab in settings alongside existing Services and Workers management.

#### Tabs
1. **Services**: Manage service offerings and pricing
2. **Workers**: Manage team members
3. **Vehicles** (NEW): Manage vehicle brands and models

#### Vehicle Management Features
- Brand CRUD operations
- Model CRUD operations
- Intuitive dropdown selection
- Confirmation dialogs for deletions
- Loading states during operations

---

## API Endpoints

### Analytics Endpoints

#### GET `/api/analytics/detailed?period=monthly`
Returns comprehensive analytics for specified period.

**Query Parameters:**
- `period`: 'daily' | 'weekly' | 'monthly' | 'yearly'

**Response:**
```json
{
  "period": "monthly",
  "totalRevenue": 5000000,
  "totalTips": 250000,
  "averageTransactionValue": 150000,
  "totalTransactions": 33,
  "uniqueCustomers": 12,
  "topServices": [...],
  "topCustomers": [...],
  "topWorkers": [...],
  "chartData": [...],
  "comparison": {
    "percentageChange": 15.5,
    "trend": "up",
    "prevPeriodRevenue": 4337000
  }
}
```

#### GET `/api/dashboard-summary`
Quick summary for dashboard preview card.

**Response:**
```json
{
  "todayRevenue": 500000,
  "weekRevenue": 3500000,
  "monthRevenue": 5000000,
  "topService": { "name": "روشویی", "count": 12 },
  "activeCustomersThisWeek": 8
}
```

### Vehicle Management Endpoints

#### GET `/api/vehicle-brands`
Get all vehicle brands ordered by name.

#### POST `/api/vehicle-brands`
Create new vehicle brand.

**Body:**
```json
{ "name": "تویوتا" }
```

#### DELETE `/api/vehicle-brands/[id]`
Delete vehicle brand by ID.

#### GET `/api/vehicle-models?brand_id=xxx`
Get vehicle models, optionally filtered by brand.

#### POST `/api/vehicle-models`
Create new vehicle model.

**Body:**
```json
{
  "brand_id": "uuid",
  "name": "کامری"
}
```

#### DELETE `/api/vehicle-models/[id]`
Delete vehicle model by ID.

### Tips Endpoints

#### GET `/api/tips?visit_id=xxx&worker_id=xxx`
Get tips, optionally filtered by visit or worker.

#### POST `/api/tips`
Create new tip record.

**Body:**
```json
{
  "visit_id": "uuid",
  "worker_id": "uuid (optional)",
  "amount": 50000
}
```

#### DELETE `/api/tips/[id]`
Delete tip record by ID.

---

## Database Schema

### New Tables

#### vehicle_brands
- `id`: UUID (Primary Key)
- `name`: TEXT (Unique, Not Null)
- `created_at`: TIMESTAMP (Auto, UTC)

#### vehicle_models
- `id`: UUID (Primary Key)
- `brand_id`: UUID (FK to vehicle_brands, On Delete Cascade)
- `name`: TEXT (Not Null)
- `created_at`: TIMESTAMP (Auto, UTC)

#### tips
- `id`: UUID (Primary Key)
- `visit_id`: UUID (FK to visits, On Delete Cascade)
- `worker_id`: UUID (FK to workers, On Delete Set Null, Nullable)
- `amount`: NUMERIC(10,2) (Not Null)
- `created_at`: TIMESTAMP (Auto, UTC)

### Modified Tables

#### visits (Existing)
Added/verified columns:
- `worker_id`: UUID (FK to workers, Nullable)
- `tip_amount`: NUMERIC(10,2) (Default 0)

#### workers (Existing)
Verified column:
- `is_active`: BOOLEAN (Default true)

#### services (Existing)
Verified column:
- `is_active`: BOOLEAN (Default true)

---

## Components Overview

### Analytics Components
| Component | Purpose | Location |
|-----------|---------|----------|
| `RevenueChart` | Interactive revenue/tips chart | `/components/analytics/` |
| `BusinessMetrics` | KPI cards grid | `/components/analytics/` |
| `RevenueComparison` | Period comparison | `/components/analytics/` |
| `TopCustomers` | Best customers list | `/components/analytics/` |
| `TopServices` | Popular services list | `/components/analytics/` |

### Management Components
| Component | Purpose | Location |
|-----------|---------|----------|
| `VehicleBrandsSection` | Brand CRUD UI | `/components/` |
| `VehicleModelsSection` | Model CRUD UI | `/components/` |
| `VisitTipsSection` | Tips management | `/components/` |
| `DashboardAnalyticsPreview` | Dashboard summary card | `/components/` |

### Pages
| Page | Route | Purpose |
|------|-------|---------|
| Analytics | `/analytics` | Detailed business intelligence |
| Dashboard | `/` | Customer list and overview |
| Settings | `/settings` | Configuration management |

---

## Setup Instructions

### 1. Database Setup
Run SQL queries from `SUPABASE_SETUP.md`:
1. Create `vehicle_brands` table
2. Create `vehicle_models` table
3. Create `tips` table
4. Verify `workers` table has `is_active` column
5. Verify `services` table has `is_active` column
6. Verify `visits` table has `worker_id` and `tip_amount` columns

### 2. Deploy Code
The system is ready to use once tables are created. No additional configuration needed.

### 3. Start Using Features
- Navigate to `/analytics` for business intelligence
- Go to Settings → "خودروها" to set up vehicle database
- Create visits and add tips on customer detail pages
- View quick analytics on main dashboard

---

## Design System

### Color Scheme
- **Primary**: Purple gradient (`#7C3AED` to `#A855F7`)
- **Background**: Dark gradient (`#0A0714` → `#140D26` → `#1A1035`)
- **Success**: Green (`#22c55e`)
- **Warning/Decline**: Red (`#ef4444`)
- **Neutral**: Gray shades with purple tint

### Components Style
- **Cards**: Glassmorphism with `border-purple-600/50` and `backdrop-blur-sm`
- **Typography**: Farsi (Persian) RTL layout
- **Icons**: Lucide React icons
- **Charts**: Recharts with custom styling

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions

---

## Performance Optimizations

### Database
- Indexes on frequently queried columns:
  - `vehicle_brands.name`
  - `vehicle_models.brand_id`
  - `tips.visit_id`, `tips.worker_id`
  - `workers.is_active`, `services.is_active`

### Frontend
- Client components for interactivity
- Server components where possible
- Efficient state management with React hooks
- Memoized calculations in analytics

### API
- Efficient aggregation queries
- Filtered responses
- Minimal data transfer

---

## Known Limitations & Future Enhancements

### Current Limitations
1. Vehicle database starts empty - must be populated by user
2. Analytics compare current with immediately previous period
3. No export functionality (CSV/PDF reports)
4. Tips tracked at visit level - no granular splits

### Potential Enhancements
- PDF/CSV report exports
- Email report scheduling
- Advanced filtering in analytics
- Worker commission calculations
- Seasonal trend analysis
- Mobile app support
- Real-time notifications
- Integration with payment systems

---

## Troubleshooting

### Analytics Shows No Data
- Ensure visits with revenue exist in database
- Verify date format in visits is ISO 8601 compliant
- Check Supabase connection and query logs

### Vehicle Management Not Working
- Confirm `vehicle_brands` and `vehicle_models` tables exist
- Check browser console for API errors
- Verify Supabase RLS policies (if enabled)

### Tips Not Saving
- Ensure `tips` table exists in Supabase
- Verify `visits` table has `tip_amount` column
- Check network tab for API response errors
- Confirm `workers` table has correct schema

### Dashboard Preview Not Updating
- Clear browser cache
- Check network requests in dev tools
- Verify `/api/dashboard-summary` responds correctly

---

## Testing Checklist

- [ ] Create vehicle brands and models
- [ ] Create customer and add visit with services
- [ ] Record tips on visit
- [ ] View analytics page with all periods
- [ ] Check top customers/services/workers
- [ ] Verify dashboard preview updates
- [ ] Test settings vehicle management
- [ ] Delete items and verify removal
- [ ] Check responsive design on mobile

---

This documentation covers all features, APIs, database schema, and usage instructions for the complete Car Wash CRM system.
>>>>>>> 6e0a88a (initial commit - car wash crm)
