/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://yourdomain.com', // TODO: Replace with your actual domain
  generateRobotsTxt: true, // Generate robots.txt file
  generateIndexSitemap: true, // Generate sitemap index for large sites
  sitemapSize: 7000, // Split sitemap if more than 7000 URLs
  changefreq: 'daily',
  priority: 0.7,
  
  // Exclude specific paths
  exclude: [
    '/api/*',
    '/_next/*',
    '/404',
    '/500',
    '/server-sitemap.xml', // Dynamic sitemap route
  ],
  
  // Additional paths to include (static pages)
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/about'),
    await config.transform(config, '/contact'),
    await config.transform(config, '/advertise'),
    // Add more static pages here if you create them:
    // await config.transform(config, '/privacy'),
    // await config.transform(config, '/terms'),
  ],
  
  // Custom robots.txt rules
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      // Dynamic server-generated sitemap for all listings
      'https://yourdomain.com/server-sitemap.xml', // TODO: Replace with your actual domain
    ],
  },
  
  // Custom transform function for each URL
  transform: async (config, path) => {
    // Custom priority and changefreq for specific routes
    let priority = config.priority;
    let changefreq = config.changefreq;
    
    // Homepage gets highest priority
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    }
    
    // Listing pages get high priority
    if (path.startsWith('/listing/')) {
      priority = 0.9;
      changefreq = 'weekly';
    }
    
    // API routes should be excluded
    if (path.startsWith('/api/')) {
      return null;
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        {
          href: `https://yourdomain.com${path}`, // English version
          hreflang: 'en',
        },
        {
          href: `https://yourdomain.com${path}`, // Arabic version
          hreflang: 'ar',
        },
      ],
    };
  },
};

