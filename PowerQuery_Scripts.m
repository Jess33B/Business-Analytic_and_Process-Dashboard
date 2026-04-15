let
    Source = Csv.Document(
        File.Contents("C:\Users\JESNABINU\Desktop\Stryker_Project\datasets_large\Dim_Date.csv"),
        [Delimiter=",", Columns=12, Encoding=65001, QuoteStyle=QuoteStyle.None]
    ),
    #"Promoted Headers" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Changed Types" = Table.TransformColumnTypes(#"Promoted Headers", {
        {"DateKey", Int64.Type},
        {"Date", type date},
        {"Year", Int64.Type},
        {"Quarter", type text},
        {"Month", Int64.Type},
        {"MonthName", type text},
        {"WeekOfYear", Int64.Type},
        {"DayOfWeek", type text},
        {"DayName", type text},
        {"FiscalYear", type text},
        {"FiscalQuarter", type text},
        {"IsWeekend", type text}
    }),
    #"Converted Weekend" = Table.TransformColumns(#"Changed Types", {
        {"IsWeekend", each _ = "Yes", type logical}
    }),
    #"Added YearMonth" = Table.AddColumn(#"Converted Weekend", "YearMonth", 
        each Text.From([Year]) & "-" & Text.PadStart(Text.From([Month]), 2, "0"), 
        type text),
    #"Added YearMonthSort" = Table.AddColumn(#"Added YearMonth", "YearMonthSort", 
        each [Year] * 100 + [Month], Int64.Type),
    #"Added IsCurrentYear" = Table.AddColumn(#"Added YearMonthSort", "IsCurrentYear", 
        each [Year] = Date.Year(DateTime.LocalNow()), type logical),
    #"Added Period Label" = Table.AddColumn(#"Added IsCurrentYear", "PeriodLabel", 
        each if [Year] = Date.Year(DateTime.LocalNow()) then "Current Year"
             else if [Year] = Date.Year(DateTime.LocalNow()) - 1 then "Previous Year"
             else Text.From([Year]), 
        type text)
in
    #"Added Period Label"

let
    Source = Csv.Document(
        File.Contents("C:\Users\JESNABINU\Desktop\Stryker_Project\datasets_large\Dim_Customer.csv"),
        [Delimiter=",", Columns=12, Encoding=65001, QuoteStyle=QuoteStyle.None]
    ),
    #"Promoted Headers" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Changed Types" = Table.TransformColumnTypes(#"Promoted Headers", {
        {"CustomerID", type text},
        {"CustomerName", type text},
        {"Segment", type text},
        {"Industry", type text},
        {"City", type text},
        {"Region", type text},
        {"State", type text},
        {"Country", type text},
        {"AccountManager", type text},
        {"CustomerSince", type date},
        {"CreditScore", type text},
        {"IsActive", type text}
    }),
    #"Trimmed Text" = Table.TransformColumns(#"Changed Types", {
        {"CustomerName", Text.Trim, type text},
        {"Segment", Text.Trim, type text},
        {"Industry", Text.Trim, type text},
        {"City", Text.Trim, type text}
    }),
    #"Replaced Nulls" = Table.ReplaceValue(#"Trimmed Text", null, "Unknown", 
        Replacer.ReplaceValue, {"City", "State", "Industry"}),
    #"Converted Active" = Table.TransformColumns(#"Replaced Nulls", {
        {"IsActive", each _ = "Yes", type logical}
    }),
    #"Added Tenure" = Table.AddColumn(#"Converted Active", "TenureYears", 
        each Number.Round(
            Duration.TotalDays(DateTime.LocalNow() - DateTime.From([CustomerSince])) / 365.25, 
            1
        ),
        type number),
    #"Added TenureBucket" = Table.AddColumn(#"Added Tenure", "TenureBucket", 
        each if [TenureYears] < 2 then "1. New (< 2 yrs)"
             else if [TenureYears] < 4 then "2. Growing (2-4 yrs)"
             else if [TenureYears] < 6 then "3. Established (4-6 yrs)"
             else "4. Loyal (6+ yrs)", 
        type text),
    #"Added Tier" = Table.AddColumn(#"Added TenureBucket", "InitialTier", 
        each if [CreditScore] = "A" then "Gold"
             else if [CreditScore] = "B" then "Silver"
             else "Bronze", 
        type text)
in
    #"Added Tier"

let
    Source = Csv.Document(
        File.Contents("C:\Users\JESNABINU\Desktop\Stryker_Project\datasets_large\Dim_Product.csv"),
        [Delimiter=",", Columns=10, Encoding=65001, QuoteStyle=QuoteStyle.None]
    ),
    #"Promoted Headers" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Changed Types" = Table.TransformColumnTypes(#"Promoted Headers", {
        {"ProductID", type text},
        {"ProductName", type text},
        {"Category", type text},
        {"SubCategory", type text},
        {"UnitCost", type number},
        {"ListPrice", type number},
        {"GrossMarginPct", type number},
        {"Supplier", type text},
        {"Weight_kg", type number},
        {"IsActive", type text}
    }),
    #"Added MarginTier" = Table.AddColumn(#"Changed Types", "MarginTier", 
        each if [GrossMarginPct] >= 70 then "High Margin (70%+)"
             else if [GrossMarginPct] >= 50 then "Medium Margin (50-70%)"
             else "Low Margin (<50%)", 
        type text),
    #"Added PriceTier" = Table.AddColumn(#"Added MarginTier", "PriceTier", 
        each if [ListPrice] >= 5000 then "Premium ($5K+)"
             else if [ListPrice] >= 1000 then "Standard ($1K-5K)"
             else if [ListPrice] >= 200 then "Value ($200-1K)"
             else "Economy (<$200)", 
        type text),
    #"Converted Active" = Table.TransformColumns(#"Added PriceTier", {
        {"IsActive", each _ = "Yes", type logical}
    })
in
    #"Converted Active"

let
    Source = Csv.Document(
        File.Contents("C:\Users\JESNABINU\Desktop\Stryker_Project\datasets_large\Dim_Region.csv"),
        [Delimiter=",", Columns=6, Encoding=65001, QuoteStyle=QuoteStyle.None]
    ),
    #"Promoted Headers" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Changed Types" = Table.TransformColumnTypes(#"Promoted Headers", {
        {"RegionID", type text},
        {"RegionName", type text},
        {"RegionManager", type text},
        {"HeadquartersCity", type text},
        {"SalesTarget_Annual", type number},
        {"CostCenter", type text}
    }),
    #"Added MonthlyTarget" = Table.AddColumn(#"Changed Types", "SalesTarget_Monthly", 
        each [SalesTarget_Annual] / 12, type number),
    #"Added QuarterlyTarget" = Table.AddColumn(#"Added MonthlyTarget", "SalesTarget_Quarterly", 
        each [SalesTarget_Annual] / 4, type number)
in
    #"Added QuarterlyTarget"

let
    Source = Csv.Document(
        File.Contents("C:\Users\JESNABINU\Desktop\Stryker_Project\datasets_large\Fact_Sales.csv"),
        [Delimiter=",", Columns=14, Encoding=65001, QuoteStyle=QuoteStyle.None]
    ),
    #"Promoted Headers" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Changed Types" = Table.TransformColumnTypes(#"Promoted Headers", {
        {"OrderID", type text},
        {"DateKey", Int64.Type},
        {"CustomerID", type text},
        {"ProductID", type text},
        {"RegionID", type text},
        {"Quantity", Int64.Type},
        {"UnitPrice", type number},
        {"Discount", type number},
        {"TotalAmount", type number},
        {"COGS", type number},
        {"Profit", type number},
        {"PaymentMethod", type text},
        {"OrderStatus", type text},
        {"SalesChannel", type text}
    }),
    #"Added GrossRevenue" = Table.AddColumn(#"Changed Types", "GrossRevenue", 
        each [Quantity] * [UnitPrice], type number),
    #"Added DiscountAmt" = Table.AddColumn(#"Added GrossRevenue", "DiscountAmount", 
        each [GrossRevenue] - [TotalAmount], type number),
    #"Added ProfitMargin" = Table.AddColumn(#"Added DiscountAmt", "ProfitMarginPct", 
        each if [TotalAmount] = 0 then 0 
             else Number.Round([Profit] / [TotalAmount] * 100, 2), 
        type number),
    #"Added ProfitFlag" = Table.AddColumn(#"Added ProfitMargin", "IsProfitable", 
        each [Profit] > 0, type logical),
    #"Added OrderSize" = Table.AddColumn(#"Added ProfitFlag", "OrderSizeCategory", 
        each if [TotalAmount] >= 20000 then "Large ($20K+)"
             else if [TotalAmount] >= 5000 then "Medium ($5K-20K)"
             else if [TotalAmount] >= 1000 then "Small ($1K-5K)"
             else "Micro (<$1K)", 
        type text),
    #"Added DiscountCat" = Table.AddColumn(#"Added OrderSize", "DiscountCategory", 
        each if [Discount] = 0 then "No Discount"
             else if [Discount] <= 0.05 then "Low (1-5%)"
             else if [Discount] <= 0.10 then "Medium (6-10%)"
             else "High (>10%)", 
        type text)
in
    #"Added DiscountCat"

let
    Source = Csv.Document(
        File.Contents("C:\Users\JESNABINU\Desktop\Stryker_Project\datasets_large\Fact_Process_Metrics.csv"),
        [Delimiter=",", Columns=13, Encoding=65001, QuoteStyle=QuoteStyle.None]
    ),
    #"Promoted Headers" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Changed Types" = Table.TransformColumnTypes(#"Promoted Headers", {
        {"ProcessID", type text},
        {"OrderID", type text},
        {"DateKey", Int64.Type},
        {"Department", type text},
        {"ProcessStep", type text},
        {"PlannedDuration_hrs", type number},
        {"ActualDuration_hrs", type number},
        {"DelayReason", type text},
        {"Status", type text},
        {"Priority", type text},
        {"AssignedTo", type text},
        {"StartDateTime", type datetime},
        {"EndDateTime", type datetime}
    }),
    #"Replaced Nulls" = Table.ReplaceValue(#"Changed Types", null, "No Delay", 
        Replacer.ReplaceValue, {"DelayReason"}),
    #"Replaced Blanks" = Table.ReplaceValue(#"Replaced Nulls", "", "No Delay", 
        Replacer.ReplaceValue, {"DelayReason"}),
    #"Added DelayHrs" = Table.AddColumn(#"Replaced Blanks", "DelayDuration_hrs", 
        each Number.Max({[ActualDuration_hrs] - [PlannedDuration_hrs], 0}), 
        type number),
    #"Added DelayFlag" = Table.AddColumn(#"Added DelayHrs", "IsDelayed", 
        each [ActualDuration_hrs] > [PlannedDuration_hrs], type logical),
    #"Added Efficiency" = Table.AddColumn(#"Added DelayFlag", "EfficiencyPct", 
        each if [ActualDuration_hrs] = 0 then 100 
             else Number.Round([PlannedDuration_hrs] / [ActualDuration_hrs] * 100, 1), 
        type number),
    #"Added PerfCategory" = Table.AddColumn(#"Added Efficiency", "PerformanceCategory", 
        each if [EfficiencyPct] >= 100 then "✅ On Time or Early"
             else if [EfficiencyPct] >= 85 then "🟡 Minor Delay"
             else if [EfficiencyPct] >= 70 then "🟠 Moderate Delay"
             else "🔴 Significant Delay", 
        type text),
    #"Added DurationCat" = Table.AddColumn(#"Added PerfCategory", "DurationCategory", 
        each if [ActualDuration_hrs] <= 2 then "Quick (≤2 hrs)"
             else if [ActualDuration_hrs] <= 6 then "Standard (2-6 hrs)"
             else if [ActualDuration_hrs] <= 12 then "Extended (6-12 hrs)"
             else "Long (>12 hrs)", 
        type text),
    #"Added DelaySeverity" = Table.AddColumn(#"Added DurationCat", "DelaySeverity", 
        each if [DelayDuration_hrs] = 0 then "None"
             else if [DelayDuration_hrs] <= 1 then "Low"
             else if [DelayDuration_hrs] <= 3 then "Medium"
             else "High", 
        type text)
in
    #"Added DelaySeverity"
