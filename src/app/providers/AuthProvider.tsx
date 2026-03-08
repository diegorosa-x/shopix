import { useEffect, type ReactNode } from "react";
import { supabase } from "../../core/api/supabase";
import { authService } from "../../features/auth/api/authService";
import { useAuthStore } from "../../store/useAuthStore";

export function AuthProvider({ children }: { children: ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    let mounted = true;

    const syncSession = async () => {
      setLoading(true);

      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;

        if (!session) {
          if (mounted) logout();
          return;
        }

        const user = await authService.getCurrentUser();

        if (!user) {
          if (mounted) logout();
          return;
        }

        if (mounted) {
          setUser(user, session.access_token);
        }
      } catch (error) {
        console.error("Erro ao sincronizar auth:", error);
        if (mounted) logout();
      } finally {
        if (mounted) setLoading(false);
      }
    };

    syncSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        if (event === "SIGNED_OUT") {
          logout();
          return;
        }

        if (!session) return;

        const user = await authService.getCurrentUser();

        if (!user) {
          logout();
          return;
        }

        setUser(user, session.access_token);
      } catch (error) {
        console.error("Erro no onAuthStateChange:", error);
        logout();
      } finally {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [setUser, logout, setLoading]);

  return <>{children}</>;
}