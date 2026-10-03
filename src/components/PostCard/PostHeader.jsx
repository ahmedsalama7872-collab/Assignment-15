import React, { useContext, useState } from "react";
import dayjs from "dayjs";
import { UserContext } from "../UserContext";
import { TriangleAlert, X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function PostHeader({
  post,
  handleSave,
  saved,
  refetch,
}) {
  const { privacy, createdAt, body } = post;
  const { user } = useContext(UserContext);

  const [openDelete, setOpenDelete] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState(body || "");

  const isProfilePictureUpdate =
    body?.trim() === "updated profile picture.";

  const isCoverUpdate =
    body?.trim() === "updated cover photo.";

  const deleteMutation = useMutation({
    mutationFn: async (postId) => {
      const { data } = await axios.delete(
        `https://route-posts.routemisr.com/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return data;
    },

    onSuccess: () => {
      setOpenDelete(false);
      refetch();
    },
  });

  const editMutation = useMutation({
    mutationFn: async ({ postId, body }) => {
      const { data } = await axios.put(
        `https://route-posts.routemisr.com/posts/${postId}`,
        {
          body,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return data;
    },

    onSuccess: () => {
      setIsEditing(false);
      refetch();
    },
  });

  function handleDelete() {
    deleteMutation.mutate(post._id);
  }

  function handleEdit() {
    if (!editBody.trim()) return;

    editMutation.mutate({
      postId: post._id,
      body: editBody.trim(),
    });
  }

  return (
    <div className="relative">
      
      <div className="flex p-5 pb-0 items-start justify-between">
        
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.user._id}`}>
            <img
              src={post.user?.photo}
              className="w-11 h-11 rounded-full object-cover"
              alt={post.user?.name}
            />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <Link to={`/profile/${post.user._id}`}>
                <h3 className="font-bold text-sm text-gray-900">
                  {post.user?.name}
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
              <Link to={`/profile/${post.user._id}`}>
                <span>@{post.user?.username}</span>
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

        
        <Dropdown
          label=""
          renderTrigger={() => (
            <button className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer rounded-full hover:bg-gray-50 transition">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          )}
          dismissOnClick={true}
          className="rounded-2xl shadow-lg border border-gray-100 p-1 w-48"
          placement="bottom-end"
        >
          
          <DropdownItem
            onClick={handleSave}
            className="flex items-center gap-2.5 py-2 px-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100"
          >
            <Bookmark className="w-4 h-4 text-gray-500" />
            <span>{saved ? "Unsave Post" : "Save Post"}</span>
          </DropdownItem>

          {post?.user?._id == user?._id && (
            <>
              
              <DropdownItem
                onClick={() => {
                  setEditBody(body || "");
                  setIsEditing(true);
                }}
                className="flex items-center gap-2.5 py-2 px-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100"
              >
                <Pencil className="w-4 h-4 text-gray-500" />
                <span>Edit post</span>
              </DropdownItem>

              
              <DropdownItem
                onClick={() => setOpenDelete(true)}
                className="flex items-center gap-2.5 py-2 px-3 text-red-600 font-medium rounded-xl hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
                <span>Delete post</span>
              </DropdownItem>
            </>
          )}
        </Dropdown>
      </div>

      
      {isEditing && (
        <div className="px-5 pb-4 pt-3">
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <textarea
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              className="w-full min-h-[100px] resize-none rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500"
            />

            <div className="mt-3 flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditBody(body || "");
                }}
                disabled={editMutation.isPending}
                className="cursor-pointer rounded-xl bg-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-300 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleEdit}
                disabled={
                  editMutation.isPending ||
                  !editBody.trim()
                }
                className="cursor-pointer rounded-xl bg-[#1877f2] px-4 py-2 text-sm font-bold text-white hover:bg-[#166fe5] disabled:opacity-50"
              >
                {editMutation.isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      
      <AlertDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
      >
        <AlertDialogContent className="!max-w-[500px] rounded-2xl">

          <AlertDialogHeader className="flex justify-between">
            <AlertDialogTitle className="text-lg font-bold text-slate-900">
              Confirm Action
            </AlertDialogTitle>

            <AlertDialogCancel className="cursor-pointer rounded-xl">
              <X />
            </AlertDialogCancel>
          </AlertDialogHeader>

          <div className="flex items-center justify-center gap-4 py-4">

            <AlertDialogMedia className="shrink-0 bg-red-50 text-red-600">
              <TriangleAlert className="h-6 w-6" />
            </AlertDialogMedia>

            <AlertDialogDescription className="text-left">
              <span className="block font-bold text-slate-900">
                Delete this post?
              </span>

              <span className="block mt-1 text-sm text-slate-500">
                This post will be permanently removed from your profile and
                feed.
              </span>
            </AlertDialogDescription>

          </div>

          <AlertDialogFooter className="mt-2">
            <AlertDialogCancel className="cursor-pointer rounded-xl">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              className="cursor-pointer rounded-xl bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending
                ? "Deleting..."
                : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
