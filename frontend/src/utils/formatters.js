/**
 * Format currency amount cleanly
 */
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Format distance in Kilometers
 */
export const formatKm = (km) => {
  if (km === undefined || km === null) return '0 km';
  return `${new Intl.NumberFormat('en-US').format(km)} km`;
};

/**
 * Format date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};
