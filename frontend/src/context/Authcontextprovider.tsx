import  { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Authcontext from "./Authcontext";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setloading] = useState<boolean>(true);

  const fetchuser = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/user/me`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    }
    setloading(false);
  };

  useEffect(() => {
    fetchuser();
  }, []);

  return (
    <Authcontext.Provider value={{ user, setUser, loading }}>
      {children}
    </Authcontext.Provider>
  );
};