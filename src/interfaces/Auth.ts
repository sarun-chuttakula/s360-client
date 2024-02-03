export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname?: string | null;
  role: string;
  // ... other user details
}

export interface AuthContextType {
  user: User | null;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}
