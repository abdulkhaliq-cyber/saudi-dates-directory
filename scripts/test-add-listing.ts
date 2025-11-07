// Test script to add a listing via API
import 'dotenv/config';

const API_URL = 'https://saudi-dates-directory-ar4xo30wa-abdulkhaliqs-projects.vercel.app/api/addListing';

async function testAddListing() {
  console.log('🧪 Testing API endpoint...\n');
  
  const testListing = {
    name: 'Test Dates Store - ' + Date.now(), // Unique name
    city: 'Jeddah',
    category: 'Medjool Dates',
    phone: '+966502345678',
    website: 'https://testdates.com',
    rating: 4.7,
    address: '456 Corniche Road, Jeddah',
    latitude: 21.4858,
    longitude: 39.1925,
    seoTitle: 'Test Dates Store - Premium Medjool Dates in Jeddah',
    description: 'Premium Medjool dates supplier in Jeddah. Quality guaranteed with fast delivery.',
  };

  console.log('📤 Sending test listing:', testListing.name);
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testListing),
    });

    const data = await response.json();
    
    console.log('\n📊 Response Status:', response.status);
    console.log('📋 Response Data:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('\n✅ SUCCESS! Listing added to database.');
    } else {
      console.log('\n❌ ERROR! Listing was not added.');
      console.log('Check the error message above for details.');
    }
    
  } catch (error) {
    console.error('❌ Network error:', error);
  }
}

testAddListing();

