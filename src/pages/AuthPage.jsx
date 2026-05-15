import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div className="max-w-md mx-auto">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-3xl justify-center mb-6">
            {isLoginMode ? "Welcome Back" : "Create Account"}
          </h1>

          <div className="tabs tabs-boxed mb-6">
            <button
              type="button"
              className={`tab flex-1 ${isLoginMode ? "tab-active" : ""}`}
              onClick={() => setIsLoginMode(true)}
            >
              Login
            </button>

            <button
              type="button"
              className={`tab flex-1 ${!isLoginMode ? "tab-active" : ""}`}
              onClick={() => setIsLoginMode(false)}
            >
              Register
            </button>
          </div>
          {isLoginMode ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}
