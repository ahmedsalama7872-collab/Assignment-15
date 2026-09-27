import React from "react";
import NewPost from "../components/NewPost";
import PostCard from "../components/PostCard/PostCard.jsx";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function Feed() {
  const { link, setLink } = useOutletContext();

  async function getPosts() {
    if (!link) return [];

    try {
      const { data } = await axios.get(link, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      console.log("API Data:", data);

      const allPosts =
        data.data?.bookmarks ||
        data.posts ||
        data.data?.posts ||
        [];

      if (allPosts.length > 0) {
        console.log("Full First Post Object:", allPosts[0]);
      }

      return allPosts;
    } catch (error) {
      console.log(
        "Error:",
        error.response?.data || error.message
      );

      throw error;
    }
  }

  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["feed", link],
    queryFn: getPosts,
    enabled: !!link,

    staleTime: 1000 * 60 * 5,

    refetchOnMount: false,

    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <NewPost />

      <div className="space-y-6 mt-4">
        {isLoading ? (
          <p className="text-center mt-4 text-slate-500">
            جاري تحميل المنشورات...
          </p>
        ) : isError ? (
          <p className="text-center mt-4 text-red-500">
            حدث خطأ أثناء تحميل المنشورات
          </p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              link={link}
              setLink={setLink}
              key={post._id || post.id}
              post={post}
            />
          ))
        ) : (
          <p className="text-center mt-4 text-slate-500">
            لا توجد منشورات لعرضها
          </p>
        )}
      </div>
    </div>
  );
}