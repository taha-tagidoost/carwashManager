# Persian Car Wash Management System

A production-ready full-stack customer management application with authentic Persian data, Iranian license plates, and real car information.

## Overview

This is a complete Next.js 16 application with Supabase integration that manages car wash customers with their visit history, service records, and vehicle information.

## Features

### Core Functionality
- **Customer Management**: Create, read, update, and delete customers
- **Visit Tracking**: Record customer visits with service type and pricing
- **Real-time Search**: Filter customers by name, phone, or license plate
- **Brand Filtering**: Filter customers by vehicle brand
- **Statistics Dashboard**: Real-time metrics (total customers, total services, averages)
- **RTL Support**: Full right-to-left Persian language support

### Authentic Data
- **Persian Names**: 20+ authentic Iranian names in Persian script
- **Iranian Phone Numbers**: Valid 0930-0939 mobile prefixes (09337503335, 09102768263, etc.)
- **Iranian License Plates**: Proper format with Persian numerals and letters (123 الف 456)
- **Real Car Brands**: Toyota, Hyundai, Kia, Peugeot, Renault, BMW, Mercedes, Nissan
- **Vehicle Models**: Authentic models for each brand (Corolla, Camry, Elantra, etc.)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **HTTP Client**: Native Fetch API with Supabase JS SDK

## Project Structure

```
app/
├── page.tsx                    # Dashboard / Customer list
├── customers/
│   ├── [id]/page.tsx          # Customer detail & visits
│   └── new/page.tsx           # New customer form
└── api/
    ├── customers/
    │   ├── route.ts           # GET all customers
    │   └── [id]/
    │       ├── route.ts       # GET/PATCH/DELETE single customer
    │       └── visits/route.ts # GET/POST visits for customer
    ├── visits/[id]/route.ts    # DELETE single visit
    ├── stats/route.ts          # Dashboard statistics
    └── seed/route.ts           # Seed mock data

lib/
├── supabase/
│   ├── client.ts              # Browser client
│   ├── server.ts              # Server client
│   └── proxy.ts               # Session proxy
├── services/
│   └── customers.ts           # Data fetching utilities
└── seed-data.ts               # Mock data generation

```

## Database Schema

### Customers Table
```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  license_plate TEXT NOT NULL UNIQUE,
  car_brand TEXT,
  car_model TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_customers_license_plate ON customers(license_plate);
CREATE INDEX idx_customers_car_brand ON customers(car_brand);
```

### Visits Table
```sql
CREATE TABLE visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  visit_date TIMESTAMP DEFAULT NOW(),
  service_type TEXT,
  price NUMERIC,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_visits_customer_id ON visits(customer_id);
CREATE INDEX idx_visits_date ON visits(visit_date);
CREATE INDEX idx_visits_service_type ON visits(service_type);
```

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase project (connected via v0 integration)

### Installation

The application is pre-configured with all dependencies. Run the dev server:

```bash
pnpm dev
```

Navigate to http://localhost:3000

### Seeding Demo Data

The database comes pre-populated with sample customers. To reload:

1. Go to the dashboard
2. Click "بارگذاری نمونه داده‌ها" (Load Sample Data) button
3. The system will generate 24 authentic customers with random visits

Or seed via API:
```bash
curl -X POST http://localhost:3000/api/seed
```

## API Endpoints

### Customers
- `GET /api/customers` - List all customers
- `GET /api/customers/:id` - Get single customer
- `POST /api/customers` - Create new customer
- `PATCH /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Visits
- `GET /api/customers/:customerId/visits` - List visits for customer
- `POST /api/customers/:customerId/visits` - Create visit
- `DELETE /api/visits/:id` - Delete visit

### Utilities
- `GET /api/stats` - Dashboard statistics (total customers, total visits)
- `POST /api/seed` - Seed demo data

## Data Generation

### Mock Data Features
The seed data generator creates realistic Iranian customer profiles:

```typescript
generateMockCustomers(count: number)
// Generates:
// - Unique Iranian phone numbers
// - Unique Persian license plates
// - Random Persian names
// - Random car brands and models
// - 1-5 visits per customer (1-3 months old)
// - Random service types and prices
```

Example generated customer:
```json
{
  "id": "bb316116-1851-44e3-a204-626447cb15a2",
  "full_name": "طاها",
  "phone": "09102768263",
  "license_plate": "123 الف 324",
  "car_brand": "Toyota",
  "car_model": "Corolla",
  "created_at": "2026-06-02T12:08:29.333Z"
}
```

## Usage Examples

### Dashboard Features

**Search & Filter**
- Search by name, phone, license plate, or brand
- Filter by vehicle brand (8 popular brands)
- Real-time result count

**Customer Card**
- Shows name, phone, license plate, vehicle info
- Click to view details and visit history
- Delete button with confirmation

**Customer Detail Page**
- Full customer information with edit form
- Visit history with service type and pricing
- Add new visit form
- Back navigation to dashboard

### Service Types (for visits)
- سرویس عادی (Standard Service) - 50,000 IRR
- سرویس VIP (VIP Service) - 75,000 IRR
- واکس (Wax) - 100,000 IRR
- تمیز داخل (Interior Cleaning) - 150,000 IRR

## Performance

- Real-time search with instant filtering
- Indexed database queries on phone, license plate, brand
- Optimized API routes with streaming support
- Minimal JavaScript with server-side rendering
- Database pagination ready (Future enhancement)

## Security

- Row Level Security (RLS) enabled on all tables
- Public read access for demo (configurable)
- User session management via Supabase Auth (future)
- Input validation on all API endpoints
- CORS headers configured

## Localization

- Full RTL (right-to-left) support
- All UI text in Persian/Farsi
- Persian number formatting
- Persian date handling

## Future Enhancements

- User authentication and per-user data filtering
- Advanced reporting and analytics
- Receipt/invoice generation
- SMS notifications for customers
- Payment integration
- Image upload for vehicle photos
- Multi-language support
- Pagination for large customer lists
- Export to Excel/PDF
- Customer messaging system

## Testing

The application includes realistic test data with:
- 24 pre-seeded customers
- Varied service histories
- Edge cases (long names, multiple vehicles, etc.)

## Deployment

Deploy to Vercel with a single click:

```bash
pnpm build
pnpm start
```

Environment variables are automatically configured via Supabase integration.

## Support

For issues or questions:
1. Check browser console for errors
2. Verify Supabase connection status
3. Review API response in Network tab
4. Check database tables in Supabase console

## License

Built with v0 - Vercel's AI code generator
