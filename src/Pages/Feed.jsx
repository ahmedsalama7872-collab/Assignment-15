import React, { useRef, useEffect, useState } from "react";
import NewPost from "../components/NewPost";
import PostCard from "../components/PostCard/PostCard.jsx";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

export default function Feed() {
  const { link, setLink, page, setPage } = useOutletContext();

  const [isPosting, setIsPosting] = useState(false);
  const [allPosts, setAllPosts] = useState([]);

  const lastPostRef = useRef(null);

  async function getPosts() {
  if (!link) return [];

  try {
    const url = link.includes("/users/bookmarks")
      ? `${link}?page=${page}&limit=40`
      : `${link}&page=${page}&limit=40`;

    const { data } = await axios.get(url, {
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
    refetch,
  } = useQuery({
    queryKey: ["feed", link, page],
    queryFn: getPosts,
    enabled: !!link,

    staleTime: 1000 * 60 * 5,

    refetchOnMount: false,

    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setPage(1);
    setAllPosts([]);
  }, [link]);

  useEffect(() => {
    if (posts.length > 0) {
      setAllPosts((oldPosts) => {
        const newPosts = posts.filter(
          (post) =>
            !oldPosts.some(
              (oldPost) => oldPost._id === post._id
            )
        );

        return [...oldPosts, ...newPosts];
      });
    }
  }, [posts]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        posts.length === 40
      ) {
        setPage((prev) => prev + 1);
      }
    });

    if (lastPostRef.current) {
      observer.observe(lastPostRef.current);
    }

    return () => observer.disconnect();
  }, [posts]);

  return (
    <div>
      <NewPost
        refetch={refetch}
        setIsPosting={setIsPosting}
      />

      <div className="space-y-6 mt-4">
        {isLoading && allPosts.length === 0 ? (
          <p className="text-center mt-4 text-slate-500">
            جاري تحميل المنشورات...
          </p>
        ) : isError ? (
          <p className="text-center mt-4 text-red-500">
            حدث خطأ أثناء تحميل المنشورات
          </p>
        ) : isPosting ? (
          <div className="text-center mt-40">
            <ClipLoader color="#36d7b7" />
          </div>
        ) : allPosts.length > 0 ? (
          <>
            {allPosts.map((post) => (
              <PostCard
                refetch={refetch}
                link={link}
                setLink={setLink}
                key={post._id || post.id}
                post={post}
              />
            ))}

            <div ref={lastPostRef}></div>

            {isLoading && (
              <div className="text-center py-6">
                <ClipLoader color="#36d7b7" />
              </div>
            )}
          </>
        ) : (
          <p className="text-center mt-4 text-slate-500">
            لا توجد منشورات لعرضها
          </p>
        )}
      </div>
    </div>
  );
}
