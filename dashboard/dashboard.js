Chart.defaults.color = '#6B7280';
Chart.defaults.borderColor = '#F3F4F6';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 11;
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.pointStyle = 'circle';
Chart.defaults.plugins.legend.labels.padding = 14;
Chart.defaults.plugins.tooltip.backgroundColor = '#111827';
Chart.defaults.plugins.tooltip.titleFont = { size: 12, weight: '600' };
Chart.defaults.plugins.tooltip.bodyFont = { size: 11 };
Chart.defaults.plugins.tooltip.padding = 10;
Chart.defaults.plugins.tooltip.cornerRadius = 6;
Chart.defaults.plugins.tooltip.borderWidth = 0;
Chart.defaults.elements.bar.borderRadius = 4;
Chart.defaults.elements.line.tension = 0.3;

const C = { blue: '#2563EB', green: '#059669', red: '#DC2626', amber: '#D97706', violet: '#7C3AED', slate: '#64748B', sky: '#0EA5E9', gray: '#9CA3AF' };
const PALETTE = ['#2563EB','#7C3AED','#059669','#D97706','#0EA5E9','#DC2626','#64748B','#EC4899'];

function alpha(hex, a) {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${a})`;
}

function fmt$(n) {
    if (n >= 1e6) return '$' + (n/1e6).toFixed(1) + 'M';
    if (n >= 1e3) return '$' + (n/1e3).toFixed(1) + 'K';
    return '$' + n.toFixed(0);
}

function fmtN(n) { return n.toLocaleString('en-US'); }

let filteredSales = [...SALES];
let filteredProcesses = [...PROCESSES];
const charts = {};

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const page = item.dataset.page;
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(`page-${page}`).classList.add('active');
        const titles = { overview: 'Executive Overview', customers: 'Customer Analytics', operations: 'Process Performance', products: 'Product Intelligence' };
        document.getElementById('pageTitle').textContent = titles[page];
        document.getElementById('pageSubtitle').textContent = '';
        renderPage(page);
    });
});

document.getElementById('filterYear').addEventListener('change', applyFilters);
document.getElementById('filterRegion').addEventListener('change', applyFilters);
document.getElementById('filterCategory').addEventListener('change', applyFilters);

function applyFilters() {
    const year = document.getElementById('filterYear').value;
    const region = document.getElementById('filterRegion').value;
    const category = document.getElementById('filterCategory').value;

    filteredSales = SALES.filter(s => {
        if (year !== 'all' && s.year !== parseInt(year)) return false;
        if (region !== 'all' && s.region !== region) return false;
        if (category !== 'all' && s.category !== category) return false;
        return true;
    });

    filteredProcesses = PROCESSES.filter(p => {
        if (year !== 'all' && p.year !== parseInt(year)) return false;
        return true;
    });

    updateKPIs();
    const activePage = document.querySelector('.nav-item.active')?.dataset.page || 'overview';
    renderPage(activePage);
}

function updateKPIs() {
    const completed = filteredSales.filter(s => s.status === 'Completed');
    const totalRev = completed.reduce((s, o) => s + o.total, 0);
    const totalProfit = completed.reduce((s, o) => s + o.profit, 0);
    const profitMargin = totalRev > 0 ? totalProfit / totalRev : 0;
    const customers = new Set(filteredSales.map(s => s.customerId)).size;
    const totalOrders = filteredSales.length;
    const completedOrders = completed.length;
    const completionRate = totalOrders > 0 ? completedOrders / totalOrders : 0;

    const delayed = filteredProcesses.filter(p => p.isDelayed);
    const delayRate = filteredProcesses.length > 0 ? delayed.length / filteredProcesses.length : 0;
    const avgCycle = filteredProcesses.length > 0 ? filteredProcesses.reduce((s,p) => s + p.actual, 0) / filteredProcesses.length : 0;
    const avgEff = filteredProcesses.length > 0 ? filteredProcesses.reduce((s,p) => s + p.efficiency, 0) / filteredProcesses.length : 0;
    const onTimeRate = 1 - delayRate;

    const curYear = parseInt(document.getElementById('filterYear').value) || 2024;
    const prevSales = SALES.filter(s => s.year === curYear - 1 && s.status === 'Completed');
    const prevRev = prevSales.reduce((s, o) => s + o.total, 0);
    const revGrowth = prevRev > 0 ? (totalRev - prevRev) / prevRev : 0;

    document.getElementById('kpiRevenue').textContent = fmt$(totalRev);
    document.getElementById('kpiProfitMargin').textContent = (profitMargin * 100).toFixed(1) + '%';
    document.getElementById('kpiCustomers').textContent = customers;
    document.getElementById('kpiOrders').textContent = fmtN(totalOrders);
    document.getElementById('kpiCycleTime').textContent = avgCycle.toFixed(1) + ' hrs';
    document.getElementById('kpiEfficiency').textContent = avgEff.toFixed(1) + '%';

    setTrend('kpiRevenueTrend', revGrowth, 'vs prior year');
    setTrend('kpiProfitTrend', profitMargin - 0.3, 'margin');
    setTrend('kpiCustomersTrend', 0, `${customers} unique`, true);
    setTrend('kpiOrdersTrend', completionRate - 0.85, `${(completionRate*100).toFixed(0)}% completed`);
    setTrend('kpiCycleTrend', -delayRate, `${(delayRate*100).toFixed(0)}% delayed`);
    setTrend('kpiEffTrend', onTimeRate - 0.7, `${(onTimeRate*100).toFixed(0)}% on-time`);

    renderSparklines();
}

function setTrend(id, val, label, neutral = false) {
    const el = document.getElementById(id);
    if (!el) return;
    if (neutral) {
        el.className = 'kpi-trend neutral';
        el.innerHTML = `<span class="trend-label">${label}</span>`;
        return;
    }
    const cls = val >= 0 ? 'up' : 'down';
    const arrow = val >= 0 ? '↑' : '↓';
    el.className = `kpi-trend ${cls}`;
    el.innerHTML = `<span>${arrow} ${Math.abs(val * 100).toFixed(1)}%</span><span class="trend-label">${label}</span>`;
}

function renderSparklines() {
    const months = {};
    filteredSales.filter(s => s.status === 'Completed').forEach(s => {
        const k = `${s.year}-${String(s.month).padStart(2,'0')}`;
        if (!months[k]) months[k] = { rev: 0, profit: 0, orders: 0, cust: new Set() };
        months[k].rev += s.total; months[k].profit += s.profit;
        months[k].orders++; months[k].cust.add(s.customerId);
    });
    const sorted = Object.keys(months).sort();
    spark('sparkRevenue', sorted.map(k => months[k].rev), C.blue);
    spark('sparkProfit', sorted.map(k => months[k].rev > 0 ? months[k].profit/months[k].rev*100 : 0), C.green);
    spark('sparkCustomers', sorted.map(k => months[k].cust.size), C.violet);
    spark('sparkOrders', sorted.map(k => months[k].orders), C.blue);

    const pm = {};
    filteredProcesses.forEach(p => {
        const k = `${p.year}-${String(p.month).padStart(2,'0')}`;
        if (!pm[k]) pm[k] = { t: 0, c: 0, e: 0 };
        pm[k].t += p.actual; pm[k].c++; pm[k].e += p.efficiency;
    });
    const ps = Object.keys(pm).sort();
    spark('sparkCycle', ps.map(k => pm[k].t / pm[k].c), C.amber);
    spark('sparkEfficiency', ps.map(k => pm[k].e / pm[k].c), C.green);
}

function spark(id, data, color) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    if (charts[id]) charts[id].destroy();
    charts[id] = new Chart(canvas, {
        type: 'line',
        data: { labels: data.map((_,i) => i), datasets: [{ data, borderColor: color, borderWidth: 1.5, fill: true, backgroundColor: alpha(color, 0.06), pointRadius: 0, tension: 0.4 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false } } }
    });
}

function renderPage(page) {
    if (page === 'overview') renderOverview();
    else if (page === 'customers') renderCustomers();
    else if (page === 'operations') renderOperations();
    else if (page === 'products') renderProducts();
}

function renderOverview() {
    const completed = filteredSales.filter(s => s.status === 'Completed');
    const months = {};
    completed.forEach(s => {
        const k = `${s.year}-${String(s.month).padStart(2,'0')}`;
        if (!months[k]) months[k] = { rev: 0, profit: 0 };
        months[k].rev += s.total; months[k].profit += s.profit;
    });
    const sorted = Object.keys(months).sort();
    const mo = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const labels = sorted.map(k => { const [y,m] = k.split('-'); return `${mo[parseInt(m)]} '${y.slice(2)}`; });

    destroyAndCreate('revenueTrend', 'chartRevenueTrend', {
        type: 'bar',
        data: { labels, datasets: [
            { label: 'Revenue', data: sorted.map(k => months[k].rev), backgroundColor: alpha(C.blue, 0.75), borderRadius: 4, order: 2 },
            { label: 'Profit', data: sorted.map(k => months[k].profit), type: 'line', borderColor: C.green, borderWidth: 2, fill: false, pointRadius: 2, pointBackgroundColor: C.green, order: 1 }
        ]},
        options: { responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
            plugins: { legend: { position: 'top', align: 'end' }, tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${fmt$(ctx.parsed.y)}` } } },
            scales: { x: { grid: { display: false } }, y: { beginAtZero: true, ticks: { callback: v => fmt$(v) }, grid: { color: '#F3F4F6' } } }
        }
    });

    const segments = {};
    completed.forEach(s => { segments[s.segment] = (segments[s.segment]||0) + s.total; });
    const segSorted = Object.entries(segments).sort((a,b) => b[1]-a[1]);
    const segC = { Enterprise: C.blue, SMB: C.violet, Government: C.green, Startup: C.amber };

    destroyAndCreate('segment', 'chartSegment', {
        type: 'bar',
        data: { labels: segSorted.map(s => s[0]), datasets: [{ data: segSorted.map(s => s[1]), backgroundColor: segSorted.map(s => segC[s[0]] || C.slate), borderRadius: 4 }] },
        options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => fmt$(ctx.parsed.x) } } },
            scales: { x: { ticks: { callback: v => fmt$(v) }, grid: { color: '#F3F4F6' } }, y: { grid: { display: false } } }
        }
    });

    const regions = {};
    completed.forEach(s => { regions[s.region] = (regions[s.region]||0) + s.total; });
    const rl = Object.keys(regions);
    const regC = { North: C.blue, South: C.amber, East: C.violet, West: C.green };

    destroyAndCreate('region', 'chartRegion', {
        type: 'doughnut',
        data: { labels: rl, datasets: [{ data: rl.map(l => regions[l]), backgroundColor: rl.map(l => regC[l] || C.slate), borderColor: '#fff', borderWidth: 2 }] },
        options: { responsive: true, maintainAspectRatio: false, cutout: '60%',
            plugins: { legend: { position: 'right' }, tooltip: { callbacks: { label: ctx => `${ctx.label}: ${fmt$(ctx.parsed)}` } } }
        }
    });

    const custRev = {};
    completed.forEach(s => {
        if (!custRev[s.customerId]) custRev[s.customerId] = { name: s.customerName, segment: s.segment, revenue: 0, orders: 0, profit: 0 };
        custRev[s.customerId].revenue += s.total; custRev[s.customerId].profit += s.profit; custRev[s.customerId].orders++;
    });
    const topCust = Object.values(custRev).sort((a,b) => b.revenue - a.revenue).slice(0, 10);
    const maxRev = topCust[0]?.revenue || 1;

    document.querySelector('#topCustomersTable tbody').innerHTML = topCust.map((c, i) => {
        const m = c.revenue > 0 ? c.profit / c.revenue : 0;
        const mc = m >= 0.4 ? 'high' : m >= 0.25 ? 'medium' : 'low';
        const w = (c.revenue / maxRev * 100).toFixed(0);
        return `<tr>
            <td style="color:var(--text-muted)">${i+1}</td>
            <td style="color:var(--text);font-weight:500">${c.name}</td>
            <td><span class="segment-badge ${c.segment.toLowerCase()}">${c.segment}</span></td>
            <td>${fmt$(c.revenue)}</td>
            <td>${c.orders}</td>
            <td><span class="margin-value ${mc}">${(m*100).toFixed(1)}%</span></td>
            <td><div class="revenue-bar-container"><div class="revenue-bar" style="width:${w}%"></div></div></td>
        </tr>`;
    }).join('');
}

function renderCustomers() {
    const completed = filteredSales.filter(s => s.status === 'Completed');
    const segCounts = {};
    CUSTOMERS.forEach(c => { segCounts[c.segment] = (segCounts[c.segment]||0) + 1; });
    const segL = Object.keys(segCounts);
    const segC = { Enterprise: C.blue, SMB: C.violet, Government: C.green, Startup: C.amber };

    destroyAndCreate('custSegment', 'chartCustSegment', {
        type: 'doughnut',
        data: { labels: segL, datasets: [{ data: segL.map(l => segCounts[l]), backgroundColor: segL.map(l => segC[l] || C.slate), borderColor: '#fff', borderWidth: 2 }] },
        options: { responsive: true, maintainAspectRatio: false, cutout: '55%', plugins: { legend: { position: 'right' } } }
    });

    const indRev = {};
    completed.forEach(s => { const c = CUSTOMERS.find(c => c.id === s.customerId); if (c) indRev[c.industry] = (indRev[c.industry]||0) + s.total; });
    const indS = Object.entries(indRev).sort((a,b) => b[1]-a[1]).slice(0, 10);

    destroyAndCreate('industry', 'chartIndustry', {
        type: 'bar',
        data: { labels: indS.map(i => i[0]), datasets: [{ data: indS.map(i => i[1]), backgroundColor: alpha(C.blue, 0.7), borderRadius: 4 }] },
        options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => fmt$(ctx.parsed.x) } } },
            scales: { x: { ticks: { callback: v => fmt$(v) }, grid: { color: '#F3F4F6' } }, y: { grid: { display: false } } }
        }
    });

    const cData = {};
    completed.forEach(s => {
        if (!cData[s.customerId]) cData[s.customerId] = { name: s.customerName, seg: s.segment, rev: 0, orders: 0, profit: 0 };
        cData[s.customerId].rev += s.total; cData[s.customerId].orders++; cData[s.customerId].profit += s.profit;
    });
    const scatter = Object.values(cData).map(c => ({ x: c.orders, y: c.rev > 0 ? c.profit/c.rev*100 : 0, r: Math.max(3, Math.sqrt(c.rev/1500)), name: c.name, seg: c.seg, rev: c.rev }));
    const bySegment = {};
    scatter.forEach(d => { if (!bySegment[d.seg]) bySegment[d.seg] = []; bySegment[d.seg].push(d); });

    destroyAndCreate('custRevenue', 'chartCustRevenue', {
        type: 'bubble',
        data: { datasets: Object.entries(bySegment).map(([seg, data], i) => ({ label: seg, data, backgroundColor: alpha(PALETTE[i], 0.4), borderColor: PALETTE[i], borderWidth: 1 })) },
        options: { responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: ctx => `${ctx.raw.name}: ${fmt$(ctx.raw.rev)} | ${ctx.raw.y.toFixed(1)}% margin` } } },
            scales: { x: { title: { display: true, text: 'Orders', color: '#9CA3AF' }, grid: { color: '#F3F4F6' } }, y: { title: { display: true, text: 'Profit Margin %', color: '#9CA3AF' }, grid: { color: '#F3F4F6' } } }
        }
    });

    const creditRev = {};
    completed.forEach(s => { const c = CUSTOMERS.find(c => c.id === s.customerId); if (c) creditRev[c.creditScore] = (creditRev[c.creditScore]||0) + s.total; });
    const cLabels = ['A','B','C'];

    destroyAndCreate('creditScore', 'chartCreditScore', {
        type: 'bar',
        data: { labels: cLabels.map(l => `Score ${l}`), datasets: [{ data: cLabels.map(l => creditRev[l]||0), backgroundColor: [C.green, C.amber, C.red], borderRadius: 4 }] },
        options: { responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => fmt$(ctx.parsed.y) } } },
            scales: { x: { grid: { display: false } }, y: { ticks: { callback: v => fmt$(v) }, grid: { color: '#F3F4F6' } } }
        }
    });
}

function renderOperations() {
    const deptData = {};
    filteredProcesses.forEach(p => {
        if (!deptData[p.department]) deptData[p.department] = { planned: 0, actual: 0, count: 0 };
        deptData[p.department].planned += p.planned; deptData[p.department].actual += p.actual; deptData[p.department].count++;
    });
    const deptS = Object.entries(deptData).sort((a,b) => (b[1].actual/b[1].count) - (a[1].actual/a[1].count));

    destroyAndCreate('deptCycle', 'chartDeptCycle', {
        type: 'bar',
        data: { labels: deptS.map(d => d[0]), datasets: [
            { label: 'Actual', data: deptS.map(d => d[1].actual/d[1].count), backgroundColor: C.blue, borderRadius: 4 },
            { label: 'Planned', data: deptS.map(d => d[1].planned/d[1].count), backgroundColor: '#E5E7EB', borderRadius: 4 }
        ]},
        options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.parsed.x.toFixed(1)} hrs` } } },
            scales: { x: { title: { display: true, text: 'Avg Duration (hrs)', color: '#9CA3AF' }, grid: { color: '#F3F4F6' } }, y: { grid: { display: false } } }
        }
    });

    const reasons = {};
    filteredProcesses.filter(p => p.delayReason !== 'No Delay').forEach(p => { reasons[p.delayReason] = (reasons[p.delayReason]||0) + 1; });
    const rr = Object.entries(reasons).sort((a,b) => b[1]-a[1]).slice(0, 8);

    destroyAndCreate('delayReasons', 'chartDelayReasons', {
        type: 'doughnut',
        data: { labels: rr.map(r => r[0]), datasets: [{ data: rr.map(r => r[1]), backgroundColor: PALETTE.slice(0, rr.length), borderColor: '#fff', borderWidth: 2 }] },
        options: { responsive: true, maintainAspectRatio: false, cutout: '50%', plugins: { legend: { position: 'right', labels: { font: { size: 10 } } } } }
    });

    const pm = {};
    filteredProcesses.forEach(p => {
        const k = `${p.year}-${String(p.month).padStart(2,'0')}`;
        if (!pm[k]) pm[k] = { planned: 0, actual: 0, count: 0 };
        pm[k].planned += p.planned; pm[k].actual += p.actual; pm[k].count++;
    });
    const pmS = Object.keys(pm).sort();
    const mo = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    destroyAndCreate('plannedVsActual', 'chartPlannedVsActual', {
        type: 'line',
        data: { labels: pmS.map(k => { const [y,m] = k.split('-'); return `${mo[parseInt(m)]} '${y.slice(2)}`; }), datasets: [
            { label: 'Actual', data: pmS.map(k => pm[k].actual/pm[k].count), borderColor: C.blue, borderWidth: 2, pointRadius: 2, fill: false },
            { label: 'Planned', data: pmS.map(k => pm[k].planned/pm[k].count), borderColor: '#D1D5DB', borderDash: [4,4], borderWidth: 2, pointRadius: 0, fill: false }
        ]},
        options: { responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'top' } },
            scales: { x: { grid: { display: false } }, y: { title: { display: true, text: 'Avg Hrs', color: '#9CA3AF' }, grid: { color: '#F3F4F6' } } }
        }
    });

    const stepData = {};
    filteredProcesses.forEach(p => {
        if (!stepData[p.processStep]) stepData[p.processStep] = { total: 0, delayed: 0 };
        stepData[p.processStep].total++; if (p.isDelayed) stepData[p.processStep].delayed++;
    });
    const stepS = Object.entries(stepData).sort((a,b) => (b[1].delayed/b[1].total) - (a[1].delayed/a[1].total));

    destroyAndCreate('processStep', 'chartProcessStep', {
        type: 'bar',
        data: { labels: stepS.map(s => s[0]), datasets: [{ data: stepS.map(s => (s[1].delayed/s[1].total*100)),
            backgroundColor: stepS.map(s => { const r = s[1].delayed/s[1].total; return r > 0.4 ? C.red : r > 0.25 ? C.amber : C.green; }),
            borderRadius: 4 }] },
        options: { responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => `Delay: ${ctx.parsed.y.toFixed(1)}%` } } },
            scales: { x: { grid: { display: false } }, y: { title: { display: true, text: 'Delay %', color: '#9CA3AF' }, grid: { color: '#F3F4F6' } } }
        }
    });
}

function renderProducts() {
    const completed = filteredSales.filter(s => s.status === 'Completed');
    const catRev = {};
    completed.forEach(s => { catRev[s.category] = (catRev[s.category]||0) + s.total; });
    const catL = Object.keys(catRev);
    const catC = { Hardware: C.blue, Software: C.violet, Services: C.green };

    destroyAndCreate('prodCategory', 'chartProdCategory', {
        type: 'doughnut',
        data: { labels: catL, datasets: [{ data: catL.map(l => catRev[l]), backgroundColor: catL.map(l => catC[l] || C.slate), borderColor: '#fff', borderWidth: 2 }] },
        options: { responsive: true, maintainAspectRatio: false, cutout: '55%', plugins: { legend: { position: 'right' } } }
    });

    const prodRev = {};
    completed.forEach(s => {
        if (!prodRev[s.productId]) prodRev[s.productId] = { name: s.productName, cat: s.category, rev: 0 };
        prodRev[s.productId].rev += s.total;
    });
    const prodS = Object.values(prodRev).sort((a,b) => b.rev - a.rev).slice(0, 10);

    destroyAndCreate('topProducts', 'chartTopProducts', {
        type: 'bar',
        data: { labels: prodS.map(p => p.name.length > 22 ? p.name.slice(0,22)+'...' : p.name), datasets: [{ data: prodS.map(p => p.rev), backgroundColor: prodS.map(p => catC[p.cat] || C.slate), borderRadius: 4 }] },
        options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => fmt$(ctx.parsed.x) } } },
            scales: { x: { ticks: { callback: v => fmt$(v) }, grid: { color: '#F3F4F6' } }, y: { grid: { display: false } } }
        }
    });

    const chanRev = {};
    completed.forEach(s => {
        if (!chanRev[s.channel]) chanRev[s.channel] = { rev: 0, orders: 0 };
        chanRev[s.channel].rev += s.total; chanRev[s.channel].orders++;
    });
    const chanS = Object.entries(chanRev).sort((a,b) => b[1].rev - a[1].rev);

    destroyAndCreate('salesChannel', 'chartSalesChannel', {
        type: 'bar',
        data: { labels: chanS.map(c => c[0]), datasets: [
            { label: 'Revenue', data: chanS.map(c => c[1].rev), backgroundColor: alpha(C.blue, 0.7), borderRadius: 4, yAxisID: 'y' },
            { label: 'Orders', data: chanS.map(c => c[1].orders), type: 'line', borderColor: C.amber, borderWidth: 2, pointRadius: 4, pointBackgroundColor: C.amber, yAxisID: 'y1' }
        ]},
        options: { responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'top' } },
            scales: { x: { grid: { display: false } }, y: { position: 'left', ticks: { callback: v => fmt$(v) }, grid: { color: '#F3F4F6' } }, y1: { position: 'right', grid: { display: false } } }
        }
    });

    const catMargin = {};
    completed.forEach(s => {
        if (!catMargin[s.category]) catMargin[s.category] = { rev: 0, profit: 0 };
        catMargin[s.category].rev += s.total; catMargin[s.category].profit += s.profit;
    });
    const ml = Object.keys(catMargin);

    destroyAndCreate('marginCategory', 'chartMarginCategory', {
        type: 'bar',
        data: { labels: ml, datasets: [{ data: ml.map(l => catMargin[l].rev > 0 ? catMargin[l].profit/catMargin[l].rev*100 : 0), backgroundColor: ml.map(l => catC[l] || C.slate), borderRadius: 4 }] },
        options: { responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => `Margin: ${ctx.parsed.y.toFixed(1)}%` } } },
            scales: { x: { grid: { display: false } }, y: { title: { display: true, text: 'Margin %', color: '#9CA3AF' }, grid: { color: '#F3F4F6' } } }
        }
    });
}

function destroyAndCreate(key, canvasId, config) {
    if (charts[key]) charts[key].destroy();
    charts[key] = new Chart(document.getElementById(canvasId), config);
}

document.querySelectorAll('.chart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.parentElement.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

document.getElementById('lastRefresh').textContent = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
updateKPIs();
renderOverview();
