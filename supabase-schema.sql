-- Olympic Gym Database Schema
-- Run this in Supabase SQL Editor

-- Members table
CREATE TABLE members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  town TEXT NOT NULL,
  photo_url TEXT,
  plan_type TEXT NOT NULL DEFAULT 'gym' CHECK (plan_type IN ('gym', 'pt')),
  plan TEXT NOT NULL CHECK (plan IN ('monthly', 'quarterly', 'half_yearly')),
  fee_amount INTEGER NOT NULL,
  start_date DATE NOT NULL,
  next_due_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_members_next_due_date ON members(next_due_date);
CREATE INDEX idx_members_is_active ON members(is_active);
CREATE INDEX idx_members_plan_type ON members(plan_type);

-- Enable Row Level Security
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Allow all operations (since we control access via admin login)
CREATE POLICY "Allow all for anon" ON members FOR ALL USING (true) WITH CHECK (true);
