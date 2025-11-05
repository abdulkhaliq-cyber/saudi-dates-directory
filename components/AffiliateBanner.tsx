// AffiliateBanner component - Placeholder for affiliate marketing banners
// Replace with actual affiliate links/banners once partnerships are established

export default function AffiliateBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🎁</div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Special Offer
            </p>
            <p className="text-xs text-gray-600">
              Premium Dates & More
            </p>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Sponsored
        </div>
      </div>
      
      {/* Affiliate link placeholder */}
      {/* Replace this div with actual affiliate banner/link */}
      {/* Example: */}
      {/* <a href="https://affiliate-link.com/?ref=YOUR_ID" */}
      {/*    target="_blank" */}
      {/*    rel="noopener noreferrer sponsored" */}
      {/*    className="..."> */}
      {/*   <img src="banner.jpg" alt="Product" /> */}
      {/* </a> */}
      
      <div className="mt-2 text-center">
        <p className="text-xs text-gray-400">
          {/* Affiliate banner placeholder - Replace with actual affiliate content */}
        </p>
      </div>
    </div>
  );
}

// Example implementation when ready:
/*
export default function AffiliateBanner() {
  return (
    <a 
      href="https://affiliate-link.com/?ref=YOUR_AFFILIATE_ID"
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="block w-full mt-4 transition-transform hover:scale-105"
    >
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-lg">Premium Saudi Dates</h4>
            <p className="text-sm opacity-90">Get 20% OFF your first order</p>
          </div>
          <div className="bg-white text-orange-600 px-4 py-2 rounded-full font-bold">
            Shop Now →
          </div>
        </div>
      </div>
    </a>
  );
}
*/

