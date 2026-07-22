import React from 'react';
import { Filter, RotateCcw, DollarSign, Fuel, Gauge, ArrowUpDown } from 'lucide-react';

const CarFilter = ({ filters, onFilterChange, onReset }) => {
  const brands = [
    'All', 'BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Tesla', 'Toyota', 'Ford', 'Honda', 'Chevrolet', 'Nissan'
  ];
  const fuelTypes = ['All', 'Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
  const transmissions = ['All', 'Manual', 'Automatic'];

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-6 sticky top-24">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-white font-bold text-base">
          <Filter className="w-5 h-5 text-brand-400" />
          <span>Filter Inventory</span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center space-x-1 text-xs text-slate-400 hover:text-rose-400 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sort Option */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5 uppercase tracking-wider">
          <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
          <span>Sort By</span>
        </label>
        <select
          value={filters.sort || 'newest'}
          onChange={(e) => onFilterChange('sort', e.target.value)}
          className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
        >
          <option value="newest">Newest Listed First</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
          <option value="year_desc">Newer Model Year</option>
        </select>
      </div>

      {/* Brand Select */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Brand / Make
        </label>
        <select
          value={filters.brand || 'All'}
          onChange={(e) => onFilterChange('brand', e.target.value)}
          className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
        >
          {brands.map((b) => (
            <option key={b} value={b}>{b === 'All' ? 'All Brands' : b}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5 uppercase tracking-wider">
          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
          <span>Price Range ($ USD)</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice || ''}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
            className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice || ''}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Fuel Type */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5 uppercase tracking-wider">
          <Fuel className="w-3.5 h-3.5 text-amber-400" />
          <span>Fuel Type</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {fuelTypes.map((fuel) => (
            <button
              key={fuel}
              onClick={() => onFilterChange('fuelType', fuel)}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                (filters.fuelType === fuel || (!filters.fuelType && fuel === 'All'))
                  ? 'bg-brand-600 text-white font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {fuel}
            </button>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5 uppercase tracking-wider">
          <Gauge className="w-3.5 h-3.5 text-purple-400" />
          <span>Transmission</span>
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {transmissions.map((t) => (
            <button
              key={t}
              onClick={() => onFilterChange('transmission', t)}
              className={`text-xs py-1.5 rounded-lg text-center font-medium transition-colors ${
                (filters.transmission === t || (!filters.transmission && t === 'All'))
                  ? 'bg-brand-600 text-white font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default CarFilter;
