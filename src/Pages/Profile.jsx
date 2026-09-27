import React, { useContext, useEffect, useState } from "react";
import NavbarCom from "../components/NavbarCom";
import avatar from "../assets/default-profile.png";
import { UserContext } from "../components/UserContext.jsx";

import { Button, Modal } from "flowbite-react";
import {
  Expand,
  Camera,
  Users,
  Mail,
  File,
  Bookmark,
  ThumbsUp,
  Repeat2,
  MessageCircle,
  Clock,
  UserPlus,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import PostCard from "../components/PostCard/PostCard.jsx";
import Follow from "../components/Follow.jsx";

export default function Profile() {
  const { id } = useParams();
  const { user: loggedInUser } = useContext(UserContext);

  const isMyProfile = !id || (loggedInUser && id === loggedInUser._id);
  const targetId = id || loggedInUser?._id;

  const [profileUser, setProfileUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [myPosts, setMyPosts] = useState([]);
  const [cover, setCover] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [my, setMy] = useState(true);
  const [profile,setProfile]= useState(true)

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [zoom, setZoom] = useState(1);

  async function getUserProfile() {
    if (!targetId) return;
    
    if (isMyProfile && loggedInUser) {
      setProfileUser(loggedInUser);
      setCoverPreview(loggedInUser?.cover);
      return;
    }

    try {
      const { data } = await axios.get(
        `https://route-posts.routemisr.com/users/${targetId}/profile`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
        }
      );
      setProfileUser(data?.data?.user || data?.data);
      setCoverPreview(data?.data?.user?.cover || data?.data?.cover);
    } catch (err) {
      console.log(err);
    }
  }

  async function getTargetPosts() {
    if (!targetId) return;
    try {
      const endpoint = `https://route-posts.routemisr.com/users/${targetId}/posts`;

      const { data } = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
      });
      
      const postsData = data?.data?.posts || data?.posts || data?.data || [];
      setMyPosts(Array.isArray(postsData) ? postsData : []);
    } catch (err) {
      console.log(err);
      setMyPosts([]);
    }
  }

  async function getSaved() {
    try {
      const { data } = await axios.get(
        `https://route-posts.routemisr.com/users/bookmarks`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
        }
      );
      const savedData = data?.data?.bookmarks || data?.bookmarks || data?.data || [];
      setMyPosts(Array.isArray(savedData) ? savedData : []);
    } catch (err) {
      console.log(err);
      setMyPosts([]);
    }
  }

  useEffect(() => {
    if (targetId) {
      getUserProfile();
      if (my) {
        getTargetPosts();
      }
    }
  }, [targetId, loggedInUser]);

  async function coverUpload(coverFile) {
    const formData = new FormData();
    formData.append("cover", coverFile);

    try {
      const { data } = await axios.put(
        "https://route-posts.routemisr.com/users/upload-cover",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      const newCover = data?.data?.user?.cover || data?.data?.cover;
      if (newCover) {
        setCoverPreview(newCover);
      }

      setCover(null);
      getTargetPosts();
    } catch (err) {
      console.log(err);
    }
  }

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCover(file);
    coverUpload(file);
  };

  async function uploadPhoto(file) {
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      await axios.put(
        "https://route-posts.routemisr.com/users/upload-photo",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const createCroppedImage = () => {
    return new Promise((resolve, reject) => {
      if (!avatarFile) {
        reject(new Error("No image selected"));
        return;
      }

      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Canvas context is not available"));
          return;
        }

        const outputSize = 800;
        canvas.width = outputSize;
        canvas.height = outputSize;

        const sourceSize =
          Math.min(image.naturalWidth, image.naturalHeight) / zoom;
        const sourceX = (image.naturalWidth - sourceSize) / 2;
        const sourceY = (image.naturalHeight - sourceSize) / 2;

        ctx.drawImage(
          image,
          sourceX,
          sourceY,
          sourceSize,
          sourceSize,
          0,
          0,
          outputSize,
          outputSize
        );

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to create image"));
              return;
            }

            const croppedFile = new window.File([blob], avatarFile.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });

            resolve(croppedFile);
          },
          "image/jpeg",
          0.9
        );
      };

      image.onerror = () => {
        reject(new Error("Failed to load image"));
      };

      image.src = URL.createObjectURL(avatarFile);
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    setAvatarFile(file);
    const imageUrl = URL.createObjectURL(file);
    setAvatarPreview(imageUrl);
    setZoom(1);
    setOpenModal(true);
    e.target.value = "";
  };

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const closeModal = () => {
    setOpenModal(false);
    setZoom(1);
  };

  const handleSavePhoto = async () => {
    try {
      const croppedImage = await createCroppedImage();
      setOpenModal(false);
      await uploadPhoto(croppedImage);
    } catch (err) {
      console.log(err);
    }
  };
const navigate=useNavigate()
  const currentUser = isMyProfile ? loggedInUser : profileUser;

  return (
    <div>
      <NavbarCom />

      <div className="mx-auto max-w-7xl py-4">
{!isMyProfile&&        <button onClick={()=>navigate(-1)} className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 mb-5"><ArrowLeft className="w-4 h-4"/> Back</button>
}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,.06)] sm:rounded-[28px]">
          {/* Cover */}
          <div className="group/cover relative h-44 bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)] sm:h-52 lg:h-60">
            {coverPreview ? (
              <>
                <img
                  src={coverPreview}
                  alt="Cover"
                  className="h-full w-full object-cover"
                />
                {isMyProfile && (
                  <div className="pointer-events-none absolute right-2 top-2 z-10 flex max-w-[90%] flex-wrap items-center justify-end gap-1.5 opacity-100 transition duration-200 sm:right-3 sm:top-3 sm:max-w-none sm:gap-2 sm:opacity-0 sm:group-hover/cover:opacity-100 sm:group-focus-within/cover:opacity-100">
                    <label
                      htmlFor="cover"
                      className="pointer-events-auto inline-flex cursor-pointer items-center gap-1 rounded-lg bg-black/45 px-2 py-1 text-[11px] font-bold text-white backdrop-blur transition hover:bg-black/60 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
                    >
                      <Camera className="w-4 h-4" />
                      Add cover
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      id="cover"
                      onChange={handleCoverChange}
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(255,255,255,.14)_0%,rgba(255,255,255,0)_36%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_12%,rgba(186,230,253,.22)_0%,rgba(186,230,253,0)_44%)]"></div>
                <div className="absolute -left-16 top-10 h-36 w-36 rounded-full bg-white/8 blur-3xl"></div>
                <div className="absolute right-8 top-6 h-48 w-48 rounded-full bg-[#c7e6ff]/10 blur-3xl"></div>
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 to-transparent"></div>
                
                {isMyProfile && (
                  <div className="pointer-events-none absolute right-2 top-2 z-10 flex max-w-[90%] flex-wrap items-center justify-end gap-1.5 opacity-100 transition duration-200 sm:right-3 sm:top-3 sm:max-w-none sm:gap-2 sm:opacity-0 sm:group-hover/cover:opacity-100 sm:group-focus-within/cover:opacity-100">
                    <label
                      htmlFor="cover"
                      className="pointer-events-auto inline-flex cursor-pointer items-center gap-1 rounded-lg bg-black/45 px-2 py-1 text-[11px] font-bold text-white backdrop-blur transition hover:bg-black/60 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
                    >
                      <Camera className="w-4 h-4" />
                      Add cover
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      id="cover"
                      onChange={handleCoverChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Profile Info */}
          <div className="relative -mt-12 px-3 pb-5 sm:-mt-16 sm:px-8 sm:pb-6">
            <div className="rounded-3xl border border-white/60 bg-white/92 p-5 backdrop-blur-xl sm:p-7">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="min-w-0">
                  <div className="flex items-end gap-4">
                    {/* Avatar */}
                    <div className="group/avatar relative shrink-0">
                      <button type="button" className="cursor-zoom-in rounded-full">
                        <img
                          src={currentUser?.photo || avatar}
                          className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md ring-2 ring-[#dbeafe]"
                          alt={currentUser?.name || "User"}
                        />
                      </button>

                      {isMyProfile && (
                        <>
                          <button
                            type="button"
                            className="absolute bottom-1 left-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-[#1877f2] opacity-100 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:bg-slate-50 sm:opacity-0 sm:group-hover/avatar:opacity-100 sm:group-focus-within/avatar:opacity-100"
                          >
                            <Expand className="h-4 w-4" />
                          </button>

                          <label
                            htmlFor="upload-avatar-input"
                            className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#1877f2] text-white opacity-100 shadow-sm transition duration-200 hover:bg-[#166fe5] sm:opacity-0 sm:group-hover/avatar:opacity-100 sm:group-focus-within/avatar:opacity-100"
                          >
                            <Camera className="h-4 w-4" />
                            <input
                              id="upload-avatar-input"
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                        </>
                      )}
                    </div>

                    {/* Name + Username */}
                    <div className="min-w-0 pb-1">
                      <h2 className="truncate text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
                        {currentUser?.name}
                      </h2>
                      <p className="mt-1 text-lg font-semibold text-slate-500 sm:text-xl">
                        @{currentUser?.username}
                      </p>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d7e7ff] bg-[#eef6ff] px-3 py-1 text-xs font-bold text-[#0b57d0]">
                        <Users className="h-3 w-3" />
                        Route Posts member
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                {isMyProfile ? (
                  <div className="grid w-full grid-cols-3 gap-2 lg:w-[520px]">
                    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                        Followers
                      </p>
                      <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                        {currentUser?.followersCount || 0}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                        Following
                      </p>
                      <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                        {currentUser?.followingCount || 0}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                        Bookmarks
                      </p>
                      <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                        {currentUser?.bookmarksCount || 0}
                      </p>
                    </div>
                  </div>
                ):
                <Follow userID={targetId} setProfile={setProfile} profile={profile} />
                }
              </div>

              {/* About */}
              {isMyProfile && (
                <div className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <h3 className="text-sm font-extrabold text-slate-800">About</h3>
                    <div className="mt-3 space-y-2 text-sm text-slate-600">
                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {currentUser?.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Active on Route Posts
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    <div className="rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">
                        My posts
                      </p>
                      <p className="mt-1 text-2xl font-black text-slate-900">
                        {myPosts.length}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">
                        Saved Posts
                      </p>
                      <p className="mt-1 text-2xl font-black text-slate-900">
                        {currentUser?.bookmarksCount || 0}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        {isMyProfile&&<div className="mt-5 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="grid w-full grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1.5 sm:inline-flex sm:w-auto sm:gap-0">
            <button
              onClick={() => {
                setMy(true);
                getTargetPosts();
              }}
              className={`inline-flex items-center justify-center gap-2 rounded-lg cursor-pointer ${
                my ? "bg-white text-[#1877f2] shadow-sm" : "text-slate-600"
              } px-4 py-2 text-sm font-bold transition`}
            >
              <File className="h-4 w-4" />
              Posts
            </button>
            {isMyProfile && (
              <button
                onClick={() => {
                  setMy(false);
                  getSaved();
                }}
                className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${
                  !my
                    ? "bg-white text-[#1877f2] shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Bookmark className="h-4 w-4" />
                Saved
              </button>
            )}
          </div>
          <span className="rounded-full bg-[#e7f3ff] px-3 py-1 text-xs font-bold text-[#1877f2]">
            {myPosts.length}
          </span>
        </div>
}
        {/* Posts Loop with Custom Design for MyProfile (Posts & Saved) */}
        {myPosts.length > 0 ? (
          myPosts.map((post) => {
            // التحقق: إذا كان البروفाइल هو بروفايلي الشخصي (سواء في قسم الـ Posts أو الـ Saved)
            return isMyProfile ? (
              <div
                key={post._id}
                className="mt-5 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white py-3 shadow-sm"
              >
                <div className="flex w-full items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.user?.photo || currentUser?.photo || avatar}
                      alt={post.user?.name || currentUser?.name || "User"}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="truncate text-sm font-extrabold text-slate-900">
                        {post.user?.name || currentUser?.name}
                      </h3>
                      <p className="truncate text-xs font-semibold text-slate-500">
                        @{post.user?.username || currentUser?.username}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/PostPreview/${post.sharedPost ? post.sharedPost._id : post._id}`}
                    className="text-blue-600 text-xs hover:underline font-medium ml-1 cursor-pointer"
                  >
                    View details
                  </Link>
                </div>

                {/* Post Body/Text */}
                {(post.body || post.content) && (
                  <div className="w-full px-4 pt-2">
                    <p>{post.body || post.content}</p>
                  </div>
                )}

                {/* Post Image */}
                {post.image && (
                  <div className="w-full bg-slate-950/95 mt-3">
                    <img
                      src={post.image}
                      alt="Post content"
                      className="w-full max-h-[500px] object-contain"
                    />
                  </div>
                )}

                <div className="mt-2 flex w-full justify-between border-t border-neutral-300 px-4 pt-3">
                  <div className="flex gap-8">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-neutral-800">
                        {post.likesCount ?? post.likes?.length ?? 0} likes
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Repeat2 className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-neutral-800">
                        {post.sharesCount || 0} Shares
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-neutral-800">
                        {post.commentsCount || 0} Comments
                      </span>
                    </div>
                  </div>

                  <span className="flex items-center gap-1 text-sm text-neutral-800">
                    <Clock className="h-4 w-4" />
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ) : (
              <div key={post._id} className="mt-5">
                <PostCard post={post} />
              </div>
            );
          })
        ) : (
          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            No posts found.
          </div>
        )}
      </div>

      {/* Adjust Profile Photo Modal */}
      <Modal show={openModal} onClose={closeModal} className="[&>div]:max-w-[560px]">
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:p-5">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Adjust profile photo
              </h3>
              <p className="text-sm text-slate-500">
                Use zoom to adjust your profile photo.
              </p>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg px-3 py-1 text-xl text-slate-500 hover:bg-slate-100"
            >
              ×
            </button>
          </div>

          {/* Image Preview */}
          <div className="mx-auto flex w-full max-w-[340px] items-center justify-center">
            <div className="relative flex h-[320px] w-[320px] items-center justify-center overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Preview"
                  className="h-full w-full select-none object-cover"
                  style={{
                    transform: `scale(${zoom})`,
                    transition: "transform 0.1s ease-out",
                  }}
                />
              ) : (
                <div className="text-sm text-slate-400">No image selected</div>
              )}
            </div>
          </div>

          {/* Zoom */}
          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Zoom</span>
              <span>{zoom.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#1877f2]"
            />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <Button color="alternative" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              className="bg-[#1877f2] hover:bg-[#166fe5]"
              onClick={handleSavePhoto}
            >
              Save photo
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}