import { useMutation } from '@tanstack/react-query';
import { authService } from '../api/authService';
import { useAuthStore } from '../../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }: any) => authService.login(email, password),
    onSuccess: (response) => {
      setAuth(response.user, response.token);
      localStorage.setItem('auth-token', response.token);
      navigate(response.user.role === 'admin' ? '/admin' : '/');
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  return () => {
    logout();
    localStorage.removeItem('auth-token');
    navigate('/');
  };
};
