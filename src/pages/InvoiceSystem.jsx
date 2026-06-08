import React, { useState, useEffect, useMemo } from 'react';
import '../styles/invoice.css';

const PREDEFINED_SERVICES = [
  'Web Development',
  'Mobile Solutions',
  'Cloud Services',
  'Digital Marketing',
  'Branding',
  'AI Solutions'
];

const CURR_SYM = {
  INR: '₹', USD: '$', EUR: '€', GBP: '£', AED: 'د.إ', SGD: 'S$', CAD: 'C$', AUD: 'A$'
};

const DEFAULT_SETTINGS = {
  company: 'Nexoraa Studio',
  tagline: 'Smart Solutions for a Digital Future',
  owner: 'Milan Pandavadara',
  desig: 'Founder & CEO',
  phone: '+91 7383303388',
  email: 'nexoraa.works@gmail.com',
  website: 'nexoraa.works',
  gst: '',
  address: 'India | Serving Clients Worldwide',
  prefix: 'INV-',
  currency: 'INR',
  notes: 'Thank you for choosing Nexoraa Studio. Payment due within 15 days. Bank transfer / UPI preferred.'
};

const DEFAULT_INVOICE_DATA = {
  number: '',
  date: '',
  due: '',
  currency: 'INR',
  status: 'Pending',
  clientName: '',
  clientCompany: '',
  clientEmail: '',
  clientPhone: '',
  clientAddress: '',
  clientGst: '',
  gstType: 'exclusive',
  gstRate: 18,
  yourGst: '',
  notes: DEFAULT_SETTINGS.notes
};

export default function InvoiceSystem() {
  const [activePage, setActivePage] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('details');
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  // Core Data State
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [nextInv, setNextInv] = useState(1);
  const [filterStatus, setFilterStatus] = useState('');

  // Editing State
  const [editingInvId, setEditingInvId] = useState(null);
  const [invData, setInvData] = useState({ ...DEFAULT_INVOICE_DATA });
  const [items, setItems] = useState([]);
  
  // Client Modal State
  const [editingClientId, setEditingClientId] = useState('');
  const [clientForm, setClientForm] = useState({
    name: '', company: '', email: '', phone: '', address: '', gst: '', country: 'India'
  });

  // Settings State
  const [settingsForm, setSettingsForm] = useState(DEFAULT_SETTINGS);

  // Initialize
  useEffect(() => {
    const d = new Date().toISOString().substring(0, 10);
    const dt = new Date();
    dt.setDate(dt.getDate() + 15);
    const due = dt.toISOString().substring(0, 10);

    setInvData(prev => ({
      ...prev,
      date: d,
      due: due,
      number: settings.prefix + String(nextInv).padStart(3, '0'),
      yourGst: settings.gst,
      notes: settings.notes
    }));
    
    // Sample Clients
    setClients([
      { id: 'c1', name: 'Rahul Sharma', company: 'TechCorp Pvt. Ltd.', email: 'rahul@techcorp.in', phone: '+91 98765 43210', address: 'Mumbai, Maharashtra', gst: '27AABCT1332L1ZT', country: 'India' },
      { id: 'c2', name: 'Priya Patel', company: 'StartupXYZ', email: 'priya@startup.com', phone: '+91 87654 32109', address: 'Ahmedabad, Gujarat', gst: '24AABCP1234P1ZR', country: 'India' }
    ]);
  }, []);

  // Format Helper
  const fmt = (n, sym = CURR_SYM[invData.currency] || '₹') => {
    return sym + (parseFloat(n) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Calculations
  const calcTotals = () => {
    const sub = items.reduce((s, x) => s + (x.qty * x.price), 0);
    const rate = parseInt(invData.gstRate) || 18;
    const type = invData.gstType;
    let gst = 0, actual_sub = sub;

    if (type === 'exclusive') {
      gst = sub * rate / 100;
    } else if (type === 'inclusive') {
      gst = sub - (sub * 100 / (100 + rate));
      actual_sub = sub - gst;
    }
    
    return { sub: actual_sub, gst, total: actual_sub + gst, rate, type };
  };

  const totals = calcTotals();

  // ----- Actions -----
  const handleNav = (page) => {
    setActivePage(page);
    if (page === 'new') {
      setEditingInvId(null);
      resetNewInvoice();
    }
  };

  const resetNewInvoice = () => {
    const d = new Date().toISOString().substring(0, 10);
    const dt = new Date();
    dt.setDate(dt.getDate() + 15);
    const due = dt.toISOString().substring(0, 10);

    setInvData({
      ...DEFAULT_INVOICE_DATA,
      date: d,
      due: due,
      number: settings.prefix + String(nextInv).padStart(3, '0'),
      yourGst: settings.gst,
      notes: settings.notes,
      currency: settings.currency || 'INR'
    });
    setItems([]);
    setActiveTab('details');
  };

  const autofillClient = (name) => {
    setInvData(prev => ({ ...prev, clientName: name }));
    const c = clients.find(x => x.name === name);
    if (c) {
      setInvData(prev => ({
        ...prev,
        clientCompany: c.company || '',
        clientEmail: c.email || '',
        clientPhone: c.phone || '',
        clientAddress: c.address || '',
        clientGst: c.gst || ''
      }));
    }
  };

  const addItem = () => {
    setItems([...items, { desc: PREDEFINED_SERVICES[0], qty: 1, price: 0 }]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const buildInvoicePayload = () => {
    return {
      id: editingInvId || Date.now(),
      ...invData,
      currSym: CURR_SYM[invData.currency] || '₹',
      subtotal: totals.sub,
      gstAmt: totals.gst,
      total: totals.total,
      items: JSON.parse(JSON.stringify(items))
    };
  };

  const saveInvoice = (isDraft = false) => {
    const d = buildInvoicePayload();
    if (isDraft) d.status = 'Draft';
    
    if (!d.clientName.trim() && !isDraft) { alert('Please enter client name.'); return; }
    if ((!items.length || items.every(x => !x.desc)) && !isDraft) {
      alert('Please add at least one line item.'); return;
    }

    if (editingInvId) {
      setInvoices(invoices.map(inv => inv.id === editingInvId ? d : inv));
    } else {
      setInvoices([...invoices, d]);
      setNextInv(nextInv + 1);
    }
    
    setEditingInvId(null);
    if (!isDraft) alert('Invoice saved successfully!');
    setActivePage('invoices');
  };

  const editInvoice = (id) => {
    const inv = invoices.find(x => x.id === id);
    if (!inv) return;
    setEditingInvId(id);
    setActivePage('new');
    
    setInvData({
      number: inv.number, date: inv.date, due: inv.due, currency: inv.currency,
      status: inv.status, clientName: inv.clientName, clientCompany: inv.clientCompany,
      clientEmail: inv.clientEmail, clientPhone: inv.clientPhone, clientAddress: inv.clientAddress,
      clientGst: inv.clientGst, gstType: inv.gstType, gstRate: inv.gstRate,
      yourGst: inv.yourGst, notes: inv.notes
    });
    setItems(JSON.parse(JSON.stringify(inv.items || [])));
    setActiveTab('details');
  };

  const deleteInvoice = (id) => {
    if (!window.confirm('Delete this invoice?')) return;
    setInvoices(invoices.filter(x => x.id !== id));
  };

  const markPaid = (id) => {
    setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status: 'Paid' } : inv));
  };

  const saveClient = () => {
    if (!clientForm.name.trim()) { alert('Client name is required.'); return; }
    
    const obj = {
      id: editingClientId || String(Date.now()),
      ...clientForm
    };

    if (editingClientId) {
      setClients(clients.map(c => c.id === editingClientId ? obj : c));
    } else {
      setClients([...clients, obj]);
    }
    
    setIsClientModalOpen(false);
  };

  const openAddClient = () => {
    setEditingClientId('');
    setClientForm({ name: '', company: '', email: '', phone: '', address: '', gst: '', country: 'India' });
    setIsClientModalOpen(true);
  };

  const openEditClient = (c) => {
    setEditingClientId(c.id);
    setClientForm({ ...c });
    setIsClientModalOpen(true);
  };

  const deleteClient = (id) => {
    if (!window.confirm('Delete this client?')) return;
    setClients(clients.filter(x => x.id !== id));
  };

  const saveSettingsClick = () => {
    setSettings(settingsForm);
    alert('Settings saved successfully!');
  };

  const statusBadge = (s) => {
    const cls = { Paid: 'badge-paid', Pending: 'badge-pending', Draft: 'badge-draft', Overdue: 'badge-overdue' };
    const dot = { Paid: 'dot-green', Pending: 'dot-amber', Draft: 'dot-gray', Overdue: 'dot-red' };
    return (
      <span className={`badge ${cls[s] || 'badge-draft'}`}>
        <span className={`status-dot ${dot[s] || 'dot-gray'}`}></span>{s}
      </span>
    );
  };

  // ----- Renders -----
  const renderDashboard = () => {
    const total = invoices.reduce((s, x) => s + x.total, 0);
    const paid = invoices.filter(x => x.status === 'Paid').reduce((s, x) => s + x.total, 0);
    const pend = invoices.filter(x => x.status === 'Pending').reduce((s, x) => s + x.total, 0);
    const over = invoices.filter(x => x.status === 'Overdue').reduce((s, x) => s + x.total, 0);
    
    const recent = [...invoices].reverse().slice(0, 6);

    return (
      <div className="page">
        <div className="topbar">
          <div className="topbar-title">Dashboard</div>
          <div className="topbar-right">
            <span style={{ fontSize: '12px', color: 'var(--nx-muted)' }}>{settings.website}</span>
            <button className="btn btn-primary" onClick={() => handleNav('new')}>
              <i className="ti ti-plus"></i> New Invoice
            </button>
          </div>
        </div>
        <div className="content">
          <div className="stat-grid">
            <div className="stat-card blue">
              <div className="stat-label">Total Revenue</div>
              <div className="stat-value">{fmt(total, '₹')}</div>
              <div className="stat-sub">All invoices</div>
            </div>
            <div className="stat-card green">
              <div className="stat-label">Paid</div>
              <div className="stat-value">{fmt(paid, '₹')}</div>
              <div className="stat-sub">Received</div>
            </div>
            <div className="stat-card amber">
              <div className="stat-label">Pending</div>
              <div className="stat-value">{fmt(pend, '₹')}</div>
              <div className="stat-sub">Awaiting payment</div>
            </div>
            <div className="stat-card red">
              <div className="stat-label">Overdue</div>
              <div className="stat-value">{fmt(over, '₹')}</div>
              <div className="stat-sub">Past due date</div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="card-title">Recent Invoices</div>
              <button className="btn btn-outline btn-sm" onClick={() => handleNav('invoices')}>View All</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Invoice #</th><th>Client</th><th>Date</th><th>Amount</th><th>Status</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recent.length === 0 ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center', color: 'var(--nx-muted)', padding: '28px' }}>No invoices yet — create your first one!</td></tr>
                ) : (
                  recent.map(inv => (
                    <tr key={inv.id}>
                      <td><span className="text-blue" style={{ cursor: 'pointer', fontWeight: 500 }} onClick={() => editInvoice(inv.id)}>{inv.number}</span></td>
                      <td>{inv.clientName}</td>
                      <td>{inv.date}</td>
                      <td style={{ fontWeight: 500 }}>{fmt(inv.total, inv.currSym)}</td>
                      <td>{statusBadge(inv.status)}</td>
                      <td><button className="btn btn-outline btn-sm" onClick={() => editInvoice(inv.id)} title="Edit"><i className="ti ti-edit"></i></button></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderInvoices = () => {
    const filtered = invoices.filter(x => !filterStatus || x.status === filterStatus).reverse();
    return (
      <div className="page">
        <div className="topbar">
          <div className="topbar-title">All Invoices</div>
          <div className="topbar-right">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ width: '140px', padding: '6px 10px', fontSize: '12px' }}>
              <option value="">All Status</option>
              <option value="Draft">Draft</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
            <button className="btn btn-primary" onClick={() => handleNav('new')}>
              <i className="ti ti-plus"></i> New Invoice
            </button>
          </div>
        </div>
        <div className="content">
          <div className="card">
            <table>
              <thead>
                <tr>
                  <th>Invoice #</th><th>Client</th><th>Date</th><th>Due Date</th>
                  <th>Amount</th><th>GST</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="8" style={{ textAlign: 'center', color: 'var(--nx-muted)', padding: '28px' }}>No invoices found</td></tr>
                ) : (
                  filtered.map(inv => (
                    <tr key={inv.id}>
                      <td><span className="text-blue" style={{ cursor: 'pointer', fontWeight: 500 }} onClick={() => editInvoice(inv.id)}>{inv.number}</span></td>
                      <td>{inv.clientName}</td>
                      <td>{inv.date}</td>
                      <td>{inv.due}</td>
                      <td style={{ fontWeight: 500 }}>{fmt(inv.total, inv.currSym)}</td>
                      <td><span className="inv-tag">{inv.gstRate}%</span></td>
                      <td>{statusBadge(inv.status)}</td>
                      <td>
                        <div className="action-row">
                          <button className="btn btn-outline btn-sm" onClick={() => editInvoice(inv.id)} title="Edit"><i className="ti ti-edit"></i></button>
                          {inv.status !== 'Paid' && <button className="btn btn-success btn-sm" onClick={() => markPaid(inv.id)} title="Mark as Paid"><i className="ti ti-check"></i></button>}
                          <button className="btn btn-outline btn-sm btn-danger" onClick={() => deleteInvoice(inv.id)} title="Delete"><i className="ti ti-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderPreview = () => {
    const d = buildInvoicePayload();
    const s = settings;
    const yourGstin = d.yourGst || s.gst;
    
    return (
      <div className="preview-wrap">
        <div className="inv-header">
          <div>
            <div className="inv-logo flex items-center gap-3">
              <img src="/logo/logo.png" alt="Nexoraa Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
              <div>NEX<span style={{ color: '#2563eb' }}>O</span>RAA <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 400, letterSpacing: '2px' }}>STUDIO</span></div>
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>{s.tagline}</div>
            <div style={{ fontSize: '11px', color: '#475569', marginTop: '6px', lineHeight: 1.6 }}>
              {s.owner} &nbsp;·&nbsp; {s.desig}<br />
              {s.phone} &nbsp;·&nbsp; {s.email}<br />
              <span style={{ color: '#2563eb' }}>{s.website}</span>
              {yourGstin && <><br /><span className="inv-gst-badge">GSTIN: {yourGstin}</span></>}
            </div>
          </div>
          <div className="inv-meta">
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>INVOICE</div>
            <div className="inv-number">{d.number}</div>
            <div className="inv-dates">
              Date: {d.date}<br />
              Due: {d.due}
            </div>
            <div style={{ marginTop: '8px' }}>{statusBadge(d.status)}</div>
          </div>
        </div>
        <div className="inv-parties">
          <div>
            <div className="party-label">From</div>
            <div className="party-name">{s.company}</div>
            <div className="party-info">{s.address}</div>
          </div>
          <div>
            <div className="party-label">Bill To</div>
            <div className="party-name">{d.clientName || '—'}</div>
            <div className="party-info">
              {d.clientCompany && <>{d.clientCompany}<br /></>}
              {d.clientEmail && <>{d.clientEmail}<br /></>}
              {d.clientPhone && <>{d.clientPhone}<br /></>}
              {d.clientAddress && <>{d.clientAddress}<br /></>}
              {d.clientGst && <span className="inv-gst-badge mt-1 block w-max">GSTIN: {d.clientGst}</span>}
            </div>
          </div>
        </div>
        <table className="inv-table">
          <thead>
            <tr>
              <th style={{ width: '5%', textAlign: 'center' }}>#</th>
              <th style={{ width: '45%' }}>Description</th>
              <th style={{ width: '10%', textAlign: 'right' }}>Qty</th>
              <th style={{ width: '20%', textAlign: 'right' }}>Unit Price</th>
              <th style={{ width: '20%', textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {d.items.map((item, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'center' }}>{i + 1}</td>
                <td>{item.desc}</td>
                <td style={{ textAlign: 'right' }}>{item.qty}</td>
                <td style={{ textAlign: 'right' }}>{fmt(item.price, d.currSym)}</td>
                <td style={{ textAlign: 'right', fontWeight: 600 }}>{fmt(item.qty * item.price, d.currSym)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="inv-totals">
          <div className="inv-total-box">
            <div className="inv-total-row"><span>Subtotal</span><span>{fmt(d.subtotal, d.currSym)}</span></div>
            {d.gstType !== 'none' && (
              <div className="inv-total-row"><span style={{ color: '#2563eb', fontWeight: 600 }}>GST ({d.gstRate}%)</span><span>{fmt(d.gstAmt, d.currSym)}</span></div>
            )}
            <div className="inv-total-row grand"><span>Total ({d.currency})</span><span>{fmt(d.total, d.currSym)}</span></div>
          </div>
        </div>
        {d.notes && <div style={{ background: '#f8fafc', borderRadius: '6px', padding: '10px 14px', fontSize: '12px', color: '#475569', marginBottom: '14px' }}><strong style={{ color: '#0f172a' }}>Notes & Payment Terms: </strong>{d.notes}</div>}
        <div className="inv-footer">
          {s.company} &nbsp;|&nbsp; {s.website} &nbsp;|&nbsp; {s.email} &nbsp;|&nbsp; {s.phone}<br />
          {s.address}
        </div>
      </div>
    );
  };

  return (
    <div className="invoice-system-wrapper">
      <div className="sidebar">
        <div className="logo-area">
          <div className="logo-icon">N</div>
          <div>
            <div className="logo-text">NEXORAA</div>
            <div className="logo-sub">Studio</div>
          </div>
        </div>
        <nav className="nav">
          <div className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => handleNav('dashboard')}><i className="ti ti-layout-dashboard"></i> Dashboard</div>
          <div className={`nav-item ${activePage === 'invoices' ? 'active' : ''}`} onClick={() => handleNav('invoices')}><i className="ti ti-file-invoice"></i> Invoices</div>
          <div className={`nav-item ${activePage === 'new' ? 'active' : ''}`} onClick={() => handleNav('new')}><i className="ti ti-plus"></i> New Invoice</div>
          <div className={`nav-item ${activePage === 'clients' ? 'active' : ''}`} onClick={() => handleNav('clients')}><i className="ti ti-users"></i> Clients</div>
          <div className={`nav-item ${activePage === 'settings' ? 'active' : ''}`} onClick={() => handleNav('settings')}><i className="ti ti-settings"></i> Settings</div>
        </nav>
        <div className="sidebar-footer">
          <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--nx-text)' }}>{settings.owner}</div>
          <div style={{ fontSize: '10px', color: 'var(--nx-muted)', marginTop: '2px' }}>{settings.desig}</div>
          <div style={{ fontSize: '10px', color: 'var(--nx-blue-light)', marginTop: '4px' }}>{settings.website}</div>
        </div>
      </div>

      <div className="main">
        {activePage === 'dashboard' && renderDashboard()}
        {activePage === 'invoices' && renderInvoices()}
        
        {activePage === 'new' && (
          <div className="page">
            <div className="topbar">
              <div className="topbar-title">{editingInvId ? 'Edit Invoice' : 'New Invoice'}</div>
              <div className="topbar-right">
                <button className="btn btn-outline" onClick={() => saveInvoice(true)}><i className="ti ti-device-floppy"></i> Save Draft</button>
                <button className="btn btn-primary" onClick={() => saveInvoice(false)}><i className="ti ti-check"></i> Save Invoice</button>
              </div>
            </div>
            <div className="tab-bar">
              <div className={`tab ${activeTab === 'details' ? 'active' : ''}`} onClick={() => setActiveTab('details')}>Invoice Details</div>
              <div className={`tab ${activeTab === 'items' ? 'active' : ''}`} onClick={() => setActiveTab('items')}>Line Items</div>
              <div className={`tab ${activeTab === 'preview' ? 'active' : ''}`} onClick={() => setActiveTab('preview')}>Preview & Print</div>
            </div>
            <div className="content">
              {activeTab === 'details' && (
                <div>
                  <div className="form-row">
                    <div className="form-group"><label>Invoice Number</label><input value={invData.number} onChange={e => setInvData({...invData, number: e.target.value})} placeholder="INV-001" /></div>
                    <div className="form-group">
                      <label>Currency</label>
                      <select value={invData.currency} onChange={e => setInvData({...invData, currency: e.target.value})}>
                        <option value="INR">🇮🇳 INR — Indian Rupee</option>
                        <option value="USD">🇺🇸 USD — US Dollar</option>
                        <option value="EUR">🇪🇺 EUR — Euro</option>
                        <option value="GBP">🇬🇧 GBP — British Pound</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>Invoice Date</label><input type="date" value={invData.date} onChange={e => setInvData({...invData, date: e.target.value})} /></div>
                    <div className="form-group"><label>Due Date</label><input type="date" value={invData.due} onChange={e => setInvData({...invData, due: e.target.value})} /></div>
                  </div>
                  <div className="divider"></div>
                  <div className="section-title"><i className="ti ti-building"></i> Bill To (Client Info)</div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Client Name</label>
                      <input list="client-datalist" value={invData.clientName} onChange={e => autofillClient(e.target.value)} placeholder="Type or select client name" />
                      <datalist id="client-datalist">{clients.map(c => <option key={c.id} value={c.name} />)}</datalist>
                    </div>
                    <div className="form-group"><label>Company Name</label><input value={invData.clientCompany} onChange={e => setInvData({...invData, clientCompany: e.target.value})} placeholder="Client Company Pvt. Ltd." /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>Email</label><input type="email" value={invData.clientEmail} onChange={e => setInvData({...invData, clientEmail: e.target.value})} placeholder="client@email.com" /></div>
                    <div className="form-group"><label>Phone</label><input value={invData.clientPhone} onChange={e => setInvData({...invData, clientPhone: e.target.value})} placeholder="+91 XXXXX XXXXX" /></div>
                  </div>
                  <div className="form-row full">
                    <div className="form-group"><label>Billing Address</label><textarea value={invData.clientAddress} onChange={e => setInvData({...invData, clientAddress: e.target.value})} placeholder="Full billing address..." rows="2"></textarea></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>Client GST Number</label><input value={invData.clientGst} onChange={e => setInvData({...invData, clientGst: e.target.value})} placeholder="22AAAAA0000A1Z5" /></div>
                    <div className="form-group">
                      <label>Payment Status</label>
                      <select value={invData.status} onChange={e => setInvData({...invData, status: e.target.value})}>
                        <option value="Draft">Draft</option>
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                    </div>
                  </div>
                  <div className="divider"></div>
                  <div className="section-title"><i className="ti ti-receipt-tax"></i> GST / Tax Settings</div>
                  <div className="form-row triple">
                    <div className="form-group">
                      <label>GST Type</label>
                      <select value={invData.gstType} onChange={e => setInvData({...invData, gstType: e.target.value})}>
                        <option value="none">No GST</option>
                        <option value="exclusive">GST Exclusive (added on top)</option>
                        <option value="inclusive">GST Inclusive (included in price)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>GST Rate</label>
                      <select value={invData.gstRate} onChange={e => setInvData({...invData, gstRate: e.target.value})}>
                        <option value="0">0% — Exempt</option>
                        <option value="5">5% — Essential</option>
                        <option value="12">12% — Standard</option>
                        <option value="18">18% — Standard Services</option>
                        <option value="28">28% — Luxury</option>
                      </select>
                    </div>
                    <div className="form-group"><label>Your GSTIN</label><input value={invData.yourGst} onChange={e => setInvData({...invData, yourGst: e.target.value})} placeholder="24XXXXX0000X1Z5" /></div>
                  </div>
                  <div className="form-row full">
                    <div className="form-group"><label>Notes / Payment Terms</label><textarea value={invData.notes} onChange={e => setInvData({...invData, notes: e.target.value})} rows="3" placeholder="Payment terms, bank details..."></textarea></div>
                  </div>
                </div>
              )}
              {activeTab === 'items' && (
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">Line Items / Services</div>
                    <button className="btn btn-primary btn-sm" onClick={addItem}><i className="ti ti-plus"></i> Add Item</button>
                  </div>
                  <table className="items-table" style={{ width: '100%' }}>
                    <thead>
                      <tr><th style={{ width: '38%' }}>Description (Service)</th><th style={{ width: '12%' }}>Qty</th><th style={{ width: '20%' }}>Unit Price</th><th style={{ width: '20%' }}>Amount</th><th style={{ width: '10%' }}></th></tr>
                    </thead>
                    <tbody>
                      {items.length === 0 ? (
                        <tr><td colSpan="5" style={{ textAlign: 'center', color: 'var(--nx-muted)', padding: '22px' }}>Click "+ Add Item" to add your services</td></tr>
                      ) : (
                        items.map((item, i) => (
                          <tr key={i}>
                            <td>
                              <input list="services-list" value={item.desc} onChange={e => updateItem(i, 'desc', e.target.value)} placeholder="Select or type service..." />
                              <datalist id="services-list">{PREDEFINED_SERVICES.map(s => <option key={s} value={s} />)}</datalist>
                            </td>
                            <td><input type="number" value={item.qty} min="1" onChange={e => updateItem(i, 'qty', Math.max(1, +e.target.value || 1))} /></td>
                            <td><input type="number" value={item.price} min="0" step="0.01" onChange={e => updateItem(i, 'price', +e.target.value || 0)} /></td>
                            <td style={{ fontWeight: 500 }}>{fmt(item.qty * item.price, CURR_SYM[invData.currency])}</td>
                            <td><button className="btn btn-outline btn-sm btn-danger" onClick={() => removeItem(i)}><i className="ti ti-trash"></i></button></td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <div className="total-box">
                      <div className="total-row"><span className="text-muted">Subtotal</span><span>{fmt(totals.sub, CURR_SYM[invData.currency])}</span></div>
                      <div className="total-row"><span className="text-muted">{totals.type === 'none' ? 'No GST' : `GST (${totals.rate}%)`}</span><span>{fmt(totals.gst, CURR_SYM[invData.currency])}</span></div>
                      <div className="total-row grand"><span>Total</span><span>{fmt(totals.total, CURR_SYM[invData.currency])}</span></div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'preview' && (
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                    <button className="btn btn-primary" onClick={() => window.print()}><i className="ti ti-printer"></i> Print / Save as PDF</button>
                    <button className="btn btn-outline" onClick={() => setActiveTab('details')}><i className="ti ti-edit"></i> Edit Details</button>
                    <button className="btn btn-outline" onClick={() => setActiveTab('items')}><i className="ti ti-list"></i> Edit Items</button>
                  </div>
                  {renderPreview()}
                </div>
              )}
            </div>
          </div>
        )}

        {activePage === 'clients' && (
          <div className="page">
            <div className="topbar">
              <div className="topbar-title">Client Database</div>
              <div className="topbar-right"><button className="btn btn-primary" onClick={openAddClient}><i className="ti ti-user-plus"></i> Add Client</button></div>
            </div>
            <div className="content">
              <div className="card">
                <table>
                  <thead>
                    <tr><th>Name</th><th>Company</th><th>Email</th><th>Phone</th><th>GST Number</th><th>Country</th><th>Invoices</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {clients.length === 0 ? (
                      <tr><td colSpan="8" style={{ textAlign: 'center', color: 'var(--nx-muted)', padding: '28px' }}>No clients yet — add your first client!</td></tr>
                    ) : (
                      clients.map(c => {
                        const invCount = invoices.filter(x => x.clientName === c.name).length;
                        return (
                          <tr key={c.id}>
                            <td style={{ fontWeight: 500 }}>{c.name}</td><td>{c.company || '—'}</td><td>{c.email || '—'}</td><td>{c.phone || '—'}</td>
                            <td><span className="inv-tag">{c.gst || '—'}</span></td><td>{c.country || '—'}</td><td style={{ textAlign: 'center' }}>{invCount}</td>
                            <td>
                              <div className="action-row">
                                <button className="btn btn-outline btn-sm" onClick={() => openEditClient(c)}><i className="ti ti-edit"></i></button>
                                <button className="btn btn-outline btn-sm btn-danger" onClick={() => deleteClient(c.id)}><i className="ti ti-trash"></i></button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activePage === 'settings' && (
          <div className="page">
            <div className="topbar">
              <div className="topbar-title">Company Settings</div>
              <div className="topbar-right"><button className="btn btn-primary" onClick={saveSettingsClick}><i className="ti ti-check"></i> Save Settings</button></div>
            </div>
            <div className="content">
              <div className="card">
                <div className="card-header"><div className="card-title">Company Information</div></div>
                <div className="form-row">
                  <div className="form-group"><label>Company Name</label><input value={settingsForm.company} onChange={e => setSettingsForm({...settingsForm, company: e.target.value})} /></div>
                  <div className="form-group"><label>Tagline</label><input value={settingsForm.tagline} onChange={e => setSettingsForm({...settingsForm, tagline: e.target.value})} /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label>Owner / Contact Name</label><input value={settingsForm.owner} onChange={e => setSettingsForm({...settingsForm, owner: e.target.value})} /></div>
                  <div className="form-group"><label>Designation</label><input value={settingsForm.desig} onChange={e => setSettingsForm({...settingsForm, desig: e.target.value})} /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label>Phone</label><input value={settingsForm.phone} onChange={e => setSettingsForm({...settingsForm, phone: e.target.value})} /></div>
                  <div className="form-group"><label>Email</label><input value={settingsForm.email} onChange={e => setSettingsForm({...settingsForm, email: e.target.value})} /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label>Website</label><input value={settingsForm.website} onChange={e => setSettingsForm({...settingsForm, website: e.target.value})} /></div>
                  <div className="form-group"><label>GSTIN</label><input value={settingsForm.gst} onChange={e => setSettingsForm({...settingsForm, gst: e.target.value})} /></div>
                </div>
                <div className="form-row full"><div className="form-group"><label>Address</label><textarea value={settingsForm.address} onChange={e => setSettingsForm({...settingsForm, address: e.target.value})} /></div></div>
              </div>
              <div className="card">
                <div className="card-header"><div className="card-title">Invoice Defaults</div></div>
                <div className="form-row">
                  <div className="form-group"><label>Invoice Prefix</label><input value={settingsForm.prefix} onChange={e => setSettingsForm({...settingsForm, prefix: e.target.value})} /></div>
                  <div className="form-group">
                    <label>Default Currency</label>
                    <select value={settingsForm.currency} onChange={e => setSettingsForm({...settingsForm, currency: e.target.value})}>
                      <option value="INR">INR — Indian Rupee (₹)</option>
                      <option value="USD">USD — US Dollar ($)</option>
                      <option value="EUR">EUR — Euro (€)</option>
                      <option value="GBP">GBP — British Pound (£)</option>
                    </select>
                  </div>
                </div>
                <div className="form-row full"><div className="form-group"><label>Default Notes / Payment Terms</label><textarea value={settingsForm.notes} onChange={e => setSettingsForm({...settingsForm, notes: e.target.value})} rows="3" /></div></div>
              </div>
            </div>
          </div>
        )}

      </div>

      {isClientModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-title">{editingClientId ? 'Edit Client' : 'Add Client'}</div>
            <div className="form-row"><div className="form-group"><label>Full Name *</label><input value={clientForm.name} onChange={e => setClientForm({...clientForm, name: e.target.value})} placeholder="Full name" /></div><div className="form-group"><label>Company</label><input value={clientForm.company} onChange={e => setClientForm({...clientForm, company: e.target.value})} placeholder="Company name" /></div></div>
            <div className="form-row"><div className="form-group"><label>Email</label><input value={clientForm.email} onChange={e => setClientForm({...clientForm, email: e.target.value})} placeholder="email@example.com" /></div><div className="form-group"><label>Phone</label><input value={clientForm.phone} onChange={e => setClientForm({...clientForm, phone: e.target.value})} placeholder="+91 XXXXX XXXXX" /></div></div>
            <div className="form-row full"><div className="form-group"><label>Address</label><textarea value={clientForm.address} onChange={e => setClientForm({...clientForm, address: e.target.value})} rows="2" placeholder="Full address"></textarea></div></div>
            <div className="form-row"><div className="form-group"><label>GST Number</label><input value={clientForm.gst} onChange={e => setClientForm({...clientForm, gst: e.target.value})} placeholder="22AAAAA0000A1Z5" /></div><div className="form-group"><label>Country</label><input value={clientForm.country} onChange={e => setClientForm({...clientForm, country: e.target.value})} placeholder="India" /></div></div>
            <div className="flex gap-2 mt-3">
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={saveClient}><i className="ti ti-check"></i> Save Client</button>
              <button className="btn btn-outline" onClick={() => setIsClientModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
