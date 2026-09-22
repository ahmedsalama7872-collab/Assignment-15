"use client";

import { UserPlus, Search, Users } from "lucide-react";

export default function Suggested() {
  const friends = [
    { 
      name: "MrMo", 
      username: "@mrmo", 
      followers: "194 followers", 
      mutual: "1 mutual", 
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces" 
    },
    { 
      name: "Ahmed Abd Al-...", 
      username: "@ahmedmurt...", 
      followers: "314 followers", 
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=faces" 
    },
    { 
      name: "menna", 
      username: "@gbngnmb", 
      followers: "157 followers", 
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" 
    },
    { 
      name: "abdalla diaa", 
      username: "@abdalla_diaa", 
      followers: "144 followers", 
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces" 
    },
    { 
      name: "Jade", 
      username: "@jade", 
      followers: "113 followers", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces" 
    },
  ];

  return (
    <div className="w-[300px] bg-white rounded-2xl border border-gray-100 p-4 shadow-sm mt-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-800 font-semibold text-sm">
          <Users className="w-4 h-4 text-blue-600" />
          <span>Suggested Friends</span>
        </div>
        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">
          5
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
        {friends.map((friend, index) => (
          <div key={index} className="p-2.5 border border-gray-100 rounded-xl hover:border-gray-200 transition-all bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-gray-900 truncate">
                    {friend.name}
                  </h4>
                  <p className="text-[11px] text-gray-400 truncate">{friend.username}</p>
                </div>
              </div>
              <button className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-xl transition-colors flex-shrink-0">
                <UserPlus className="w-3.5 h-3.5" />
                <span>Follow</span>
              </button>
            </div>
            
            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
              <span className="bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                {friend.followers}
              </span>
              {friend.mutual && (
                <span className="bg-blue-50/50 text-blue-600 px-2 py-0.5 rounded-md border border-blue-100/50">
                  {friend.mutual}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-2 border-t border-gray-50">
        <button className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-semibold rounded-xl transition-colors text-center">
          View more
        </button>
      </div>
    </div>
  );
}