import {
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md";
import Swal from "sweetalert2";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const EmailRef = useRef();
  const auth = getAuth();

  // 1. Google Login Handler
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const from = location.state?.from?.pathname || "/";
        Swal.fire({
          icon: "success",
          title: "Logged in with Google!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => setError(error.message));
  };

  // 2. Email Login Handler
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const from = location.state?.from?.pathname || "/";
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Login successful 🎉",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError("Invalid email or password. Please try again.");
      });
  };

  // 3. Forget Password Handler
  const forgetPass = () => {
    const email = EmailRef.current.value;
    if (!email) {
      setError("Please enter your email address to reset password.");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          icon: "info",
          title: "Check your email",
          text: "Password reset link sent!",
        });
      })
      .catch(() => setError("Failed to send reset email."));
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-10 px-4">
      {/* Card Container - max-w-lg for consistency with Register */}
      <div className="card bg-base-100 w-full max-w-lg shadow-2xl rounded-xl">
        <div className="card-body p-8 sm:p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-base-content">Welcome Back</h2>
            <p className="text-base-content/60 mt-2">Enter your details to login</p>
          </div>

          {/* Social Login Button - Full Width */}
          <button 
            onClick={handleGoogleLogin} 
            className="btn btn-outline w-full flex items-center justify-center gap-3 text-lg hover:bg-base-200 hover:text-base-content mb-6"
          >
            <FaGoogle className="text-red-500" /> 
            <span>Continue with Google</span>
          </button>

          <div className="divider text-xs text-base-content/40 uppercase font-semibold my-6">Or login with email</div>

          {/* Form - Flex Column for Full Width */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            
            {/* Email Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <label className="input input-bordered w-full flex items-center gap-3 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
                <MdEmail className="text-base-content/50 text-lg" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="grow w-full border-none focus:ring-0"
                  ref={EmailRef}
                  required
                />
              </label>
            </div>

            {/* Password Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <label className="input input-bordered w-full flex items-center gap-3 relative focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
                <MdLock className="text-base-content/50 text-lg" />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="grow w-full border-none focus:ring-0 pr-8"
                  required
                />
                {/* Toggle Eye Icon */}
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 text-base-content/60 hover:text-primary transition-colors cursor-pointer"
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </label>
              
              {/* Forgot Password Link - Aligned Right */}
              <label className="label">
                <span className="label-text-alt"></span>
                <span 
                  onClick={forgetPass} 
                  className="label-text-alt link link-hover text-primary font-semibold cursor-pointer"
                >
                  Forgot password?
                </span>
              </label>
            </div>

            {/* Error Message Display */}
            {error && (
              <div role="alert" className="alert alert-error py-2 text-sm rounded-lg w-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error}</span>
              </div>
            )}

            {/* Login Button - Full Width */}
            <div className="form-control mt-4">
              <button className="btn btn-primary w-full text-lg shadow-md hover:scale-[1.01] transition-transform">
                Login
              </button>
            </div>
          </form>

          {/* Footer */}
          <p className="text-center text-sm mt-6 text-base-content/70">
            Don’t have an account?{" "}
            <Link to="/auth/register" className="text-primary font-bold hover:underline">
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;