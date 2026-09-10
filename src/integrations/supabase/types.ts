export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      chunks: {
        Row: {
          chunk_id: string
          created_at: string | null
          id: string
          last_reviewed_at: string | null
          mastery_level: number | null
          next_review_date: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          chunk_id: string
          created_at?: string | null
          id?: string
          last_reviewed_at?: string | null
          mastery_level?: number | null
          next_review_date?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          chunk_id?: string
          created_at?: string | null
          id?: string
          last_reviewed_at?: string | null
          mastery_level?: number | null
          next_review_date?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      lessons: {
        Row: {
          category: string
          character_name: string
          created_at: string | null
          expected_response: string
          id: string
          language: string
          level: number
          message_text: string
          phonetic_hint: string | null
          sort_order: number | null
        }
        Insert: {
          category: string
          character_name: string
          created_at?: string | null
          expected_response: string
          id?: string
          language?: string
          level?: number
          message_text: string
          phonetic_hint?: string | null
          sort_order?: number | null
        }
        Update: {
          category?: string
          character_name?: string
          created_at?: string | null
          expected_response?: string
          id?: string
          language?: string
          level?: number
          message_text?: string
          phonetic_hint?: string | null
          sort_order?: number | null
        }
        Relationships: []
      }
      learning_scenarios: {
        Row: {
          context_pt: string | null
          created_at: string | null
          description: string | null
          id: string
          language: string
          level: string
          slug: string
          sort_order: number
          status: string
          title: string
        }
        Insert: {
          context_pt?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          language: string
          level: string
          slug: string
          sort_order?: number
          status?: string
          title: string
        }
        Update: {
          context_pt?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          language?: string
          level?: string
          slug?: string
          sort_order?: number
          status?: string
          title?: string
        }
        Relationships: []
      }
      scenario_characters: {
        Row: {
          avatar_key: string | null
          id: string
          name: string
          role: string | null
          scenario_id: string
          voice_key: string | null
        }
        Insert: {
          avatar_key?: string | null
          id?: string
          name: string
          role?: string | null
          scenario_id: string
          voice_key?: string | null
        }
        Update: {
          avatar_key?: string | null
          id?: string
          name?: string
          role?: string | null
          scenario_id?: string
          voice_key?: string | null
        }
        Relationships: []
      }
      learning_steps: {
        Row: {
          audio_text: string | null
          completion_rule: string
          created_at: string | null
          hint_level_1: string | null
          hint_level_2: string | null
          id: string
          prompt_en: string | null
          scenario_id: string
          sequence: number
          speaker_character_id: string | null
          step_type: string
          support_pt: string | null
          target_phrase: string | null
        }
        Insert: {
          audio_text?: string | null
          completion_rule: string
          created_at?: string | null
          hint_level_1?: string | null
          hint_level_2?: string | null
          id?: string
          prompt_en?: string | null
          scenario_id: string
          sequence: number
          speaker_character_id?: string | null
          step_type: string
          support_pt?: string | null
          target_phrase?: string | null
        }
        Update: {
          audio_text?: string | null
          completion_rule?: string
          created_at?: string | null
          hint_level_1?: string | null
          hint_level_2?: string | null
          id?: string
          prompt_en?: string | null
          scenario_id?: string
          sequence?: number
          speaker_character_id?: string | null
          step_type?: string
          support_pt?: string | null
          target_phrase?: string | null
        }
        Relationships: []
      }
      step_expected_responses: {
        Row: {
          id: string
          is_primary: boolean
          match_type: string
          normalized_text: string
          response_text: string
          step_id: string
        }
        Insert: {
          id?: string
          is_primary?: boolean
          match_type: string
          normalized_text: string
          response_text: string
          step_id: string
        }
        Update: {
          id?: string
          is_primary?: boolean
          match_type?: string
          normalized_text?: string
          response_text?: string
          step_id?: string
        }
        Relationships: []
      }
      learning_sessions: {
        Row: {
          completed_at: string | null
          current_step_id: string | null
          id: string
          scenario_id: string
          started_at: string | null
          status: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          current_step_id?: string | null
          id?: string
          scenario_id: string
          started_at?: string | null
          status?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          current_step_id?: string | null
          id?: string
          scenario_id?: string
          started_at?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      step_attempts: {
        Row: {
          created_at: string | null
          hint_level_used: number | null
          id: string
          match_score: number | null
          normalized_transcript: string | null
          result: string
          session_id: string
          step_id: string
          transcript: string | null
        }
        Insert: {
          created_at?: string | null
          hint_level_used?: number | null
          id?: string
          match_score?: number | null
          normalized_transcript?: string | null
          result: string
          session_id: string
          step_id: string
          transcript?: string | null
        }
        Update: {
          created_at?: string | null
          hint_level_used?: number | null
          id?: string
          match_score?: number | null
          normalized_transcript?: string | null
          result?: string
          session_id?: string
          step_id?: string
          transcript?: string | null
        }
        Relationships: []
      }
      user_scenario_progress: {
        Row: {
          best_score: number | null
          completed_at: string | null
          completed_steps: number
          last_attempt_at: string | null
          last_step_id: string | null
          scenario_id: string
          status: string
          user_id: string
        }
        Insert: {
          best_score?: number | null
          completed_at?: string | null
          completed_steps?: number
          last_attempt_at?: string | null
          last_step_id?: string | null
          scenario_id: string
          status?: string
          user_id: string
        }
        Update: {
          best_score?: number | null
          completed_at?: string | null
          completed_steps?: number
          last_attempt_at?: string | null
          last_step_id?: string | null
          scenario_id?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          app_mode: string | null
          created_at: string | null
          daily_timer_seconds: number | null
          display_name: string | null
          id: string
          last_lesson_date: string | null
          skill_level: number | null
          streak_count: number | null
          updated_at: string | null
        }
        Insert: {
          app_mode?: string | null
          created_at?: string | null
          daily_timer_seconds?: number | null
          display_name?: string | null
          id: string
          last_lesson_date?: string | null
          skill_level?: number | null
          streak_count?: number | null
          updated_at?: string | null
        }
        Update: {
          app_mode?: string | null
          created_at?: string | null
          daily_timer_seconds?: number | null
          display_name?: string | null
          id?: string
          last_lesson_date?: string | null
          skill_level?: number | null
          streak_count?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
