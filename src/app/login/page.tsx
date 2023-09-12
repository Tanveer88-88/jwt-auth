"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const hanleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userName = formData.get("username");
    const password = formData.get("password");

    console.log("user and password", userName, password);

    const res = await fetch("api/login", {
      method: "POST",
      body: JSON.stringify({
        username: userName,
        password: password,
      }),
    });

    const { accessToken } = await res.json();
    console.log("accessToken", accessToken);

    if (accessToken) {
      router.push("/");
    } else {
      alert("Login Failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-8">
      <h1 className="foont-bold text-lg">JWT Token</h1>
      <form
        action=""
        onSubmit={hanleSubmit}
        className="flex flex-col items-center justify-center w-full gap-8"
      >
        <label htmlFor="" className="px-2">
          Username:
          <input
            type="text"
            name="username"
            placeholder="username"
            className="text-black outline-none border rounded-lg px-2"
          />
        </label>
        <label htmlFor="" className="px-2">
          Password:
          <input
            type="text"
            name="password"
            placeholder="Password"
            className="text-black outline-none border rounded-lg px-2 "
          />
        </label>
        <button
          type="submit"
          className="border rounded-lg bg-blue-600 px-3 hover:bg-black hover:text-white ease-in duration-300 hover:scale"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
