// Persian names, phone numbers, and car data
export const PERSIAN_NAMES = [
  'محمد علی',
  'مریم فاطمه',
  'علی حسین',
  'فاطمه زهرا',
  'محمود احمد',
  'سارا خانم',
  'رضا کریمی',
  'زهرا نوری',
  'حسن رفیعی',
  'نیلا شریفی',
  'امیر علی',
  'آزاده کاظمی',
  'شهریار قدیری',
  'الهام صادقی',
  'فرهاد محمودی',
  'عائشه احمدی',
  'جواد جعفری',
  'لیلا محمودی',
  'کیومرث رضائی',
  'معصومه حسنی',
]

// Iranian phone numbers (0930-0939 valid ranges)
export const PHONE_PREFIXES = ['0930', '0931', '0932', '0933', '0934', '0935', '0936', '0937', '0938', '0939']

export const CAR_BRANDS = ['Toyota', 'Hyundai', 'Kia', 'Peugeot', 'Renault', 'BMW', 'Mercedes', 'Nissan']

export const CAR_MODELS: Record<string, string[]> = {
  Toyota: ['Corolla', 'Camry', 'RAV4', 'Yaris', 'Prius'],
  Hyundai: ['Elantra', 'Tucson', 'Sonata', 'i10', 'Accent'],
  Kia: ['Cerato', 'Sportage', 'Optima', 'Picanto', 'Rio'],
  Peugeot: ['206', '207', '308', '405', '2008'],
  Renault: ['Duster', 'Sandero', 'Clio', 'Laguna', 'Scenic'],
  BMW: ['3 Series', '5 Series', '7 Series', 'X3', 'X5'],
  Mercedes: ['C-Class', 'E-Class', 'S-Class', 'GLE', 'GLC'],
  Nissan: ['Altima', 'Maxima', 'Qashqai', 'Pathfinder', 'Rogue'],
}

export const CAR_COLORS_PERSIAN = ['سفید', 'سیاه', 'نقره ای', 'قرمز', 'آبی', 'طلایی', 'رنگین', 'خاکی']

// License plate format: ۱۲۳ الف ۴۵۶ (Persian numbers and letters)
export const LICENSE_PLATE_LETTERS = ['الف', 'ب', 'ج', 'د', 'ه', 'و', 'ز', 'ح', 'ط', 'ی']

export function generateIranianPhone(): string {
  const prefix = PHONE_PREFIXES[Math.floor(Math.random() * PHONE_PREFIXES.length)]
  const restOfNumber = Math.floor(Math.random() * 10000000)
    .toString()
    .padStart(7, '0')
  return `${prefix}${restOfNumber}`
}

export function generateLicensePlate(): string {
  const num1 = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0')
  const letter = LICENSE_PLATE_LETTERS[Math.floor(Math.random() * LICENSE_PLATE_LETTERS.length)]
  const num2 = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0')
  return `${num1} ${letter} ${num2}`
}

export function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export interface MockCustomer {
  full_name: string
  phone: string
  license_plate: string
  car_brand: string
  car_model: string
}

export function generateMockCustomer(): MockCustomer {
  const brand = getRandomElement(CAR_BRANDS)
  return {
    full_name: getRandomElement(PERSIAN_NAMES),
    phone: generateIranianPhone(),
    license_plate: generateLicensePlate(),
    car_brand: brand,
    car_model: getRandomElement(CAR_MODELS[brand]),
  }
}

export function generateMockCustomers(count: number): MockCustomer[] {
  const customers: MockCustomer[] = []
  const usedPhones = new Set<string>()
  const usedPlates = new Set<string>()

  for (let i = 0; i < count; i++) {
    let customer = generateMockCustomer()

    // Ensure unique phone and license plate
    while (usedPhones.has(customer.phone) || usedPlates.has(customer.license_plate)) {
      customer = generateMockCustomer()
    }

    usedPhones.add(customer.phone)
    usedPlates.add(customer.license_plate)
    customers.push(customer)
  }

  return customers
}
