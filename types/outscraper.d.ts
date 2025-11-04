// Type definitions for outscraper
declare module 'outscraper' {
  export class Client {
    constructor(apiKey: string);
    googleMapsSearch(
      queries: string[],
      language?: string,
      region?: string,
      limit?: number
    ): Promise<any[]>;
  }
}

