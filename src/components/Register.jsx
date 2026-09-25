import React, { useState } from "react";
import { Button, TextInput, Select } from "flowbite-react";
import { User, AtSign, Mail, Users, Calendar, Key } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    async function handleRegister(userData) {
        try {
            setLoading(true);
            setErrorMsg("");
            
            const { data } = await axios.post('https://route-posts.routemisr.com/users/signup', userData);
            
            if (data.success && data.data?.token) {
                localStorage.setItem("userToken", data.data.token);
                navigate('/app/feed');
                window.location.reload()
                console.log("success");
                
            }
        } catch (error) {
            setErrorMsg(error.response?.data?.error || "حدث خطأ أثناء التسجيل");
        } finally {
            setLoading(false);
        }
    }

    const onSubmit = (data) => {
        handleRegister(data);
    };

    return (
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Create a new account
        </h2>

        <p className="mt-1 text-sm text-slate-500 mb-6">
          It is quick and easy.
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <TextInput
              id="fullname"
              type="text"
              placeholder="Full name"
              required
              className="[&_input]:pl-10"
              {...register("name")}
            />
          </div>

          <div className="relative">
            <AtSign className="pointer-events-none absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <TextInput
              id="username"
              type="text"
              placeholder="Username (optional)"
              className="[&_input]:pl-10"
              {...register("username")}
            />
          </div>

          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <TextInput
              id="email"
              type="email"
              placeholder="Email address"
              required
              className="[&_input]:pl-10"
              {...register("email")}
            />
          </div>

          <div className="relative">
            <Users className="pointer-events-none absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Select
              id="gender"
              required
              className="[&_select]:pl-10"
              {...register("gender")}
            >
              <option value="" disabled>
    Select gender
  </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </div>

          <div className="relative">
            <Calendar className="pointer-events-none absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <TextInput
              id="dob"
              type="date"
              required
              className="[&_input]:pl-10"
              {...register("dateOfBirth")}
            />
          </div>

          <div className="relative">
            <Key className="pointer-events-none absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <TextInput
              id="password"
              type="password"
              placeholder="Password"
              required
              className="[&_input]:pl-10"
              {...register("password")}
            />
          </div>

          <div className="relative">
            <Key className="pointer-events-none absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <TextInput
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              required
              className="[&_input]:pl-10"
              {...register("rePassword")}
            />
          </div>

          {errorMsg && <p className="text-red-500 text-xs">{errorMsg}</p>}

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full rounded-xl py-3 text-base font-extrabold text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b]"
          >
            {loading ? "Creating account..." : "Create New Account"}
          </Button>
        </form>
      </div>
    );
}