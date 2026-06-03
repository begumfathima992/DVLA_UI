import { useState } from "react";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiX,
  FiZap,
  FiArrowRight,
} from "react-icons/fi";
import { FaGoogle, FaApple } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export default function Login({ open, setOpen }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState("");
  const navigate = useNavigate();

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="login-modal"
      className="flex items-center justify-center"
    >
      <Box
        sx={{
          outline: "none",
          width: "100%",
          maxWidth: 440,
          mx: 2,
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.18)",
        }}
      >
        {/* Card */}
        <div className="bg-white relative">
          {/* Red accent bar */}
          <div className="h-1.5 bg-gradient-to-r from-red-600 via-red-500 to-orange-400 w-full" />

          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-gray-100 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-sm">
                  <FiZap className="text-white text-base" />
                </div>
                <span className="font-black text-gray-900 tracking-tight uppercase text-base">
                  Auto<span className="text-red-600">Forge</span>
                </span>
              </div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                Welcome back
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Sign in to your account
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-600 flex items-center justify-center text-gray-400 transition-all"
            >
              <FiX className="text-base" />
            </button>
          </div>

          {/* Body */}
          <div className="px-8 py-7 space-y-4">
            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <FaGoogle />, label: "Google" },
                { icon: <FaApple />, label: "Apple" },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-600 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-all duration-150"
                >
                  <span className="text-base">{icon}</span>
                  {label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-300 font-medium">
                or continue with email
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <div
                className={`flex items-center gap-3 border rounded-xl px-4 py-3 bg-gray-50 transition-all duration-150 ${
                  focused === "email"
                    ? "border-red-400 bg-white ring-2 ring-red-100"
                    : "border-gray-200"
                }`}
              >
                <FiMail
                  className={`text-base flex-shrink-0 transition-colors ${
                    focused === "email" ? "text-red-500" : "text-gray-300"
                  }`}
                />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                  className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-300 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                  Password
                </label>
                <button className="text-xs text-red-500 font-medium hover:text-red-700 transition-colors">
                  Forgot password?
                </button>
              </div>
              <div
                className={`flex items-center gap-3 border rounded-xl px-4 py-3 bg-gray-50 transition-all duration-150 ${
                  focused === "password"
                    ? "border-red-400 bg-white ring-2 ring-red-100"
                    : "border-gray-200"
                }`}
              >
                <FiLock
                  className={`text-base flex-shrink-0 transition-colors ${
                    focused === "password" ? "text-red-500" : "text-gray-300"
                  }`}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-300 outline-none"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-300 hover:text-red-500 transition-colors"
                >
                  {showPassword ? (
                    <FiEyeOff className="text-base" />
                  ) : (
                    <FiEye className="text-base" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-4 h-4 border-2 border-gray-200 rounded peer-checked:bg-red-600 peer-checked:border-red-600 transition-all" />
              </div>
              <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                Keep me signed in
              </span>
            </label>

            {/* CTA */}
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-100 transition-all duration-200 mt-2"
            >
              Sign In
              <FiArrowRight className="text-base" />
            </button>
          </div>

          {/* Footer */}
          <div className="px-8 pb-7 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <button className="text-red-600 font-semibold hover:text-red-700 transition-colors">
                Create one free
              </button>
            </p>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
