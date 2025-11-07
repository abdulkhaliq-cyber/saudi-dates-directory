# 🧹 Google Sheets Data Cleanup Guide

## 🎯 Goal
Ensure only **dates-related businesses** are imported into your directory with **accurate, complete data**.

---

## ✅ Step 1: Remove Non-Dates Businesses

### **What to Look For:**

❌ **DELETE these business types:**
- Hospitals (مستشفى)
- Clinics (عيادة)
- Pharmacies (صيدلية)
- Schools (مدرسة)
- Banks (بنك)
- Hotels (فندق)
- Restaurants (مطعم) - unless they specifically sell dates
- Coffee shops (مقهى)
- Gas stations (محطة وقود)
- General supermarkets (سوبر ماركت) - unless they're dates-specific shops

### **How to Identify:**
1. **Look at Business Name** - Does it mention dates (تمور, dates, تمر)?
2. **Check Category** - Is it dates-related?
3. **When in doubt** - Google the business name or check their Google Maps listing

### **Quick Filtering in Google Sheets:**
```
1. Click on the "Category" column header
2. Data → Create a filter
3. Uncheck obvious non-dates categories:
   - Hospital
   - Clinic
   - Pharmacy
   - School
   - Bank
   - etc.
4. Delete the filtered rows
```

---

## ✅ Step 2: Standardize Categories

### **Use ONLY These Categories:**

Choose the most appropriate one for each business:

1. **Dates Farm** (مزرعة تمور)
   - Actual date palm farms
   - Agricultural producers

2. **Dates Supplier** (مورد تمور)
   - Wholesale suppliers
   - General dates businesses

3. **Dates Wholesaler** (تاجر جملة تمور)
   - Bulk orders only
   - B2B focus

4. **Dates Shop** (محل تمور)
   - Retail stores
   - Individual customer focus

5. **Dates Manufacturer** (مصنع تمور)
   - Date processing facilities
   - Packaged dates production

6. **Dates Exporter** (مصدر تمور)
   - International shipping
   - Export-focused businesses

### **How to Standardize:**
1. **Select the Category column**
2. **Find & Replace (Ctrl+H or Cmd+H):**
   - Replace "متجر" → "Dates Shop"
   - Replace "مصنع" → "Dates Manufacturer"
   - Replace "معرض" → "Dates Shop"
   - Replace "store" → "Dates Shop"
   - Replace "factory" → "Dates Manufacturer"

---

## ✅ Step 3: Clean Up Missing Data

### **Required Fields:**
- ✅ **Business Name** - MUST have (delete row if empty)
- ✅ **City** - MUST have (delete or research if empty)
- ⚠️ **Category** - Should have (use "Dates Supplier" as default)

### **Optional But Recommended:**
- 📞 **Phone** - Very important for conversions
- 📍 **Address** - Important for local SEO
- ⭐ **Rating** - Helps build trust
- 🌐 **Website** - Additional info source
- 📍 **Latitude/Longitude** - For Google Maps integration

### **How to Handle Missing Data:**

**Missing City:**
```
1. Google the business name
2. Check their address or phone area code
3. If you can't find it - DELETE the row (can't have dates business without location)
```

**Missing Phone:**
```
1. Check Google Maps listing
2. Check their website
3. If not found - OK to keep, but less useful
```

**Missing Rating:**
```
- Leave blank (will be null in database)
- Don't put "0" or "N/A" - just leave empty
```

**Missing Coordinates (Lat/Lng):**
```
- Leave blank if not available
- Don't put 0 or fake numbers
```

---

## ✅ Step 4: Data Validation Rules

### **Set up Google Sheets Data Validation:**

**For Rating Column:**
```
1. Select the Rating column
2. Data → Data validation
3. Criteria: Number between 1 and 5
4. Reject input if invalid
```

**For Phone Column:**
```
1. Phone numbers should start with +966 or 05
2. Example format: +966501234567 or 0501234567
```

**For City Column:**
```
Create a dropdown with common Saudi cities:
- Riyadh (الرياض)
- Jeddah (جدة)
- Makkah (مكة)
- Madinah (المدينة المنورة)
- Dammam (الدمام)
- Khobar (الخبر)
- Dhahran (الظهران)
- Taif (الطائف)
- Buraidah (بريدة)
- Tabuk (تبوك)
- Hail (حائل)
- Abha (أبها)
- Jubail (الجبيل)
- Qassim (القصيم)
- Najran (نجران)
```

---

## ✅ Step 5: Remove Duplicates

### **How to Find Duplicates:**
```
1. Select the "Business Name" column
2. Data → Remove duplicates
3. Google Sheets will show how many duplicates were found
```

### **Manual Check:**
Look for businesses with:
- Similar names but different spellings
- Same phone number
- Same address
- Same coordinates

---

## ✅ Step 6: Format Consistency

### **Business Names:**
- ✅ Keep original language (Arabic or English)
- ❌ Don't add extra spaces
- ❌ Don't add special characters like *** or ---
- ✅ Use proper capitalization

### **Phone Numbers:**
Choose ONE format and stick to it:
- **Option 1:** +966501234567 (international format) ✅ **RECOMMENDED**
- **Option 2:** 0501234567 (local format)
- ❌ Don't mix: +966 50 123 4567 or (050) 123-4567

### **Website URLs:**
- ✅ Start with https:// or http://
- ✅ Example: https://example.com
- ❌ Not: www.example.com or example.com

### **Coordinates:**
- ✅ Decimal format: 24.7136, 46.6753
- ❌ Not DMS format: 24°42'49.0"N

---

## ✅ Step 7: Quality Check Checklist

Before importing to Make.com, verify:

### **Column Headers Match:**
```
✅ Business Name
✅ Category
✅ City
✅ Phone
✅ Website
✅ Rating
✅ Maps URL
✅ Address
✅ Latitude
✅ Longitude
✅ Country (optional)
✅ Type (optional)
✅ Time Zone (optional)
```

### **Data Quality:**
- [ ] No empty Business Names
- [ ] No non-dates businesses
- [ ] All categories are standardized
- [ ] All cities are valid Saudi cities
- [ ] Phone numbers are in consistent format
- [ ] No duplicate businesses
- [ ] Ratings are between 1-5 (or empty)
- [ ] Coordinates are valid (or empty)

### **Test Run:**
- [ ] Run Make.com with just 1-2 rows first
- [ ] Check if data appears correctly on website
- [ ] Verify SEO title and description look good
- [ ] Then import the rest

---

## 🔧 Recommended Google Sheets Formula

### **Auto-Fill Missing Category:**
```
=IF(ISBLANK(B2), "Dates Supplier", B2)
```
(Where B2 is your Category column)

### **Validate Phone Format:**
```
=IF(OR(LEFT(D2,4)="+966", LEFT(D2,2)="05"), "✅", "❌ Fix")
```
(Where D2 is your Phone column)

### **Check for Empty Business Name:**
```
=IF(ISBLANK(A2), "❌ DELETE ROW", "✅")
```
(Where A2 is your Business Name column)

---

## 📋 Quick Cleaning Workflow

**Do this BEFORE running Make.com:**

1. ⏱️ **5 min** - Delete non-dates businesses (hospitals, banks, etc.)
2. ⏱️ **10 min** - Standardize categories (use find & replace)
3. ⏱️ **5 min** - Remove rows with empty Business Name
4. ⏱️ **5 min** - Remove duplicates
5. ⏱️ **5 min** - Quick visual scan for obvious errors
6. ⏱️ **2 min** - Test import with 2 rows
7. ✅ **Import all rows**

**Total time: ~30 minutes for a clean, quality dataset**

---

## 🎯 Benefits of Clean Data

✅ **Better SEO** - Only relevant dates businesses indexed  
✅ **Higher User Trust** - No hospitals or random businesses  
✅ **Accurate Filters** - City and category filters work properly  
✅ **Better Conversions** - Users find what they're actually looking for  
✅ **Professional Image** - Your directory looks curated and maintained  

---

## 📞 Need Help?

If you find a business and you're not sure if it's dates-related:

1. **Google the business name**
2. **Check their Google Maps reviews** - do people mention dates?
3. **Look at their photos** - do you see dates products?
4. **When in doubt** - KEEP it (better to have it than miss a real dates business)

But definitely DELETE obvious non-dates businesses (hospitals, schools, banks, etc.)

---

## ✅ You're Ready!

Once you've cleaned your Google Sheets using this guide:
1. Your directory will be much higher quality
2. SEO will improve significantly
3. Users will have a better experience
4. You'll look more professional

**Happy cleaning! 🧹✨**

