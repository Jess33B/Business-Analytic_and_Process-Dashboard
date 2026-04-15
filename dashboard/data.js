
const CUSTOMERS = [
    {id:"C001",name:"Onyx Enterprises",segment:"Enterprise",industry:"Automotive",city:"Pittsburgh",region:"East",state:"PA",creditScore:"C",isActive:true},
    {id:"C002",name:"Titan Labs",segment:"Enterprise",industry:"Technology",city:"Charlotte",region:"South",state:"NC",creditScore:"A",isActive:true},
    {id:"C003",name:"Globe Technologies",segment:"SMB",industry:"Media",city:"Denver",region:"West",state:"CO",creditScore:"A",isActive:true},
    {id:"C004",name:"Magna Solutions",segment:"SMB",industry:"Retail",city:"Portland",region:"West",state:"OR",creditScore:"A",isActive:true},
    {id:"C005",name:"Zeta Consulting",segment:"Government",industry:"Hospitality",city:"New York",region:"East",state:"NY",creditScore:"A",isActive:true},
    {id:"C006",name:"Eagle Partners",segment:"Enterprise",industry:"Construction",city:"Huntsville",region:"South",state:"AL",creditScore:"B",isActive:true},
    {id:"C007",name:"Dyna Corp",segment:"SMB",industry:"Retail",city:"Atlanta",region:"South",state:"GA",creditScore:"B",isActive:true},
    {id:"C008",name:"Atlas Services",segment:"Enterprise",industry:"Education",city:"Phoenix",region:"West",state:"AZ",creditScore:"C",isActive:true},
    {id:"C009",name:"Fusion Ventures",segment:"Enterprise",industry:"Energy",city:"Columbus",region:"North",state:"OH",creditScore:"A",isActive:true},
    {id:"C010",name:"Warp Digital",segment:"Enterprise",industry:"Financial Services",city:"Hartford",region:"East",state:"CT",creditScore:"A",isActive:true},
    {id:"C011",name:"Vortex Holdings",segment:"Enterprise",industry:"Hospitality",city:"San Francisco",region:"West",state:"CA",creditScore:"B",isActive:true},
    {id:"C012",name:"Beacon Networks",segment:"Enterprise",industry:"Healthcare",city:"Baltimore",region:"East",state:"MD",creditScore:"A",isActive:true},
    {id:"C013",name:"Glow Analytics",segment:"SMB",industry:"Agriculture",city:"Las Vegas",region:"West",state:"NV",creditScore:"B",isActive:true},
    {id:"C014",name:"Quest Systems",segment:"Enterprise",industry:"Energy",city:"Detroit",region:"North",state:"MI",creditScore:"B",isActive:false},
    {id:"C015",name:"Prime Dynamics",segment:"Enterprise",industry:"Agriculture",city:"Dallas",region:"South",state:"TX",creditScore:"A",isActive:true},
    {id:"C016",name:"Ember Inc",segment:"SMB",industry:"Retail",city:"New Orleans",region:"South",state:"LA",creditScore:"A",isActive:true},
    {id:"C017",name:"Silver Corp",segment:"Government",industry:"Professional Services",city:"Washington DC",region:"East",state:"DC",creditScore:"B",isActive:true},
    {id:"C018",name:"Krypton Industries",segment:"SMB",industry:"Manufacturing",city:"Princeton",region:"East",state:"NJ",creditScore:"B",isActive:true},
    {id:"C019",name:"Helix Group",segment:"Government",industry:"Technology",city:"Boise",region:"West",state:"ID",creditScore:"A",isActive:true},
    {id:"C020",name:"Ridge Global",segment:"SMB",industry:"Professional Services",city:"New York",region:"East",state:"NY",creditScore:"A",isActive:true},
    {id:"C021",name:"Forge Technologies",segment:"Startup",industry:"Healthcare",city:"Nashville",region:"South",state:"TN",creditScore:"A",isActive:true},
    {id:"C022",name:"Iron Solutions",segment:"Government",industry:"Logistics",city:"Seattle",region:"West",state:"WA",creditScore:"A",isActive:true},
    {id:"C023",name:"Crest Enterprises",segment:"Enterprise",industry:"Telecommunications",city:"Arlington",region:"South",state:"VA",creditScore:"B",isActive:true},
    {id:"C024",name:"Xero Inc",segment:"Enterprise",industry:"Manufacturing",city:"Dallas",region:"South",state:"TX",creditScore:"A",isActive:true},
    {id:"C025",name:"Luna Group",segment:"Enterprise",industry:"Healthcare",city:"Columbus",region:"North",state:"OH",creditScore:"B",isActive:true},
    {id:"C026",name:"York Labs",segment:"Startup",industry:"Defense",city:"Indianapolis",region:"North",state:"IN",creditScore:"C",isActive:true},
    {id:"C027",name:"Pulse Services",segment:"SMB",industry:"Agriculture",city:"Salt Lake City",region:"West",state:"UT",creditScore:"A",isActive:true},
    {id:"C028",name:"Spark Digital",segment:"Startup",industry:"Technology",city:"San Francisco",region:"West",state:"CA",creditScore:"C",isActive:true},
    {id:"C029",name:"Drift Solutions",segment:"Enterprise",industry:"Logistics",city:"Wilmington",region:"East",state:"DE",creditScore:"B",isActive:true},
    {id:"C030",name:"Flux Corp",segment:"SMB",industry:"Telecommunications",city:"Denver",region:"West",state:"CO",creditScore:"A",isActive:true},
    {id:"C031",name:"Nova Holdings",segment:"SMB",industry:"Automotive",city:"Dallas",region:"South",state:"TX",creditScore:"A",isActive:true},
    {id:"C032",name:"Core Industries",segment:"SMB",industry:"Public Sector",city:"Des Moines",region:"North",state:"IA",creditScore:"C",isActive:true},
    {id:"C033",name:"Bright Engineering",segment:"Startup",industry:"Energy",city:"Dallas",region:"South",state:"TX",creditScore:"B",isActive:true},
    {id:"C034",name:"Ultra Partners",segment:"Enterprise",industry:"Aerospace",city:"Phoenix",region:"West",state:"AZ",creditScore:"C",isActive:true},
    {id:"C035",name:"Blue Dynamics",segment:"Government",industry:"Logistics",city:"Hartford",region:"East",state:"CT",creditScore:"A",isActive:true},
    {id:"C036",name:"Red Networks",segment:"Enterprise",industry:"Construction",city:"Milwaukee",region:"North",state:"WI",creditScore:"B",isActive:true},
    {id:"C037",name:"Delta Engineering",segment:"Startup",industry:"Media",city:"Chicago",region:"North",state:"IL",creditScore:"A",isActive:true},
    {id:"C038",name:"Apex Inc",segment:"Startup",industry:"Engineering",city:"Nashville",region:"South",state:"TN",creditScore:"C",isActive:true},
    {id:"C039",name:"Clear Labs",segment:"Enterprise",industry:"Pharmaceuticals",city:"New York",region:"East",state:"NY",creditScore:"A",isActive:true},
    {id:"C040",name:"KeyStone Corp",segment:"Government",industry:"Financial Services",city:"Boston",region:"East",state:"MA",creditScore:"A",isActive:false},
    {id:"C041",name:"Urban Group",segment:"SMB",industry:"Technology",city:"Miami",region:"South",state:"FL",creditScore:"B",isActive:true},
    {id:"C042",name:"Quantum Consulting",segment:"Enterprise",industry:"Manufacturing",city:"Chicago",region:"North",state:"IL",creditScore:"A",isActive:true},
    {id:"C043",name:"Wave Inc",segment:"Government",industry:"Defense",city:"Boston",region:"East",state:"MA",creditScore:"A",isActive:true},
    {id:"C044",name:"Granite Systems",segment:"SMB",industry:"Construction",city:"Atlanta",region:"South",state:"GA",creditScore:"C",isActive:true},
    {id:"C045",name:"Valor Digital",segment:"Government",industry:"Logistics",city:"Dallas",region:"South",state:"TX",creditScore:"A",isActive:true},
    {id:"C046",name:"NexGen Technologies",segment:"Enterprise",industry:"Aerospace",city:"Portland",region:"West",state:"OR",creditScore:"A",isActive:true},
    {id:"C047",name:"Innovate Industries",segment:"SMB",industry:"Pharmaceuticals",city:"Minneapolis",region:"North",state:"MN",creditScore:"C",isActive:true},
    {id:"C048",name:"Metro Ventures",segment:"Startup",industry:"Automotive",city:"Arlington",region:"South",state:"VA",creditScore:"B",isActive:true},
    {id:"C049",name:"Harbor Holdings",segment:"Enterprise",industry:"Education",city:"Charleston",region:"South",state:"SC",creditScore:"A",isActive:true},
    {id:"C050",name:"Eco Engineering",segment:"Startup",industry:"Engineering",city:"Minneapolis",region:"North",state:"MN",creditScore:"B",isActive:true},
    {id:"C051",name:"True Services",segment:"SMB",industry:"Media",city:"Charlotte",region:"South",state:"NC",creditScore:"A",isActive:true},
    {id:"C052",name:"Acme Global",segment:"SMB",industry:"Professional Services",city:"Wilmington",region:"East",state:"DE",creditScore:"B",isActive:true},
    {id:"C053",name:"Xcel Analytics",segment:"Government",industry:"Defense",city:"Chicago",region:"North",state:"IL",creditScore:"A",isActive:true},
    {id:"C054",name:"Jupiter Corp",segment:"SMB",industry:"Engineering",city:"Pittsburgh",region:"East",state:"PA",creditScore:"B",isActive:true},
    {id:"C055",name:"Omni Networks",segment:"Startup",industry:"Agriculture",city:"Miami",region:"South",state:"FL",creditScore:"B",isActive:true},
    {id:"C056",name:"Landmark Group",segment:"Enterprise",industry:"Construction",city:"Seattle",region:"West",state:"WA",creditScore:"A",isActive:true},
    {id:"C057",name:"Zenith Enterprises",segment:"SMB",industry:"Hospitality",city:"Boise",region:"West",state:"ID",creditScore:"C",isActive:true},
    {id:"C058",name:"Yellow Digital",segment:"Startup",industry:"Public Sector",city:"Baltimore",region:"East",state:"MD",creditScore:"A",isActive:false},
    {id:"C059",name:"Bright Holdings",segment:"SMB",industry:"Financial Services",city:"San Francisco",region:"West",state:"CA",creditScore:"B",isActive:true},
    {id:"C060",name:"Apex Analytics",segment:"Enterprise",industry:"Technology",city:"Denver",region:"West",state:"CO",creditScore:"A",isActive:true},
];

const PRODUCTS = [
    {id:"P001",name:"Enterprise Server X500",category:"Hardware",subCategory:"Servers",unitCost:4200,listPrice:6800,marginPct:38.2},
    {id:"P002",name:"CloudSync Pro License",category:"Software",subCategory:"Cloud Services",unitCost:50,listPrice:299,marginPct:83.3},
    {id:"P003",name:"Network Switch 48-Port",category:"Hardware",subCategory:"Networking",unitCost:680,listPrice:1150,marginPct:40.9},
    {id:"P004",name:"DataGuard Backup Suite",category:"Software",subCategory:"Security",unitCost:120,listPrice:499,marginPct:76.0},
    {id:"P005",name:"Smart Display Panel 65\"",category:"Hardware",subCategory:"Displays",unitCost:1800,listPrice:3200,marginPct:43.8},
    {id:"P006",name:"Managed IT Support",category:"Services",subCategory:"Support",unitCost:2400,listPrice:5500,marginPct:56.4},
    {id:"P007",name:"Wireless Access Point",category:"Hardware",subCategory:"Networking",unitCost:220,listPrice:450,marginPct:51.1},
    {id:"P008",name:"ERP Integration Module",category:"Software",subCategory:"Enterprise",unitCost:800,listPrice:2200,marginPct:63.6},
    {id:"P009",name:"Cybersecurity Audit",category:"Services",subCategory:"Security",unitCost:1500,listPrice:3800,marginPct:60.5},
    {id:"P010",name:"Laptop Workstation Z14",category:"Hardware",subCategory:"Computing",unitCost:1100,listPrice:1850,marginPct:40.5},
    {id:"P011",name:"Office Productivity Suite",category:"Software",subCategory:"Productivity",unitCost:30,listPrice:149,marginPct:79.9},
    {id:"P012",name:"Data Analytics Platform",category:"Software",subCategory:"Analytics",unitCost:400,listPrice:1200,marginPct:66.7},
    {id:"P013",name:"Cloud Migration Service",category:"Services",subCategory:"Cloud Services",unitCost:3200,listPrice:7500,marginPct:57.3},
    {id:"P014",name:"UPS Battery System 3kVA",category:"Hardware",subCategory:"Power",unitCost:950,listPrice:1650,marginPct:42.4},
    {id:"P015",name:"Project Management Tool",category:"Software",subCategory:"Productivity",unitCost:60,listPrice:199,marginPct:69.8},
    {id:"P016",name:"Staff Training Program",category:"Services",subCategory:"Training",unitCost:800,listPrice:2000,marginPct:60.0},
    {id:"P017",name:"IoT Sensor Kit",category:"Hardware",subCategory:"IoT",unitCost:1200,listPrice:2400,marginPct:50.0},
    {id:"P018",name:"AI/ML Dev Platform",category:"Software",subCategory:"Analytics",unitCost:600,listPrice:1800,marginPct:66.7},
    {id:"P019",name:"Network Assessment",category:"Services",subCategory:"Networking",unitCost:500,listPrice:1200,marginPct:58.3},
    {id:"P020",name:"Storage Array 50TB",category:"Hardware",subCategory:"Storage",unitCost:3500,listPrice:5800,marginPct:39.7},
    {id:"P021",name:"Endpoint Protection",category:"Software",subCategory:"Security",unitCost:80,listPrice:349,marginPct:77.1},
    {id:"P022",name:"Video Conferencing Sys",category:"Hardware",subCategory:"Communication",unitCost:1500,listPrice:2800,marginPct:46.4},
    {id:"P023",name:"DevOps Pipeline Tool",category:"Software",subCategory:"Development",unitCost:200,listPrice:699,marginPct:71.4},
    {id:"P024",name:"Disaster Recovery Svc",category:"Services",subCategory:"Security",unitCost:2800,listPrice:6200,marginPct:54.8},
    {id:"P025",name:"Edge Computing Module",category:"Hardware",subCategory:"IoT",unitCost:900,listPrice:1800,marginPct:50.0},
    {id:"P026",name:"CRM Platform License",category:"Software",subCategory:"Enterprise",unitCost:150,listPrice:599,marginPct:74.9},
    {id:"P027",name:"Penetration Testing",category:"Services",subCategory:"Security",unitCost:2000,listPrice:4500,marginPct:55.6},
    {id:"P028",name:"Industrial Router",category:"Hardware",subCategory:"Networking",unitCost:400,listPrice:850,marginPct:52.9},
    {id:"P029",name:"BI Suite",category:"Software",subCategory:"Analytics",unitCost:500,listPrice:1500,marginPct:66.7},
    {id:"P030",name:"IT Strategy Consulting",category:"Services",subCategory:"Consulting",unitCost:3500,listPrice:8000,marginPct:56.3},
];

const REGIONS = [
    {id:"R001",name:"North",manager:"Jennifer Walsh",target:3200000},
    {id:"R002",name:"South",manager:"Marcus Thompson",target:4500000},
    {id:"R003",name:"East",manager:"Priya Sharma",target:3800000},
    {id:"R004",name:"West",manager:"James Martinez",target:4000000},
];


function seededRandom(seed) {
    let s = seed;
    return function() {
        s = (s * 16807 + 0) % 2147483647;
        return s / 2147483647;
    };
}

const rng = seededRandom(42);

function generateSalesData() {
    const sales = [];
    const statuses = ["Completed","Completed","Completed","Completed","Completed","Completed","Completed","Completed","Shipped","Cancelled","Returned"];
    const channels = ["Direct Sales","Direct Sales","Online","Online","Partner","Marketplace"];
    const payments = ["Wire Transfer","Credit Card","Check","Purchase Order","ACH"];
    
    const regionMap = {};
    CUSTOMERS.forEach(c => { regionMap[c.id] = REGIONS.find(r => r.name === c.region)?.id || "R001"; });
    
    for (let i = 0; i < 1500; i++) {
        const cust = CUSTOMERS[Math.floor(rng() * CUSTOMERS.length)];
        const prod = PRODUCTS[Math.floor(rng() * PRODUCTS.length)];
        

        const yearIdx = rng();
        let year, month;
        if (yearIdx < 0.35) { year = 2023; }
        else if (yearIdx < 0.72) { year = 2024; }
        else { year = 2025; }
        month = Math.floor(rng() * (year === 2025 ? 3 : 12)) + 1;
        const day = Math.floor(rng() * 28) + 1;
        const dateKey = year * 10000 + month * 100 + day;
        

        let qty;
        if (prod.listPrice > 5000) qty = Math.floor(rng() * 4) + 1;
        else if (prod.listPrice > 1000) qty = Math.floor(rng() * 8) + 1;
        else if (prod.listPrice > 200) qty = Math.floor(rng() * 20) + 2;
        else qty = Math.floor(rng() * 80) + 5;
        
        const discounts = cust.segment === "Enterprise" ? [0,0,0.05,0.08,0.10,0.12] :
                          cust.segment === "Government" ? [0,0.05,0.05,0.10] : [0,0,0,0.05,0.10];
        const discount = discounts[Math.floor(rng() * discounts.length)];
        
        const gross = qty * prod.listPrice;
        const total = Math.round(gross * (1 - discount) * 100) / 100;
        const cogs = Math.round(qty * prod.unitCost * 100) / 100;
        const profit = Math.round((total - cogs) * 100) / 100;
        
        sales.push({
            orderId: `ORD-${10001 + i}`,
            dateKey, year, month, day,
            customerId: cust.id,
            customerName: cust.name,
            segment: cust.segment,
            region: cust.region,
            productId: prod.id,
            productName: prod.name,
            category: prod.category,
            regionId: regionMap[cust.id],
            quantity: qty,
            unitPrice: prod.listPrice,
            discount, total, cogs, profit,
            status: statuses[Math.floor(rng() * statuses.length)],
            channel: channels[Math.floor(rng() * channels.length)],
            payment: payments[Math.floor(rng() * payments.length)]
        });
    }
    return sales;
}


function generateProcessData(sales) {
    const processes = [];
    const delayReasons = ["Staff Shortage","Carrier Delay","System Downtime","Inventory Mismatch",
        "Equipment Malfunction","Complex Requirements","Approval Pending","Weather Delay",
        "Integration Issues","Vendor Delay","Quality Issue Found"];
    const teams = ["Alpha","Bravo","Charlie","Delta","Echo","Foxtrot","Golf","Hotel"];
    
    const stepsMap = {
        Hardware: [{dept:"Order Processing",step:"Verification",planned:2},{dept:"Warehouse",step:"Pick & Pack",planned:5},{dept:"Quality Control",step:"Inspection",planned:2},{dept:"Shipping",step:"Dispatch",planned:3}],
        Software: [{dept:"Order Processing",step:"Verification",planned:1},{dept:"Fulfillment",step:"Provisioning",planned:2}],
        Services: [{dept:"Order Processing",step:"Verification",planned:2},{dept:"Service Delivery",step:"Setup",planned:8},{dept:"Service Delivery",step:"Execution",planned:16}],
    };
    
    const eligible = sales.filter(s => s.status === "Completed" || s.status === "Shipped");
    const sampled = eligible.filter(() => rng() < 0.6);
    
    let procNum = 1;
    sampled.forEach(sale => {
        const steps = stepsMap[sale.category] || stepsMap.Hardware;
        steps.forEach(s => {
            const isDelayed = rng() < 0.35;
            const factor = isDelayed ? 1.1 + rng() * 0.9 : 0.8 + rng() * 0.25;
            const actual = Math.max(0.5, Math.round(s.planned * factor * 10) / 10);
            processes.push({
                processId: `PRC-${String(procNum++).padStart(4,'0')}`,
                orderId: sale.orderId,
                dateKey: sale.dateKey,
                year: sale.year,
                month: sale.month,
                department: s.dept,
                processStep: s.step,
                planned: s.planned,
                actual,
                delay: Math.max(0, Math.round((actual - s.planned) * 10) / 10),
                isDelayed: actual > s.planned,
                delayReason: isDelayed ? delayReasons[Math.floor(rng() * delayReasons.length)] : "No Delay",
                efficiency: s.planned > 0 ? Math.round(s.planned / actual * 1000) / 10 : 100,
                team: `Team ${teams[Math.floor(rng() * teams.length)]}`,
            });
        });
    });
    return processes;
}


const SALES = generateSalesData();
const PROCESSES = generateProcessData(SALES);

console.log(`Data loaded: ${SALES.length} sales, ${PROCESSES.length} processes, ${CUSTOMERS.length} customers, ${PRODUCTS.length} products`);
