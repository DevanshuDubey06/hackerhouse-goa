-- ============================================================
-- HACKER HOUSE GOA 2026 — Database Schema
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- BUILDERS
-- ============================================================
CREATE TABLE builders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  public_id VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  stack VARCHAR(120),
  location VARCHAR(120),
  builder_class VARCHAR(50) NOT NULL,
  frame_style VARCHAR(30) DEFAULT 'monsoon',
  frame_format VARCHAR(30) DEFAULT 'portrait',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_builders_public_id ON builders(public_id);
CREATE INDEX idx_builders_created_at ON builders(created_at DESC);

-- ============================================================
-- GENERATED FRAMES
-- ============================================================
CREATE TABLE generated_frames (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  builder_id UUID REFERENCES builders(id) ON DELETE CASCADE,
  frame_type VARCHAR(30) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_frames_builder ON generated_frames(builder_id);

-- ============================================================
-- TEAMS
-- ============================================================
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  public_id VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_teams_public_id ON teams(public_id);

-- ============================================================
-- TEAM MEMBERS
-- ============================================================
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  builder_id UUID REFERENCES builders(id) ON DELETE SET NULL,
  position INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_team_members_team ON team_members(team_id);

-- ============================================================
-- RADAR FEATURES
-- ============================================================
CREATE TABLE radar_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  builder_id UUID REFERENCES builders(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'featured', 'rejected')),
  source VARCHAR(30),
  post_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ
);

CREATE INDEX idx_radar_status ON radar_features(status);
CREATE INDEX idx_radar_builder ON radar_features(builder_id);

-- ============================================================
-- LEADERBOARD ENTRIES
-- ============================================================
CREATE TABLE leaderboard_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  builder_id UUID REFERENCES builders(id) ON DELETE CASCADE,
  score INT DEFAULT 0,
  rank INT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_leaderboard_score ON leaderboard_entries(score DESC);
CREATE INDEX idx_leaderboard_builder ON leaderboard_entries(builder_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE builders ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_frames ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE radar_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_entries ENABLE ROW LEVEL SECURITY;

-- Public read access for builders
CREATE POLICY "Public read builders"
  ON builders FOR SELECT
  USING (true);

-- Allow insert for anonymous users
CREATE POLICY "Public insert builders"
  ON builders FOR INSERT
  WITH CHECK (true);

-- Public read for teams
CREATE POLICY "Public read teams"
  ON teams FOR SELECT
  USING (true);

CREATE POLICY "Public insert teams"
  ON teams FOR INSERT
  WITH CHECK (true);

-- Public read for team members
CREATE POLICY "Public read team_members"
  ON team_members FOR SELECT
  USING (true);

CREATE POLICY "Public insert team_members"
  ON team_members FOR INSERT
  WITH CHECK (true);

-- Public read for approved radar features only
CREATE POLICY "Public read approved radar"
  ON radar_features FOR SELECT
  USING (status IN ('approved', 'featured'));

CREATE POLICY "Public insert radar"
  ON radar_features FOR INSERT
  WITH CHECK (true);

-- Public read for leaderboard
CREATE POLICY "Public read leaderboard"
  ON leaderboard_entries FOR SELECT
  USING (true);

-- Public read for generated frames
CREATE POLICY "Public read frames"
  ON generated_frames FOR SELECT
  USING (true);

CREATE POLICY "Public insert frames"
  ON generated_frames FOR INSERT
  WITH CHECK (true);
