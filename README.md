# Mehta Trading Agency — Premium Website

## How to Run
1. Extract the ZIP file
2. Open `index.html` in any browser
3. Products load dynamically from Google Sheets

## Google Sheets Setup
Your sheet is already connected: `1JCyJbh92EDCvh421mBXRvPK5ZkNazF90_gpjJtatpKc`

**Make sure your sheet is publicly accessible:**
- File → Share → "Anyone with the link can view"

**Sheet Column Order (Row 1 = header, Row 2+ = products):**
| A: Product Name | B: Category | C: Price | D: Description | E: Image Name | F: Availability |

**Availability values:** `In Stock` / `Out of Stock` / `Limited Stock`

**Image Names:** Must match files in the `images/` folder (e.g., `image1.png`)

## Local Images
Images from your `D:\Users\TANISH\Downloads\New folder\images` folder should be placed in the `images/` folder.

## File Structure
```
mehta_upgraded/
├── index.html      — Main HTML
├── style.css       — All styles (premium dark/gold theme)
├── script.js       — Dynamic JS (sheets fetch, slider, filters, form)
└── images/         — Product images (image1.png ... image34.png + logo.png)
```
