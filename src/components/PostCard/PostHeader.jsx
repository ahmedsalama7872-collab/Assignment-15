import React from "react";
import dayjs from "dayjs";
import {
  Earth,
  MoreHorizontal,
  User,
  Lock,
  ChevronDown,
  Bookmark,
  Pencil,
  Trash2,
} from "lucide-react";

import { Dropdown, DropdownItem } from "flowbite-react";
import { Link } from "react-router-dom";

export default function PostHeader({ post,handleSave,saved }) {
  const { user, privacy, createdAt, body } = post;

  const isProfilePictureUpdate =
    body?.trim() === "updated profile picture.";
  const isCoverUpdate =
    body?.trim() === "updated cover photo.";

  return (
    <div className="flex p-5 pb-0 items-start justify-between">
      {/* User Info & Privacy */}
      <div className="flex items-center gap-3">
        <Link to={`/profile/${user._id}`}>
        <img
          src={user?.photo}
          className="w-11 h-11 rounded-full object-cover"
          alt={user?.name}
          />
          </Link>

        <div>
          <div className="flex items-center gap-2">
            <Link to={`/profile/${user._id}`}>
            <h3 className="font-bold text-sm text-gray-900">
              {user?.name}
            </h3>
            </Link>

            {isProfilePictureUpdate && (
              <span className="text-sm text-gray-500">
                updated profile picture.
              </span>
            )}
            {isCoverUpdate && (
              <span className="text-sm text-gray-500">
                updated cover photo.
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
            <Link to={`/profile/${user._id}`}>
            <span>@{user?.username}</span>
            </Link>

            <span>•</span>

            <span>{dayjs(createdAt).fromNow()}</span>

            <span>•</span>

            <div className="w-fit rounded-full">
              <Dropdown
                label=""
                renderTrigger={() => (
                  <div className="flex items-center gap-1.5 rounded-full bg-[#F1F5F9] px-3 py-1 cursor-pointer hover:bg-slate-200 transition">
                    {privacy === "public" ? (
                      <Earth className="h-3.5 w-3.5 text-gray-600" />
                    ) : privacy === "followers" ? (
                      <User className="h-3.5 w-3.5 text-gray-600" />
                    ) : (
                      <Lock className="h-3.5 w-3.5 text-gray-600" />
                    )}

                    <span className="text-xs font-medium text-black capitalize">
                      {privacy === "public"
                        ? "Public"
                        : privacy === "followers"
                        ? "Followers"
                        : "Only Me"}
                    </span>

                    <ChevronDown className="w-3 h-3 text-black" />
                  </div>
                )}
                dismissOnClick={true}
                className="rounded-2xl shadow-lg border border-gray-100 p-1 w-40"
                placement="bottom-start"
              >
                <DropdownItem className="flex items-center gap-2.5 py-2 px-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100">
                  <Earth className="w-4 h-4 text-gray-500" />
                  <span>Public</span>
                </DropdownItem>

                <DropdownItem className="flex items-center gap-2.5 py-2 px-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100">
                  <User className="w-4 h-4 text-gray-500" />
                  <span>Followers</span>
                </DropdownItem>

                <DropdownItem className="flex items-center gap-2.5 py-2 px-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100">
                  <Lock className="w-4 h-4 text-gray-500" />
                  <span>Only Me</span>
                </DropdownItem>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      {/* Post Actions Dropdown */}
      <Dropdown
        label=""
        renderTrigger={() => (
          <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50 transition">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        )}
        dismissOnClick={true}
        className="rounded-2xl shadow-lg border border-gray-100 p-1 w-48"
        placement="bottom-end"
      >
        <DropdownItem onClick={()=>handleSave()} className="flex items-center gap-2.5 py-2 px-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100">
          <Bookmark className="w-4 h-4 text-gray-500" />
          <span>{saved?'Unsave Post':'Save Post'}</span>
        </DropdownItem>

        <DropdownItem className="flex items-center gap-2.5 py-2 px-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100">
          <Pencil className="w-4 h-4 text-gray-500" />
          <span>Edit post</span>
        </DropdownItem>

        <DropdownItem className="flex items-center gap-2.5 py-2 px-3 text-red-600 font-medium rounded-xl hover:bg-red-50">
          <Trash2 className="w-4 h-4 text-red-500" />
          <span>Delete post</span>
        </DropdownItem>
      </Dropdown>
    </div>
  );
}