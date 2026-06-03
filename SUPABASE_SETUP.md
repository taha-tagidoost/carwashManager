# Supabase Database Setup Guide

This guide provides the SQL queries needed to create the new tables and modify existing tables for the car wash CRM system.

## New Tables to Create

### 1. Vehicle Brands Table

```sql
CREATE TABLE public.vehicle_brands (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Create index for faster lookups
CREATE INDEX idx_vehicle_brands_name ON public.vehicle_brands(name);

-- Enable RLS if needed
ALTER TABLE public.vehicle_brands ENABLE ROW LEVEL SECURITY;
```

### 2. Vehicle Models Table

```sql
CREATE TABLE public.vehicle_models (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_id uuid NOT NULL REFERENCES public.vehicle_brands(id) ON DELETE CASCADE,
  name text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Create index for faster lookups
CREATE INDEX idx_vehicle_models_brand_id ON public.vehicle_models(brand_id);
CREATE INDEX idx_vehicle_models_name ON public.vehicle_models(name);

-- Enable RLS if needed
ALTER TABLE public.vehicle_models ENABLE ROW LEVEL SECURITY;
```

### 3. Tips Table

```sql
CREATE TABLE public.tips (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  visit_id uuid NOT NULL REFERENCES public.visits(id) ON DELETE CASCADE,
  worker_id uuid REFERENCES public.workers(id) ON DELETE SET NULL,
  amount numeric(10, 2) NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Create indexes for faster lookups
CREATE INDEX idx_tips_visit_id ON public.tips(visit_id);
CREATE INDEX idx_tips_worker_id ON public.tips(worker_id);

-- Enable RLS if needed
ALTER TABLE public.tips ENABLE ROW LEVEL SECURITY;
```

## Existing Tables to Modify

### 1. Workers Table (if not already has is_active)

```sql
-- Add is_active column if it doesn't exist
ALTER TABLE public.workers
ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;

-- Create index for filtering active workers
CREATE INDEX idx_workers_is_active ON public.workers(is_active);
```

### 2. Services Table (if not already has is_active)

```sql
-- Add is_active column if it doesn't exist
ALTER TABLE public.services
ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;

-- Create index for filtering active services
CREATE INDEX idx_services_is_active ON public.services(is_active);
```

### 3. Visits Table (verify tip_amount exists)

```sql
-- Ensure tip_amount column exists
ALTER TABLE public.visits
ADD COLUMN IF NOT EXISTS tip_amount numeric(10, 2) DEFAULT 0;

-- Ensure worker_id column exists
ALTER TABLE public.visits
ADD COLUMN IF NOT EXISTS worker_id uuid REFERENCES public.workers(id) ON DELETE SET NULL;

-- Create index for worker lookups
CREATE INDEX idx_visits_worker_id ON public.visits(worker_id);
```

## Steps to Apply

1. Go to your Supabase project
2. Navigate to the SQL Editor
3. Create a new query for each section above
4. Execute the queries in order
5. Verify that all tables are created and indexes are applied

## Verification Queries

After creating the tables, you can verify they exist:

```sql
-- Check all tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check vehicle_brands structure
DESC public.vehicle_brands;

-- Check vehicle_models structure
DESC public.vehicle_models;

-- Check tips structure
DESC public.tips;
```

## Notes

- All tables use UUID as primary keys for consistency
- Foreign keys are set to CASCADE delete to maintain referential integrity
- Indexes are created on frequently queried columns for better performance
- Created_at timestamps are automatically set to UTC
- The tip_amount field in visits stores the total tips for a visit
- The tips table allows for detailed tracking of tips per worker if needed in the future
