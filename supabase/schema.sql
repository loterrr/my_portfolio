-- Feedback Table
CREATE TABLE IF NOT EXISTS feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  stars INTEGER NOT NULL CHECK (stars >= 1 AND stars <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security (RLS)
-- To allow public insertions (anon access), run these:
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert feedbacks" ON feedbacks FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert contact_submissions" ON contact_submissions FOR INSERT WITH CHECK (true);

-- To allow you to view them in the dashboard, run these:
CREATE POLICY "Allow admin select feedbacks" ON feedbacks FOR SELECT USING (true);
CREATE POLICY "Allow admin select contact_submissions" ON contact_submissions FOR SELECT USING (true);

-- Added for moderation support:
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT false;
