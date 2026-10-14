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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      audio_sessions: {
        Row: {
          completed_at: string | null
          lead_id: string
          started_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          lead_id: string
          started_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          lead_id?: string
          started_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audio_sessions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_events: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          department: Database["public"]["Enums"]["department"] | null
          id: string
          lead_id: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          department?: Database["public"]["Enums"]["department"] | null
          id?: string
          lead_id: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          department?: Database["public"]["Enums"]["department"] | null
          id?: string
          lead_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_events_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          address: string
          audio_duration: number | null
          audio_path: string | null
          claimed_by: string | null
          contact: string
          created_at: string
          created_by: string | null
          id: string
          meeting_date: string | null
          meeting_time: string | null
          name: string
          reference: number
          remark: string
          stage: Database["public"]["Enums"]["department"]
          updated_at: string
        }
        Insert: {
          address?: string
          audio_duration?: number | null
          audio_path?: string | null
          claimed_by?: string | null
          contact: string
          created_at?: string
          created_by?: string | null
          id?: string
          meeting_date?: string | null
          meeting_time?: string | null
          name: string
          reference?: never
          remark?: string
          stage?: Database["public"]["Enums"]["department"]
          updated_at?: string
        }
        Update: {
          address?: string
          audio_duration?: number | null
          audio_path?: string | null
          claimed_by?: string | null
          contact?: string
          created_at?: string
          created_by?: string | null
          id?: string
          meeting_date?: string | null
          meeting_time?: string | null
          name?: string
          reference?: never
          remark?: string
          stage?: Database["public"]["Enums"]["department"]
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          role: Database["public"]["Enums"]["department"]
          user_id: string
        }
        Insert: {
          role: Database["public"]["Enums"]["department"]
          user_id: string
        }
        Update: {
          role?: Database["public"]["Enums"]["department"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      crm_advance: {
        Args: {
          p_address?: string
          p_address_verified?: boolean
          p_audio?: string
          p_date?: string
          p_date_verified?: boolean
          p_duration?: number
          p_id: string
          p_name?: string
          p_remark?: string
          p_time?: string
          p_time_verified?: boolean
        }
        Returns: undefined
      }
      crm_audio: {
        Args: { p_action: string; p_id: string }
        Returns: undefined
      }
      crm_can_read_audio: { Args: { p_path: string }; Returns: boolean }
      crm_create: {
        Args: { p_contact: string; p_name: string }
        Returns: string
      }
      crm_list: { Args: never; Returns: Json }
      crm_role: {
        Args: never
        Returns: Database["public"]["Enums"]["department"]
      }
    }
    Enums: {
      department:
        | "marketing"
        | "communication"
        | "vigilance"
        | "support"
        | "sales"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      department: [
        "marketing",
        "communication",
        "vigilance",
        "support",
        "sales",
      ],
    },
  },
} as const
