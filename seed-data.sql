-- Insert default achievements
INSERT INTO achievements (name, description, icon, requirement_type, requirement_value) VALUES
('First Steps', 'Complete your first check-in', 'star', 'checkins', 1),
('Getting Started', 'Complete 5 check-ins', 'target', 'checkins', 5),
('Week Warrior', '7-day check-in streak', 'flame', 'streak', 7),
('Consistency King', '14-day check-in streak', 'flame', 'streak', 14),
('Month Master', '30-day check-in streak', 'trophy', 'streak', 30),
('Level 2 Achiever', 'Reach level 2', 'zap', 'level', 2),
('Level 5 Hero', 'Reach level 5', 'zap', 'level', 5),
('Level 10 Legend', 'Reach level 10', 'trophy', 'level', 10),
('Mood Tracker', 'Track your mood for 10 days', 'heart', 'checkins', 10),
('Goal Setter', 'Set 25 goals', 'target', 'goals', 25)
ON CONFLICT DO NOTHING;

-- Insert a default user
INSERT INTO users (username, email, xp, level, current_streak, longest_streak, mood, last_checkin) VALUES
('Alex', 'alex@example.com', 150, 2, 7, 12, 'great', CURRENT_TIMESTAMP - INTERVAL '1 day')
ON CONFLICT (email) DO NOTHING;

-- Insert some sample check-ins for the default user
INSERT INTO check_ins (user_id, mood, energy, productivity, notes, goals) VALUES
(1, 'great', 8, 7, 'Had a productive day working on projects', '["Complete dashboard", "Exercise for 30 mins", "Read for 1 hour"]'),
(1, 'good', 7, 8, 'Focused well today, got a lot done', '["Finish API endpoints", "Team meeting", "Plan weekend"]'),
(1, 'amazing', 9, 9, 'Everything went perfectly today!', '["Launch new feature", "Celebrate with team", "Prepare presentation"]')
ON CONFLICT DO NOTHING;

-- Unlock some achievements for the default user
INSERT INTO user_achievements (user_id, achievement_id, unlocked_at) VALUES
(1, 1, CURRENT_TIMESTAMP - INTERVAL '7 days'),
(1, 2, CURRENT_TIMESTAMP - INTERVAL '5 days'),
(1, 3, CURRENT_TIMESTAMP - INTERVAL '1 day'),
(1, 6, CURRENT_TIMESTAMP - INTERVAL '3 days')
ON CONFLICT DO NOTHING;
