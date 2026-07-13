-- Olympic Gym Database Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT/sql

-- Plans table
CREATE TABLE plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  duration_months INTEGER NOT NULL,
  price INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default plans
INSERT INTO plans (name, duration_months, price) VALUES
  ('Monthly', 1, 500),
  ('Quarterly', 3, 1400),
  ('Annual', 12, 5000);

-- Members table
CREATE TABLE members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  town TEXT NOT NULL,
  photo_url TEXT,
  plan TEXT NOT NULL CHECK (plan IN ('monthly', 'quarterly', 'annual')),
  fee_amount INTEGER NOT NULL,
  start_date DATE NOT NULL,
  next_due_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for due date queries
CREATE INDEX idx_members_next_due_date ON members(next_due_date);
CREATE INDEX idx_members_is_active ON members(is_active);

-- Enable Row Level Security (RLS)
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

-- Allow all operations for authenticated users (admin)
CREATE POLICY "Allow all for anon" ON members FOR ALL USING (true);
CREATE POLICY "Allow read for anon" ON plans FOR SELECT USING (true);

-- Create storage bucket for member photos
-- Do this manually in Supabase Dashboard > Storage > New Bucket
-- Bucket name: member-photos
-- Make it public
