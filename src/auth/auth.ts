import { getAccessToken } from '@/api/localStorage';

export interface User {
  id: number;
  createdAt: string;
  email: string;
  name: string;
  firstName: string | null;
  lastName: string | null;
  password: string;
}

type AuthResponse = {
  accessToken: string;
  user: User;
};

export const authProvider = {
  isAuthenticated: false,
  user: null as User | null,
  async signin(email: string, password: string) {
    const response: Response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );
    if (response.status === 200) {
      const data: AuthResponse = await response.json();
      try {
        localStorage.setItem('accessToken', data.accessToken);
      } catch (e) {
        console.error(e);
      }
      this.user = data.user;
      this.isAuthenticated = true;
      return true;
    } else return false;
  },
  async getStatus(accessToken: string) {
    try {
      const response: Response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/status`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        const data: AuthResponse = await response.json();
        this.user = data.user;
        this.isAuthenticated = true;
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
    }
  },
};

export const getAuthHeaders = () => {
  const token = getAccessToken();
  if (token) {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    return headers;
  } else throw new Error('No access token found');
};
