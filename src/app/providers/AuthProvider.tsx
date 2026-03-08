import { React, useEffect } from "react";
import { supabase } from "../../core/api/supabase";
import { authService } from "../../features/auth/api/authService";
import { useAuthStore } from "../../store/useAuthStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        logout();
        return;
      }

      try {
        const user = await authService.getCurrentUser();

        if (!user) {
          logout();
          return;
        }

        setUser(user, session.access_token);
      } catch {
        logout();
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        logout();
      }

      if (event === "SIGNED_IN" && session) {
        const user = await authService.getCurrentUser();
        if (user) {
          setUser(user, session.access_token);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, logout, setLoading]);

  return <>{children}</>;
}