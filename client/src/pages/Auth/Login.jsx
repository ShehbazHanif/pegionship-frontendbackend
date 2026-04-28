import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import Input from "../../components/common/Input";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const { showNotification } = useNotification();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      showNotification(res.message || "Login successful!", "success");
      login(res.data);
    },
    onError: (error) => {
      showNotification(
        error.response?.data?.message || "Login failed",
        "error",
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-secondary">Login</h1>
        <p className="mt-2 text-sm text-gray-500">Welcome back!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full rounded-px bg-primary py-3 text-sm font-bold text-secondary transition-all hover:bg-yellow-400 disabled:bg-gray-400">
          {mutation.isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default Login;
