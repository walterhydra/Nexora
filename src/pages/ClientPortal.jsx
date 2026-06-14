import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { m, AnimatePresence, useDragControls, useReducedMotion } from 'framer-motion';
import {
  Mail, Eye, Zap, MessageCircle, ShieldCheck,
  LayoutDashboard, FolderKanban, Receipt, Settings,
  Bell, ChevronDown, ArrowLeft, ArrowRight,
  CheckCircle2, Terminal, X, Send, MessageSquare, Download, File,
  Activity, Cpu, Globe, TrendingUp, Menu, Search, Sparkles, LogOut, EyeOff,
  CalendarDays, Layers3, Play, MoreHorizontal, Plus, Command, Gauge, Users,
  ExternalLink, CircleDot, WalletCards, User, Lock, AlertCircle
} from 'lucide-react';
import nexoraLogo from '../assets/nexora-logo.png';
import '../styles/client-portal.css';
import { supabase } from '../lib/supabase';

import { PortalProvider } from '../components/portal/PortalContext';
import PortalDashboardContent from '../components/portal/PortalDashboardContent';

const MOCK_DATA = {
  clients: [
    {
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      email: 'ashish@nexora.com',
      password_hash: 'Ashish@2026',
      client_name: 'Ashish Kumar',
      company_name: 'Nexora',
      avatar_url: '/Video/image.png'
    },
    {
      id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      email: 'stellar@nexora.com',
      password_hash: 'Stellar@2026',
      client_name: 'Sarah Williams',
      company_name: 'Stellar Inc'
    },
    {
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      email: 'client@nexora.com',
      password_hash: 'NexoraClient2026',
      client_name: 'Ashish Kumar',
      company_name: 'Nexora',
      avatar_url: '/Video/image.png'
    }
  ],
  projects: [
    {
      id: 'd1000001-0000-0000-0000-000000000001',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      project_name: 'Nova Brand Redesign',
      description: 'Complete brand overhaul including logo, website, and marketing materials.',
      status: 'active',
      progress: 63,
      start_date: '2026-03-01',
      due_date: '2026-08-15'
    },
    {
      id: 'd1000001-0000-0000-0000-000000000002',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      project_name: 'Nova Mobile App',
      description: 'iOS and Android app development for customer engagement.',
      status: 'active',
      progress: 25,
      start_date: '2026-05-10',
      due_date: '2026-12-01'
    },
    {
      id: 'd2000001-0000-0000-0000-000000000001',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      project_name: 'Stellar E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration.',
      status: 'active',
      progress: 80,
      start_date: '2026-01-15',
      due_date: '2026-07-01'
    },
    {
      id: 'd2000001-0000-0000-0000-000000000002',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      project_name: 'Stellar SEO Campaign',
      description: 'Comprehensive SEO and content marketing strategy.',
      status: 'completed',
      progress: 100,
      start_date: '2026-02-01',
      due_date: '2026-05-30'
    }
  ],
  milestones: [
    {
      id: 'm1',
      project_id: 'd1000001-0000-0000-0000-000000000001',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      title: 'Discovery & Research',
      description: 'Market analysis and competitor research',
      status: 'completed',
      progress: 100,
      due_date: '2026-03-20'
    },
    {
      id: 'm2',
      project_id: 'd1000001-0000-0000-0000-000000000001',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      title: 'UI/UX Design',
      description: 'Wireframes, mockups, and prototypes',
      status: 'in_progress',
      progress: 70,
      due_date: '2026-05-15'
    },
    {
      id: 'm3',
      project_id: 'd1000001-0000-0000-0000-000000000001',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      title: 'Frontend Development',
      description: 'React implementation with animations',
      status: 'pending',
      progress: 0,
      due_date: '2026-07-01'
    },
    {
      id: 'm4',
      project_id: 'd1000001-0000-0000-0000-000000000001',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      title: 'Launch & Deployment',
      description: 'Final QA, deployment, and handover',
      status: 'pending',
      progress: 0,
      due_date: '2026-08-15'
    },
    {
      id: 'm5',
      project_id: 'd2000001-0000-0000-0000-000000000001',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      title: 'Backend Architecture',
      description: 'API design and database setup',
      status: 'completed',
      progress: 100,
      due_date: '2026-02-28'
    },
    {
      id: 'm6',
      project_id: 'd2000001-0000-0000-0000-000000000001',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      title: 'Payment Integration',
      description: 'Stripe and PayPal integration',
      status: 'completed',
      progress: 100,
      due_date: '2026-04-15'
    },
    {
      id: 'm7',
      project_id: 'd2000001-0000-0000-0000-000000000001',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      title: 'Frontend Storefront',
      description: 'Product pages, cart, and checkout',
      status: 'in_progress',
      progress: 60,
      due_date: '2026-06-01'
    },
    {
      id: 'm8',
      project_id: 'd2000001-0000-0000-0000-000000000001',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      title: 'Testing & Launch',
      description: 'E2E testing and production deployment',
      status: 'pending',
      progress: 0,
      due_date: '2026-07-01'
    }
  ],
  invoices: [
    {
      id: 'i1',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      project_id: 'd1000001-0000-0000-0000-000000000001',
      invoice_number: 'INV-2026-001',
      amount: 3500.00,
      status: 'paid',
      issue_date: '2026-03-01',
      due_date: '2026-03-15',
      paid_date: '2026-03-10',
      description: 'Phase 1: Discovery & Research'
    },
    {
      id: 'i2',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      project_id: 'd1000001-0000-0000-0000-000000000001',
      invoice_number: 'INV-2026-002',
      amount: 8250.00,
      status: 'paid',
      issue_date: '2026-04-15',
      due_date: '2026-04-30',
      paid_date: '2026-04-28',
      description: 'Phase 2: UI/UX Design'
    },
    {
      id: 'i3',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      project_id: 'd1000001-0000-0000-0000-000000000001',
      invoice_number: 'INV-2026-003',
      amount: 12000.00,
      status: 'pending',
      issue_date: '2026-06-01',
      due_date: '2026-06-15',
      paid_date: null,
      description: 'Phase 3: Frontend Development'
    },
    {
      id: 'i4',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      project_id: 'd2000001-0000-0000-0000-000000000001',
      invoice_number: 'INV-2026-010',
      amount: 5000.00,
      status: 'paid',
      issue_date: '2026-01-15',
      due_date: '2026-01-30',
      paid_date: '2026-01-25',
      description: 'Phase 1: Backend Architecture'
    },
    {
      id: 'i5',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      project_id: 'd2000001-0000-0000-0000-000000000001',
      invoice_number: 'INV-2026-011',
      amount: 7500.00,
      status: 'paid',
      issue_date: '2026-03-01',
      due_date: '2026-03-15',
      paid_date: '2026-03-12',
      description: 'Phase 2: Payment Integration'
    },
    {
      id: 'i6',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      project_id: 'd2000001-0000-0000-0000-000000000001',
      invoice_number: 'INV-2026-012',
      amount: 9000.00,
      status: 'pending',
      issue_date: '2026-05-15',
      due_date: '2026-06-01',
      paid_date: null,
      description: 'Phase 3: Frontend Storefront'
    }
  ],
  messages: [
    {
      id: 'msg1',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      sender: 'admin',
      message: 'Welcome to Nexora Studio! Your project dashboard is now live.',
      is_read: true,
      created_at: '2026-06-09T09:00:00Z'
    },
    {
      id: 'msg2',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      sender: 'client',
      message: 'Thanks! The mockups look amazing. Can we add one more page?',
      is_read: true,
      created_at: '2026-06-09T09:05:00Z'
    },
    {
      id: 'msg3',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      sender: 'admin',
      message: 'Absolutely! I have added the extra page to the scope. Updated timeline shared.',
      is_read: false,
      created_at: '2026-06-09T09:10:00Z'
    },
    {
      id: 'msg4',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      sender: 'admin',
      message: 'Welcome Sarah! Your e-commerce project is progressing well.',
      is_read: true,
      created_at: '2026-06-09T10:00:00Z'
    },
    {
      id: 'msg5',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      sender: 'client',
      message: 'Great! When can we expect the storefront preview?',
      is_read: true,
      created_at: '2026-06-09T10:05:00Z'
    },
    {
      id: 'msg6',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      sender: 'admin',
      message: 'The preview will be ready by next Friday. I will send you the staging link.',
      is_read: false,
      created_at: '2026-06-09T10:10:00Z'
    }
  ],
  deliverables: [
    {
      id: 'd1',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      project_id: 'd1000001-0000-0000-0000-000000000001',
      title: 'Brand Guidelines PDF',
      file_type: 'pdf',
      status: 'delivered'
    },
    {
      id: 'd2',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      project_id: 'd1000001-0000-0000-0000-000000000001',
      title: 'Logo Package (SVG + PNG)',
      file_type: 'zip',
      status: 'delivered'
    },
    {
      id: 'd3',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      project_id: 'd1000001-0000-0000-0000-000000000001',
      title: 'Homepage Mockup v2',
      file_type: 'figma',
      status: 'revision'
    },
    {
      id: 'd4',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      project_id: 'd2000001-0000-0000-0000-000000000001',
      title: 'API Documentation',
      file_type: 'pdf',
      status: 'approved'
    },
    {
      id: 'd5',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      project_id: 'd2000001-0000-0000-0000-000000000001',
      title: 'Database Schema Diagram',
      file_type: 'png',
      status: 'approved'
    },
    {
      id: 'd6',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      project_id: 'd2000001-0000-0000-0000-000000000001',
      title: 'Storefront Design Mockups',
      file_type: 'figma',
      status: 'pending'
    }
  ]
};

export default function ClientPortal() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [rememberMe, setRememberMe] = useState(() => {
    return localStorage.getItem('nexora_remember_me') !== 'false';
  });
  const [email, setEmail] = useState(() => {
    return localStorage.getItem('nexora_remembered_email') || '';
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [funFact, setFunFact] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');

  // Database-backed state variables
  const [clientInfo, setClientInfo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [messages, setMessages] = useState([]);
  const [deliverables, setDeliverables] = useState([]);

  // Fetch all related workspace data for client
  const fetchClientData = async (clientId) => {
    try {
      // 1. Fetch client info
      const { data: client, error: clientErr } = await supabase
        .from('clients')
        .select('*')
        .eq('id', clientId)
        .single();
      if (clientErr || !client) {
        throw new Error(clientErr?.message || 'Client not found in Supabase');
      }
      setClientInfo(client);

      // 2. Fetch projects
      const { data: projectsData, error: projErr } = await supabase
        .from('projects')
        .select('*')
        .eq('client_id', clientId);
      if (projErr) throw projErr;
      setProjects(projectsData || []);

      const projectIds = (projectsData || []).map(p => p.id);

      // 3. Fetch milestones
      if (projectIds.length > 0) {
        const { data: milestonesData, error: mileErr } = await supabase
          .from('milestones')
          .select('*')
          .in('project_id', projectIds)
          .order('due_date', { ascending: true });
        if (mileErr) throw mileErr;
        setMilestones(milestonesData || []);
      } else {
        setMilestones([]);
      }

      // 4. Fetch invoices
      const { data: invoicesData, error: invErr } = await supabase
        .from('invoices')
        .select('*')
        .eq('client_id', clientId)
        .order('issue_date', { ascending: false });
      if (invErr) throw invErr;
      setInvoices(invoicesData || []);

      // 5. Fetch messages
      const { data: messagesData, error: msgErr } = await supabase
        .from('messages')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: true });
      if (msgErr) throw msgErr;
      setMessages(messagesData || []);

      // 6. Fetch deliverables
      if (projectIds.length > 0) {
        const { data: deliverablesData, error: delErr } = await supabase
          .from('deliverables')
          .select('*')
          .in('project_id', projectIds);
        if (delErr) throw delErr;
        setDeliverables(deliverablesData || []);
      } else {
        setDeliverables([]);
      }
    } catch (error) {
      console.error('Error fetching client data from Supabase, falling back to local storage/mock data:', error);

      const localClient = MOCK_DATA.clients.find(c => c.id === clientId) ||
        MOCK_DATA.clients.find(c => c.email === email?.trim().toLowerCase()) ||
        MOCK_DATA.clients[0];
      setClientInfo(localClient);

      const localProj = MOCK_DATA.projects.filter(p => p.client_id === localClient.id);
      setProjects(localProj);

      const localProjIds = localProj.map(p => p.id);
      const localMiles = MOCK_DATA.milestones.filter(m => localProjIds.includes(m.project_id));
      setMilestones(localMiles);

      const localInvs = MOCK_DATA.invoices.filter(i => i.client_id === localClient.id);
      setInvoices(localInvs);

      const savedMessagesKey = `nexora_messages_${localClient.id}`;
      const savedMsgs = localStorage.getItem(savedMessagesKey);
      if (savedMsgs) {
        try {
          setMessages(JSON.parse(savedMsgs));
        } catch {
          const localMsgs = MOCK_DATA.messages.filter(m => m.client_id === localClient.id);
          setMessages(localMsgs);
        }
      } else {
        const localMsgs = MOCK_DATA.messages.filter(m => m.client_id === localClient.id);
        setMessages(localMsgs);
      }

      const localDels = MOCK_DATA.deliverables.filter(d => localProjIds.includes(d.project_id));
      setDeliverables(localDels);
    }
  };

  useEffect(() => {
    const facts = [
      "Nexora Studio crafts premium digital business assets.",
      "We blend high-end dark glassmorphism with buttery-smooth UI.",
      "Nexora transforms standard dashboards into 'Mission Control' centers.",
      "Every pixel is engineered for a luxury digital experience.",
      "We don't just build websites; we engineer secure, scalable portals.",
      "Nexoraa Studio focuses on performance, aesthetics, and scalable growth."
    ];
    setFunFact(facts[Math.floor(Math.random() * facts.length)]);

    // Check for saved session in localStorage or sessionStorage
    const savedSession = localStorage.getItem('nexora_client_session') || sessionStorage.getItem('nexora_client_session');
    let fetchPromise = Promise.resolve();
    if (savedSession) {
      try {
        const clientData = JSON.parse(savedSession);
        setClientInfo(clientData);
        setIsAuthenticated(true);
        fetchPromise = fetchClientData(clientData.id);
      } catch (err) {
        console.error('Failed to parse saved session', err);
        localStorage.removeItem('nexora_client_session');
        sessionStorage.removeItem('nexora_client_session');
      }
    }

    // Simulate real-time loading when opening portal
    const timer = setTimeout(async () => {
      await fetchPromise;
      setIsPageLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Real-time message subscription channel
  useEffect(() => {
    if (!isAuthenticated || !clientInfo?.id) return;

    const channel = supabase
      .channel('realtime-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `client_id=eq.${clientInfo.id}`
        },
        (payload) => {
          setMessages((prev) => {
            // Avoid duplicates
            if (prev.some(m => m.id === payload.new.id)) return prev;
            return [...prev, payload.new];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated, clientInfo]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setLoginError('Please enter both username and password.');
      return;
    }
    setLoginError('');
    setIsLoggingIn(true);
    setLoginStatus('Connecting to database...');

    // Check for Admin/Invoice system access
    if ((email === 'Nexoraa.works@gmail.com' || email === 'Nexoraa.Admin') && password === '220305@Nexoraa') {
      await new Promise(r => setTimeout(r, 500));
      setLoginStatus('Verifying credentials...');
      await new Promise(r => setTimeout(r, 500));
      setLoginStatus('Access granted. Redirecting...');
      await new Promise(r => setTimeout(r, 400));
      setIsLoggingIn(false);
      navigate('/invoice-system');
      return;
    }

    // Step 1: Connecting
    await new Promise(r => setTimeout(r, 500));
    setLoginStatus('Verifying credentials...');
    await new Promise(r => setTimeout(r, 400));

    let authenticatedClient = null;
    let loginErr = null;

    try {
      const { data: client, error } = await supabase
        .from('clients')
        .select('*')
        .eq('email', email.trim().toLowerCase())
        .single();

      if (!error && client) {
        if (client.password_hash === password) {
          authenticatedClient = client;
        } else {
          loginErr = 'Invalid username or password. Access Denied.';
        }
      } else {
        if (error) loginErr = error.message;
      }
    } catch (err) {
      console.error('Supabase query error:', err);
      loginErr = err.message;
    }

    // Fallback to local mock data if Supabase request failed or client was not found/unreachable
    if (!authenticatedClient) {
      const trimmedEmail = email.trim().toLowerCase();
      const mockClient = MOCK_DATA.clients.find(
        c => c.email === trimmedEmail && c.password_hash === password
      );

      if (mockClient) {
        authenticatedClient = mockClient;
      }
    }

    if (authenticatedClient) {
      setLoginStatus('Authenticating session...');
      await new Promise(r => setTimeout(r, 400));
      setLoginStatus('Decrypting handshake...');
      await new Promise(r => setTimeout(r, 450));
      setLoginStatus('Fetching portal records...');
      await new Promise(r => setTimeout(r, 450));
      setLoginStatus('Workspace ready!');
      await new Promise(r => setTimeout(r, 300));

      const sessionData = {
        id: authenticatedClient.id,
        email: authenticatedClient.email,
        client_name: authenticatedClient.client_name,
        company_name: authenticatedClient.company_name
      };

      if (rememberMe) {
        localStorage.setItem('nexora_client_session', JSON.stringify(sessionData));
        localStorage.setItem('nexora_remembered_email', email);
        localStorage.setItem('nexora_remember_me', 'true');
      } else {
        sessionStorage.setItem('nexora_client_session', JSON.stringify(sessionData));
        localStorage.removeItem('nexora_client_session');
        localStorage.removeItem('nexora_remembered_email');
        localStorage.setItem('nexora_remember_me', 'false');
      }
      setClientInfo(authenticatedClient);
      setIsAuthenticated(true);
      await fetchClientData(authenticatedClient.id);
    } else {
      setLoginStatus('Access denied.');
      await new Promise(r => setTimeout(r, 600));
      setLoginError(loginErr || 'Invalid username or password. Access Denied.');
    }
    setIsLoggingIn(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('nexora_client_session');
    sessionStorage.removeItem('nexora_client_session');
    setIsAuthenticated(false);
    setClientInfo(null);
    setProjects([]);
    setMilestones([]);
    setInvoices([]);
    setMessages([]);
    setDeliverables([]);
  };

  const handleSendMessage = async (messageText) => {
    if (!clientInfo || !clientInfo.id) return;
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            client_id: clientInfo.id,
            sender: 'client',
            message: messageText,
            is_read: false
          }
        ])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        setMessages((prev) => {
          if (prev.some(m => m.id === data[0].id)) return prev;
          return [...prev, data[0]];
        });
      }
    } catch (err) {
      console.error('Failed to send message via Supabase, saving locally:', err);
      // Fallback: save to local state and localStorage
      const newMessage = {
        id: `local-${Date.now()}`,
        client_id: clientInfo.id,
        sender: 'client',
        message: messageText,
        is_read: false,
        created_at: new Date().toISOString()
      };

      setMessages((prev) => [...prev, newMessage]);
      const savedMessagesKey = `nexora_messages_${clientInfo.id}`;
      const currentSaved = localStorage.getItem(savedMessagesKey);
      let msgsArray = [];
      if (currentSaved) {
        try {
          msgsArray = JSON.parse(currentSaved);
        } catch {
          msgsArray = MOCK_DATA.messages.filter(m => m.client_id === clientInfo.id);
        }
      } else {
        msgsArray = MOCK_DATA.messages.filter(m => m.client_id === clientInfo.id);
      }
      msgsArray.push(newMessage);
      localStorage.setItem(savedMessagesKey, JSON.stringify(msgsArray));
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  if (isPageLoading) {
    return (
      <div className="min-h-screen bg-[#030407] flex flex-col gap-10 items-center justify-center font-sans px-6 text-center">
        <div className="w-24 h-24 border-[6px] border-white/20 border-t-white rounded-full animate-spin shrink-0" />

        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-md"
        >
          <p className="text-[10px] font-bold tracking-[0.2em] text-blue-400/80 uppercase mb-2">Did you know?</p>
          <p className="text-sm font-medium text-gray-400 leading-relaxed">
            {funFact}
          </p>
        </m.div>
      </div>
    );
  }

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center font-sans">
        {/* Nexora Premium Dark Background */}
        <div className="absolute inset-0 bg-[#030407]">
          {/* Huge Blurred Logo Watermarks */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[1000px] opacity-15 pointer-events-none">
            <img
              src="/logo/portal.png"
              alt=""
              className="w-full h-full object-contain blur-[8px] animate-pulse"
              style={{ animationDuration: '8s' }}
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[1000px] opacity-25 pointer-events-none">
            <img
              src="/logo/ChatGPT Image May 11, 2026, 11_53_46 AM.png"
              alt=""
              className="w-full h-full object-contain blur-[40px] animate-pulse"
              style={{ animationDuration: '10s' }}
            />
          </div>

          {/* Dynamic Light Orbs */}
          <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-[#004dff] blur-[140px] opacity-20 animate-pulse" style={{ animationDuration: '7s' }} />
          <div className="absolute bottom-[0%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#00f0ff] blur-[140px] opacity-15 animate-pulse" style={{ animationDuration: '10s' }} />
          <div className="absolute top-[40%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[#7000ff] blur-[130px] opacity-15" />

          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
        </div>

        <div className="relative z-10 w-full max-w-[420px] flex flex-col items-center pl-6 pr-12">
          {/* Premium Logo Badge */}
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 mb-6 shadow-[0_8px_32px_rgba(59,130,246,0.2)] hover:shadow-[0_8px_40px_rgba(59,130,246,0.35)] hover:scale-105 transition-all duration-300 ml-8 pointer-events-auto rounded-2xl overflow-hidden border border-white/10"
          >
            <img
              src="/logo/ChatGPT Image May 11, 2026, 11_53_46 AM.png"
              alt="Nexora Logo"
              className="w-full h-full object-cover"
            />
          </m.div>

          <h2 className="text-[28px] tracking-[0.15em] text-white mb-10 font-light text-center w-full pl-8">
            CUSTOMER LOGIN
          </h2>

          <form onSubmit={handleLogin} className="w-full space-y-6">
            {loginError && (
              <div className="w-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm py-3 px-4 rounded-lg text-center font-medium backdrop-blur-md">
                {loginError}
              </div>
            )}
            {/* Username Input */}
            <div className="relative flex items-center group">
              <div className="absolute -left-12 w-12 flex justify-center">
                <User className="w-6 h-6 text-gray-500 group-focus-within:text-blue-400 transition-colors" strokeWidth={1.5} />
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username"
                className="w-full bg-white/[0.03] border border-white/[0.05] rounded-lg text-white placeholder:text-gray-500 px-5 py-3 backdrop-blur-xl outline-none focus:bg-white/[0.06] focus:border-blue-500/50 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
              />
            </div>

            {/* Password Input */}
            <div className="relative flex items-center group">
              <div className="absolute -left-12 w-12 flex justify-center">
                <Lock className="w-6 h-6 text-gray-500 group-focus-within:text-blue-400 transition-colors" strokeWidth={1.5} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-white/[0.03] border border-white/[0.05] rounded-lg text-white placeholder:text-gray-500 px-5 py-3 backdrop-blur-xl outline-none focus:bg-white/[0.06] focus:border-blue-500/50 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-500 hover:text-blue-400 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Remember me & Forgot Password */}
            <div className="flex items-center justify-between text-sm pt-2">
              <label className="flex items-center gap-3 cursor-pointer group select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-[16px] h-[16px] rounded-[4px] flex items-center justify-center transition-all duration-200 ${rememberMe
                  ? 'bg-blue-500/20 border border-blue-500/50 shadow-[0_0_8px_rgba(59,130,246,0.3)]'
                  : 'bg-white/[0.05] border border-white/[0.1] group-hover:bg-blue-500/10 group-hover:border-blue-500/30'
                  }`}>
                  <svg
                    className={`w-3 h-3 text-blue-400 transition-all duration-200 ${rememberMe ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-400 text-[13px] font-medium tracking-wide group-hover:text-gray-200 transition-colors">Remember me</span>
              </label>
              <button type="button" onClick={() => setShowForgotPassword(true)} className="text-blue-400/80 text-[13px] font-medium tracking-wide hover:text-blue-400 transition-colors">Forgot Password?</button>
            </div>

            {/* Submit Button */}
            <div className="pt-6 flex justify-center">
              <button
                type="submit"
                disabled={isLoggingIn || !email.trim() || !password.trim()}
                className={`w-full relative overflow-hidden group border font-bold tracking-[0.15em] text-[13px] py-4 rounded-lg transition-all ${(isLoggingIn || !email.trim() || !password.trim())
                  ? 'bg-white/[0.02] border-white/[0.05] text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500/10 border-blue-400/20 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:text-white'
                  }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isLoggingIn ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span className="animate-pulse tracking-widest">{loginStatus.toUpperCase()}</span>
                    </>
                  ) : (
                    'LOGIN'
                  )}
                </span>
                {!isLoggingIn && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                )}
                {isLoggingIn && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/15 to-transparent animate-[shimmer_1s_infinite]" />
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Forgot Password Modal */}
        <AnimatePresence>
          {showForgotPassword && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              onClick={() => setShowForgotPassword(false)}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

              {/* Modal Card */}
              <m.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[440px] bg-[#0d1017]/95 backdrop-blur-2xl border border-white/[0.1] rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden"
              >
                {/* Ambient Glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/15 rounded-full blur-[80px] pointer-events-none" />

                {/* Header */}
                <div className="relative px-8 pt-8 pb-4 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-blue-400" />
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-tight">Forgot Password?</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Don't worry! Contact our team and we'll help you regain access to your account.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowForgotPassword(false)}
                    className="shrink-0 ml-4 mt-1 w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-gray-500 hover:text-white hover:bg-white/[0.08] transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Contact Methods */}
                <div className="relative px-8 pb-8 pt-2 space-y-4">
                  {/* Email */}
                  <a
                    href="mailto:nexoraa.works@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-blue-500/[0.08] hover:border-blue-500/30 transition-all group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Email Us</p>
                      <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors truncate">nexoraa.works@gmail.com</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-blue-400 shrink-0 ml-auto transition-colors" />
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+917383303388"
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-emerald-500/[0.08] hover:border-emerald-500/30 transition-all group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-all">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Call Us</p>
                      <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">+91 7383303388</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-emerald-400 shrink-0 ml-auto transition-colors" />
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/917383303388?text=Hi%20Nexora%2C%20I%20forgot%20my%20Client%20Portal%20password.%20Can%20you%20help%20me%20reset%20it%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-green-500/[0.08] hover:border-green-500/30 transition-all group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 group-hover:border-green-500/40 transition-all">
                      <MessageCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">WhatsApp</p>
                      <p className="text-sm font-semibold text-white group-hover:text-green-300 transition-colors">Message us on WhatsApp</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-green-400 shrink-0 ml-auto transition-colors" />
                  </a>

                  {/* Divider + Note */}
                  <div className="pt-2 border-t border-white/[0.06]">
                    <p className="text-[11px] text-gray-500 leading-relaxed text-center">
                      Our team typically responds within <span className="text-white font-semibold">30 minutes</span> during business hours (10 AM – 8 PM IST).
                    </p>
                  </div>
                </div>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // --- POST-LOGIN DASHBOARD ---
  return (
    <PortalProvider>
      <PortalDashboardContent
        clientInfo={clientInfo}
        projects={projects}
        milestones={milestones}
        invoices={invoices}
        deliverables={deliverables}
        messages={messages}
        setMessages={setMessages}
        handleSendMessage={handleSendMessage}
        handleSignOut={handleSignOut}
      />
    </PortalProvider>
  );
}
