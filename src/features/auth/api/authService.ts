import { MOCK_USER } from '../../../mock/data';
import { sleep } from '../../../utils';
import { User } from '../../../core/types';

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    await sleep(1000);
    if (email === 'admin@luxe.com' && password === 'admin123') {
      return {
        user: MOCK_USER,
        token: 'mock-jwt-token',
      };
    }
    throw new Error('Invalid credentials');
  },

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    await sleep(1500);
    return {
      user: {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role: 'user',
      },
      token: 'mock-jwt-token',
    };
  }
};
