# Persian Customer Management Dashboard

A production-ready customer management dashboard featuring realistic Persian mock data with Iranian contact information and vehicle details.

## Features

✨ **Realistic Persian Data**
- Authentic Persian names from common first and last name lists
- Valid Iranian mobile numbers (09XX format)
- Authentic Iranian license plates (Persian numerals + Persian letters)
- Popular car brands common in Iran (Toyota, Hyundai, Kia, Peugeot, Renault, BMW, Mercedes, Nissan)

📊 **Dashboard Statistics**
- Total customer count
- Active/inactive/pending status breakdown
- Real-time counts based on filtered data

🔍 **Advanced Filtering**
- Search by customer name, phone, email, or license plate
- Filter by customer status (active/inactive/pending)
- Filter by vehicle brand
- Real-time result count updates
- Easy reset button to clear all filters

📱 **Production-Ready UI**
- Responsive design (mobile-first)
- Clean customer cards with vehicle information
- Color-coded status badges
- Professional typography and spacing
- Accessibility-compliant components

## Data Structure

Each customer includes:
```typescript
{
  id: string;              // Customer ID (CUST-00001, etc.)
  name: string;            // Persian name
  phone: string;           // Iranian mobile number
  email: string;           // Email address
  joinDate: string;        // Date joined (YYYY-MM-DD)
  vehicle: {
    brand: string;         // Car brand
    model: string;         // Car model
    licensePlate: string;  // Persian license plate
    year: number;          // Vehicle year
    color: string;         // Vehicle color (Persian names)
  };
  status: string;          // 'active' | 'inactive' | 'pending'
}
```

## Car Brands Included

- **Toyota** - Corolla, Camry, RAV4, Yaris, Prius
- **Hyundai** - Elantra, Santa Fe, Tucson, Accent, Sonata
- **Kia** - Optima, Sportage, Cerato, Sorento, Picanto
- **Peugeot** - 207, 206, 405, 301, 308
- **Renault** - Dacia, Symbol, Sandero, Espace, Clio
- **BMW** - X5, 520i, 320i, 330i, 730i
- **Mercedes** - C300, E350, GLC, GLE, S500
- **Nissan** - Altima, Rogue, Sentra, Murano, Pathfinder

## Iranian Mobile Number Format

Valid prefixes (operators):
- 0930-0939 (Hamrah-e Avval - MCI)
- Other Iranian carriers

Example: `09337503335`

## License Plate Format

Authentic Iranian format with Persian numerals and letters:
- Format: `۱۲۳ الف ۱۲۳`
- Persian numerals: ۰۱۲۳۴۵۶۷۸۹
- Common letters: الف, ب, پ, ت, ث, ج, چ, ح, خ, د

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

## Components

### `CustomerCard`
Displays a single customer with:
- Basic information (name, ID, contact)
- Status badge
- Vehicle details
- License plate

### Dashboard Page
- Statistics overview
- Advanced filter controls
- Responsive customer grid
- Empty state handling

## Styling

- Built with Tailwind CSS
- Responsive design with breakpoints (sm, md, lg, xl)
- Color-coded status indicators:
  - Green: Active customers
  - Gray: Inactive customers
  - Yellow: Pending customers
- Professional spacing and typography

## Mock Data Generation

The mock data is generated dynamically in `/lib/mock-data.ts`:
- 24 customers by default
- Randomized data with realistic patterns
- Join dates within the last 2 years
- Vehicle years between 2015-2024
- All Persian text properly formatted

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Shadcn/UI** - Production-ready components
- **React** - UI library with hooks

## File Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Dashboard page
│   └── globals.css         # Global styles
├── components/
│   ├── customer-card.tsx   # Customer card component
│   └── ui/                 # Shadcn components
├── lib/
│   └── mock-data.ts        # Mock data generation
└── package.json
```

## Customization

To customize the mock data:

1. **Add more names**: Edit `PERSIAN_FIRST_NAMES` and `PERSIAN_LAST_NAMES` arrays
2. **Add car models**: Update `CAR_BRANDS` with new brands/models
3. **Change data count**: Modify the `generateCustomers(24)` call to generate more/fewer records
4. **Adjust colors**: Update `CARS_COLORS` array with additional Persian color names

## Performance

- Optimized component rendering with React hooks
- Efficient filtering with `useMemo`
- Responsive images and lazy loading ready
- Production-optimized build

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

---

Built with v0 and production-ready for deployment.
