import React, { useState, useEffect } from "react";
import PostCard from "./PostCard/PostCard";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import NavbarCom from "./NavbarCom";

export default function PostPreview() {
  const [post, setPost] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  async function getPost() {
    try {
      const { data } = await axios.get(
        `https://route-posts.routemisr.com/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      setPost(data.data.post);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPost();
  }, [id]);

  return (

    <div>
    <div className="h-screen bg-[#F0F2F5]">
<NavbarCom/>
      <div className="w-[800px] mx-auto pt-5">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 cursor-pointer"
          >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {post && <PostCard post={post} />}
      </div>
    </div>
            </div>
  );
}