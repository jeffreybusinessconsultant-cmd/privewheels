import type { Car, Booking, User } from "@shared/schema";

// Import car images
import TataNexonEV from "@/assets/images/TataNexonEV.jpeg";
import MahindraThar from "@/assets/images/MahindraThar.jpeg";
import HyundaiCreta from "@/assets/images/HyundaiCreta.jpeg";
import MarutiSuzukiGrandVitara from "@/assets/images/MarutiSuzukiGrandVitara.jpeg";
import KiaSeltos from "@/assets/images/KiaSeltos.jpeg";
import MGHector from "@/assets/images/MGHector.jpeg";

export const mockCars: Car[] = [
  {
    id: 1,
    make: "Tata",
    model: "Nexon EV",
    year: 2023,
    color: "Blue",
    imageUrl: TataNexonEV,
    price: 1800000,
    shares: 12,
    sharePrice: 150000,
    description: "Electric SUV with modern features and excellent range. Perfect for city commutes and weekend getaways.",
    specs: JSON.stringify({
      range: "312 km",
      battery: "30.2 kWh",
      power: "129 PS",
      torque: "245 Nm",
      seating: "5",
      transmission: "Automatic"
    }),
    location: "Mumbai",
    contactNumber: "+91 98765 43210",
    status: "available"
  },
  {
    id: 2,
    make: "Mahindra",
    model: "Thar",
    year: 2024,
    color: "Red",
    imageUrl: MahindraThar,
    price: 1500000,
    shares: 12,
    sharePrice: 125000,
    description: "Iconic off-roader with rugged design and powerful performance. Adventure awaits!",
    specs: JSON.stringify({
      engine: "2.0L mStallion",
      power: "150 PS",
      torque: "300 Nm",
      seating: "4",
      transmission: "Manual/Automatic",
      driveType: "4WD"
    }),
    location: "Bangalore",
    contactNumber: "+91 98765 43211",
    status: "available"
  },
  {
    id: 3,
    make: "Hyundai",
    model: "Creta",
    year: 2023,
    color: "White",
    imageUrl: HyundaiCreta,
    price: 1400000,
    shares: 12,
    sharePrice: 116667,
    description: "Premium SUV with spacious interiors and advanced safety features.",
    specs: JSON.stringify({
      engine: "1.5L Turbo Petrol",
      power: "160 PS",
      torque: "253 Nm",
      seating: "5",
      transmission: "DCT",
      fuelType: "Petrol"
    }),
    location: "Delhi",
    contactNumber: "+91 98765 43212",
    status: "available"
  },
  {
    id: 4,
    make: "Maruti Suzuki",
    model: "Grand Vitara",
    year: 2024,
    color: "Silver",
    imageUrl: MarutiSuzukiGrandVitara,
    price: 1700000,
    shares: 12,
    sharePrice: 141667,
    description: "Strong hybrid SUV with excellent fuel efficiency and premium features.",
    specs: JSON.stringify({
      engine: "1.5L Strong Hybrid",
      power: "116 PS",
      mileage: "27.97 kmpl",
      seating: "5",
      transmission: "e-CVT",
      fuelType: "Hybrid"
    }),
    location: "Pune",
    contactNumber: "+91 98765 43213",
    status: "available"
  },
  {
    id: 5,
    make: "Kia",
    model: "Seltos",
    year: 2023,
    color: "Black",
    imageUrl: KiaSeltos,
    price: 1600000,
    shares: 12,
    sharePrice: 133333,
    description: "Stylish compact SUV with cutting-edge technology and comfort.",
    specs: JSON.stringify({
      engine: "1.5L Turbo Petrol",
      power: "160 PS",
      torque: "253 Nm",
      seating: "5",
      transmission: "DCT",
      features: "Sunroof, Ventilated Seats"
    }),
    location: "Hyderabad",
    contactNumber: "+91 98765 43214",
    status: "available"
  },
  {
    id: 6,
    make: "MG",
    model: "Hector",
    year: 2024,
    color: "Grey",
    imageUrl: MGHector,
    price: 1900000,
    shares: 12,
    sharePrice: 158333,
    description: "Connected SUV with panoramic sunroof and AI assistant.",
    specs: JSON.stringify({
      engine: "2.0L Turbo Diesel",
      power: "170 PS",
      torque: "350 Nm",
      seating: "5/7",
      transmission: "Manual/Automatic",
      features: "AI Assistant, Panoramic Sunroof"
    }),
    location: "Chennai",
    contactNumber: "+91 98765 43215",
    status: "available"
  }
];

export const mockUsers: User[] = [
  {
    id: 1,
    username: "demo_user",
    fullName: "Demo User",
    email: "demo@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
    isAdmin: false,
    createdAt: new Date("2024-01-15")
  }
];

export const mockBookings: Booking[] = [
  {
    id: 1,
    carId: 1,
    userId: 1,
    startDate: new Date("2024-03-20"),
    endDate: new Date("2024-03-22"),
    status: "confirmed",
    createdAt: new Date("2024-02-10")
  },
  {
    id: 2,
    carId: 3,
    userId: 1,
    startDate: new Date("2024-03-25"),
    endDate: new Date("2024-03-27"),
    status: "confirmed",
    createdAt: new Date("2024-02-12")
  }
];
