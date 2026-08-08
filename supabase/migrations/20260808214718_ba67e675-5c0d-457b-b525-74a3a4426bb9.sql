-- Create 'lessons' table
CREATE TABLE IF NOT EXISTS public.lessons (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    language text NOT NULL DEFAULT 'en',
    category text NOT NULL,
    level integer NOT NULL DEFAULT 1,
    character_name text NOT NULL,
    message_text text NOT NULL,
    expected_response text NOT NULL,
    phonetic_hint text,
    sort_order integer DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

-- Grant access
GRANT SELECT ON public.lessons TO authenticated;
GRANT ALL ON public.lessons TO service_role;

-- Enable RLS
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

-- Public read access for authenticated users
CREATE POLICY "Allow authenticated read on lessons" ON public.lessons
    FOR SELECT TO authenticated USING (true);

-- Seed initial data
INSERT INTO public.lessons (language, category, level, character_name, message_text, expected_response, phonetic_hint)
VALUES 
('en', 'survival', 1, 'Poly', 'Hello! How are you today?', 'I am fine, thank you', 'Try saying: I am fine, thank you'),
('en', 'survival', 1, 'Poly', 'Nice to meet you. What is your name?', 'My name is Poly', 'Say: My name is Poly'),
('en', 'survival', 1, 'Poly', 'Where are you from?', 'I am from Brazil', 'Try: I am from Brazil'),
('en', 'airport', 2, 'Officer', 'Good morning. May I see your passport, please?', 'Yes, here is my passport', 'Try: Yes, here is my passport'),
('en', 'airport', 2, 'Officer', 'What is the purpose of your visit?', 'I am here for vacation', 'Try: I am here for vacation'),
('en', 'airport', 2, 'Officer', 'How long do you plan to stay?', 'I will stay for two weeks', 'Try: I will stay for two weeks');

-- Add columns to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS skill_level integer DEFAULT 1;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS display_name text;
