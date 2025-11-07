# 🚀 Google Sheets Apps Script - Installation Guide

## 📋 **What This Script Does:**

✅ **Removes non-dates businesses** (hospitals, clinics, banks, etc.)  
✅ **Standardizes categories** to 5 standard types  
✅ **Removes duplicates** (based on business name)  
✅ **Removes invalid rows** (empty names or cities)  
✅ **Organizes columns** (only keeps what you need)  
✅ **Formats sheet** (nice colors, borders, frozen header)

**Result:** Clean, ready-to-import data in 1 click! 🎯

---

## 📥 **Installation (5 minutes):**

### **Step 1: Open Your Google Sheet**

Open the Google Sheet where you have your Outscraper data

### **Step 2: Open Apps Script Editor**

1. Click **Extensions** (top menu)
2. Click **Apps Script**
3. A new tab opens with code editor

### **Step 3: Delete Existing Code**

If there's any code in the editor:
1. Select all (Ctrl+A or Cmd+A)
2. Delete it

### **Step 4: Paste the Script**

1. **Open this file:** `GOOGLE_SHEETS_APPSCRIPT.js`
2. **Copy ALL the code** (Ctrl+A, then Ctrl+C)
3. **Paste into Apps Script editor** (Ctrl+V)

### **Step 5: Save the Script**

1. Click the **disk icon** 💾 (or Ctrl+S)
2. Name it: `DatesSouq Cleaner`
3. Click **Save**

### **Step 6: Close Apps Script Tab**

Close the Apps Script tab and **go back to your Google Sheet**

### **Step 7: Refresh Your Sheet**

1. **Refresh the page** (F5 or Ctrl+R)
2. You'll see a new menu: **"🌴 DatesSouq Cleaner"**

---

## ▶️ **How to Use:**

### **Every Week When You Get New Data:**

1. **Paste Outscraper data** into your Google Sheet

2. **Click:** `🌴 DatesSouq Cleaner` → `✨ Clean Data`

3. **Confirm** when asked

4. **Wait 1-2 minutes** while it cleans

5. **Done!** ✅ Data is clean and ready

6. **Run Make.com** to import to datessouq.com

---

## 🎯 **What Gets Cleaned:**

### **❌ Removed (deleted rows):**
- Hospitals (مستشفى)
- Clinics (عيادة)
- Pharmacies (صيدلية)
- Banks (بنك)
- Hotels (فندق)
- Schools (مدرسة)
- Restaurants (مطعم)
- Coffee shops (قهوة)
- Mosques (مسجد)
- Any business without a name
- Any business without a city
- Duplicate businesses

### **✅ Standardized Categories:**

All categories become one of these:
- `Dates Supplier` (default)
- `Dates Shop`
- `Dates Wholesaler`
- `Dates Farm`
- `Dates Manufacturer`

### **📊 Kept Columns (in this order):**
1. Business Name
2. Category
3. City
4. Phone
5. Website
6. Rating
7. Maps URL
8. Address
9. Latitude
10. Longitude

**All other columns removed!**

---

## 🎨 **Bonus Features:**

### **📊 Show Statistics**
- Click: `DatesSouq Cleaner` → `Show Statistics`
- See counts, categories breakdown, cities
- Useful before and after cleaning

### **❓ Help**
- Click: `DatesSouq Cleaner` → `Help`
- Shows quick instructions

---

## ⚙️ **Customization (Optional):**

Want to adjust the script? Edit these sections:

### **Add More Non-Dates Keywords:**
```javascript
const NON_DATES_KEYWORDS = [
  'hospital', 'مستشفى',
  // Add your own keywords here
  'your_keyword', 'كلمتك'
];
```

### **Change Category Mapping:**
```javascript
const CATEGORY_MAP = {
  'متجر': 'Dates Shop',
  // Add your own mappings
  'your_arabic': 'Standard English'
};
```

### **Change Required Fields:**
```javascript
const REQUIRED_FIELDS = [
  'Business Name',
  'Category',
  // Add/remove fields as needed
];
```

---

## 🐛 **Troubleshooting:**

### **"Script not found" or menu doesn't appear:**
1. Refresh the page
2. Wait 30 seconds
3. Refresh again
4. Check Apps Script is saved

### **"Authorization required":**
1. First time running, Google asks for permission
2. Click **Review Permissions**
3. Choose your Google account
4. Click **Advanced**
5. Click **Go to DatesSouq Cleaner (unsafe)** - it's safe, you wrote it!
6. Click **Allow**

### **Script runs but data looks wrong:**
1. Check your column headers match:
   - "Business Name" (not "Name")
   - "Category" (not "Type")
   - "City" (not "Location")
2. Headers must be in ROW 1
3. Data starts in ROW 2

### **Takes too long (5+ minutes):**
- Sheet might be too large (1000+ rows)
- Try cleaning in batches of 500 rows

---

## ✨ **Before & After Example:**

### **Before (messy Outscraper data):**
```
| Name | Type | Location | Contact | ... (50 columns)
| Al Qassim Dates | متجر | Riyadh | ... |
| City Hospital | hospital | Riyadh | ... |
| Al Qassim Dates | store | Riyadh | ... | (duplicate)
| | | | | (empty row)
| Coffee Shop | مقهى | Jeddah | ... |
```

### **After (clean data):**
```
| Business Name | Category | City | Phone | Website | Rating | ... (10 columns)
| Al Qassim Dates | Dates Shop | Riyadh | +966... | ... | 4.5 | ...
```

**Result:**
- ✅ Hospital removed
- ✅ Duplicate removed
- ✅ Empty row removed
- ✅ Coffee shop removed
- ✅ Category standardized
- ✅ Only 10 columns kept

---

## 📈 **Time Saved:**

**Manual cleaning:** 30-40 minutes per week  
**With this script:** 2 minutes per week  
**Time saved:** 30+ hours per year! ⏰

---

## 🎯 **Weekly Workflow:**

```
Monday:
1. Outscraper → Download data
2. Paste into Google Sheet
3. Click: DatesSouq Cleaner → Clean Data
4. Wait 1-2 minutes
5. Make.com → Run scenario
6. Check datessouq.com
7. Done! ✅

Total time: 5-10 minutes
```

---

## 💡 **Pro Tips:**

1. **Keep a backup sheet** before cleaning (duplicate the tab)
2. **Use "Show Statistics"** to verify cleaning worked
3. **Run weekly** on the same day for consistency
4. **Check Make.com logs** to ensure import worked
5. **Visit datessouq.com** to verify new listings appear

---

## 📞 **Need Help?**

Check these files:
- `GOOGLE_SHEETS_APPSCRIPT.js` - The script code
- `GOOGLE_SHEETS_CLEANUP_GUIDE.md` - Manual cleaning guide
- `MAKECOM_IMPROVED_TEMPLATE.md` - Make.com setup

---

## ✅ **You're Ready!**

1. ✅ Script installed
2. ✅ Menu appears in Google Sheets
3. ✅ Cleaning works in 1 click
4. ✅ Data ready for import

**Happy cleaning! 🧹✨**

