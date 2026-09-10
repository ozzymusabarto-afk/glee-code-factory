-- Scenario Engine foundation. Existing lessons remain untouched.
CREATE TABLE public.learning_scenarios (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    slug text NOT NULL UNIQUE,
    language text NOT NULL,
    level text NOT NULL,
    title text NOT NULL,
    description text,
    context_pt text,
    status text NOT NULL DEFAULT 'draft',
    sort_order integer NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE public.scenario_characters (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    scenario_id uuid NOT NULL REFERENCES public.learning_scenarios(id) ON DELETE CASCADE,
    name text NOT NULL,
    role text,
    avatar_key text,
    voice_key text
);

CREATE TABLE public.learning_steps (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    scenario_id uuid NOT NULL REFERENCES public.learning_scenarios(id) ON DELETE CASCADE,
    sequence integer NOT NULL,
    step_type text NOT NULL CHECK (step_type IN (
        'context', 'listen', 'repeat', 'choice', 'guided_speak', 'free_speak', 'recap'
    )),
    speaker_character_id uuid REFERENCES public.scenario_characters(id),
    prompt_en text,
    support_pt text,
    target_phrase text,
    hint_level_1 text,
    hint_level_2 text,
    audio_text text,
    completion_rule text NOT NULL CHECK (completion_rule IN (
        'single_accept', 'choice_correct', 'all_required_terms'
    )),
    created_at timestamptz DEFAULT now(),
    CONSTRAINT learning_steps_scenario_sequence_key UNIQUE (scenario_id, sequence)
);

CREATE TABLE public.step_expected_responses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    step_id uuid NOT NULL REFERENCES public.learning_steps(id) ON DELETE CASCADE,
    response_text text NOT NULL,
    normalized_text text NOT NULL,
    match_type text NOT NULL CHECK (match_type IN (
        'exact', 'normalized', 'contains_required_terms', 'accepted_variant'
    )),
    is_primary boolean NOT NULL DEFAULT false
);

CREATE TABLE public.learning_sessions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    scenario_id uuid NOT NULL REFERENCES public.learning_scenarios(id) ON DELETE CASCADE,
    status text NOT NULL DEFAULT 'active',
    current_step_id uuid REFERENCES public.learning_steps(id),
    started_at timestamptz DEFAULT now(),
    completed_at timestamptz
);

CREATE TABLE public.step_attempts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id uuid NOT NULL REFERENCES public.learning_sessions(id) ON DELETE CASCADE,
    step_id uuid NOT NULL REFERENCES public.learning_steps(id) ON DELETE CASCADE,
    transcript text,
    normalized_transcript text,
    match_score numeric,
    result text NOT NULL CHECK (result IN (
        'accepted', 'near_match', 'retry', 'recognition_error', 'skipped'
    )),
    hint_level_used integer DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE public.user_scenario_progress (
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    scenario_id uuid NOT NULL REFERENCES public.learning_scenarios(id) ON DELETE CASCADE,
    status text NOT NULL DEFAULT 'not_started',
    completed_steps integer NOT NULL DEFAULT 0,
    best_score numeric,
    last_step_id uuid REFERENCES public.learning_steps(id),
    last_attempt_at timestamptz,
    completed_at timestamptz,
    PRIMARY KEY (user_id, scenario_id)
);

CREATE INDEX learning_sessions_user_scenario_idx ON public.learning_sessions (user_id, scenario_id);
CREATE INDEX step_attempts_session_step_idx ON public.step_attempts (session_id, step_id);

-- Catalog content follows the existing lessons policy: authenticated users can read it.
GRANT SELECT ON public.learning_scenarios, public.scenario_characters, public.learning_steps, public.step_expected_responses TO authenticated;
GRANT ALL ON public.learning_scenarios, public.scenario_characters, public.learning_steps, public.step_expected_responses TO service_role;

ALTER TABLE public.learning_scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenario_characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.step_expected_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read learning scenarios" ON public.learning_scenarios
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read scenario characters" ON public.scenario_characters
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read learning steps" ON public.learning_steps
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read expected responses" ON public.step_expected_responses
    FOR SELECT TO authenticated USING (true);

-- User learning data is reserved for the future real Supabase session. No development-auth bypass is added.
GRANT SELECT, INSERT, UPDATE ON public.learning_sessions, public.step_attempts, public.user_scenario_progress TO authenticated;
GRANT ALL ON public.learning_sessions, public.step_attempts, public.user_scenario_progress TO service_role;

ALTER TABLE public.learning_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.step_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_scenario_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own learning sessions" ON public.learning_sessions
    FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create own learning sessions" ON public.learning_sessions
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own learning sessions" ON public.learning_sessions
    FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own step attempts" ON public.step_attempts
    FOR SELECT TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.learning_sessions sessions
            WHERE sessions.id = step_attempts.session_id AND sessions.user_id = auth.uid()
        )
    );
CREATE POLICY "Users can create own step attempts" ON public.step_attempts
    FOR INSERT TO authenticated WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.learning_sessions sessions
            WHERE sessions.id = step_attempts.session_id AND sessions.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view own scenario progress" ON public.user_scenario_progress
    FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create own scenario progress" ON public.user_scenario_progress
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own scenario progress" ON public.user_scenario_progress
    FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

INSERT INTO public.learning_scenarios (
    slug, language, level, title, description, context_pt, status, sort_order
) VALUES (
    'first-contact-meeting-someone',
    'en',
    'A0',
    'Primeiro contato: conhecer alguém',
    'Aprenda a cumprimentar alguém, dizer seu nome e responder como você está.',
    'Você encontrou Alex no saguão do hotel.',
    'published',
    1
);

INSERT INTO public.scenario_characters (scenario_id, name, role)
SELECT id, 'Alex', 'interlocutor'
FROM public.learning_scenarios
WHERE slug = 'first-contact-meeting-someone';

INSERT INTO public.learning_steps (
    scenario_id, sequence, step_type, speaker_character_id, prompt_en, support_pt,
    target_phrase, hint_level_1, hint_level_2, audio_text, completion_rule
)
SELECT
    scenario.id,
    seed.sequence,
    seed.step_type,
    CASE WHEN seed.uses_alex THEN alex.id ELSE NULL END,
    seed.prompt_en,
    seed.support_pt,
    seed.target_phrase,
    seed.hint_level_1,
    seed.hint_level_2,
    seed.audio_text,
    seed.completion_rule
FROM public.learning_scenarios scenario
CROSS JOIN LATERAL (
    SELECT id FROM public.scenario_characters
    WHERE scenario_id = scenario.id AND name = 'Alex'
) alex
CROSS JOIN (
    VALUES
        (1, 'context', false, NULL, 'Você encontrou Alex no saguão do hotel.', NULL, 'Observe a situação.', 'Quando estiver pronto, continue.', NULL, 'single_accept'),
        (2, 'listen', true, 'Hello!', NULL, NULL, 'Ouça a saudação de Alex.', 'Ouça novamente e preste atenção à palavra.', 'Hello!', 'single_accept'),
        (3, 'repeat', true, 'Hello!', 'Repita a saudação de Alex.', 'Hello!', 'Diga a mesma saudação.', 'Use uma única palavra: Hello.', 'Hello!', 'single_accept'),
        (4, 'choice', false, 'Alex said hello.', 'Alex cumprimentou você.', 'Alex said hello.', 'Escolha o significado da situação.', 'Pense no que Alex disse no passo anterior.', NULL, 'choice_correct'),
        (5, 'listen', true, 'What''s your name?', NULL, NULL, 'Ouça a pergunta de Alex.', 'Ouça novamente e identifique a pergunta sobre seu nome.', 'What''s your name?', 'single_accept'),
        (6, 'guided_speak', false, 'My name is ____.', 'Complete a frase com seu nome.', 'My name is ____.', 'Comece com: My name is.', 'Diga: My name is e complete com seu nome.', 'My name is', 'all_required_terms'),
        (7, 'free_speak', false, 'Answer Alex with your own name.', 'Responda usando seu próprio nome.', 'My name is [your name].', 'Use as palavras: My name is.', 'Diga My name is e depois o seu nome.', 'My name is [your name].', 'all_required_terms'),
        (8, 'listen', true, 'How are you?', NULL, NULL, 'Ouça como Alex pergunta como você está.', 'Ouça novamente a pergunta de Alex.', 'How are you?', 'single_accept'),
        (9, 'guided_speak', false, 'I’m good, thank you.', 'Use uma resposta curta e educada.', 'I’m good, thank you.', 'Comece com: I’m good.', 'Complete com: thank you ou thanks.', 'I’m good, thank you.', 'single_accept'),
        (10, 'recap', true, 'Alex: Hello!\nYou: Hello!\nAlex: What''s your name?\nYou: My name is [name].', NULL, NULL, 'Reply after each line.', 'Use the phrases from the previous steps.', 'Hello! What''s your name?', 'single_accept')
) AS seed(
    sequence, step_type, uses_alex, prompt_en, support_pt, target_phrase,
    hint_level_1, hint_level_2, audio_text, completion_rule
)
WHERE scenario.slug = 'first-contact-meeting-someone';

INSERT INTO public.step_expected_responses (step_id, response_text, normalized_text, match_type, is_primary)
SELECT step.id, seed.response_text, seed.normalized_text, seed.match_type, seed.is_primary
FROM public.learning_steps step
JOIN public.learning_scenarios scenario ON scenario.id = step.scenario_id
JOIN (
    VALUES
        (3, 'Hello!', 'hello', 'normalized', true),
        (4, 'Alex said hello.', 'alex said hello', 'exact', true),
        (4, 'Alex asked your name.', 'alex asked your name', 'exact', false),
        (4, 'Alex said goodbye.', 'alex said goodbye', 'exact', false),
        (6, 'My name is [your name].', 'my name is', 'contains_required_terms', true),
        (7, 'My name is [your name].', 'my name is', 'contains_required_terms', true),
        (9, 'I’m good, thank you.', 'im good thank you', 'normalized', true),
        (9, 'I’m good, thanks.', 'im good thanks', 'accepted_variant', false),
        (9, 'I am good, thank you.', 'i am good thank you', 'accepted_variant', false),
        (9, 'I am good, thanks.', 'i am good thanks', 'accepted_variant', false)
) AS seed(sequence, response_text, normalized_text, match_type, is_primary)
    ON seed.sequence = step.sequence
WHERE scenario.slug = 'first-contact-meeting-someone';
