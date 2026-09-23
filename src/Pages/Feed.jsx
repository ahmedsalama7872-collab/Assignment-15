import React, { useEffect, useState } from "react";
import NewPost from "../components/NewPost";
import PostCard from "../components/PostCard";
import axios from "axios";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  async function getPost() {
    try {
      const { data } = await axios.get(
        "https://route-posts.routemisr.com/posts",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      // اطبع البيانات هنا لترى شكلها في الـ Console
      console.log("API Data:", data);

      // جرب هذا الاحتمال أو data.posts حسب ما سيظهر في الكونسول
      setPosts(data.posts || data.data?.posts || []);
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      <NewPost />
<div className="space-y-6">

      {posts && posts.length > 0 ? (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      ) : (
        <p className="text-center mt-4 text-slate-500">
          ...جاري تحميل المنشورات أو لا توجد منشورات
        </p>
      )}
      </div>
    </div>
  );
}
