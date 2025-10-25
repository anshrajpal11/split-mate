import React from "react";
import { Link } from "react-router-dom"; // replacing next/link
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit =async (e)=>{
    e.preventDefault();
     const res = await axios.post("http://localhost:3000/api/user/signup", {
      username,
      email,
      password,
    });
    if(res.data.success){
       toast.success("Registered successfully!");
      navigate("/login")
    }
    else{
       toast.error("check all fields  ");
      console.log("check all field");
    }
  }

  return (
    <main className="min-h-[100dvh] grid md:grid-cols-2 bg-background text-foreground">
      {/* Left brand/story panel */}
      <section className="hidden md:flex flex-col justify-between bg-secondary text-secondary-foreground p-8">
        <header className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="size-9 rounded-md bg-primary/10 flex items-center justify-center"
          >
            <span className="text-primary font-bold text-sm">S</span>
          </div>
          <span className="font-semibold tracking-tight">SPLITMATE</span>
        </header>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-muted">
          <img
            src="./public/lg.png"
            alt="SplitMate app preview"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <footer className="flex items-center gap-6 text-sm text-muted-foreground">
          <span>Secure by design</span>
          <span aria-hidden="true" className="h-3 w-px bg-border" />
          <span>No hidden fees</span>
        </footer>
      </section>

      {/* Right form panel */}
      <section className="flex items-center justify-center p-6 md:p-10">
        <Card className="w-full max-w-md bg-card text-card-foreground">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">New to SplitMate</CardTitle>
            <CardDescription>Sign in to continue to SplitMate</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="w-full bg-transparent"
                type="button"
                aria-label="Continue with Google"
              >
                <img
                  src="https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png"
                  alt=""
                  aria-hidden="true"
                  className="size-5 w-8"
                />
                Google
              </Button>

              <Button
                variant="outline"
                className="w-full bg-transparent"
                type="button"
                aria-label="Continue with GitHub"
              >
                <img
                  src="https://logos-world.net/wp-content/uploads/2020/11/GitHub-Symbol.png"
                  alt=""
                  aria-hidden="true"
                  className="size-4 w-8"
                />
                GitHub
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">
                  or continue with
                </span>
              </div>
            </div>

            <form
              className="grid gap-5"
              onSubmit={handleSubmit}
              aria-label="Login form"
            >
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="email"
                  name="username"
                  type="text"
                  inputMode="text"
                  autoComplete="username"
                  placeholder="yourusername"
                  className="bg-background"
                  onChange={(e)=>setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="bg-background"
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="text-xs underline-offset-4 hover:underline text-muted-foreground"
                    aria-pressed={showPassword}
                    aria-controls="password"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="bg-background"
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    name="remember"
                    className="size-4 rounded border-input bg-background"
                    aria-label="Remember me"
                  />
                  Remember me
                </label>
                
              </div>

              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex items-center justify-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="ml-1 underline underline-offset-4 hover:text-foreground"
            >
              Login
            </Link>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}

function FeatureItem({ title, detail }) {
  return (
    <div className="flex items-start gap-3">
      <span
        aria-hidden="true"
        className="mt-1 size-2.5 rounded-sm bg-primary"
      />
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-sm text-muted-foreground">{detail}</div>
      </div>
    </div>
  );
}

export default Signup;
