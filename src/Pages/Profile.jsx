import React from "react";
import NavbarCom from "../components/NavbarCom";
import avatar from "../assets/default-profile.png";
import { Expand, Camera, Users, Mail, File, Bookmark, ThumbsUp, Repeat2, MessageCircle, Clock } from "lucide-react";

export default function Profile() {
  return (
    <div>
      <NavbarCom />

      <div className="mx-auto max-w-7xl py-4">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,.06)] sm:rounded-[28px]">
          <div className="group/cover relative h-44 bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)] sm:h-52 lg:h-60">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(255,255,255,.14)_0%,rgba(255,255,255,0)_36%)]"></div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_12%,rgba(186,230,253,.22)_0%,rgba(186,230,253,0)_44%)]"></div>

            <div className="absolute -left-16 top-10 h-36 w-36 rounded-full bg-white/8 blur-3xl"></div>

            <div className="absolute right-8 top-6 h-48 w-48 rounded-full bg-[#c7e6ff]/10 blur-3xl"></div>

            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 to-transparent"></div>

            <div className="pointer-events-none absolute right-2 top-2 z-10 flex max-w-[90%] flex-wrap items-center justify-end gap-1.5 opacity-100 transition duration-200 sm:right-3 sm:top-3 sm:max-w-none sm:gap-2 sm:opacity-0 sm:group-hover/cover:opacity-100 sm:group-focus-within/cover:opacity-100">
              <label
                htmlFor="coverInput"
                className="pointer-events-auto inline-flex cursor-pointer items-center gap-1 rounded-lg bg-black/45 px-2 py-1 text-[11px] font-bold text-white backdrop-blur transition hover:bg-black/60 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
              >
                <Camera className="h-4 w-4" />
                Add cover
                <input
                  id="coverInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="relative -mt-12 px-3 pb-5 sm:-mt-16 sm:px-8 sm:pb-6">
            <div className="rounded-3xl border border-white/60 bg-white/92 p-5 backdrop-blur-xl sm:p-7">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="min-w-0">
                  <div className="flex items-end gap-4">
                    <div className="group/avatar relative shrink-0">
                      <button className="cursor-zoom-in rounded-full">
                        <img
                          src={avatar}
                          className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md ring-2 ring-[#dbeafe]"
                          alt="Ahmed Salama"
                        />
                      </button>

                      <button className="absolute bottom-1 left-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-[#1877f2] opacity-100 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:bg-slate-50 sm:opacity-0 sm:group-hover/avatar:opacity-100 sm:group-focus-within/avatar:opacity-100">
                        <Expand className="h-4 w-4" />
                      </button>

                      <label
                        htmlFor="avatarInput"
                        className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#1877f2] text-white opacity-100 shadow-sm transition duration-200 hover:bg-[#166fe5] sm:opacity-0 sm:group-hover/avatar:opacity-100 sm:group-focus-within/avatar:opacity-100"
                      >
                        <Camera className="h-4 w-4" />

                        <input
                          id="avatarInput"
                          type="file"
                          accept="image/*"
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="min-w-0 pb-1">
                      <h2 className="truncate text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
                        Ahmed Salama
                      </h2>
                      <p className="mt-1 text-lg font-semibold text-slate-500 sm:text-xl">
                        @ahmedsalama7872
                      </p>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d7e7ff] bg-[#eef6ff] px-3 py-1 text-xs font-bold text-[#0b57d0]">
                        <Users className="w-3 h-3" /> Route Posts member
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid w-full grid-cols-3 gap-2 lg:w-[520px]">
                  <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                      Followers
                    </p>
                    <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                      0
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                      Following
                    </p>
                    <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                      1
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                      Bookmarks
                    </p>
                    <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                      0
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-extrabold text-slate-800">
                    About
                  </h3>
                  <div className="mt-3 space-y-2 text-sm text-slate-600">
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4" /> ahmedsalama7872@gmail.com
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="w-4 h-4" /> Active on Route Posts
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">
                      My posts
                    </p>
                    <p className="mt-1 text-2xl font-black text-slate-900">1</p>
                  </div>
                  <div className="rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">
                      Saved Posts
                    </p>
                    <p className="mt-1 text-2xl font-black text-slate-900">0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm mt-5">
          <div className="grid w-full grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1.5 sm:inline-flex sm:w-auto sm:gap-0">
            <button className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition bg-white text-[#1877f2] shadow-sm">
              <File className="w-4 h-4" /> My Posts
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition text-slate-600 hover:text-slate-900">
              <Bookmark className="w-4 h-4" /> Saved
            </button>
          </div>
          <span className="rounded-full bg-[#e7f3ff] px-3 py-1 text-xs font-bold text-[#1877f2]">
            1
          </span>
        </div>




        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white py-3  shadow-sm mt-5">
          <div className="flex w-full justify-between items-center px-4">
            <div className="flex gap-3 items-center">
              <img src={avatar} alt="" className="w-10 h-10 rounded" />
              <div>
                <h3 className="truncate text-sm font-extrabold text-slate-900">Ahmed Salama</h3>
                <p className="truncate text-xs font-semibold text-slate-500">@ahmedsalama7872</p>
              </div>
            </div>
            <button className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] transition hover:bg-[#e7f3ff]">View details</button>
          </div>
          {/* post content */}
          <div className="w-full px-4">
            <p>صل على النبي♥</p>
          </div>


<div className="w-full pt-3 px-4 border-t border-neutral-300 flex justify-between">
<div className="flex gap-8 ">
  <div className="flex gap-2 items-center">
  <ThumbsUp className="w-4 h-4 text-blue-600"/>
  <span className="text-sm text-neutral-800">2 likes</span> 
  </div>
  <div className="flex gap-2 items-center">
  <Repeat2 className="w-4 h-4 text-blue-600"/>
  <span className="text-sm text-neutral-800">0 Shares</span> 
  </div>
  <div className="flex gap-2 items-center">
  <MessageCircle className="w-4 h-4 text-blue-600"/>
  <span className="text-sm text-neutral-800">2 Comments</span> 
  </div>
</div>

<span className="text-sm text-neutral-800 flex gap-1 items-center"><Clock className="w-4 h-4"/> Sep 21, 6:30 PM</span>

</div>

        </div>
      </div>
    </div>
  );
}
