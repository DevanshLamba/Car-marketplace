import React from 'react';

export const CarSkeleton = () => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-slate-800 animate-pulse">
      <div className="aspect-[16/10] bg-slate-800" />
      <div className="p-5 space-y-4">
        <div className="h-5 bg-slate-800 rounded w-3/4" />
        <div className="h-6 bg-slate-800 rounded w-1/3" />
        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="h-8 bg-slate-800 rounded" />
          <div className="h-8 bg-slate-800 rounded" />
          <div className="h-8 bg-slate-800 rounded" />
          <div className="h-8 bg-slate-800 rounded" />
        </div>
        <div className="h-6 bg-slate-800 rounded w-full pt-2" />
      </div>
    </div>
  );
};

export const CarGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CarSkeleton key={i} />
      ))}
    </div>
  );
};

export default CarGridSkeleton;
