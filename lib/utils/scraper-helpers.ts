// Helper functions for processing scraped data

/**
 * Generate SEO-friendly slug from business name
 */
export function generateSlug(name: string, city?: string): string {
  let slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
  
  if (city) {
    const citySlug = city.toLowerCase().replace(/\s+/g, '-');
    slug = `${slug}-${citySlug}`;
  }
  
  return slug;
}

/**
 * Generate meta title for SEO
 */
export function generateMetaTitle(name: string, city?: string): string {
  if (city) {
    return `${name} in ${city} | Saudi Dates Directory`;
  }
  return `${name} | Saudi Dates Directory`;
}

/**
 * Generate meta description for SEO
 */
export function generateMetaDescription(
  name: string,
  city?: string,
  rating?: number,
  description?: string
): string {
  let desc = `Find ${name}`;
  
  if (city) {
    desc += ` in ${city}, Saudi Arabia`;
  }
  
  if (rating) {
    desc += `. Rated ${rating} stars`;
  }
  
  if (description && description.length > 0) {
    desc += `. ${description.substring(0, 100)}`;
  } else {
    desc += `. Contact information, reviews, and location details for premium Saudi dates suppliers.`;
  }
  
  return desc;
}

/**
 * Generate SEO keywords from business data
 */
export function generateKeywords(
  name: string,
  city?: string,
  categories?: string[]
): string[] {
  const keywords = [
    'saudi dates',
    'dates supplier',
    'dates wholesaler',
    'buy dates',
    name.toLowerCase(),
  ];
  
  if (city) {
    keywords.push(
      `dates ${city.toLowerCase()}`,
      `${city.toLowerCase()} dates supplier`
    );
  }
  
  if (categories && categories.length > 0) {
    keywords.push(...categories.map(cat => cat.toLowerCase()));
  }
  
  return [...new Set(keywords)]; // Remove duplicates
}

/**
 * Extract city name from address
 */
export function extractCity(address?: string): string | null {
  if (!address) return null;
  
  // Common Saudi cities
  const cities = [
    'Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Khobar', 
    'Dhahran', 'Taif', 'Tabuk', 'Buraidah', 'Khamis Mushait',
    'Najran', 'Abha', 'Yanbu', 'Al-Ahsa', 'Jubail', 'Hail',
    'Qatif', 'Al-Kharj', 'Sakaka', 'Jizan', 'Arar'
  ];
  
  for (const city of cities) {
    if (address.toLowerCase().includes(city.toLowerCase())) {
      return city;
    }
  }
  
  return null;
}

