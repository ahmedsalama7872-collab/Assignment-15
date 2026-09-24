"use client";

import axios from "axios";
import { UserPlus, Search, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function Suggested() {
  const [suggestions, setSuggestions] = useState([]);
const [sugMenu,setSugMenu] = useState(false)
  async function getSuggested() {
    try {
      const { data } = await axios.get(
        'https://route-posts.routemisr.com/users/suggestions?page=1&limit=5',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      console.log("API Response:", data);

      // التعديل هنا: الوصول للمصفوفة الصحيحة عبر data.suggestions
      const usersList = data.data.suggestions;
      
      setSuggestions( usersList);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getSuggested();
  }, []);

  return (
    <div>
<button onClick={()=>setSugMenu(!sugMenu)} className="inline-flex w-full lg:hidden items-center cursor-pointer justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm">
  <span className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-900"><Users className="w-4 h-4 text-blue-600" /> Suggested Friends</span>
  <span className="inline-flex items-center gap-2">
    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">{suggestions.length}</span>
    <span className="text-xs font-bold text-[#1877f2]">{sugMenu?'Hide':'Show'}</span>
  </span>
</button>
    {sugMenu?<div className="lg:w-[300px]  sticky top-[84px] z-40 bg-white rounded-2xl h-fit border border-gray-100 p-4 shadow-sm mt-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-800 font-semibold text-sm">
          <Users className="w-4 h-4 text-blue-600" />
          <span>Suggested Friends</span>
        </div>
        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">
          {suggestions.length}
        </span>
      </div>

      <div className="relative mb-3">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
          <Search className="w-3.5 h-3.5" />
        </span>
        <input
          type="text"
          placeholder="Search friends..."
          className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all"
          />
      </div>

      <div className="space-y-2.5">
        { 
          suggestions.map((user) => (
            <div key={user._id || user.id} className="p-2.5 border border-gray-100 rounded-xl hover:border-gray-200 transition-all bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                    />
                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-gray-900 truncate">
                      {user.name}
                    </h4>
                    <p className="text-[11px] text-gray-400 truncate">@{user.username}</p>
                  </div>
                </div>
                <button className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-xl transition-colors flex-shrink-0">
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Follow</span>
                </button>
              </div>
              
              <div className="mt-2 hidden lg:block flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
                <span className="bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                  {user.followersCount || 0} followers
                </span>
              </div>
            </div>
          ))
        }
      </div>

      <div className="mt-3 pt-2 border-t border-gray-50">
        <button className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-semibold rounded-xl transition-colors text-center">
          View more
        </button>
      </div>
    </div>:''}
        </div>
  );
}