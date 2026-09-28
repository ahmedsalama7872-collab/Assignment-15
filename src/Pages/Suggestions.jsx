import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
import Follow from "../components/Follow.jsx";

export default function Suggestions() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);

  const {
    data: currentPageUsers = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["suggestions", page],
    queryFn: async () => {
      const response = await axios.get(
        `https://route-posts.routemisr.com/users/suggestions?page=${page}&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return response.data?.data?.suggestions || [];
    },
  });

  useEffect(() => {
    if (!currentPageUsers.length) return;

    setUsers((prev) => {
      // أول صفحة
      if (page === 1) {
        return currentPageUsers;
      }

      // استبدال الصفحة الحالية بعد الـ refetch
      const startIndex = (page - 1) * 20;

      const newUsers = [...prev];

      newUsers.splice(startIndex, 20, ...currentPageUsers);

      return newUsers;
    });
  }, [currentPageUsers, page]);

  return (
    <div className="min-h-screen bg-[#F0F2F5] pb-12">
      <div className="max-w-4xl mx-auto pt-6 px-4">

        <Link
          to="/app/feed"
          className="inline-flex items-center gap-2 text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium mb-6 shadow-sm transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to feed
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-700" />

              <h2 className="text-lg font-bold text-gray-900">
                All Suggested Friends
              </h2>
            </div>

            <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">
              {users.length}
            </span>
          </div>

          {isLoading && page === 1 && (
            <div className="text-center py-12 text-gray-500 font-medium">
              Loading suggestions...
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {users.map((friend) => (
              <div
                key={friend._id}
                className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 shadow-xs transition"
              >
                <div className="flex items-center gap-3">

                  <Link to={`/profile/${friend._id}`}>
                    <img
                      src={friend.photo}
                      alt={friend.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-100"
                    />
                  </Link>

                  <div>
                    <Link to={`/profile/${friend._id}`}>
                      <h4 className="font-bold text-sm text-gray-900 hover:underline">
                        {friend.name}
                      </h4>
                    </Link>

                    <span className="text-xs text-gray-500 block mb-1">
                      @{friend.username}
                    </span>

                    <span className="text-[11px] text-gray-400 font-medium">
                      {friend.followersCount || 0} followers
                    </span>
                  </div>

                </div>

                <Follow
                  userID={friend._id}
                  refetch={refetch}
                />
              </div>
            ))}

          </div>

          <div className="mt-8 text-center">

            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={isFetching}
              className="w-full py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-semibold rounded-2xl transition cursor-pointer text-sm"
            >
              {isFetching ? "Loading more..." : "View more"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}