import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/authService";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),

    onSuccess: (response) => {
      navigate(response.user.role === "admin" ? "/admin" : "/");
    },
  });
};