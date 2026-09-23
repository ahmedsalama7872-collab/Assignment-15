import React from "react";
import NavbarCom from "../components/NavbarCom";
import { Check, CheckCheck, MessageCircle } from "lucide-react";
import avatar from "../assets/default-profile.png";
export default function Notifications() {
  return (
    <div>
      <NavbarCom />

      <div className="mx-auto max-w-7xl py-4">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
          <div className="border-b border-slate-200 p-4 sm-p-5">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
                  Notifications
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Realtime updates for likes, comments, shares, and follows.
                </p>
              </div>
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                <CheckCheck className="w-4 h-4" /> mark all as read
              </button>
            </div>
            <div className="flex mt-6 gap-4 items-center">
              <button className="rounded-full px-4 py-1.5 text-sm font-bold transition bg-[#1877f2] text-white ">
                All
              </button>
              <button className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold transition bg-slate-100 text-slate-700 hover:bg-slate-200 ">
                Unread
              </button>
            </div>
          </div>

          {/* notif cards */}
          <div className="space-y-2 p-3 sm-p-4">
            {/* card */}
            <div className="group relative flex gap-3 rounded-xl border p-3 transition sm:rounded-2xl sm:p-4 border-slate-200 bg-white hover:bg-slate-50">
              <div className="relative shrink-0">
                <button className="block cursor-pointer">
                  <img
                    src={avatar}
                    className="h-11 w-11 rounded-full object-cover"
                    alt=""
                  />
                </button>
                <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-2 ring-white text-[#1877f2]">
                  <MessageCircle className="w-4 h-4" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-1.5 sm:gap-2">
                  <p className="text-sm leading-6 text-slate-800">
                    <button className="font-extrabold hover:text-[#1877f2] hover:underline">
                      Rawda{" "}
                    </button>{" "}
                    Commented on your post
                  </p>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs font-semibold text-slate-500">
                      1d
                    </span>
                  </div>
                </div>
                <p className="mt-0.5 text-sm text-slate-600">صلِ على النبي❤️</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <Check className="w-4 h-4" /> Read
                  </span>
                </div>
              </div>
            </div>
            <div className="group relative flex gap-3 rounded-xl border p-3 transition sm:rounded-2xl sm:p-4 border-slate-200 bg-white hover:bg-slate-50">
              <div className="relative shrink-0">
                <button className="block cursor-pointer">
                  <img
                    src={avatar}
                    className="h-11 w-11 rounded-full object-cover"
                    alt=""
                  />
                </button>
                <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-2 ring-white text-[#1877f2]">
                  <MessageCircle className="w-4 h-4" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-1.5 sm:gap-2">
                  <p className="text-sm leading-6 text-slate-800">
                    <button className="font-extrabold hover:text-[#1877f2] hover:underline">
                      Rawda{" "}
                    </button>{" "}
                    Commented on your post
                  </p>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs font-semibold text-slate-500">
                      1d
                    </span>
                  </div>
                </div>
                <p className="mt-0.5 text-sm text-slate-600">صلِ على النبي❤️</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <Check className="w-4 h-4" /> Read
                  </span>
                </div>
              </div>
            </div>
            <div className="group relative flex gap-3 rounded-xl border p-3 transition sm:rounded-2xl sm:p-4 border-slate-200 bg-white hover:bg-slate-50">
              <div className="relative shrink-0">
                <button className="block cursor-pointer">
                  <img
                    src={avatar}
                    className="h-11 w-11 rounded-full object-cover"
                    alt=""
                  />
                </button>
                <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-2 ring-white text-[#1877f2]">
                  <MessageCircle className="w-4 h-4" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-1.5 sm:gap-2">
                  <p className="text-sm leading-6 text-slate-800">
                    <button className="font-extrabold hover:text-[#1877f2] hover:underline">
                      Rawda{" "}
                    </button>{" "}
                    Commented on your post
                  </p>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs font-semibold text-slate-500">
                      1d
                    </span>
                  </div>
                </div>
                <p className="mt-0.5 text-sm text-slate-600">صلِ على النبي❤️</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <Check className="w-4 h-4" /> Read
                  </span>
                </div>
              </div>
            </div>
            <div className="group relative flex gap-3 rounded-xl border p-3 transition sm:rounded-2xl sm:p-4 border-slate-200 bg-white hover:bg-slate-50">
              <div className="relative shrink-0">
                <button className="block cursor-pointer">
                  <img
                    src={avatar}
                    className="h-11 w-11 rounded-full object-cover"
                    alt=""
                  />
                </button>
                <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-2 ring-white text-[#1877f2]">
                  <MessageCircle className="w-4 h-4" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-1.5 sm:gap-2">
                  <p className="text-sm leading-6 text-slate-800">
                    <button className="font-extrabold hover:text-[#1877f2] hover:underline">
                      Rawda{" "}
                    </button>{" "}
                    Commented on your post
                  </p>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs font-semibold text-slate-500">
                      1d
                    </span>
                  </div>
                </div>
                <p className="mt-0.5 text-sm text-slate-600">صلِ على النبي❤️</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <Check className="w-4 h-4" /> Read
                  </span>
                </div>
              </div>
            </div>
            <div className="group relative flex gap-3 rounded-xl border p-3 transition sm:rounded-2xl sm:p-4 border-slate-200 bg-white hover:bg-slate-50">
              <div className="relative shrink-0">
                <button className="block cursor-pointer">
                  <img
                    src={avatar}
                    className="h-11 w-11 rounded-full object-cover"
                    alt=""
                  />
                </button>
                <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-2 ring-white text-[#1877f2]">
                  <MessageCircle className="w-4 h-4" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-1.5 sm:gap-2">
                  <p className="text-sm leading-6 text-slate-800">
                    <button className="font-extrabold hover:text-[#1877f2] hover:underline">
                      Rawda{" "}
                    </button>{" "}
                    Commented on your post
                  </p>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs font-semibold text-slate-500">
                      1d
                    </span>
                  </div>
                </div>
                <p className="mt-0.5 text-sm text-slate-600">صلِ على النبي❤️</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <Check className="w-4 h-4" /> Read
                  </span>
                </div>
              </div>
            </div>
            <div className="group relative flex gap-3 rounded-xl border p-3 transition sm:rounded-2xl sm:p-4 border-slate-200 bg-white hover:bg-slate-50">
              <div className="relative shrink-0">
                <button className="block cursor-pointer">
                  <img
                    src={avatar}
                    className="h-11 w-11 rounded-full object-cover"
                    alt=""
                  />
                </button>
                <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-2 ring-white text-[#1877f2]">
                  <MessageCircle className="w-4 h-4" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-1.5 sm:gap-2">
                  <p className="text-sm leading-6 text-slate-800">
                    <button className="font-extrabold hover:text-[#1877f2] hover:underline">
                      Rawda{" "}
                    </button>{" "}
                    Commented on your post
                  </p>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs font-semibold text-slate-500">
                      1d
                    </span>
                  </div>
                </div>
                <p className="mt-0.5 text-sm text-slate-600">صلِ على النبي❤️</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <Check className="w-4 h-4" /> Read
                  </span>
                </div>
              </div>
            </div>
            <div className="group relative flex gap-3 rounded-xl border p-3 transition sm:rounded-2xl sm:p-4 border-slate-200 bg-white hover:bg-slate-50">
              <div className="relative shrink-0">
                <button className="block cursor-pointer">
                  <img
                    src={avatar}
                    className="h-11 w-11 rounded-full object-cover"
                    alt=""
                  />
                </button>
                <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-2 ring-white text-[#1877f2]">
                  <MessageCircle className="w-4 h-4" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-1.5 sm:gap-2">
                  <p className="text-sm leading-6 text-slate-800">
                    <button className="font-extrabold hover:text-[#1877f2] hover:underline">
                      Rawda{" "}
                    </button>{" "}
                    Commented on your post
                  </p>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs font-semibold text-slate-500">
                      1d
                    </span>
                  </div>
                </div>
                <p className="mt-0.5 text-sm text-slate-600">صلِ على النبي❤️</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <Check className="w-4 h-4" /> Read
                  </span>
                </div>
              </div>
            </div>
            <div className="group relative flex gap-3 rounded-xl border p-3 transition sm:rounded-2xl sm:p-4 border-slate-200 bg-white hover:bg-slate-50">
              <div className="relative shrink-0">
                <button className="block cursor-pointer">
                  <img
                    src={avatar}
                    className="h-11 w-11 rounded-full object-cover"
                    alt=""
                  />
                </button>
                <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-2 ring-white text-[#1877f2]">
                  <MessageCircle className="w-4 h-4" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-1.5 sm:gap-2">
                  <p className="text-sm leading-6 text-slate-800">
                    <button className="font-extrabold hover:text-[#1877f2] hover:underline">
                      Rawda{" "}
                    </button>{" "}
                    Commented on your post
                  </p>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs font-semibold text-slate-500">
                      1d
                    </span>
                  </div>
                </div>
                <p className="mt-0.5 text-sm text-slate-600">صلِ على النبي❤️</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <Check className="w-4 h-4" /> Read
                  </span>
                </div>
              </div>
            </div>
            <div className="group relative flex gap-3 rounded-xl border p-3 transition sm:rounded-2xl sm:p-4 border-slate-200 bg-white hover:bg-slate-50">
              <div className="relative shrink-0">
                <button className="block cursor-pointer">
                  <img
                    src={avatar}
                    className="h-11 w-11 rounded-full object-cover"
                    alt=""
                  />
                </button>
                <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-2 ring-white text-[#1877f2]">
                  <MessageCircle className="w-4 h-4" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-1.5 sm:gap-2">
                  <p className="text-sm leading-6 text-slate-800">
                    <button className="font-extrabold hover:text-[#1877f2] hover:underline">
                      Rawda{" "}
                    </button>{" "}
                    Commented on your post
                  </p>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs font-semibold text-slate-500">
                      1d
                    </span>
                  </div>
                </div>
                <p className="mt-0.5 text-sm text-slate-600">صلِ على النبي❤️</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <Check className="w-4 h-4" /> Read
                  </span>
                </div>
              </div>
            </div>
            <div className="group relative flex gap-3 rounded-xl border p-3 transition sm:rounded-2xl sm:p-4 border-slate-200 bg-white hover:bg-slate-50">
              <div className="relative shrink-0">
                <button className="block cursor-pointer">
                  <img
                    src={avatar}
                    className="h-11 w-11 rounded-full object-cover"
                    alt=""
                  />
                </button>
                <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-2 ring-white text-[#1877f2]">
                  <MessageCircle className="w-4 h-4" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-1.5 sm:gap-2">
                  <p className="text-sm leading-6 text-slate-800">
                    <button className="font-extrabold hover:text-[#1877f2] hover:underline">
                      Rawda{" "}
                    </button>{" "}
                    Commented on your post
                  </p>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs font-semibold text-slate-500">
                      1d
                    </span>
                  </div>
                </div>
                <p className="mt-0.5 text-sm text-slate-600">صلِ على النبي❤️</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <Check className="w-4 h-4" /> Read
                  </span>
                </div>
              </div>
            </div>
            <div className="group relative flex gap-3 rounded-xl border p-3 transition sm:rounded-2xl sm:p-4 border-slate-200 bg-white hover:bg-slate-50">
              <div className="relative shrink-0">
                <button className="block cursor-pointer">
                  <img
                    src={avatar}
                    className="h-11 w-11 rounded-full object-cover"
                    alt=""
                  />
                </button>
                <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-2 ring-white text-[#1877f2]">
                  <MessageCircle className="w-4 h-4" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-1.5 sm:gap-2">
                  <p className="text-sm leading-6 text-slate-800">
                    <button className="font-extrabold hover:text-[#1877f2] hover:underline">
                      Rawda{" "}
                    </button>{" "}
                    Commented on your post
                  </p>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs font-semibold text-slate-500">
                      1d
                    </span>
                  </div>
                </div>
                <p className="mt-0.5 text-sm text-slate-600">صلِ على النبي❤️</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <Check className="w-4 h-4" /> Read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
