import csv
import random
import os
from datetime import datetime, timedelta

random.seed(42)

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "datasets_large")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def generate_dim_date():
    rows = []
    start = datetime(2022, 1, 1)
    end = datetime(2025, 12, 31)
    current = start
    
    month_names = ["January","February","March","April","May","June",
                   "July","August","September","October","November","December"]
    day_names = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    day_abbrev = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
    
    while current <= end:
        date_key = int(current.strftime("%Y%m%d"))
        year = current.year
        quarter = f"Q{(current.month - 1) // 3 + 1}"
        month = current.month
        month_name = month_names[month - 1]
        week = current.isocalendar()[1]
        dow = current.weekday()
        day_name = day_abbrev[dow]
        
        fy = year if month >= 7 else year
        fiscal_year = f"FY{fy}"
        fq_num = ((month - 7) % 12) // 3 + 1
        fiscal_quarter = f"FQ{fq_num}"
        
        is_weekend = "Yes" if dow >= 5 else "No"
        
        rows.append([date_key, current.strftime("%Y-%m-%d"), year, quarter, month,
                     month_name, week, day_names[dow], day_name, fiscal_year,
                     fiscal_quarter, is_weekend])
        current += timedelta(days=1)
    
    filepath = os.path.join(OUTPUT_DIR, "Dim_Date.csv")
    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["DateKey","Date","Year","Quarter","Month","MonthName",
                         "WeekOfYear","DayOfWeek","DayName","FiscalYear",
                         "FiscalQuarter","IsWeekend"])
        writer.writerows(rows)
    print(f"  [OK] Dim_Date: {len(rows)} rows -> {filepath}")
    return rows

SEGMENTS = ["Enterprise", "SMB", "Startup", "Government"]
INDUSTRIES = ["Technology", "Manufacturing", "Logistics", "Financial Services",
              "Healthcare", "Retail", "Energy", "Aerospace", "Pharmaceuticals",
              "Construction", "Telecommunications", "Professional Services",
              "Public Sector", "Defense", "Agriculture", "Media", "Hospitality",
              "Engineering", "Education", "Automotive"]
REGIONS_MAP = {"North": ["IL","MI","MN","WI","OH","IN","IA"],
               "South": ["TX","FL","GA","NC","TN","AL","LA","SC","VA"],
               "East":  ["NY","MA","NJ","PA","CT","MD","DC","DE"],
               "West":  ["CA","WA","OR","CO","AZ","NV","UT","ID"]}
CITIES = {
    "IL":"Chicago","MI":"Detroit","MN":"Minneapolis","WI":"Milwaukee","OH":"Columbus",
    "IN":"Indianapolis","IA":"Des Moines","TX":"Dallas","FL":"Miami","GA":"Atlanta",
    "NC":"Charlotte","TN":"Nashville","AL":"Huntsville","LA":"New Orleans","SC":"Charleston",
    "VA":"Arlington","NY":"New York","MA":"Boston","NJ":"Princeton","PA":"Pittsburgh",
    "CT":"Hartford","MD":"Baltimore","DC":"Washington DC","DE":"Wilmington",
    "CA":"San Francisco","WA":"Seattle","OR":"Portland","CO":"Denver","AZ":"Phoenix",
    "NV":"Las Vegas","UT":"Salt Lake City","ID":"Boise"
}
MANAGERS = ["Sarah Johnson","Michael Chen","Emily Rodriguez","David Kim",
            "Jessica Lee","Robert Garcia","Amanda Wilson","Christopher Brown"]
COMPANY_PREFIXES = [
    "Apex","Bright","Clear","Delta","Eco","Fusion","Granite","Harbor","Innovate",
    "Company","KeyStone","Landmark","Metro","NexGen","Omni","Prime","Quantum","Red",
    "Silver","True","Urban","Valor","Wave","Xcel","Yellow","Zenith","Acme","Blue",
    "Crest","Dyna","Eagle","Forge","Globe","Helix","Iron","Krypton","Luna","Magna",
    "Nova","Onyx","Pulse","Quest","Ridge","Spark","Titan","Ultra","Vortex","Warp",
    "Xero","York","Zeta","Atlas","Beacon","Core","Drift","Ember","Flux","Glow"
]
COMPANY_SUFFIXES = [
    "Corp","Solutions","Inc","Systems","Technologies","Group","Industries","Global",
    "Dynamics","Partners","Labs","Networks","Ventures","Services","Enterprises",
    "Analytics","Holdings","Digital","Engineering","Consulting"
]

def generate_dim_customer():
    rows = []
    used_names = set()
    for i in range(1, 61):
        cid = f"C{i:03d}"
        
        while True:
            name = f"{random.choice(COMPANY_PREFIXES)} {random.choice(COMPANY_SUFFIXES)}"
            if name not in used_names:
                used_names.add(name)
                break
        
        segment = random.choices(SEGMENTS, weights=[35, 35, 15, 15])[0]
        industry = random.choice(INDUSTRIES)
        region = random.choice(list(REGIONS_MAP.keys()))
        state = random.choice(REGIONS_MAP[region])
        city = CITIES.get(state, "Unknown")
        manager = random.choice(MANAGERS)
        
        cs_year = random.randint(2017, 2023)
        cs_month = random.randint(1, 12)
        cs_day = random.randint(1, 28)
        customer_since = f"{cs_year}-{cs_month:02d}-{cs_day:02d}"
        
        credit = random.choices(["A","B","C"], weights=[45, 35, 20])[0]
        is_active = random.choices(["Yes","No"], weights=[90, 10])[0]
        
        rows.append([cid, name, segment, industry, city, region, state, "USA",
                     manager, customer_since, credit, is_active])
    
    filepath = os.path.join(OUTPUT_DIR, "Dim_Customer.csv")
    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["CustomerID","CustomerName","Segment","Industry","City",
                         "Region","State","Country","AccountManager","CustomerSince",
                         "CreditScore","IsActive"])
        writer.writerows(rows)
    print(f"  [OK] Dim_Customer: {len(rows)} rows -> {filepath}")
    return rows

PRODUCTS = [
    ("P001","Enterprise Server X500","Hardware","Servers",4200,6800,38.2,"TechParts Global",18.5),
    ("P002","CloudSync Pro License","Software","Cloud Services",50,299,83.3,"Internal",0),
    ("P003","Network Switch 48-Port","Hardware","Networking",680,1150,40.9,"NetGear Solutions",3.2),
    ("P004","DataGuard Backup Suite","Software","Security",120,499,76.0,"Internal",0),
    ("P005","Smart Display Panel 65\"","Hardware","Displays",1800,3200,43.8,"VisualTech Inc",22.0),
    ("P006","Managed IT Support (Annual)","Services","Support",2400,5500,56.4,"Internal",0),
    ("P007","Wireless Access Point Pro","Hardware","Networking",220,450,51.1,"NetGear Solutions",0.8),
    ("P008","ERP Integration Module","Software","Enterprise",800,2200,63.6,"Internal",0),
    ("P009","Cybersecurity Audit","Services","Security",1500,3800,60.5,"Internal",0),
    ("P010","Laptop Workstation Z14","Hardware","Computing",1100,1850,40.5,"TechParts Global",2.1),
    ("P011","Office Productivity Suite","Software","Productivity",30,149,79.9,"Internal",0),
    ("P012","Data Analytics Platform","Software","Analytics",400,1200,66.7,"Internal",0),
    ("P013","Cloud Migration Service","Services","Cloud Services",3200,7500,57.3,"Internal",0),
    ("P014","UPS Battery System 3kVA","Hardware","Power",950,1650,42.4,"PowerLine Corp",28.0),
    ("P015","Project Management Tool","Software","Productivity",60,199,69.8,"Internal",0),
    ("P016","Staff Training Program","Services","Training",800,2000,60.0,"Internal",0),
    ("P017","IoT Sensor Kit (100-pack)","Hardware","IoT",1200,2400,50.0,"SensorTech Ltd",5.5),
    ("P018","AI/ML Development Platform","Software","Analytics",600,1800,66.7,"Internal",0),
    ("P019","Network Assessment Service","Services","Networking",500,1200,58.3,"Internal",0),
    ("P020","Storage Array 50TB","Hardware","Storage",3500,5800,39.7,"StoragePro Inc",15.0),
    ("P021","Endpoint Protection Suite","Software","Security",80,349,77.1,"Internal",0),
    ("P022","Video Conferencing System","Hardware","Communication",1500,2800,46.4,"VisualTech Inc",8.0),
    ("P023","DevOps Pipeline Tool","Software","Development",200,699,71.4,"Internal",0),
    ("P024","Disaster Recovery Service","Services","Security",2800,6200,54.8,"Internal",0),
    ("P025","Edge Computing Module","Hardware","IoT",900,1800,50.0,"SensorTech Ltd",2.5),
    ("P026","CRM Platform License","Software","Enterprise",150,599,74.9,"Internal",0),
    ("P027","Penetration Testing","Services","Security",2000,4500,55.6,"Internal",0),
    ("P028","Industrial Router","Hardware","Networking",400,850,52.9,"NetGear Solutions",1.8),
    ("P029","Business Intelligence Suite","Software","Analytics",500,1500,66.7,"Internal",0),
    ("P030","IT Strategy Consulting","Services","Consulting",3500,8000,56.3,"Internal",0),
]

def generate_dim_product():
    rows = []
    for p in PRODUCTS:
        pid, name, cat, subcat, cost, price, margin, supplier, weight = p
        rows.append([pid, name, cat, subcat, cost, price, margin, supplier, weight, "Yes"])
    
    filepath = os.path.join(OUTPUT_DIR, "Dim_Product.csv")
    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["ProductID","ProductName","Category","SubCategory","UnitCost",
                         "ListPrice","GrossMarginPct","Supplier","Weight_kg","IsActive"])
        writer.writerows(rows)
    print(f"  [OK] Dim_Product: {len(rows)} rows -> {filepath}")
    return rows

REGIONS = [
    ("R001","North","Jennifer Walsh","Chicago",3200000,"CC-NORTH-01"),
    ("R002","South","Marcus Thompson","Dallas",4500000,"CC-SOUTH-01"),
    ("R003","East","Priya Sharma","New York",3800000,"CC-EAST-01"),
    ("R004","West","James Martinez","San Francisco",4000000,"CC-WEST-01"),
]

def generate_dim_region():
    filepath = os.path.join(OUTPUT_DIR, "Dim_Region.csv")
    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["RegionID","RegionName","RegionManager","HeadquartersCity",
                         "SalesTarget_Annual","CostCenter"])
        writer.writerows(REGIONS)
    print(f"  [OK] Dim_Region: {len(REGIONS)} rows -> {filepath}")

PAYMENT_METHODS = ["Wire Transfer","Credit Card","Check","Purchase Order","ACH"]
SALES_CHANNELS = ["Direct Sales","Online","Partner","Marketplace"]
ORDER_STATUSES_WEIGHTS = [("Completed", 88), ("Shipped", 5), ("Cancelled", 4), ("Returned", 3)]

def generate_fact_sales(date_rows, customer_rows, product_data):
    rows = []
    
    valid_dates = []
    for d in date_rows:
        date_key = d[0]
        is_weekend = d[11]
        year = d[2]
        if is_weekend == "No" and year >= 2023:
            valid_dates.append(date_key)
    
    customer_ids = [c[0] for c in customer_rows]
    customer_regions = {c[0]: c[5] for c in customer_rows}
    region_id_map = {"North":"R001", "South":"R002", "East":"R003", "West":"R004"}
    
    product_prices = {}
    product_costs = {}
    for p in product_data:
        product_prices[p[0]] = p[5]
        product_costs[p[0]] = p[4]
    product_ids = [p[0] for p in product_data]
    
    def seasonal_weight(date_key):
        month = int(str(date_key)[4:6])
        if month in [11, 12]:
            return 1.6
        elif month in [1, 2]:
            return 0.8
        elif month in [6, 7, 8]:
            return 1.1
        return 1.0
    
    def year_weight(date_key):
        year = int(str(date_key)[:4])
        return 0.8 + (year - 2023) * 0.2
    
    order_num = 10001
    for i in range(1500):
        oid = f"ORD-{order_num}"
        order_num += 1
        
        dk = random.choice(valid_dates)
        
        cid = random.choice(customer_ids)
        pid = random.choice(product_ids)
        region_name = customer_regions[cid]
        rid = region_id_map[region_name]
        
        list_price = product_prices[pid]
        unit_cost = product_costs[pid]
        
        if list_price > 5000:
            qty = random.randint(1, 4)
        elif list_price > 1000:
            qty = random.randint(1, 8)
        elif list_price > 200:
            qty = random.randint(2, 25)
        else:
            qty = random.randint(5, 100)
        
        segment = [c[2] for c in customer_rows if c[0] == cid][0]
        if segment == "Enterprise":
            discount = round(random.choice([0, 0, 0.05, 0.08, 0.10, 0.12, 0.15]), 2)
        elif segment == "Government":
            discount = round(random.choice([0, 0.05, 0.05, 0.10, 0.10]), 2)
        else:
            discount = round(random.choice([0, 0, 0, 0, 0.05, 0.10]), 2)
        
        gross = qty * list_price
        total = round(gross * (1 - discount), 2)
        cogs = round(qty * unit_cost, 2)
        profit = round(total - cogs, 2)
        
        payment = random.choice(PAYMENT_METHODS)
        status_options, status_weights = zip(*ORDER_STATUSES_WEIGHTS)
        status = random.choices(status_options, weights=status_weights)[0]
        channel = random.choices(SALES_CHANNELS, weights=[40, 30, 20, 10])[0]
        
        rows.append([oid, dk, cid, pid, rid, qty, list_price, discount,
                     total, cogs, profit, payment, status, channel])
    
    rows.sort(key=lambda x: x[1])
    
    filepath = os.path.join(OUTPUT_DIR, "Fact_Sales.csv")
    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["OrderID","DateKey","CustomerID","ProductID","RegionID",
                         "Quantity","UnitPrice","Discount","TotalAmount","COGS",
                         "Profit","PaymentMethod","OrderStatus","SalesChannel"])
        writer.writerows(rows)
    print(f"  [OK] Fact_Sales: {len(rows)} rows -> {filepath}")
    return rows

DEPARTMENTS_STEPS = {
    "Hardware": [
        ("Order Processing", "Order Verification", 2),
        ("Warehouse", "Pick & Pack", 5),
        ("Quality Control", "Inspection", 2),
        ("Shipping", "Dispatch", 3),
    ],
    "Software": [
        ("Order Processing", "Order Verification", 1),
        ("Fulfillment", "License Provisioning", 2),
    ],
    "Services": [
        ("Order Processing", "Order Verification", 2),
        ("Service Delivery", "Engagement Setup", 8),
        ("Service Delivery", "Execution", 16),
    ],
}

DELAY_REASONS = [
    "Staff Shortage", "Carrier Delay", "System Downtime", "Inventory Mismatch",
    "Equipment Malfunction", "Complex Requirements", "Approval Pending",
    "Weather Delay", "Integration Issues", "Volume Processing",
    "Vendor Delay", "Quality Issue Found", "Documentation Missing"
]

TEAMS = ["Team Alpha","Team Bravo","Team Charlie","Team Delta","Team Echo",
         "Team Foxtrot","Team Golf","Team Hotel"]

def get_product_category(pid, product_data):
    for p in product_data:
        if p[0] == pid:
            return p[2]
    return "Hardware"

def generate_fact_process_metrics(sales_rows, product_data):
    rows = []
    proc_num = 1
    
    eligible = [s for s in sales_rows if s[12] in ("Completed", "Shipped")]
    
    sampled = random.sample(eligible, min(len(eligible), 900))
    
    for sale in sampled:
        oid = sale[0]
        dk = sale[1]
        pid = sale[3]
        category = get_product_category(pid, product_data)
        
        steps = DEPARTMENTS_STEPS.get(category, DEPARTMENTS_STEPS["Hardware"])
        
        year = int(str(dk)[:4])
        month = int(str(dk)[4:6])
        day = int(str(dk)[6:8])
        try:
            base_dt = datetime(year, month, day, 8, 0)
        except ValueError:
            base_dt = datetime(year, month, 28, 8, 0)
        
        current_dt = base_dt
        
        for dept, step, planned_hrs in steps:
            proc_id = f"PRC-{proc_num:04d}"
            proc_num += 1
            
            delay_chance = random.random()
            if delay_chance < 0.35:
                delay_factor = random.uniform(1.1, 2.0)
                actual_hrs = round(planned_hrs * delay_factor, 1)
                delay_reason = random.choice(DELAY_REASONS)
            else:
                actual_hrs = round(planned_hrs * random.uniform(0.8, 1.05), 1)
                delay_reason = ""
            
            actual_hrs = max(0.5, actual_hrs)
            
            priority = random.choices(
                ["Low","Medium","High","Critical"],
                weights=[5, 20, 55, 20]
            )[0]
            
            team = random.choice(TEAMS)
            
            start_dt = current_dt
            end_dt = start_dt + timedelta(hours=actual_hrs)
            
            rows.append([proc_id, oid, dk, dept, step, planned_hrs,
                         actual_hrs, delay_reason, "Completed", priority,
                         team, start_dt.strftime("%Y-%m-%d %H:%M"),
                         end_dt.strftime("%Y-%m-%d %H:%M")])
            
            current_dt = end_dt + timedelta(minutes=30)
    
    rows.sort(key=lambda x: x[0])
    
    filepath = os.path.join(OUTPUT_DIR, "Fact_Process_Metrics.csv")
    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["ProcessID","OrderID","DateKey","Department","ProcessStep",
                         "PlannedDuration_hrs","ActualDuration_hrs","DelayReason",
                         "Status","Priority","AssignedTo","StartDateTime","EndDateTime"])
        writer.writerows(rows)
    print(f"  [OK] Fact_Process_Metrics: {len(rows)} rows -> {filepath}")

if __name__ == "__main__":
    print("=" * 60)
    print("  TechNova Solutions - Dataset Generator")
    print("=" * 60)
    print(f"\n  Output folder: {OUTPUT_DIR}\n")
    
    date_rows = generate_dim_date()
    customer_rows = generate_dim_customer()
    product_rows = generate_dim_product()
    generate_dim_region()
    sales_rows = generate_fact_sales(date_rows, customer_rows, PRODUCTS)
    generate_fact_process_metrics(sales_rows, PRODUCTS)
    
    print(f"\n{'=' * 60}")
    print("  [DONE] All datasets generated successfully!")
    print(f"  Files saved to: {OUTPUT_DIR}")
    print(f"{'=' * 60}")
    print("\n  Next steps:")
    print("  1. Open Power BI Desktop")
    print("  2. Get Data -> Text/CSV")
    print("  3. Load all 6 files from the datasets_large folder")
    print("  4. Follow the guide for transformations & measures")
