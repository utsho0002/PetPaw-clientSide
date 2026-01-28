import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { getAuth, signInWithPopup, updateProfile, GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";

// Icons
import { FaGoogle, FaEye, FaEyeSlash, FaUser, FaImage } from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md";

const Register = () => {
  const { CreateUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [nameError, setNameError] = useState("");
  const [passError, setPassError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const provider = new GoogleAuthProvider();

  const popUpLogin = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const from = location.state?.from?.pathname || "/";
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Account created successfully",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoUrl = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // Validation logic...
    if (name.length < 5) {
      setNameError("Name must be greater than 5 characters");
      return;
    } else setNameError("");

    if (password.length < 6) {
      setPassError("Password must be at least 6 characters long");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setPassError("Password must contain at least one uppercase letter (A-Z)");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setPassError("Password must contain at least one lowercase letter (a-z)");
      return;
    }
    setPassError("");

    CreateUser(email, password)
      .then((result) => {
        const user = result.user;
        const auth = getAuth();
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoUrl,
        })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photoUrl });
            Swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: "Account created successfully",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });
            navigate("/");
          })
          .catch(() => setError("Failed to update profile."));
      })
      .catch((error) => setPassError(error.message));
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-10 px-4">
      
      {/* Card Container - max-w-lg keeps it from getting too wide on large screens */}
      <div className="card bg-base-100 w-full max-w-lg shadow-2xl rounded-xl">
        <div className="card-body p-8 sm:p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-base-content">Create Account</h2>
            <p className="text-base-content/60 mt-2">Sign up to get started with PawMart</p>
          </div>

          {/* Social Register Button - Full Width */}
          <button
            onClick={popUpLogin}
            className="btn btn-outline w-full flex items-center justify-center gap-3 text-lg hover:bg-base-200 hover:text-base-content mb-6"
          >
            <FaGoogle className="text-red-500" /> 
            <span>Sign up with Google</span>
          </button>

          <div className="divider text-xs text-base-content/40 uppercase font-semibold my-6">Or continue with email</div>

          {/* Form */}
          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            
            {/* Name Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <label className="input input-bordered w-full flex items-center gap-3 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary focus-within:outline-none transition-all">
                <FaUser className="text-base-content/50" />
                <input
                  type="text"
                  name="name"
                  className="grow w-full border-none focus:ring-0" 
                  placeholder="John Doe"
                  required
                />
              </label>
              {nameError && <span className="text-red-500 text-xs mt-1 ml-1">{nameError}</span>}
            </div>

            {/* Photo URL Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Photo URL</span>
              </label>
              <label className="input input-bordered w-full flex items-center gap-3 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
                <FaImage className="text-base-content/50" />
                <input
                  type="text"
                  name="photo"
                  className="grow w-full border-none focus:ring-0"
                  placeholder="https://..."
                  required
                />
              </label>
            </div>

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
                  className="grow w-full border-none focus:ring-0"
                  placeholder="name@example.com"
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
                  className="grow w-full border-none focus:ring-0 pr-8"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 text-base-content/60 hover:text-primary transition-colors cursor-pointer"
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </label>
              {passError && <span className="text-red-500 text-xs mt-1 ml-1">{passError}</span>}
            </div>

            {/* Global Error */}
            {error && <div className="alert alert-error text-sm py-2 rounded-lg">{error}</div>}

            {/* Submit Button - Full Width */}
            <div className="form-control mt-4">
              <button type="submit" className="btn btn-primary w-full text-lg shadow-md hover:scale-[1.01] transition-transform">
                Register
              </button>
            </div>
          </form>

          {/* Footer */}
          <p className="text-center text-sm mt-6 text-base-content/70">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;