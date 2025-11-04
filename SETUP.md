# Saudi Dates Directory - Setup Guide

This is a comprehensive directory platform for Saudi dates suppliers with Google Maps integration and SEO optimization.

## 🚀 Quick Start

### 1. Environment Setup

Update your `.env` file with the following credentials:

```env
# Database (already configured)
DATABASE_URL="postgresql://..."

# Outscraper API Key
OUTSCRAPER_API_KEY=your_actual_api_key_here

# Firebase (optional, if using authentication)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
# ... other Firebase configs
```

### 2. Get Outscraper API Key

1. Sign up at [Outscraper.com](https://outscraper.com/)
2. Go to your dashboard and get your API key
3. Add it to your `.env` file

### 3. Import Google Maps Data

Run the scraper to populate your database:

```bash
npm run import:google-maps
```

This will:
- Scrape Google Maps for dates suppliers in Saudi Arabia
- Extract business information (name, address, phone, ratings, etc.)
- Generate SEO-friendly slugs and meta tags
- Save everything to your PostgreSQL database

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your directory.

## 📊 Database Management

### View your database
```bash
npm run db:studio
```

This opens Prisma Studio where you can view and edit your data.

### Manual database sync
```bash
npm run db:push
```

## 🗄️ Database Schema

### Listing Model
- **id**: Unique identifier (auto-increment)
- **name**: Business name (unique)
- **category**: Business category
- **city**: City location
- **phone**: Contact phone number
- **website**: Business website
- **rating**: Google Maps rating
- **mapsUrl**: Google Maps URL
- **address**: Full address
- **latitude/longitude**: GPS coordinates
- **createdAt/updatedAt**: Timestamps

## 🎯 Features

1. **Clean Data Structure**: Simple, straightforward listing model
2. **Google Maps Integration**: Import business data with ratings and reviews
3. **Location-Based**: Filter and browse by city
4. **Contact Information**: Phone, website, and Google Maps links
5. **Responsive Design**: Beautiful, mobile-friendly interface
6. **Fast Loading**: Next.js 15 with App Router

## 🔌 API Endpoints

### Get All Listings
```
GET /api/businesses?page=1&limit=20&city=Riyadh&minRating=4&search=dates
```

### Get Single Listing
```
GET /api/businesses/[id]
```

### Get All Cities
```
GET /api/cities
```

Returns unique cities with listing counts.

## 🎨 Frontend Components

### ListingCard Component
```tsx
import ListingCard from '@/components/ListingCard';

<ListingCard listing={listingData} />
```

## 📝 Customizing the Scraper

Edit `scripts/import-google-maps.ts` to modify search queries:

```typescript
const queries = [
  'dates supplier saudi arabia',
  'dates wholesaler riyadh',
  'تمور الرياض', // Arabic queries
  // Add more queries...
];
```

## 🌐 Deployment Checklist

- [ ] Set production environment variables
- [ ] Update DATABASE_URL for production
- [ ] Set OUTSCRAPER_API_KEY
- [ ] Configure domain and SSL
- [ ] Set up Google Search Console
- [ ] Submit sitemap.xml
- [ ] Add Google Analytics

## 💡 Best Practices

1. **Regular Updates**: Run scraper weekly to keep data fresh
2. **Data Quality**: Verify contact information periodically
3. **Mobile-First**: Interface is already optimized for mobile
4. **Performance**: Leverage Next.js caching and optimization

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL (Railway)
- **ORM**: Prisma
- **Styling**: Tailwind CSS v4
- **Scraper**: Outscraper
- **Language**: TypeScript

## 📞 Support

For issues or questions:
- Check the Prisma docs: https://www.prisma.io/docs
- Outscraper API docs: https://outscraper.com/api-docs/
- Next.js docs: https://nextjs.org/docs

---

Good luck with your Saudi Dates Directory! 🌴

