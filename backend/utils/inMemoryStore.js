const bcrypt = require('bcryptjs');

let isSeeded = false;

// Mock database state
let users = [];
let cars = [];

const initStore = async () => {
  if (isSeeded) return;

  const hashedPassword = await bcrypt.hash('password123', 10);

  const user1 = {
    _id: 'user_demo_1',
    name: 'Alex Morgan',
    email: 'demo@carhub.com',
    password: hashedPassword,
    wishlist: ['car_1', 'car_2'],
    createdAt: new Date()
  };

  const user2 = {
    _id: 'user_demo_2',
    name: 'Sarah Connor',
    email: 'sarah@carhub.com',
    password: hashedPassword,
    wishlist: [],
    createdAt: new Date()
  };

  users = [user1, user2];

  cars = [
    {
      _id: 'car_1',
      title: '2023 BMW M4 Competition Coupe',
      brand: 'BMW',
      model: 'M4 Competition',
      year: 2023,
      price: 78500,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      kmDriven: 12500,
      location: 'Los Angeles, CA',
      description: 'Immaculate BMW M4 Competition finished in Isle of Man Green metallic with Kyalami Orange leather interior. Carbon fiber exterior package, M Drivers Package, Executive package, and Harman Kardon Surround Sound.',
      images: [
        'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop'
      ],
      sellerId: { _id: user1._id, name: user1.name, email: user1.email },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
    },
    {
      _id: 'car_2',
      title: '2024 Porsche 911 Carrera S',
      brand: 'Porsche',
      model: '911 Carrera S',
      year: 2024,
      price: 132000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      kmDriven: 4200,
      location: 'Miami, FL',
      description: 'Pristine 992 generation Porsche 911 Carrera S. Powered by a twin-turbo 3.0L flat-six producing 443 hp. Features Sport Chrono Package, Sport Exhaust System, PASM Sport Suspension, and Burmester sound.',
      images: [
        'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop'
      ],
      sellerId: { _id: user2._id, name: user2.name, email: user2.email },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4)
    },
    {
      _id: 'car_3',
      title: '2023 Audi RS6 Avant Dynamic',
      brand: 'Audi',
      model: 'RS6 Avant',
      year: 2023,
      price: 118000,
      fuelType: 'Hybrid',
      transmission: 'Automatic',
      kmDriven: 18000,
      location: 'Chicago, IL',
      description: 'The ultimate performance wagon. 4.0L Twin-Turbo V8 with 48V mild hybrid technology generating 591 HP. Black Optic package, Dynamic Ride Control, and Bang & Olufsen 3D Advanced Sound System.',
      images: [
        'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop'
      ],
      sellerId: { _id: user1._id, name: user1.name, email: user1.email },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)
    },
    {
      _id: 'car_4',
      title: '2022 Mercedes-AMG G 63 SUV',
      brand: 'Mercedes-Benz',
      model: 'G 63 AMG',
      year: 2022,
      price: 169900,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      kmDriven: 21000,
      location: 'Dallas, TX',
      description: 'G-Wagon AMG G 63 in Obsidian Black Metallic over G Manufaktur Nappa Leather. Handcrafted AMG 4.0L V8 biturbo engine with 577 hp. AMG Night Package, 22-inch forged AMG wheels.',
      images: [
        'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop'
      ],
      sellerId: { _id: user2._id, name: user2.name, email: user2.email },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
    },
    {
      _id: 'car_5',
      title: '2024 Tesla Model S Plaid',
      brand: 'Tesla',
      model: 'Model S Plaid',
      year: 2024,
      price: 89000,
      fuelType: 'Electric',
      transmission: 'Automatic',
      kmDriven: 8500,
      location: 'San Francisco, CA',
      description: 'Tri-motor all-wheel drive producing 1,020 HP with 0-60 mph in 1.99 seconds. Full Self-Driving (FSD) capability transferred, Yoke steering wheel, ultra-white interior, carbon fiber spoiler.',
      images: [
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=1200&auto=format&fit=crop'
      ],
      sellerId: { _id: user1._id, name: user1.name, email: user1.email },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8)
    },
    {
      _id: 'car_6',
      title: '2023 Toyota Supra 3.0 Premium',
      brand: 'Toyota',
      model: 'GR Supra 3.0',
      year: 2023,
      price: 54900,
      fuelType: 'Petrol',
      transmission: 'Manual',
      kmDriven: 14000,
      location: 'Seattle, WA',
      description: '6-Speed Manual transmission GR Supra! Renaissance Red exterior over Black Leather. Brembo 4-piston front brakes, adaptive variable suspension, JBL 12-speaker audio system.',
      images: [
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1200&auto=format&fit=crop'
      ],
      sellerId: { _id: user2._id, name: user2.name, email: user2.email },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10)
    }
  ];

  isSeeded = true;
};

// Initialize store immediately
initStore();

module.exports = {
  getUsers: () => users,
  getCarsStore: () => cars,
  
  findUserByEmail: (email) => users.find(u => u.email.toLowerCase() === email.toLowerCase()),
  findUserById: (id) => users.find(u => u._id === id),
  
  createUser: async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = {
      _id: `user_${Date.now()}`,
      name: data.name,
      email: data.email.toLowerCase(),
      password: hashedPassword,
      wishlist: [],
      createdAt: new Date()
    };
    users.push(newUser);
    return newUser;
  },

  searchCars: ({ search, brand, fuelType, transmission, minPrice, maxPrice, sort }) => {
    let result = [...cars];

    if (search) {
      const term = search.toLowerCase();
      result = result.filter(c =>
        c.title.toLowerCase().includes(term) ||
        c.brand.toLowerCase().includes(term) ||
        c.model.toLowerCase().includes(term) ||
        c.location.toLowerCase().includes(term)
      );
    }

    if (brand && brand !== 'All') {
      result = result.filter(c => c.brand.toLowerCase() === brand.toLowerCase());
    }

    if (fuelType && fuelType !== 'All') {
      result = result.filter(c => c.fuelType === fuelType);
    }

    if (transmission && transmission !== 'All') {
      result = result.filter(c => c.transmission === transmission);
    }

    if (minPrice) {
      result = result.filter(c => c.price >= Number(minPrice));
    }

    if (maxPrice) {
      result = result.filter(c => c.price <= Number(maxPrice));
    }

    // Sort
    if (sort === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'year_desc') {
      result.sort((a, b) => b.year - a.year);
    } else {
      // newest
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  },

  getCarByIdStore: (id) => cars.find(c => c._id === id),

  createCarStore: (data, user) => {
    const newCar = {
      _id: `car_${Date.now()}`,
      ...data,
      year: Number(data.year),
      price: Number(data.price),
      kmDriven: Number(data.kmDriven),
      sellerId: { _id: user._id, name: user.name, email: user.email },
      createdAt: new Date()
    };
    cars.unshift(newCar);
    return newCar;
  },

  updateCarStore: (id, data, userId) => {
    const index = cars.findIndex(c => c._id === id);
    if (index === -1) return null;

    const existingSellerId = typeof cars[index].sellerId === 'object' ? cars[index].sellerId._id : cars[index].sellerId;
    if (existingSellerId !== userId) return 'UNAUTHORIZED';

    cars[index] = {
      ...cars[index],
      ...data,
      year: data.year ? Number(data.year) : cars[index].year,
      price: data.price ? Number(data.price) : cars[index].price,
      kmDriven: data.kmDriven ? Number(data.kmDriven) : cars[index].kmDriven
    };
    return cars[index];
  },

  deleteCarStore: (id, userId) => {
    const index = cars.findIndex(c => c._id === id);
    if (index === -1) return null;

    const existingSellerId = typeof cars[index].sellerId === 'object' ? cars[index].sellerId._id : cars[index].sellerId;
    if (existingSellerId !== userId) return 'UNAUTHORIZED';

    cars.splice(index, 1);
    return true;
  },

  getUserListingsStore: (userId) => {
    return cars.filter(c => {
      const sellerId = typeof c.sellerId === 'object' ? c.sellerId._id : c.sellerId;
      return sellerId === userId;
    });
  },

  toggleWishlistStore: (userId, carId) => {
    const user = users.find(u => u._id === userId);
    if (!user) return null;

    const idx = user.wishlist.indexOf(carId);
    let isWishlisted = false;

    if (idx > -1) {
      user.wishlist.splice(idx, 1);
      isWishlisted = false;
    } else {
      user.wishlist.push(carId);
      isWishlisted = true;
    }
    return { isWishlisted, wishlist: user.wishlist };
  },

  getUserWishlistCarsStore: (userId) => {
    const user = users.find(u => u._id === userId);
    if (!user) return [];
    return cars.filter(c => user.wishlist.includes(c._id));
  }
};
