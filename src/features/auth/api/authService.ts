import { supabase } from "../../../core/api/supabase";
import type { User } from "../../../types";

export interface AuthResponse {
  user: User;
  token: string;
}

function mapProfileToUser(profile: any, email: string): User {
  return {
    id: profile.id,
    email,
    name: profile.name ?? email.split("@")[0],
    role: profile.role ?? "user",
    avatar: profile.avatar_url ?? "",
  };
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!data.user || !data.session) {
      throw new Error("Sessão não iniciada.");
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (profileError) throw profileError;

    return {
      user: mapProfileToUser(profile, data.user.email ?? ""),
      token: data.session.access_token,
    };
  },

  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) throw error;
    if (!data.user || !data.session) {
      throw new Error("Conta criada, mas a sessão não foi iniciada.");
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profileError) throw profileError;
    if (!profile) {
      throw new Error("Perfil do usuário não encontrado.");
    }

    return {
      user: mapProfileToUser(profile, data.user.email ?? ""),
      token: data.session.access_token,
    };
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser(): Promise<User | null> {
    const {
      data: { user: authUser },
      error,
    } = await supabase.auth.getUser();

    if (error) throw error;
    if (!authUser) return null;

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authUser.id)
      .maybeSingle();

    if (profileError) throw profileError;
    if (!profile) return null;

    return mapProfileToUser(profile, authUser.email ?? "");
  },
};
