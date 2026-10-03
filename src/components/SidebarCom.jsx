"use client";

import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";

import {
  Bookmark,
  Earth,
  Newspaper,
  Sparkles,
} from "lucide-react";

export default function SidebarCom({
  setLink,
  setPage,
  link,
  bookmarked,
  setBookmarked,
}) {
  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      className="w-full lg:sticky top-[84px] lg:z-50 lg:w-60 [&>div]:rounded-2xl [&>div]:border [&>div]:border-slate-200 [&>div]:bg-white [&>div]:p-3 [&>div]:shadow-sm h-fit xl:sticky mt-3 xl:block"
    >
      <SidebarItems className="[&>ul]:space-y-1">
        <SidebarItemGroup className="grid grid-cols-2 gap-2 lg:block">

          
          <SidebarItem
            onClick={() => {
              setPage(1);
              setLink(
                "https://route-posts.routemisr.com/posts/feed?only=following"
              );
              setBookmarked(false);
              window.scrollTo(0, 0);
            }}
            icon={Newspaper}
            className={`[&>svg]:w-4 [&>svg]:h-4 [&>span]:flex-0 lg:[&>span]:flex-1 text-sm font-bold cursor-pointer ${
              link.includes("only=following")
                ? "bg-[#E7F3FF] text-[#1877f2] [&>svg]:text-[#1877f2]"
                : "bg-[#F8FAFC] lg:bg-transparent"
            }`}
          >
            Feed
          </SidebarItem>

          
          <SidebarItem
            onClick={() => {
              setPage(1);
              setLink(
                "https://route-posts.routemisr.com/posts/feed?only=me"
              );
              setBookmarked(false);
              window.scrollTo(0, 0);
            }}
            icon={Sparkles}
            className={`[&>svg]:w-4 [&>svg]:h-4 [&>span]:flex-0 lg:[&>span]:flex-1 text-sm font-bold cursor-pointer ${
              link.includes("only=me")
                ? "bg-[#E7F3FF] text-[#1877f2] [&>svg]:text-[#1877f2]"
                : "bg-[#F8FAFC] lg:bg-transparent"
            }`}
          >
            My Posts
          </SidebarItem>

          
          <SidebarItem
            onClick={() => {
              setPage(1);
              setLink(
                "https://route-posts.routemisr.com/posts/feed?only=all"
              );
              setBookmarked(false);
              window.scrollTo(0, 0);
            }}
            icon={Earth}
            className={`[&>svg]:w-4 [&>svg]:h-4 [&>span]:flex-0 lg:[&>span]:flex-1 text-sm font-bold cursor-pointer ${
              link.includes("only=all")
                ? "bg-[#E7F3FF] text-[#1877f2] [&>svg]:text-[#1877f2]"
                : "bg-[#F8FAFC] lg:bg-transparent"
            }`}
          >
            Community
          </SidebarItem>

          
          <SidebarItem
            onClick={() => {
              setPage(1);
              setLink(
                "https://route-posts.routemisr.com/users/bookmarks"
              );
              setBookmarked(true);
              window.scrollTo(0, 0);
            }}
            icon={Bookmark}
            className={`[&>svg]:w-4 [&>svg]:h-4 [&>span]:flex-0 lg:[&>span]:flex-1 text-sm font-bold cursor-pointer ${
              link.includes("bookmarks")
                ? "bg-[#E7F3FF] text-[#1877f2] [&>svg]:text-[#1877f2]"
                : "bg-[#F8FAFC] lg:bg-transparent"
            }`}
          >
            Saved
          </SidebarItem>

        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
