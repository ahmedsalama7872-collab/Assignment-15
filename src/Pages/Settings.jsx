import React, { useState } from "react";
import { Button } from "flowbite-react";
import { Key } from "lucide-react";
import axios from "axios";
import NavbarCom from "../components/NavbarCom";

export default function Settings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const { data } = await axios.patch(
        "https://route-posts.routemisr.com//users/change-password",
        {
          password: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      setMessage({ type: "success", text: "Password updated successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage({ 
        type: "error", 
        text: err.response?.data?.message || "Failed to update password" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarCom/>
    <div className="flex min-h-[80vh] pt-15 justify-center p-4">
      <div className="w-full max-w-xl rounded-3xl h-fit border border-slate-200 bg-white p-6 shadow-[0_2px_10px_rgba(15,23,42,.06)] sm:p-8">
        
        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-[#1877f2] ring-8 ring-[#f8fafc]">
            <Key className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
              Change Password
            </h2>
            <p className="text-sm text-slate-500">
              Keep your account secure by using a strong password.
            </p>
          </div>
        </div>

        {/* Feedback Message */}
        {message && (
          <div className={`mb-4 rounded-xl p-3 text-sm font-semibold ${
            message.type === "success" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-rose-50 text-rose-600 border border-rose-200"
          }`}>
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Current Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Current password
            </label>
            <input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#1877f2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1877f2]/20 transition"
              />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              New password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#1877f2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1877f2]/20 transition"
              />
            <p className="mt-1.5 text-xs text-slate-500">
              At least 8 characters with uppercase, lowercase, number, and special character.
            </p>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Confirm new password
            </label>
            <input
              type="password"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#1877f2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1877f2]/20 transition"
              />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#1877f2] py-2.5 text-sm font-bold text-white hover:bg-[#166fe5] focus:ring-4 focus:ring-[#1877f2]/30 transition"
              >
              {loading ? "Updating..." : "Update password"}
            </Button>
          </div>

        </form>
      </div>
    </div>
              </>
  );
}