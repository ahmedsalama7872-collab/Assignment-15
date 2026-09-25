import React from "react";
import { Button, TextInput } from "flowbite-react";
import { User, Key } from "lucide-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
     const { register, handleSubmit } = useForm();
     const [errorMsg, setErrorMsg] = useState("");
     const navigate = useNavigate();
    async function signIn(signData){
        try{
            const {data} = await axios.post('https://route-posts.routemisr.com/users/signin',signData)
 if (data.success && data.data?.token) {
                localStorage.setItem("userToken", data.data.token);
                navigate('/app/feed');
                window.location.reload()
                console.log("success");
        }}
        catch(error){
             setErrorMsg(error.response?.data?.error || "حدث خطأ أثناء التسجيل");
        }
    }


    const onSubmit = (data)=>{
        signIn(data)
    }

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-slate-900">
        Log in to Route Posts
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Log in and continue your social journey.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex max-w-md flex-col gap-4">
        {/* Email */}
        <div className="relative">
          <User className="pointer-events-none  absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <TextInput
            id="email1"
            type="email"
            {...register("email")}
            placeholder="Email or username"
            required
            className="[&_input]:pl-10"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Key className="pointer-events-none absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <TextInput
          {...register("password")}
            id="password1"
            type="password"
            placeholder="Password"
            required
            className="[&_input]:pl-10"
          />
        </div>

        <Button type="submit" className="w-full rounded-xl py-3 text-base font-extrabold text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b]">Log In</Button>

        <button className="mx-auto block text-sm font-semibold text-[#00298d] transition hover:underline">
          Forgot password?
        </button>
        {errorMsg && <p className="text-red-500 text-xs">{errorMsg}</p>}
      </form>
    </div>
  );
}