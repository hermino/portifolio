-- Projects
CREATE TABLE projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  client text,
  description text,
  technologies text[],
  categories text[],
  github_url text,
  live_url text,
  is_featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Skills
CREATE TABLE skills (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Experiences
CREATE TABLE experiences (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  company text NOT NULL,
  role text NOT NULL,
  period text NOT NULL,
  description text,
  technologies text[],
  activities text[],
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Contact messages
CREATE TABLE contact_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Leitura pública para dados do portfólio
CREATE POLICY "Public read" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read" ON experiences FOR SELECT USING (true);

-- Admin: escrita apenas para usuários autenticados
CREATE POLICY "Admin write" ON projects FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin write" ON skills FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin write" ON experiences FOR ALL USING (auth.uid() IS NOT NULL);

-- Contatos: qualquer um insere, só admin lê/atualiza
CREATE POLICY "Public insert" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read" ON contact_messages FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin update" ON contact_messages FOR UPDATE USING (auth.uid() IS NOT NULL);
