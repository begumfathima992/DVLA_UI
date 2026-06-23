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
import { loginAPI } from "../../services/apiServices/authService";

import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login({ open, setOpen }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await loginAPI(values);
        if (response?.success) {
          resetForm();
          setOpen(false);
          toast.success(response?.message || "Login Successfully");
          localStorage.setItem("token", response?.token);
          localStorage.setItem("users", JSON.stringify(response?.user));
          navigate("/dashboard");
        } else {
          toast.error(response?.message || "Invalid details");
        }
      } catch (error) {
        console.error("Login failed:", error);
        alert(
          error.response?.data?.message || "Login failed. Please try again.",
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

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
        <div className="bg-white relative">
          <div className="h-1.5 bg-gradient-to-r from-red-600 via-red-500 to-orange-400 w-full" />

          <div className="px-8 pt-8 pb-1 border-b border-gray-100 flex items-start justify-between">
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
          <form onSubmit={formik.handleSubmit} className="px-8 py-7 space-y-4">
            {/* Social buttons */}
            {/* <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <FaGoogle />, label: "Google" },
                { icon: <FaApple />, label: "Apple" },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  type="button"
                  className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-600 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-all duration-150"
                >
                  <span className="text-base">{icon}</span>
                  {label}
                </button>
              ))}
            </div> */}

            {/* Divider */}
            {/* <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-300 font-medium">
                or continue with email
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </div> */}

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <div
                className={`flex items-center gap-3 border rounded-xl px-4 py-3 bg-gray-50 transition-all duration-150 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500 bg-red-50"
                    : formik.touched.email
                      ? "border-green-400 bg-white ring-2 ring-green-100"
                      : "border-gray-200"
                }`}
              >
                <FiMail
                  className={`text-base flex-shrink-0 transition-colors ${
                    formik.touched.email && formik.errors.email
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-300 outline-none"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-red-500 font-medium hover:text-red-700 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div
                className={`flex items-center gap-3 border rounded-xl px-4 py-3 bg-gray-50 transition-all duration-150 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500 bg-red-50"
                    : formik.touched.password
                      ? "border-green-400 bg-white ring-2 ring-green-100"
                      : "border-gray-200"
                }`}
              >
                <FiLock
                  className={`text-base flex-shrink-0 transition-colors ${
                    formik.touched.password && formik.errors.password
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-300 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  {showPassword ? (
                    <FiEyeOff className="text-base" />
                  ) : (
                    <FiEye className="text-base" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">
                  {formik.errors.password}
                </p>
              )}
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
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-100 transition-all duration-200 mt-2 disabled:opacity-70"
            >
              {formik.isSubmitting ? "Signing in..." : "Sign In"}
              {!formik.isSubmitting && <FiArrowRight className="text-base" />}
            </button>
          </form>

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
