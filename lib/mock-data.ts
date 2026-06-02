// Persian customer mock data
export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  joinDate: string;
  vehicle: {
    brand: string;
    model: string;
    licensePlate: string;
    year: number;
    color: string;
  };
  status: 'active' | 'inactive' | 'pending';
}

const PERSIAN_FIRST_NAMES = [
  'محمد',
  'علی',
  'فاطمه',
  'زهرا',
  'حسن',
  'حسین',
  'مریم',
  'نگار',
  'سهیل',
  'داریوش',
  'پریا',
  'شهرام',
  'مهدی',
  'آزاده',
  'رامین',
  'بهار',
  'کیان',
  'سارا',
  'امیر',
  'نیلا',
];

const PERSIAN_LAST_NAMES = [
  'محمودی',
  'رحیمی',
  'شریفی',
  'کریمی',
  'علوی',
  'حسنی',
  'فرهادی',
  'سپهری',
  'ایرانی',
  'کاشانی',
  'تبریزی',
  'اصفهانی',
  'شیرازی',
  'تهرانی',
  'بندری',
  'رشتی',
  'گرگانی',
  'خراسانی',
  'قزوینی',
  'همدانی',
];

const CAR_BRANDS = [
  { brand: 'Toyota', models: ['Corolla', 'Camry', 'RAV4', 'Yaris', 'Prius'] },
  { brand: 'Hyundai', models: ['Elantra', 'Santa Fe', 'Tucson', 'Accent', 'Sonata'] },
  { brand: 'Kia', models: ['Optima', 'Sportage', 'Cerato', 'Sorento', 'Picanto'] },
  { brand: 'Peugeot', models: ['207', '206', '405', '301', '308'] },
  { brand: 'Renault', models: ['Dacia', 'Symbol', 'Sandero', 'Espace', 'Clio'] },
  { brand: 'BMW', models: ['X5', '520i', '320i', '330i', '730i'] },
  { brand: 'Mercedes', models: ['C300', 'E350', 'GLC', 'GLE', 'S500'] },
  { brand: 'Nissan', models: ['Altima', 'Rogue', 'Sentra', 'Murano', 'Pathfinder'] },
];

const CARS_COLORS = [
  'سفید',
  'مشکی',
  'نقره‌ای',
  'خاکستری',
  'قرمز',
  'آبی',
  'سبز',
  'طلایی',
  'بژ',
  'بنفش',
];

// Generate Iranian mobile number (0930-0999)
function generateIranianPhone(): string {
  const prefixes = ['0930', '0931', '0932', '0933', '0934', '0935', '0936', '0937', '0938', '0939'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = Math.floor(Math.random() * 10000000)
    .toString()
    .padStart(7, '0');
  return `${prefix}${number}`;
}

// Generate Iranian license plate (format: ۱۲۳ الف ۱۲۳)
function generateLicensePlate(): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const letters = ['الف', 'ب', 'پ', 'ت', 'ث', 'ج', 'چ', 'ح', 'خ', 'د'];

  const num1 = Array.from({ length: 3 }, () => persianDigits[Math.floor(Math.random() * 10)]).join('');
  const letter = letters[Math.floor(Math.random() * letters.length)];
  const num2 = Array.from({ length: 3 }, () => persianDigits[Math.floor(Math.random() * 10)]).join('');

  return `${num1} ${letter} ${num2}`;
}

function generateEmail(firstName: string, lastName: string): string {
  const emailDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'protonmail.com'];
  const domain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
}

function generateCustomers(count: number): Customer[] {
  const customers: Customer[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = PERSIAN_FIRST_NAMES[Math.floor(Math.random() * PERSIAN_FIRST_NAMES.length)];
    const lastName = PERSIAN_LAST_NAMES[Math.floor(Math.random() * PERSIAN_LAST_NAMES.length)];
    const carBrand = CAR_BRANDS[Math.floor(Math.random() * CAR_BRANDS.length)];
    const carModel = carBrand.models[Math.floor(Math.random() * carBrand.models.length)];
    const color = CARS_COLORS[Math.floor(Math.random() * CARS_COLORS.length)];
    const year = 2015 + Math.floor(Math.random() * 10);

    const statuses: Array<'active' | 'inactive' | 'pending'> = ['active', 'inactive', 'pending'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    const daysAgo = Math.floor(Math.random() * 730); // Up to 2 years
    const joinDate = new Date();
    joinDate.setDate(joinDate.getDate() - daysAgo);

    customers.push({
      id: `CUST-${String(i + 1).padStart(5, '0')}`,
      name: `${firstName} ${lastName}`,
      phone: generateIranianPhone(),
      email: generateEmail(firstName, lastName),
      joinDate: joinDate.toISOString().split('T')[0],
      vehicle: {
        brand: carBrand.brand,
        model: carModel,
        licensePlate: generateLicensePlate(),
        year,
        color,
      },
      status,
    });
  }

  return customers;
}

export const mockCustomers = generateCustomers(24);
