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
      `${import.meta.env.BASE_URL}/api/login}`,
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
      this.user = data.user;
      this.isAuthenticated = true;
    }
  },
};
