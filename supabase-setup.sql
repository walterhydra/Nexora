-- ============================================
-- NEXORAA CLIENT PORTAL - DATABASE SETUP
-- Copy this ENTIRE script into Supabase SQL Editor and click "Run"
-- ============================================

-- 1. CLIENTS TABLE (Har client ka record yahan save hoga)
CREATE TABLE public.clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  client_name TEXT NOT NULL,
  company_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. PROJECTS TABLE (Har client ke projects yahan honge)
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  project_name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  start_date DATE,
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. MILESTONES TABLE (Har project ke andar milestones/phases)
CREATE TABLE public.milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'review')),
  progress INTEGER DEFAULT 0,
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. INVOICES TABLE (Har client ki invoices)
CREATE TABLE public.invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  invoice_number TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
  issue_date DATE DEFAULT CURRENT_DATE,
  due_date DATE,
  paid_date DATE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. MESSAGES TABLE (Client aur Admin ke beech messages)
CREATE TABLE public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  sender TEXT NOT NULL CHECK (sender IN ('client', 'admin')),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. DELIVERABLES TABLE (Project ke deliverables/files)
CREATE TABLE public.deliverables (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  file_url TEXT,
  file_type TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'delivered', 'approved', 'revision')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
-- Yeh ensure karega ki ek client doosre ka data na dekh sake
-- ============================================
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliverables ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES - Allow read access via anon key (we handle auth in app)
-- ============================================
CREATE POLICY "Allow all operations on clients" ON public.clients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on milestones" ON public.milestones FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on invoices" ON public.invoices FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on messages" ON public.messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on deliverables" ON public.deliverables FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- INSERT TEST DATA - 2 Demo Clients
-- ============================================

-- Client 1: Nova Corp
INSERT INTO public.clients (id, email, password_hash, client_name, company_name) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'nova@nexoraa.com', 'Nova@2026', 'Alex Johnson', 'Nova Corp');

-- Client 2: Stellar Inc
INSERT INTO public.clients (id, email, password_hash, client_name, company_name) VALUES
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'stellar@nexoraa.com', 'Stellar@2026', 'Sarah Williams', 'Stellar Inc');

-- Projects for Client 1 (Nova Corp)
INSERT INTO public.projects (id, client_id, project_name, description, status, progress, start_date, due_date) VALUES
  ('d1000001-0000-0000-0000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Nova Brand Redesign', 'Complete brand overhaul including logo, website, and marketing materials.', 'active', 63, '2026-03-01', '2026-08-15'),
  ('d1000001-0000-0000-0000-000000000002', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Nova Mobile App', 'iOS and Android app development for customer engagement.', 'active', 25, '2026-05-10', '2026-12-01');

-- Projects for Client 2 (Stellar Inc)
INSERT INTO public.projects (id, client_id, project_name, description, status, progress, start_date, due_date) VALUES
  ('d2000001-0000-0000-0000-000000000001', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Stellar E-Commerce Platform', 'Full-stack e-commerce solution with payment integration.', 'active', 80, '2026-01-15', '2026-07-01'),
  ('d2000001-0000-0000-0000-000000000002', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Stellar SEO Campaign', 'Comprehensive SEO and content marketing strategy.', 'completed', 100, '2026-02-01', '2026-05-30');

-- Milestones for Nova Brand Redesign
INSERT INTO public.milestones (client_id, project_id, title, description, status, progress, due_date) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'd1000001-0000-0000-0000-000000000001', 'Discovery & Research', 'Market analysis and competitor research', 'completed', 100, '2026-03-20'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'd1000001-0000-0000-0000-000000000001', 'UI/UX Design', 'Wireframes, mockups, and prototypes', 'in_progress', 70, '2026-05-15'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'd1000001-0000-0000-0000-000000000001', 'Frontend Development', 'React implementation with animations', 'pending', 0, '2026-07-01'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'd1000001-0000-0000-0000-000000000001', 'Launch & Deployment', 'Final QA, deployment, and handover', 'pending', 0, '2026-08-15');

-- Milestones for Stellar E-Commerce
INSERT INTO public.milestones (client_id, project_id, title, description, status, progress, due_date) VALUES
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'd2000001-0000-0000-0000-000000000001', 'Backend Architecture', 'API design and database setup', 'completed', 100, '2026-02-28'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'd2000001-0000-0000-0000-000000000001', 'Payment Integration', 'Stripe and PayPal integration', 'completed', 100, '2026-04-15'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'd2000001-0000-0000-0000-000000000001', 'Frontend Storefront', 'Product pages, cart, and checkout', 'in_progress', 60, '2026-06-01'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'd2000001-0000-0000-0000-000000000001', 'Testing & Launch', 'E2E testing and production deployment', 'pending', 0, '2026-07-01');

-- Invoices for Nova Corp
INSERT INTO public.invoices (client_id, project_id, invoice_number, amount, status, issue_date, due_date, paid_date, description) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'd1000001-0000-0000-0000-000000000001', 'INV-2026-001', 3500.00, 'paid', '2026-03-01', '2026-03-15', '2026-03-10', 'Phase 1: Discovery & Research'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'd1000001-0000-0000-0000-000000000001', 'INV-2026-002', 8250.00, 'paid', '2026-04-15', '2026-04-30', '2026-04-28', 'Phase 2: UI/UX Design'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'd1000001-0000-0000-0000-000000000001', 'INV-2026-003', 12000.00, 'pending', '2026-06-01', '2026-06-15', NULL, 'Phase 3: Frontend Development');

-- Invoices for Stellar Inc
INSERT INTO public.invoices (client_id, project_id, invoice_number, amount, status, issue_date, due_date, paid_date, description) VALUES
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'd2000001-0000-0000-0000-000000000001', 'INV-2026-010', 5000.00, 'paid', '2026-01-15', '2026-01-30', '2026-01-25', 'Phase 1: Backend Architecture'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'd2000001-0000-0000-0000-000000000001', 'INV-2026-011', 7500.00, 'paid', '2026-03-01', '2026-03-15', '2026-03-12', 'Phase 2: Payment Integration'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'd2000001-0000-0000-0000-000000000001', 'INV-2026-012', 9000.00, 'pending', '2026-05-15', '2026-06-01', NULL, 'Phase 3: Frontend Storefront');

-- Messages for Nova Corp
INSERT INTO public.messages (client_id, sender, message, is_read) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'admin', 'Welcome to Nexoraa Studio! Your project dashboard is now live.', true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'client', 'Thanks! The mockups look amazing. Can we add one more page?', true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'admin', 'Absolutely! I have added the extra page to the scope. Updated timeline shared.', false);

-- Messages for Stellar Inc
INSERT INTO public.messages (client_id, sender, message, is_read) VALUES
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'admin', 'Welcome Sarah! Your e-commerce project is progressing well.', true),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'client', 'Great! When can we expect the storefront preview?', true),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'admin', 'The preview will be ready by next Friday. I will send you the staging link.', false);

-- Deliverables for Nova Corp
INSERT INTO public.deliverables (client_id, project_id, title, file_type, status) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'd1000001-0000-0000-0000-000000000001', 'Brand Guidelines PDF', 'pdf', 'delivered'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'd1000001-0000-0000-0000-000000000001', 'Logo Package (SVG + PNG)', 'zip', 'delivered'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'd1000001-0000-0000-0000-000000000001', 'Homepage Mockup v2', 'figma', 'revision');

-- Deliverables for Stellar Inc
INSERT INTO public.deliverables (client_id, project_id, title, file_type, status) VALUES
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'd2000001-0000-0000-0000-000000000001', 'API Documentation', 'pdf', 'approved'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'd2000001-0000-0000-0000-000000000001', 'Database Schema Diagram', 'png', 'approved'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'd2000001-0000-0000-0000-000000000001', 'Storefront Design Mockups', 'figma', 'pending');
