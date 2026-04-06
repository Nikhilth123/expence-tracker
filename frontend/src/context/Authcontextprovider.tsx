import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Authcontext from "./Authcontext";

type User = {
  _id: string;
  name: string;
  email: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setloading] = useState<boolean>(true);

  const fetchuser = async () => {
    try {
     const res = await fetch(
  `${import.meta.env.VITE_BASE_URL}/api/user/me`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

      if (res.ok) {
        const data = await res.json();

       
        setUser({
          _id: data.user._id,
          name: data.user.name,
          email: data.user.email,
        });
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