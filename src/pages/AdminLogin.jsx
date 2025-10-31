import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/auth.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminEmail', data.user.email);
        localStorage.setItem('adminName', data.user.name);
        localStorage.setItem('adminId', data.user.id);
        
        toast({
          title: 'Success',
          description: 'Login successful! Redirecting...',
        });
        
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 500);
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Invalid email or password',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Connection error. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Logo and Header */}
          <div className="pt-10 pb-6 px-10 text-center">
            <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-gray-200 overflow-hidden">
              <img
                src="/images/logo_bgreen_-removebg-preview.png"
                alt="B Green Logo"
                className="w-16 h-16 object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-[#2c5aa0] mb-3">Admin Login</h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Enter your credentials to access the<br />admin dashboard
            </p>
          </div>

          {/* Login Form */}
          <div className="px-10 pb-8">

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-normal text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm"
                  placeholder=""
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-normal text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-10 text-gray-900 text-sm"
                    placeholder=""
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-0"
                  />
                  <span className="ml-2 text-sm text-gray-700">Remember me</span>
                </label>
                <a href="#" className="text-sm text-[#2c5aa0] hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2c5aa0] hover:bg-[#244a8a] text-white py-3 text-base font-medium rounded-full transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Log in'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
            </div>

            {/* Support Text */}
            <p className="text-center text-sm text-gray-500">
              For assistance, contact the administrator
            </p>
          </div>
        </div>

        {/* Back to Website */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700 transition-colors text-xs font-normal inline-flex items-center"
          >
            <span className="mr-1">←</span> Back to Website
          </button>
        </div>
      </motion.div>
    </div>
  );
}
