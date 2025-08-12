"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "(auth)/contexts/AuthContext";
import Navbar from "../components/Navbar";

function validatePassword(value: string): string {
  const minLength = /.{8,}/;
  const hasUppercase = /[A-Z]/;
  const hasLowercase = /[a-z]/;
  const hasNumber = /\d/;
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
  if (!minLength.test(value)) return "Password must be at least 8 characters.";
  if (!hasUppercase.test(value)) return "Include at least one uppercase letter.";
  if (!hasLowercase.test(value)) return "Include at least one lowercase letter.";
  if (!hasNumber.test(value)) return "Include at least one number.";
  if (!hasSpecialChar.test(value)) return "Include at least one special character.";
  return "";
}

export default function Home(): React.ReactElement {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const error = validatePassword(password);
    setPasswordError(error);
    if (error) return;

    setIsLoading(true);
    setLoginError("");

    const result = await login(email, password);

    if (result.success) {
      router.push("/User/MAIN/dashboard");
    } else {
      setLoginError(result.error || "Login failed. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen forest-background relative">
      <Navbar />
      <div className="flex items-center justify-between px-6 py-12 min-h-[calc(100vh-80px)]">
        <div className="flex-1 max-w-2xl pr-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Carbon Project
            <br />
            On-Boarding
          </h1>
          <p className="text-white/90 text-lg leading-relaxed max-w-xl">
            A group text is a service that allows users to send a text message to multiple people at once. In a group text, all members can read and respond to each other's messages in a single thread. Group texts can be used for a variety of purposes, such as keeping contacts updated on a project or planning events.
          </p>
        </div>

        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Log in</h2>
            <p className="text-gray-600 mb-6">Enter your credentials below to sign in.</p>

            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">{loginError}</div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="projectowner@gmail.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(validatePassword(e.target.value));
                  }}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
                  required
                  disabled={isLoading}
                />
                {passwordError && <span className="text-red-500 text-sm block mt-1">{passwordError}</span>}
                <div className="text-right mt-1">
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                    Forgot Password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!!passwordError || isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an Account?{" "}
              <a href="/signup" className="text-green-600 hover:text-green-700 font-medium">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="md:hidden fixed bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
        <div className="flex justify-around">
          <a href="#" className="text-white text-sm font-medium">
            DoE List
          </a>
          <a href="#" className="text-white text-sm font-medium">
            Eligible Activity List
          </a>
        </div>
      </div>
    </div>
  );
}


