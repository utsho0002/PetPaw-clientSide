import {
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";

import { FaEye, FaEyeSlash } from "react-icons/fa"; // <-- added
import Swal from "sweetalert2";

const Login = () => {
  const [showPass, setShowPass] = useState(false); // <-- Pass word toggle
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  // Forget Password
  const EmailRef = useRef();
  const forgetPass = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, EmailRef.current.value)
      .then(() => {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Password reset link sent to your email",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      })
      .catch(() => {});
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const auth = getAuth();
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
        setError(error.message);
      });
  };

  return (
    <div className="flex justify-center my-20">
      <form
        onSubmit={handleLogin}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      >
        <legend className="fieldset-legend text-xl text-center">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          className="input"
          placeholder="Email"
          required
          ref={EmailRef}
        />

        <label className="label">Password</label>

        {/*  Password Input with Toggle */}
        <div className="flex flex-row justify-center gap-1">
          <input
            name="password"
            type={showPass ? "text" : "password"}
            className="input input-bordered w-full pr-10"
            placeholder="Password"
            required
          />

          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="text-xl text-gray-600"
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div onClick={forgetPass}>
          <a className="link link-hover text-red-500">Forgot password?</a>
        </div>

        {error && <p className="text-red-400">{error}</p>}

        <button className="btn btn-neutral mt-4">Login</button>

        <p className="text-[14px]">
          Don’t Have An Account?{" "}
          <Link to="/auth/register">
            <span className="text-red-500 font-semibold">Register</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
