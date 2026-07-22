import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { carService, uploadService } from '../services/api';
import { Car, Upload, Plus, X, Image as ImageIcon, CheckCircle, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const AddEditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    brand: 'BMW',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    kmDriven: '',
    location: '',
    description: '',
    images: []
  });

  const [imageUrlInput, setImageUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Fetch listing data if in Edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchCar = async () => {
        try {
          const res = await carService.getCarById(id);
          if (res.data.success) {
            const car = res.data.data;
            setFormData({
              title: car.title,
              brand: car.brand,
              model: car.model,
              year: car.year,
              price: car.price,
              fuelType: car.fuelType,
              transmission: car.transmission,
              kmDriven: car.kmDriven,
              location: car.location,
              description: car.description,
              images: car.images || []
            });
          }
        } catch (error) {
          toast.error('Could not fetch car listing details');
          navigate('/dashboard');
        } finally {
          setFetching(false);
        }
      };
      fetchCar();
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add Image URL manually
  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, imageUrlInput.trim()]
    }));
    setImageUrlInput('');
  };

  // Remove Image
  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // File upload to Cloudinary/Backend
  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('images', files[i]);
    }

    try {
      const res = await uploadService.uploadImages(data);
      if (res.data.success) {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...res.data.urls]
        }));
        toast.success(`Uploaded ${res.data.urls.length} image(s)!`);
      }
    } catch (error) {
      toast.error('Failed to upload image files.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.model || !formData.price || !formData.kmDriven || !formData.location || !formData.description) {
      toast.error('Please complete all required fields');
      return;
    }

    setLoading(true);
    try {
      if (isEditMode) {
        const res = await carService.updateCar(id, formData);
        if (res.data.success) {
          toast.success('Vehicle listing updated successfully!');
          navigate(`/cars/${id}`);
        }
      } else {
        const res = await carService.createCar(formData);
        if (res.data.success) {
          toast.success('Car listing published successfully!');
          navigate('/dashboard');
        }
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Error processing vehicle submission';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-slate-400">Loading vehicle listing details...</p>
      </div>
    );
  }

  const brandsList = ['BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Tesla', 'Toyota', 'Ford', 'Honda', 'Chevrolet', 'Nissan', 'Hyundai', 'Other'];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 animate-fade-in space-y-6">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-slate-400 hover:text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-extrabold text-white flex items-center space-x-2">
          <Car className="w-6 h-6 text-brand-500" />
          <span>{isEditMode ? 'Edit Vehicle Listing' : 'Publish New Car Listing'}</span>
        </h1>
      </div>

      {/* Main Form Panel */}
      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        
        {/* Basic Vehicle Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-brand-400 uppercase tracking-wider">1. Basic Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Listing Title *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. 2023 BMW M4 Competition Coupe - Low Mileage"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Brand / Make *</label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                {brandsList.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Car Model *</label>
              <input
                type="text"
                name="model"
                required
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g. M4 Competition / 911 Carrera"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Manufacturing Year *</label>
              <input
                type="number"
                name="year"
                required
                min="1950"
                max={new Date().getFullYear() + 1}
                value={formData.year}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Asking Price ($ USD) *</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 78500"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

          </div>
        </div>

        {/* Technical Specs */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-sm font-bold text-brand-400 uppercase tracking-wider">2. Technical Specifications</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Fuel Type *</label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="CNG">CNG</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Transmission *</label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Kilometers Driven *</label>
              <input
                type="number"
                name="kmDriven"
                required
                min="0"
                value={formData.kmDriven}
                onChange={handleChange}
                placeholder="e.g. 12500"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Location / City *</label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Los Angeles, CA"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

          </div>
        </div>

        {/* Description & Imagery */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-sm font-bold text-brand-400 uppercase tracking-wider">3. Description & Photo Gallery</h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Vehicle Description *</label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe condition, service history, packages (e.g. Carbon package, Harman Kardon audio), title status..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-4 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          {/* Image Upload Area */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-300">Vehicle Photos</label>
            
            {/* File Dropzone */}
            <div className="border-2 border-dashed border-slate-700 hover:border-brand-500 rounded-2xl p-6 text-center transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                id="file-upload"
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer space-y-2 block">
                <Upload className="w-8 h-8 text-brand-400 mx-auto" />
                <p className="text-sm font-semibold text-white">
                  {uploadingImage ? 'Uploading files...' : 'Click to Upload Images'}
                </p>
                <p className="text-xs text-slate-400">JPG, PNG, WEBP up to 5MB per photo</p>
              </label>
            </div>

            {/* Manual Image URL Input fallback */}
            <div className="flex space-x-2 pt-2">
              <input
                type="url"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="Or paste an image web URL (e.g. https://images.unsplash.com/...)"
                className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2 text-xs text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-4 py-2 rounded-xl border border-slate-700"
              >
                Add URL
              </button>
            </div>

            {/* Thumbnail Preview Grid */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-3">
                {formData.images.map((url, idx) => (
                  <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-slate-700 group">
                    <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 bg-rose-600 text-white p-1 rounded-full text-xs hover:bg-rose-500 opacity-90 group-hover:opacity-100"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Form Submit Buttons */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-brand-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white font-bold text-xs px-8 py-3.5 rounded-xl shadow-lg shadow-brand-600/30 transition-all flex items-center space-x-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            <span>{isEditMode ? 'Save Changes' : 'Publish Listing'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};

export default AddEditCar;
