# Business Analytics and Process Optimization Dashboard

## Project Overview

This repository contains an end-to-end business intelligence project designed to optimize operations and financial performance for TechNova Solutions, a global B2B technology provider. The project demonstrates a full data lifecycle: from synthetic data generation and automated ETL to advanced DAX modeling and interactive visualization.

## Objectives

The primary goal of this project is to provide executive leadership with actionable insights across four key domains:

1. Financial Performance: Tracking revenue growth, profit margins, and sales targets.
2. Customer Analytics: Identifying high-value segments and monitoring retention rates.
3. Operational Efficiency: Analyzing cycle times and identifying process bottlenecks.
4. Product Intelligence: Evaluating category performance and sales channel effectiveness.

## Technical Architecture

The project is built on a robust star schema architecture to ensure optimal performance and scalability.

### Data Layer
- Source: Synthetic large-scale datasets (1,500+ sales orders, 2,700+ process metrics) generated via Python.
- Structure: Star schema with 4 dimension tables (Date, Customer, Product, Region) and 2 fact tables (Sales, Process Metrics).

### ETL Layer (Power Query)
- Automated data ingestion using M scripts.
- Data cleaning: Type conversion, null handling, and string normalization.
- Feature engineering: Added tenure aging, profitability flags, and fiscal calendar logic.

### Modeling Layer (DAX)
- Implementation of 35+ complex measures across financial and operational domains.
- Calculations include Year-over-Year growth, retention matrices, and cycle time variance analysis.
- Implementation of RAG (Red-Amber-Green) status indicators for KPI tracking.

### Visualization Layer
- Primary: Power BI Desktop dashboard with conditional formatting and drill-through capabilities.
- Supplemental: Standalone interactive web dashboard built with Chart.js for portfolio demonstration.

## Repository Structure

- dashboard/: Source code for the interactive web-based dashboard.
- datasets_large/: Production-scale CSV datasets.
- DAX_Measures.dax: Library of all analytical formulas used in the project.
- PowerQuery_Scripts.m: M language scripts for automated data transformation.
- generate_large_dataset.py: Python script used to build the synthetic data infrastructure.
- Implementation_Guide.md: Detailed phase-by-phase build instructions.
- TechNova_Dark_Theme.json: Custom UI theme for Power BI.

## How to Run

### Web Dashboard
1. Navigate to the dashboard directory.
2. Open index.html in any modern web browser.
3. Use the filters in the header to interact with the data.

### Power BI Build
1. Open Power BI Desktop.
2. Follow the steps in the Implementation_Guide.md to load files from the datasets_large folder.
3. Apply the M scripts from PowerQuery_Scripts.m in the Advanced Editor.
4. Import the DAX measures from DAX_Measures.dax into your model.

## Business Insights Provided

- Identification of Enterprise segments as the primary revenue driver despite lower quantity relative to SMB.
- Detection of bottlenecks in the Quality Control department, which accounts for 40 percent of operational delays.
- Correlation between customer credit scores and profit margins, enabling more targeted credit risk policies.
- Tracking of on-time delivery rates against a 90 percent baseline target.
