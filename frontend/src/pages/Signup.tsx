import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import {useState } from "react"

import {toast} from 'react-toastify'
import { useAuth } from "../Hooks/useauth"
function Signup() {
   const {user} = useAuth();
  const navigate = useNavigate();
  if(user){
    navigate('/');
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return

    try {
      setLoading(true)

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/user/signup`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        toast(data.msg)
        return
      }

     

      toast('Account Created successfully')

      navigate("/login")
    } catch (err) {
     if (err instanceof Error) {
    toast(err.message);
  } else {
    toast("Something went wrong");
  }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md transition-all hover:shadow-xl">

        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            Create an account
          </CardTitle>
          <CardDescription>
            Sign up for tacking your expenses and managing your finances effectively.
          </CardDescription>
        </CardHeader>

        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">

            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>

          </CardContent>
        </form>

        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            Already have an account?
          </p>
          <Button variant="link" asChild className="p-0">
            <Link to="/login">
              Login here
            </Link>
          </Button>
        </CardFooter>

      </Card>
    </div>
  )
}

export default Signup