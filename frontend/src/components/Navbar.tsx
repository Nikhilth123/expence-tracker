import { ThemeToggle } from "@/utils/Themetoggle";
import { useState, useRef, useEffect } from "react";
import {useAuth} from  "../Hooks/useauth";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const { user, setUser } = useAuth();
const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const handleLogout = async() => {
    try{
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to logout");
      }
      setUser(null);
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const firstLetter = user?.name?.charAt(0).toUpperCase();

 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          
         
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">$</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white cursor-pointer" onClick={()=>navigate('/')}>
                Finance Dashboard
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Track your financial activity
              </p>
            </div>
          </div>

          
          <div className="flex items-center gap-4">
            <ThemeToggle />

           
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold"
              >
                {user ? firstLetter : "?"}
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg">
                  
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg"
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <button className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg" onClick={()=>navigate('/login')}>
                        Login
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg"
                      onClick={()=>navigate('/signup')}
                      >
                        Signup
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}