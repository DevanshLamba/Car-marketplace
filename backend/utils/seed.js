const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Car = require('../models/Car');

dotenv.config();

const sampleCars = [
  {
    title: '2023 BMW M4 Competition Coupe',
    brand: 'BMW',
    model: 'M4 Competition',
    year: 2023,
    price: 78500,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    kmDriven: 12500,
    location: 'Los Angeles, CA',
    description: 'Immaculate BMW M4 Competition finished in Isle of Man Green metallic with Kyalami Orange leather interior. Carbon fiber exterior package, M Drivers Package, Executive package, and Harman Kardon Surround Sound. Clean title, zero accidents, full dealership service history.',
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    title: '2024 Porsche 911 Carrera S',
    brand: 'Porsche',
    model: '911 Carrera S',
    year: 2024,
    price: 132000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    kmDriven: 4200,
    location: 'Miami, FL',
    description: 'Pristine 992 generation Porsche 911 Carrera S. Powered by a twin-turbo 3.0L flat-six producing 443 hp. Features Sport Chrono Package, Sport Exhaust System, PASM Sport Suspension (-10mm), 20/21-inch RS Spyder Design wheels, and Burmester High-End Surround Sound System.',
    images: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    title: '2023 Audi RS6 Avant Dynamic',
    brand: 'Audi',
    model: 'RS6 Avant',
    year: 2023,
    price: 118000,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    kmDriven: 18000,
    location: 'Chicago, IL',
    description: 'The ultimate performance wagon. 4.0L Twin-Turbo V8 with 48V mild hybrid technology generating 591 HP. Black Optic package, Dynamic Ride Control, Night Vision Assistant, and Bang & Olufsen 3D Advanced Sound System.',
    images: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    title: '2022 Mercedes-AMG G 63 SUV',
    brand: 'Mercedes-Benz',
    model: 'G 63 AMG',
    year: 2022,
    price: 169900,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    kmDriven: 21000,
    location: 'Dallas, TX',
    description: 'G-Wagon AMG G 63 in Obsidian Black Metallic over G Manufaktur Nappa Leather. Handcrafted AMG 4.0L V8 biturbo engine with 577 hp. AMG Night Package, 22-inch forged AMG cross-spoke wheels, and massaging seats.',
    images: [
      'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    title: '2024 Tesla Model S Plaid',
    brand: 'Tesla',
    model: 'Model S Plaid',
    year: 2024,
    price: 89000,
    fuelType: 'Electric',
    transmission: 'Automatic',
    kmDriven: 8500,
    location: 'San Francisco, CA',
    description: 'Tri-motor all-wheel drive producing 1,020 HP with 0-60 mph in 1.99 seconds. Full Self-Driving (FSD) capability transferred, Yoke steering wheel, ultra-white interior, carbon fiber spoiler, and 21-inch Arachnid Wheels.',
    images: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    title: '2023 Toyota Supra 3.0 Premium',
    brand: 'Toyota',
    model: 'GR Supra 3.0',
    year: 2023,
    price: 54900,
    fuelType: 'Petrol',
    transmission: 'Manual',
    kmDriven: 14000,
    location: 'Seattle, WA',
    description: '6-Speed Manual transmission GR Supra! Renaissance Red 2.0 exterior over Black Leather. Brembo 4-piston front brakes, adaptive variable suspension, active rear differential, JBL 12-speaker audio system, and heads-up display.',
    images: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    title: '2022 Ford Mustang Shelby GT500',
    brand: 'Ford',
    model: 'Mustang Shelby GT500',
    year: 2022,
    price: 84500,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    kmDriven: 9800,
    location: 'Houston, TX',
    description: '5.2L Supercharged Cross-Plane Crank V8 boasting 760 horsepower. TREMEC 7-speed dual-clutch transmission. Carbon Fiber Track Pack, Recaro leather seats, Brembo brakes with red calipers, and Technology Package.',
    images: [
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    title: '2023 Honda Civic Type R',
    brand: 'Honda',
    model: 'Civic Type R',
    year: 2023,
    price: 46800,
    fuelType: 'Petrol',
    transmission: 'Manual',
    kmDriven: 11200,
    location: 'Denver, CO',
    description: 'FL5 Generation Civic Type R finished in Championship White with signature Red Suede interior. 2.0L VTEC Turbo engine making 315 HP mated to a slick 6-speed manual with rev-match control. Brembo brakes and LogR telemetry.',
    images: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=1200&auto=format&fit=crop'
    ]
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/car_marketplace';
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('[Seed] Connected to MongoDB database...');

    // Clear existing data
    await User.deleteMany({});
    await Car.deleteMany({});

    console.log('[Seed] Cleared existing User and Car collections');

    // Create Demo Users
    const user1 = await User.create({
      name: 'Alex Morgan',
      email: 'demo@carhub.com',
      password: 'password123'
    });

    const user2 = await User.create({
      name: 'Sarah Connor',
      email: 'sarah@carhub.com',
      password: 'password123'
    });

    console.log(`[Seed] Created test users:`);
    console.log(`   - User 1: demo@carhub.com / password123`);
    console.log(`   - User 2: sarah@carhub.com / password123`);

    // Assign cars to users
    const carsToInsert = sampleCars.map((car, index) => ({
      ...car,
      sellerId: index % 2 === 0 ? user1._id : user2._id
    }));

    const insertedCars = await Car.insertMany(carsToInsert);
    console.log(`[Seed] Inserted ${insertedCars.length} sample car listings!`);

    // Add first 2 cars to user1 wishlist as initial sample data
    user1.wishlist.push(insertedCars[0]._id, insertedCars[1]._id);
    await user1.save();
    console.log('[Seed] Added sample listings to demo user wishlist');

    console.log('✅ Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error.message);
    console.error('Ensure local MongoDB service is running on 127.0.0.1:27017');
    process.exit(1);
  }
};

seedDB();
