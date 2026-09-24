import React, { useEffect, useState } from "react";
import NewPost from "../components/NewPost";
import PostCard from "../components/PostCard";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { link, setLink, bookmarked } = useOutletContext();

  async function getPosts() {
    if (!link) return;

    setIsLoading(true);
    try {
      const { data } = await axios.get(
        link,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      console.log("API Data:", data);

const allPosts = data.data?.bookmarks || data.posts || data.data?.posts || [];
      if (allPosts.length > 0) {
        console.log("Full First Post Object:", allPosts[0]);
      }
      setPosts(allPosts);
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, [link, bookmarked]);

  return (
    <div>
      <NewPost />
      <div className="space-y-6 mt-4">
        {isLoading ? (
          <p className="text-center mt-4 text-slate-500">جاري تحميل المنشورات...</p>
        ) : posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id || post.id} post={post} />)
        ) : (
          <p className="text-center mt-4 text-slate-500">
            لا توجد منشورات لعرضها
          </p>
        )}
      </div>
    </div>
  );
}