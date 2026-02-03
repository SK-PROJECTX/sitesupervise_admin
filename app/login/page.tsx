"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { adminAuthService } from "../../lib/services";
import { setAuthTokens } from "../../lib/auth";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.password || formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");
    setPasswordError("");

    try {
      const response = await adminAuthService.login(formData.email, formData.password);
      
      console.log('Login response:', response.data); // Debug log
      
      // Access user data from the nested structure
      const userData = response.data.data?.user || response.data.user;
      
      if (!userData) {
        setError("Invalid response format from server");
        return;
      }
      
      // Check if user has admin role
      if (userData.role !== 'ADMIN') {
        setError(`Access denied. Admin privileges required. Your role: ${userData.role}`);
        return;
      }

      // Store tokens using auth utility
      setAuthTokens(
        response.data.data?.access_token || response.data.access_token,
        response.data.data?.refresh_token || response.data.refresh_token,
        userData
      );
      
      router.push("/admin");
    } catch (error: any) {
      console.error('Login error:', error);
      console.error('Login error details:', error.response?.data);
      const errorMessage = error.response?.data?.errors?.error || 
                          error.response?.data?.error || 
                          error.response?.data?.detail || 
                          error.response?.data?.message || 
                          error.message || 
                          "Login failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Image + Text */}

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 md:px-16 py-12">
        <div className="max-w-3xl w-full">
          {/* Back to Home Link */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#022C4F] hover:text-[#0F181F] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </div>

          {/* Top right sign-in */}
           <div className="flex md:hidden flex-col items-center justify-center mb-8">
              <img
                src="/images/logo.png"
                alt="Site Supervise"
                className="w-16 h-16 mb-4"
              />
              <h1 className="text-2xl text-[#022C4F] font-extrabold text-center">
                SITE SUPERVISE
              </h1>
            </div>
         

          <h2 className="text-2xl font-bold mb-2 md:text-start text-center text-[#022C4F]">
            Sign In to Your Admin Dashboard
          </h2>
          <p className="text-sm font-medium mb-6  md:text-start text-center">
            Log in to your account to manage construction operations with tools suited to your role.
          </p>

          <form className="space-y-7" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border border-gray-300 rounded-full  px-6 py-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
             <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({...formData, password: e.target.value});
                      setPasswordError("");
                          }}
                          className="w-full border border-gray-300 rounded-full px-6 py-5 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <Eye size={20} />
                          ) : (
                            <EyeOff size={20} />
                          )}
                        </button>
              </div>
           

            {passwordError && (
              <div className="text-red-500 text-sm text-center">{passwordError}</div>
            )}
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#022C4F] text-white py-5 rounded-full mt-4 transition cursor-pointer hover:bg-[#0F181F] disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Login"}
            </button>
          </form>
          <div className="md:hidden  flex flex-col space-y-9 items-center justify-center text-center  my-6">
            <Link
              href="/forgot-password"
              className="px-6 font-extrabold underline text-md text-[#022C4F] "
            >
              Forgot Password?
            </Link>
            <p className="px-6 font-bold text-md">
              {" "}
              Manage, monitor, and analyze every construction project — all from
              one platform.
            </p>
          </div>
        </div>
      </div>
      <div
        className="hidden md:flex flex-1 bg-cover bg-center relative items-center justify-center text-white"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/depeqzb6z/image/upload/v1763210704/site_revqzy.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative text-center px-6 flex flex-col justify-center h-full py-12">
          <div className="flex-1 flex flex-col justify-center">
            <img
              src="https://res.cloudinary.com/depeqzb6z/image/upload/v1763210697/white_logo_mn0ohx.svg"
              alt="Site Supervise"
              className="mx-auto mb-6 w-28 h-auto"
            />
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
              SITE SUPERVISE
            </h1>
          </div>
          <p className="text-xl md:text-xl max-w-lg mx-auto mt-auto">
            Manage, monitor, and analyze every construction project — all from
            one platform.
          </p>
        </div>
      </div>
    </div>
  );
}
