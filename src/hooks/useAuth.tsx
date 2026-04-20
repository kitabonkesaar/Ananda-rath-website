import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  session: any | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<{error?: Error}>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  isAdmin: false,
  loading: true,
  signIn: async () => ({}),
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("demo_admin_logged_in") === "true";
    if (isLoggedIn) {
      setSession({ user: { email: "admin@anandarath.com" } });
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, pass: string) => {
    if (email === "admin@anandarath.com" && pass === "admin123") {
      localStorage.setItem("demo_admin_logged_in", "true");
      setSession({ user: { email } });
      setIsAdmin(true);
      return {};
    }
    return { error: new Error("Invalid credentials") };
  };

  const signOut = async () => {
    localStorage.removeItem("demo_admin_logged_in");
    setSession(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ session, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
