// Outscraper client initialization
import { Client } from 'outscraper';

if (!process.env.OUTSCRAPER_API_KEY) {
  throw new Error('OUTSCRAPER_API_KEY is not defined in environment variables');
}

export const outscraperClient = new Client(process.env.OUTSCRAPER_API_KEY);

