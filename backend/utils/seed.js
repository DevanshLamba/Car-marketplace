const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');
const Car = require('../models/Car');

dotenv.config({ path: path.join(__dirname, '../.env') });

const sampleCars = [
  {
    title: '2023 BMW M4 Competition Coupe',
    brand: 'BMW', model: 'M4 Competition', year: 2023, price: 78500,
    fuelType: 'Petrol', transmission: 'Automatic', kmDriven: 12500,
    location: 'Los Angeles, CA',
    description: 'Immaculate BMW M4 Competition finished in Isle of Man Green. Carbon fiber exterior package, M Drivers Package, Harman Kardon Surround Sound. Clean title, full service history.',
    images: ['https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&auto=format&fit=crop']
  },
  {
    title: '2024 Porsche 911 Carrera S',
    brand: 'Porsche', model: '911 Carrera S', year: 2024, price: 132000,
    fuelType: 'Petrol', transmission: 'Automatic', kmDriven: 4200,
    location: 'Miami, FL',
    description: 'Pristine 992 Porsche 911 Carrera S. Twin-turbo 3.0L flat-six producing 443 hp. Sport Chrono Package, Sport Exhaust, PASM Sport Suspension.',
    images: ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&auto=format&fit=crop']
  },
  {
    title: '2023 Audi RS6 Avant',
    brand: 'Audi', model: 'RS6 Avant', year: 2023, price: 118000,
    fuelType: 'Hybrid', transmission: 'Automatic', kmDriven: 18000,
    location: 'Chicago, IL',
    description: '4.0L Twin-Turbo V8 with 48V mild hybrid generating 591 HP. Black Optic package, Dynamic Ride Control, Bang & Olufsen 3D sound.',
    images: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&auto=format&fit=crop']
  },
  {
    title: '2022 Mercedes-AMG G 63',
    brand: 'Mercedes-Benz', model: 'G 63 AMG', year: 2022, price: 169900,
    fuelType: 'Petrol', transmission: 'Automatic', kmDriven: 21000,
    location: 'Dallas, TX',
    description: 'AMG G 63 in Obsidian Black. Handcrafted 4.0L V8 biturbo engine with 577 hp. AMG Night Package, 22-inch forged wheels.',
    images: ['https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?w=1200&auto=format&fit=crop']
  },
  {
    title: '2024 Tesla Model S Plaid',
    brand: 'Tesla', model: 'Model S Plaid', year: 2024, price: 89000,
    fuelType: 'Electric', transmission: 'Automatic', kmDriven: 8500,
    location: 'San Francisco, CA',
    description: 'Tri-motor AWD producing 1,020 HP. 0-60 in 1.99 seconds. Full Self-Driving capability, Yoke steering wheel, ultra-white interior.',
    images: ['https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&auto=format&fit=crop']
  },
  {
    title: '2023 Toyota GR Supra 3.0',
    brand: 'Toyota', model: 'GR Supra 3.0', year: 2023, price: 54900,
    fuelType: 'Petrol', transmission: 'Manual', kmDriven: 14000,
    location: 'Seattle, WA',
    description: '6-Speed Manual GR Supra. 2.0L VTEC Turbo making 315 HP with rev-match control. Brembo brakes, adaptive suspension, JBL audio.',
    images: ['https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&auto=format&fit=crop']
  },
  {
    title: '2022 Ford Mustang Shelby GT500',
    brand: 'Ford', model: 'Mustang Shelby GT500', year: 2022, price: 84500,
    fuelType: 'Petrol', transmission: 'Automatic', kmDriven: 9800,
    location: 'Houston, TX',
    description: '5.2L Supercharged V8 with 760 HP. TREMEC 7-speed dual-clutch transmission. Carbon Fiber Track Pack, Recaro seats, Brembo brakes.',
    images: ['https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=1200&auto=format&fit=crop']
  },
  {
    title: '2023 Honda Civic Type R',
    brand: 'Honda', model: 'Civic Type R', year: 2023, price: 46800,
    fuelType: 'Petrol', transmission: 'Manual', kmDriven: 11200,
    location: 'Denver, CO',
    description: 'FL5 Civic Type R in Championship White. 2.0L VTEC Turbo 315 HP, 6-speed manual. Brembo brakes, LogR telemetry.',
    images: ['https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&auto=format&fit=crop']
  }
];

const seed = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('ERROR: MONGODB_URI is required in backend/.env to run the seeder.');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas...');

    await User.deleteMany({});
    await Car.deleteMany({});
    console.log('Cleared existing data.');

    const user1 = await User.create({ name: 'Alex Morgan', email: 'demo@carhub.com', password: 'password123' });
    const user2 = await User.create({ name: 'Sarah Connor', email: 'sarah@carhub.com', password: 'password123' });
    console.log('Created demo users: demo@carhub.com and sarah@carhub.com (password: password123)');

    const carsWithSeller = sampleCars.map((car, i) => ({
      ...car,
      sellerId: i % 2 === 0 ? user1._id : user2._id
    }));

    const inserted = await Car.insertMany(carsWithSeller);
    user1.wishlist.push(inserted[0]._id, inserted[1]._id);
    await user1.save();

    console.log(`Inserted ${inserted.length} car listings.`);
    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seed();
