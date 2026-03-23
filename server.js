const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_PATH = path.join(__dirname, 'data', 'leads.json');

app.use(express.json());
app.use(express.static(__dirname));

function safeReadLeads() {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    return [];
  }
}

function safeWriteLeads(leads) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(leads, null, 2));
}

function detectIntent(message = '') {
  const text = message.toLowerCase();
  if (text.includes('export') || text.includes('usa') || text.includes('uae') || text.includes('uk') || text.includes('shipment')) return 'export';
  if (text.includes('bulk') || text.includes('b2b') || text.includes('wholesale') || text.includes('25kg') || text.includes('50kg')) return 'bulk';
  if (text.includes('price') || text.includes('rate') || text.includes('cost')) return 'price';
  if (text.includes('retail') || text.includes('home') || text.includes('family') || text.includes('snack')) return 'retail';
  return 'general';
}

function pricingByIntent(intent) {
  const retail = 'Retail indicative: 50g Rs 35-60 | 100g Rs 60-110 | 1kg Rs 450-900.';
  const bulk = 'Bulk indicative: 25kg+ best price depends on quantity, grade, and dispatch terms.';
  const exportMsg = 'Export pricing depends on destination, Incoterm (FOB/CIF/EXW), and volume.';
  if (intent === 'bulk') return `${retail} ${bulk}`;
  if (intent === 'export') return `${retail} ${exportMsg}`;
  if (intent === 'price') return `${retail} ${bulk}`;
  return retail;
}

app.post('/api/leads', (req, res) => {
  const { name, phone, requirement, quantity, location, purpose, intent, source } = req.body || {};
  const cleanPhone = String(phone || '').replace(/\D/g, '').slice(-10);
  if (!cleanPhone) {
    return res.status(400).json({ ok: false, error: 'Phone required' });
  }

  const lead = {
    id: `lead_${Date.now()}`,
    name: name || 'Unknown',
    phone: cleanPhone,
    requirement: requirement || '',
    quantity: quantity || '',
    location: location || '',
    purpose: purpose || '',
    intent: intent || '',
    source: source || 'Makhanaginie',
    createdAt: new Date().toISOString()
  };

  const leads = safeReadLeads();
  leads.unshift(lead);
  safeWriteLeads(leads);
  return res.json({ ok: true });
});

app.post('/api/chat', (req, res) => {
  const { message } = req.body || {};
  const intent = detectIntent(message || '');
  const reply = `Thanks! ${pricingByIntent(intent)} We supply from Bihar (Mithila origin) with direct farmer sourcing.`;
  return res.json({ ok: true, intent, reply });
});

app.get('/admin/leads', (req, res) => {
  const leads = safeReadLeads();
  const rows = leads.map(l => `
    <tr>
      <td>${l.name}</td>
      <td>${l.phone}</td>
      <td>${l.intent}</td>
      <td>${l.quantity}</td>
      <td>${l.location}</td>
      <td>${l.requirement}</td>
      <td>${l.createdAt}</td>
    </tr>`).join('');

  res.send(`
    <html>
      <head>
        <title>Makhanaginie Leads</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; background: #fff7e8; }
          table { width: 100%; border-collapse: collapse; background: #fff; }
          th, td { padding: 10px; border: 1px solid #e6d6c0; font-size: 13px; }
          th { background: #f5a524; color: #3a2406; text-align: left; }
        </style>
      </head>
      <body>
        <h2>Makhanaginie Leads</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Intent</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Requirement</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Makhanaginie server running on ${PORT}`);
});
