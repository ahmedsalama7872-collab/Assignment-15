import avatar from "../assets/default-profile.png";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext.jsx";
import { User, Send, Earth, Lock, Image, Smile, X } from "lucide-react";

import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import { useState } from "react";

export default function NewPost() {
  const { user } = useContext(UserContext);
  const { handleSubmit, register } = useForm();

  const [privacy, setPrivacy] = useState("public");
  const [showEmoji, setShowEmoji] = useState(false);
  const [postText, setPostText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  async function onSubmit(data) {
    const formData = new FormData();

    if (postText.trim()) {
      formData.append("body", postText);
    }

    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    if (!postText.trim() && !data.image?.[0]) {
      return;
    }

    try {
      await axios.post("https://route-posts.routemisr.com/posts", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      window.location.reload();
    } catch (error) {
      console.log(error.response?.data);
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const handleEmojiClick = (emojiData) => {
    setPostText((prev) => prev + emojiData.emoji);
  };

  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <img src={user?.photo?user.photo:avatar} className="w-12 rounded-full" alt={user?.name} />

          <div className="space-y-2">
            <h2 className="font-bold">{user?.name}</h2>

            <div className="w-fit rounded-full">
              <div className="flex items-center gap-1.5 rounded-full bg-[#F1F5F9] px-2.5 py-1">
                {privacy === "public" ? (
                  <Earth className="h-4 w-4 text-gray-600" />
                ) : privacy === "followers" ? (
                  <User className="h-4 w-4 text-gray-600" />
                ) : (
                  <Lock className="h-4 w-4 text-gray-600" />
                )}

                <select
                  onChange={(e) => setPrivacy(e.target.value)}
                  value={privacy}
                  className="cursor-pointer bg-transparent text-xs outline-0"
                >
                  <option value="public">Public</option>
                  <option value="followers">Followers</option>
                  <option value="only me">Only Me</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          className="mt-5 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
          placeholder={`What's on your mind , ${user?.name.split(" ")[0]}?`}
          rows={4}
        />

        {/* Image Preview */}
        {imagePreview && (
          <div className="relative mt-4 overflow-hidden rounded-xl border border-slate-200">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-60 w-full object-cover"
            />

            <button
              type="button"
              onClick={removeImage}
              className="absolute cursor-pointer right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="relative mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
          <div className="flex gap-4">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
              <Image className="h-5 w-5 text-green-500" />
              Photo/video
              <input
                {...register("image", {
                  onChange: (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImagePreview(URL.createObjectURL(file));
                    }
                  },
                })}
                type="file"
                accept="image/*,video/*"
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={() => setShowEmoji(!showEmoji)}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              <Smile className="h-5 w-5 text-yellow-400" />
              Feeling/activity
            </button>
          </div>

          <button
            type="submit"
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#1877f2] px-5 py-2 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#166fe5]"
          >
            Post
            <Send className="h-4 w-4" />
          </button>

          {showEmoji && (
            <div className="absolute left-0 top-14 z-50">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
