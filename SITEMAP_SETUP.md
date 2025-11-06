# 🗺️ Sitemap Setup Guide

## Overview
This project uses `next-sitemap` to automatically generate sitemaps for better SEO and search engine crawling.

## Files Created

### 1. `next-sitemap.config.js`
Configuration file for sitemap generation with:
- **Domain**: Set via `SITE_URL` environment variable
- **Static routes**: Homepage and future static pages
- **Dynamic routes**: Listed via `server-sitemap.xml`
- **Robots.txt**: Automatically generated

### 2. `app/server-sitemap.xml/route.ts`
Dynamic route that generates a sitemap for all database listings in real-time.

### 3. Generated Files (after build)
- `public/sitemap.xml` - Main sitemap index
- `public/sitemap-0.xml` - Static routes sitemap
- `public/robots.txt` - Search engine instructions

## How It Works

### Build Process
When you run `npm run build`, the following happens:
1. Next.js builds the application
2. `postbuild` script runs `next-sitemap`
3. Sitemaps are generated in `/public` directory

### Static Sitemap (`sitemap-0.xml`)
Contains:
- Homepage (/)
- Static pages (About, Contact, etc. - when you create them)

### Dynamic Sitemap (`server-sitemap.xml`)
Contains:
- All listing pages from database
- Generated on-the-fly at runtime
- Always up-to-date with database

## Configuration

### Environment Variables
Add to `.env`:
```env
SITE_URL=https://yourdomain.com
```

### Update Domain
Replace `https://yourdomain.com` in these files:
1. `next-sitemap.config.js` (line 2)
2. `next-sitemap.config.js` (line 43)
3. `next-sitemap.config.js` (line 73-77)
4. `app/server-sitemap.xml/route.ts` (line 15)
5. `.env` (SITE_URL variable)

## Testing

### Local Testing
```bash
npm run build
```

Check generated files:
```bash
ls -la public/*.xml public/*.txt
cat public/sitemap.xml
cat public/robots.txt
```

### Production URLs
After deployment, access:
- Main sitemap: `https://yourdomain.com/sitemap.xml`
- Static sitemap: `https://yourdomain.com/sitemap-0.xml`
- Dynamic sitemap: `https://yourdomain.com/server-sitemap.xml`
- Robots.txt: `https://yourdomain.com/robots.txt`

## Submit to Search Engines

### Google Search Console
1. Go to https://search.google.com/search-console
2. Add your property
3. Go to "Sitemaps" in the left menu
4. Submit: `https://yourdomain.com/sitemap.xml`

### Bing Webmaster Tools
1. Go to https://www.bing.com/webmasters
2. Add your site
3. Submit sitemap URL

## Priority & Change Frequency

| Page Type | Priority | Change Frequency |
|-----------|----------|------------------|
| Homepage | 1.0 | Daily |
| Listings | 0.9 | Weekly |
| Static Pages | 0.7 | Daily |

## Adding Static Pages

When you create new static pages (About, Contact, etc.), add them to `next-sitemap.config.js`:

```javascript
additionalPaths: async (config) => [
  await config.transform(config, '/'),
  await config.transform(config, '/about'),
  await config.transform(config, '/contact'),
  await config.transform(config, '/privacy'),
],
```

## Multilingual Support

The sitemap includes alternate language tags for Arabic and English:
```xml
<xhtml:link rel="alternate" hreflang="en" href="https://yourdomain.com"/>
<xhtml:link rel="alternate" hreflang="ar" href="https://yourdomain.com"/>
```

## Troubleshooting

### Sitemap not generating
- Ensure `postbuild` script is in `package.json`
- Check `SITE_URL` is set in `.env`
- Run `npm run build` to regenerate

### Dynamic listings not appearing
- Check database connection
- Verify `app/server-sitemap.xml/route.ts` is working
- Visit `http://localhost:3000/server-sitemap.xml` after running `npm run dev`

### Robots.txt not working
- Ensure `generateRobotsTxt: true` in config
- Check `public/robots.txt` exists after build

## Best Practices

1. **Update regularly**: Rebuild when adding new content
2. **Monitor crawl stats**: Use Google Search Console
3. **Keep updated**: When domain changes, update all references
4. **Test before deploy**: Always test locally first

## Resources

- [next-sitemap Documentation](https://github.com/iamvishnusankar/next-sitemap)
- [Google Sitemap Guidelines](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Robots.txt Specification](https://www.robotstxt.org/)

