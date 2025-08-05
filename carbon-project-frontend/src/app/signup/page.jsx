"use client";
import { useState, useRef } from 'react';
import Link from 'next/link';
import Navbar from '../Navbar';

function validatePassword(value) {
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

export default function Signup() {
  const [showVerification, setShowVerification] = useState(false);
  const [code, setCode] = useState(['', '', '', '', '']);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const inputsRef = useRef([]);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const error = validatePassword(password);
    setPasswordError(error);
    if (error) return;
    if (!showVerification) {
      setShowVerification(true);
    } else {
      // Handle final sign up with code
    }
  };

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return; // allow only numbers or empty
    // Only allow typing in the first empty box
    const firstEmpty = code.findIndex(d => !d);
    if (index !== firstEmpty) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    // Move focus to next input if input is filled
    if (value && index < 4) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (code[index]) {
        // If current box is filled, clear it
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      } else if (index > 0) {
        // If current box is empty, move focus left and clear previous
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
        inputsRef.current[index - 1]?.focus();
        e.preventDefault();
      }
    }
  };

  return (
    <div className="min-h-screen forest-background relative">
      <Navbar buttonLabel="Log In" buttonHref="/" />
      <div className="absolute inset-0 bg-black/30 z-0" />
      <div className="relative z-10 w-full flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="bg-white rounded-2xl shadow-2xl p-8 pt-6 flex flex-col w-full max-w-md">
          <h2 className="text-2xl font-bold text-black mb-2 text-center">Sign up</h2>
          <p className="text-gray-600 mb-6 text-center">Enter your credentials below to sign in.</p>
          <form className="space-y-4" onSubmit={handleSignupSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                placeholder="projectowner@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-black"
                required
                disabled={showVerification}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setPasswordError(validatePassword(e.target.value));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-black"
                required
                disabled={showVerification}
              />
              {passwordError && (
                <span className="text-red-500 text-sm block mt-1">{passwordError}</span>
              )}
            </div>
            {showVerification && (
              <div className="transition-all duration-300">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-center">Verification Code</label>
                <div className="flex gap-2 justify-center mb-2 mt-2">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleChange(index, e)}
                      onKeyDown={e => handleKeyDown(index, e)}
                      ref={el => (inputsRef.current[index] = el)}
                      className="w-12 h-12 border-2 border-black rounded text-center text-xl font-bold text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  ))}
                </div>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 transition-colors font-medium mt-2"
              disabled={!!passwordError}
            >
              {showVerification ? 'Sign up' : 'Get Verification Code Via Email'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an Account?{' '}
            <Link href="/" className="text-green-700 hover:text-green-800 font-medium">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
