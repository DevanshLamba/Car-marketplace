import React, { useState, useEffect } from 'react';
import { carService } from '../services/api';
import Hero from '../components/Hero';
import CarFilter from '../components/CarFilter';
import CarCard from '../components/CarCard';
import { CarGridSkeleton } from '../components/LoadingSkeleton';
import { Car, SearchX, Sparkles, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    brand: 'All',
    fuelType: 'All',
    transmission: 'All',
    minPrice: '',
    maxPrice: '',
    sort: 'newest'
  });

  const fetchCars = async (currentFilters) => {
    setLoading(true);
    try {
      const params = {};
      if (currentFilters.search) params.search = currentFilters.search;
      if (currentFilters.brand && currentFilters.brand !== 'All') params.brand = currentFilters.brand;
      if (currentFilters.fuelType && currentFilters.fuelType !== 'All') params.fuelType = currentFilters.fuelType;
      if (currentFilters.transmission && currentFilters.transmission !== 'All') params.transmission = currentFilters.transmission;
      if (currentFilters.minPrice) params.minPrice = currentFilters.minPrice;
      if (currentFilters.maxPrice) params.maxPrice = currentFilters.maxPrice;
      if (currentFilters.sort) params.sort = currentFilters.sort;

      const res = await carService.getCars(params);
      if (res.data.success) {
        setCars(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast.error('Could not load vehicle listings. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(filters);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = (term) => {
    setFilters((prev) => ({ ...prev, search: term }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      brand: 'All',
      fuelType: 'All',
      transmission: 'All',
      minPrice: '',
      maxPrice: '',
      sort: 'newest'
    });
  };

  return (
    <div className="min-h-screen pb-20">
      
      {/* Hero Section */}
      <Hero
        onSearch={handleSearch}
        onSelectBrand={(b) => handleFilterChange('brand', b)}
        currentBrand={filters.brand}
      />

      {/* Main Marketplace Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Section Title & Active Filters Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Car className="w-6 h-6 text-brand-500" />
              <span>Available Inventory</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Showing {cars.length} certified pre-owned & luxury vehicles
            </p>
          </div>

          {filters.search && (
            <div className="mt-3 sm:mt-0 flex items-center space-x-2 bg-slate-800 text-slate-200 px-3 py-1.5 rounded-lg text-xs">
              <span>Search query: <strong>"{filters.search}"</strong></span>
              <button
                onClick={() => handleFilterChange('search', '')}
                className="text-slate-400 hover:text-white font-bold ml-1"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Filter Sidebar & Car Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar Column */}
          <div className="lg:col-span-1">
            <CarFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </div>

          {/* Listings Grid Column */}
          <div className="lg:col-span-3">
            {loading ? (
              <CarGridSkeleton count={6} />
            ) : cars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="glass-panel p-12 rounded-3xl text-center border border-slate-800 space-y-4 my-8">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <SearchX className="w-8 h-8 text-brand-400" />
                </div>
                <h3 className="text-xl font-bold text-white">No Cars Matched Your Filter Criteria</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  Try clearing some filters, expanding your price range, or searching for broader terms like "BMW" or "Automatic".
                </p>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center space-x-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default Home;
