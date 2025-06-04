import React, { useState } from 'react';
import { track } from "@vercel/analytics";

interface LandingProps {
  onEmailSubmit: (email: string) => void;
}

function Landing({ onEmailSubmit }: LandingProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailValid, setEmailValid] = useState<boolean | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    if (newEmail.trim() === '') {
      setEmailValid(null);
    } else {
      setEmailValid(validateEmail(newEmail));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !validateEmail(email)) return;
    
    setIsSubmitting(true);
    
    try {
      track('email_collected', { email });
      onEmailSubmit(email);
    } catch (error) {
      console.error('Error tracking email:', error);
      onEmailSubmit(email);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Welcome, Eminence
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Enter your email to access the dashboard
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`mt-1 block w-full px-3 py-2 bg-gray-700 border rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    emailValid === null 
                      ? 'border-gray-600 focus:ring-green-500 focus:border-green-500' 
                      : emailValid 
                      ? 'border-green-500 focus:ring-green-500 focus:border-green-500' 
                      : 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  }`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailValid === false && (
                  <p className="mt-1 text-sm text-red-400">
                    Please enter a valid email address
                  </p>
                )}
                {emailValid === true && (
                  <p className="mt-1 text-sm text-green-400">
                    ✓ Valid email address
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting || !email.trim() || emailValid === false}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Accessing...' : 'Access Dashboard'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Landing;