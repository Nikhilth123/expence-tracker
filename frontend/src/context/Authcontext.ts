import { createContext } from "react";

type AuthContextType = {
  user: string | null;
  setUser: (user: string | null) => void;
  loading: boolean;
};

const Authcontext = createContext<AuthContextType | null>(null);

export default Authcontext;