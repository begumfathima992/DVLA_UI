import { useState } from "react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
  FiX,
  FiZap,
} from "react-icons/fi";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { loginAPI } from "../../services/apiServices/authService";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Please enter a valid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function Login({ open, setOpen }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await loginAPI(values);
        if (response?.success) {
          localStorage.setItem("token", response?.token || "");
          localStorage.setItem("users", JSON.stringify(response?.user || {}));
          resetForm();
          setOpen(false);
          toast.success(response?.message || "Login successful");
          navigate("/dashboard");
          return;
        }
        toast.error(response?.message || "Invalid details");
      } catch (error) {
        console.error("Login failed:", error);
        toast.error(error.response?.data?.message || "Login failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const fieldClass = (name) => {
    const invalid = formik.touched[name] && formik.errors[name];
    return `flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all ${
      invalid
        ? "border-rose-300 bg-rose-50/70 ring-4 ring-rose-100/60"
        : "border-slate-200 bg-slate-50 focus-within:border-rose-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-rose-100/70"
    }`;
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)} className="flex items-center justify-center px-3 py-4">
      <Box
        sx={{
          outline: "none",
          width: "100%",
          maxWidth: 940,
          maxHeight: "calc(100vh - 24px)",
          overflow: "auto",
          borderRadius: "30px",
          boxShadow: "0 42px 120px rgba(15,23,42,.28)",
        }}
      >
        <div className="grid overflow-hidden rounded-[30px] border border-slate-200 bg-white md:grid-cols-[.9fr_1.1fr]">
          <div className="relative hidden min-h-[620px] overflow-hidden bg-gradient-to-br from-rose-600 via-rose-600 to-red-700 p-9 text-white md:flex md:flex-col md:justify-between">
            <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border-[54px] border-white/[0.07]" />
            <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-white/[0.06]" />
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.55)_1px,transparent_1px)] [background-size:48px_48px]" />

            <div className="relative flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/25 bg-white/15 shadow-lg backdrop-blur-md">
                <FiZap className="text-xl" />
              </span>
              <div>
                <div className="font-[Sora] text-xl font-extrabold tracking-[-0.04em]">AutoForge</div>
                <div className="text-[8px] font-extrabold uppercase tracking-[0.22em] text-white/55">Garage workspace</div>
              </div>
            </div>

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/80">
                <FiShield /> Secure access
              </span>
              <h2 className="mt-6 font-[Sora] text-4xl font-extrabold leading-tight tracking-[-0.05em]">Your complete workshop, beautifully organised.</h2>
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/68">Manage customers, vehicles, estimates, job sheets and invoices from one clear workspace.</p>
            </div>

            <div className="relative grid grid-cols-3 gap-2">
              {["Protected", "Real-time", "Reliable"].map((item) => (
                <div key={item} className="rounded-xl border border-white/15 bg-white/[0.08] px-3 py-3 text-center text-[9px] font-extrabold uppercase tracking-[0.1em] text-white/75">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative p-6 sm:p-9 md:p-11">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
              aria-label="Close login"
            >
              <FiX />
            </button>

            <div className="mb-8 pr-12">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-rose-600">Welcome back</span>
              <h2 className="mt-2 font-[Sora] text-3xl font-extrabold tracking-[-0.045em] text-slate-950">Sign in to AutoForge</h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">Enter your account details to continue to the dashboard.</p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500">Email address</label>
                <div className={fieldClass("email")}>
                  <FiMail className={formik.touched.email && formik.errors.email ? "text-rose-500" : "text-slate-400"} />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
                {formik.touched.email && formik.errors.email && <p className="ml-1 mt-1.5 text-xs font-medium text-rose-500">{formik.errors.email}</p>}
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500">Password</label>
                  <button type="button" className="text-xs font-extrabold text-rose-600 hover:underline">Forgot password?</button>
                </div>
                <div className={fieldClass("password")}>
                  <FiLock className={formik.touched.password && formik.errors.password ? "text-rose-500" : "text-slate-400"} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} className="text-slate-400 transition hover:text-rose-600" aria-label="Toggle password visibility">
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && <p className="ml-1 mt-1.5 text-xs font-medium text-rose-500">{formik.errors.password}</p>}
              </div>

              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-500">
                <input type="checkbox" className="h-4 w-4 accent-rose-600" />
                Keep me signed in
              </label>

              <motion.button
                type="submit"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={formik.isSubmitting}
                className="primary-action flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {formik.isSubmitting ? "Signing in..." : "Sign in securely"}
                {!formik.isSubmitting && <FiArrowRight />}
              </motion.button>
            </form>

            <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start gap-3">
                <FiCheckCircle className="mt-0.5 shrink-0 text-emerald-500" />
                <p className="text-xs leading-6 text-slate-500">Your login session is stored locally and can be completely removed using the dashboard logout option.</p>
              </div>
            </div>

            <div className="mt-7 border-t border-slate-100 pt-6 text-center">
              <p className="text-sm text-slate-500">New to AutoForge? <button type="button" className="font-extrabold text-rose-600 hover:underline">Create an account</button></p>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
