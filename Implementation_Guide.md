# Step-by-Step Implementation Guide
## TechNova Solutions — Business Analytics & Process Optimization Dashboard

---

## PHASE 1: Load Data into Power BI (10 minutes)

### Step 1.1: Open Power BI Desktop
- Launch Power BI Desktop
- Click `Home` → `Get Data` → `Text/CSV`

### Step 1.2: Load All 6 Tables
Load each file from the `datasets_large` folder in this order:

1. **Dim_Date.csv** → Click "Load"
2. **Dim_Customer.csv** → Click "Load"
3. **Dim_Product.csv** → Click "Load"
4. **Dim_Region.csv** → Click "Load"
5. **Fact_Sales.csv** → Click "Load"
6. **Fact_Process_Metrics.csv** → Click "Load"

> TIP: You can also load all at once using Get Data → Folder → select the datasets_large folder

---

## PHASE 2: Apply Power Query Transformations (15 minutes)

### Step 2.1: Open Power Query Editor
- Click `Home` → `Transform Data`
- This opens the Power Query Editor window

### Step 2.2: Apply Transforms for Each Table
For each table:
1. Click on the table name in the left panel
2. Click `Home` → `Advanced Editor`
3. Replace ALL the code with the corresponding script from `PowerQuery_Scripts.m`
4. Click `Done`

**ORDER OF TRANSFORMS:**
1. Dim_Date (adds YearMonth, YearMonthSort, IsCurrentYear, PeriodLabel)
2. Dim_Customer (adds TenureYears, TenureBucket, InitialTier)
3. Dim_Product (adds MarginTier, PriceTier)
4. Dim_Region (adds Monthly/Quarterly targets)
5. Fact_Sales (adds GrossRevenue, DiscountAmount, ProfitMarginPct, OrderSizeCategory)
6. Fact_Process_Metrics (adds DelayDuration_hrs, IsDelayed, EfficiencyPct, PerformanceCategory)

### Step 2.3: Close & Apply
- Click `Home` → `Close & Apply`
- Wait for all tables to load

---

## PHASE 3: Set Up Data Model (10 minutes)

### Step 3.1: Open Model View
- Click the `Model` icon on the left sidebar (3rd icon)

### Step 3.2: Create Relationships
Drag-and-drop to create these relationships:

| FROM | TO | Notes |
|------|----|-------|
| Fact_Sales[DateKey] → Dim_Date[DateKey] | Many-to-One | Active |
| Fact_Sales[CustomerID] → Dim_Customer[CustomerID] | Many-to-One | Active |
| Fact_Sales[ProductID] → Dim_Product[ProductID] | Many-to-One | Active |
| Fact_Sales[RegionID] → Dim_Region[RegionID] | Many-to-One | Active |
| Fact_Process_Metrics[OrderID] → Fact_Sales[OrderID] | Many-to-One | Active |
| Fact_Process_Metrics[DateKey] → Dim_Date[DateKey] | Many-to-One | INACTIVE |

### Step 3.3: Verify
- Each relationship should show a 1-to-many connector
- The inactive relationship should show as a dashed line

### Step 3.4: Hide Unnecessary Columns
Right-click and "Hide in report view" for:
- All DateKey columns (users should use Date, Year, Month instead)
- All ID columns (users should use Name columns)
- The _Measures[Placeholder] column

---

## PHASE 4: Create Measures Table (5 minutes)

### Step 4.1: Create _Measures Table
1. Click `Modeling` → `New Table`
2. Enter: `_Measures = ROW("Placeholder", 0)`
3. Press Enter

### Step 4.2: Add All DAX Measures
1. Select `_Measures` table in the Fields pane
2. Click `Modeling` → `New Measure`
3. Copy-paste each measure from `DAX_Measures.dax`
4. Press Enter after each one

> TIP: Add measures one section at a time. Start with Revenue, then Profitability, etc.

### Step 4.3: Organize Into Folders
1. Select multiple measures in the Fields pane
2. In the Properties panel, set "Display folder" to organize:
   - Revenue Metrics
   - Profitability Metrics
   - Order Metrics
   - Customer Metrics
   - Process Metrics
   - KPI Indicators
   - Dynamic Labels

### Step 4.4: Format Measures
For each measure, set the proper format:
- Currency measures → `$#,##0` (e.g., Total Revenue, Total Profit)
- Percentage measures → `0.0%` (e.g., Profit Margin, Delay Percentage)
- Whole number measures → `#,##0` (e.g., Total Orders, Total Customers)
- Decimal measures → `#,##0.0` (e.g., Avg Cycle Time)

---

## PHASE 5: Apply Theme (2 minutes)

### Step 5.1: Import Dark Theme
1. Go to `View` → `Themes` → `Browse for themes`
2. Navigate to your project folder
3. Select `TechNova_Dark_Theme.json`
4. Click Open

### Step 5.2: Verify
- The canvas background should change to dark navy (#0F172A)
- Chart colors should update to the custom palette

---

## PHASE 6: Build Dashboard Pages (45-60 minutes)

### Page 1: Executive Overview

**Step 6.1: Add KPI Cards (Top Row)**
1. Insert → Card visual (or New Card visual)
2. Create 6 cards across the top:

| Card | Measure | Format |
|------|---------|--------|
| Card 1 | Total Revenue | Currency |
| Card 2 | Profit Margin | Percentage |
| Card 3 | Customer Retention Rate | Percentage |
| Card 4 | Avg Cycle Time | Decimal |
| Card 5 | Throughput | Whole Number |
| Card 6 | Delay Percentage | Percentage |

3. For each card, add conditional formatting:
   - Click card → Format → Data label → Color → fx
   - Use the RAG measures (1=Green #10B981, 2=Yellow #F59E0B, 3=Red #EF4444)

**Step 6.2: Revenue Trend (Line Chart)**
1. Insert → Line Chart
2. X-axis: Dim_Date[YearMonth] (sort by YearMonthSort)
3. Y-axis: [Total Revenue]
4. Secondary Y-axis: [Revenue Growth Rate MoM] (optional)
5. Legend: Dim_Date[Year] (for YoY comparison)

> IMPORTANT: To sort YearMonth correctly:
> Click on Dim_Date[YearMonth] in the Fields pane →
> Column tools → Sort by Column → Select [YearMonthSort]

**Step 6.3: Customer Segment Bar Chart**
1. Insert → Clustered Bar Chart
2. Y-axis: Dim_Customer[Segment]
3. X-axis: [Total Revenue]
4. Add Data labels → ON
5. Format bars with gradient colors

**Step 6.4: Revenue by Region Map**
1. Insert → Filled Map (or Shape Map)
2. Location: Dim_Customer[State]
3. Color saturation: [Total Revenue]
4. Tooltips: Add [Total Profit], [Total Orders]

**Step 6.5: Top Customers Table**
1. Insert → Table or Matrix
2. Rows: Dim_Customer[CustomerName]
3. Values: [Total Revenue], [Total Orders], [Profit Margin], [Customer Rank]
4. Add conditional formatting:
   - Revenue → Data bars (cyan gradient)
   - Profit Margin → Background color (green/yellow/red scale)
5. Set filter: Top N → Top 10 by [Total Revenue]

---

### Page 2: Customer Analytics

**Step 6.6: Create New Page**
- Right-click page tab → Rename to "Customer Analytics"

**Add these visuals:**
1. **KPI Cards**: Total Customers, Active Customers, Avg LTV, Retention Rate
2. **Treemap**: Revenue by Industry (Dim_Customer[Industry], [Total Revenue])
3. **Donut Chart**: Customer Segment Split (Dim_Customer[Segment], [Total Customers])
4. **Stacked Area Chart**: Customer Growth (Dim_Date[YearMonth], [New Customers], [Customer Retention Rate])
5. **Clustered Column**: Revenue by Credit Score (Dim_Customer[CreditScore], [Total Revenue])
6. **Scatter Plot**: Customer Portfolio
   - X-axis: [Total Orders] (count)
   - Y-axis: [Profit Margin]
   - Size: [Total Revenue]
   - Color: Dim_Customer[Segment]

---

### Page 3: Process Performance

**Step 6.7: Create New Page**
- Right-click page tab → Rename to "Process Performance"

**Add these visuals:**
1. **KPI Cards**: Avg Cycle Time, On-Time Rate, Avg Process Efficiency, Total Delay Hours
2. **Clustered Bar Chart**: Cycle Time by Department
   - Y-axis: Fact_Process_Metrics[Department]
   - X-axis: Average of ActualDuration_hrs
   - Reference line: Average of PlannedDuration_hrs
3. **Donut Chart**: Delay Reasons Breakdown
   - Legend: Fact_Process_Metrics[DelayReason]
   - Values: Count of ProcessID
   - Filter: Exclude "No Delay"
4. **Combo Chart**: Planned vs Actual Duration Trend
   - X-axis: Dim_Date[YearMonth]
   - Column: Average of ActualDuration_hrs
   - Line: Average of PlannedDuration_hrs
5. **Stacked Bar Chart**: Delay % by Process Step
6. **Matrix**: Department Performance Scorecard
   - Rows: Department, ProcessStep
   - Values: Avg Planned, Avg Actual, Delay %, Efficiency %
   - Conditional formatting on all value columns

---

### Page 4: Drill-Through Detail (Order View)

**Step 6.8: Create Drill-Through Page**
1. Create new page → Rename to "Order Detail"
2. In Visualizations pane → Drill through section
3. Drag Fact_Sales[OrderID] to the drill-through well
4. Power BI automatically adds a "Back" button

**Add these visuals:**
1. **Multi-row Card**: Order header info (CustomerName, Region, Date, Amount, Status)
2. **Table**: Process steps timeline with conditional formatting
3. **Gauge**: Order Efficiency (actual vs planned total)
4. **Card**: Delay Root Cause (delay reason from process metrics)

---

## PHASE 7: Add Slicers & Interactions (15 minutes)

### Step 7.1: Add Slicers to Page 1
1. Insert → Slicer → Dim_Date[Year] (Dropdown style)
2. Insert → Slicer → Dim_Date[Quarter] (Buttons style)
3. Insert → Slicer → Dim_Region[RegionName] (Dropdown style)
4. Insert → Slicer → Dim_Product[Category] (Dropdown style)

### Step 7.2: Sync Slicers Across Pages
1. Go to `View` → `Sync slicers`
2. For Year slicer: Check sync for ALL pages
3. For Quarter slicer: Check sync for ALL pages
4. For Region slicer: Check sync for ALL pages

### Step 7.3: Edit Interactions
1. Select a slicer
2. Go to `Format` → `Edit interactions`
3. Choose "Filter" or "Highlight" for each visual
4. Repeat for all slicers

---

## PHASE 8: Add Navigation & Bookmarks (10 minutes)

### Step 8.1: Create Navigation Buttons
1. Go to Page 1
2. Insert → Buttons → Blank
3. Create 4 buttons: "Overview", "Customers", "Operations", "Details"
4. For each button:
   - Format → Action → Type = "Page navigation"
   - Select destination page

### Step 8.2: Create Bookmarks (Optional)
1. View → Bookmarks
2. Create views like "Revenue View", "Profit View"
3. Assign to toggle buttons

### Step 8.3: Add Dynamic Titles
1. Select a visual's title
2. Click fx (conditional formatting)
3. Field value → Select [Dynamic Title] measure

---

## PHASE 9: Final Polish (15 minutes)

### Step 9.1: Conditional Formatting Checklist
- [ ] KPI cards have color-coded values (green/yellow/red)
- [ ] Revenue table has data bars
- [ ] Process matrix has background color rules
- [ ] Positive growth = green, negative = red

### Step 9.2: Tooltips
- Add custom tooltip pages for rich hover info
- Or ensure all visuals have meaningful tooltips with 3-4 measures

### Step 9.3: Mobile Layout
1. View → Mobile layout
2. Rearrange visuals for phone/tablet view
3. Prioritize KPI cards and key charts

### Step 9.4: Performance Check
1. View → Performance Analyzer
2. Click "Start recording" → interact with dashboard
3. Check for any measures taking >1 second
4. Optimize slow measures if needed

---

## PHASE 10: Publish & Share (5 minutes)

### Step 10.1: Save
- File → Save As → `TechNova_Business_Analytics_Dashboard.pbix`
- Save in your project folder

### Step 10.2: Publish to Power BI Service
1. Click `Home` → `Publish`
2. Select your workspace
3. Wait for upload to complete
4. Click the link to open in browser

### Step 10.3: Schedule Refresh (if using live data)
1. In Power BI Service → Dataset settings
2. Scheduled refresh → Configure credentials
3. Set refresh frequency: Daily at 6:00 AM

### Step 10.4: Share
- Create a shareable link or add users/groups
- Set permissions (viewer, contributor)

---

## FILES IN YOUR PROJECT FOLDER

```
Stryker_Project/
├── datasets/                        # Small dataset (110 orders) - for testing
│   ├── Dim_Date.csv
│   ├── Dim_Customer.csv
│   ├── Dim_Product.csv
│   ├── Dim_Region.csv
│   ├── Fact_Sales.csv
│   └── Fact_Process_Metrics.csv
│
├── datasets_large/                  # Large dataset (1,500 orders) - for portfolio
│   ├── Dim_Date.csv          (1,461 rows)
│   ├── Dim_Customer.csv      (60 rows)
│   ├── Dim_Product.csv       (30 rows)
│   ├── Dim_Region.csv        (4 rows)
│   ├── Fact_Sales.csv        (1,500 rows)
│   └── Fact_Process_Metrics.csv (2,722 rows)
│
├── TechNova_Dark_Theme.json         # Power BI dark theme file
├── PowerQuery_Scripts.m             # All Power Query M transformations
├── DAX_Measures.dax                 # All 35+ DAX measures
├── generate_large_dataset.py        # Python data generator script
└── Implementation_Guide.md          # This file
```

---

## ESTIMATED TOTAL TIME: 2-3 hours

| Phase | Duration | Status |
|-------|----------|--------|
| Phase 1: Load Data | 10 min | |
| Phase 2: Power Query | 15 min | |
| Phase 3: Data Model | 10 min | |
| Phase 4: Measures | 20 min | |
| Phase 5: Theme | 2 min | |
| Phase 6: Build Pages | 45-60 min | |
| Phase 7: Slicers | 15 min | |
| Phase 8: Navigation | 10 min | |
| Phase 9: Polish | 15 min | |
| Phase 10: Publish | 5 min | |
