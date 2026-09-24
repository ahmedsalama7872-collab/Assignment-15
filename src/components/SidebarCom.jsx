
  "use client";

  import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { Bookmark, Earth, Newspaper, Sparkles } from "lucide-react";
  export default function SidebarCom({setLink,link,bookmarked,setBookmarked}) {
    return (
      <Sidebar aria-label="Sidebar with multi-level dropdown example" className="w-full lg:sticky top-[84px] lg:z-50 lg:w-60 [&>div]:rounded-2xl [&>div]:border [&>div]:border-slate-200 [&>div]:bg-white [&>div]:p-3 [&>div]:shadow-sm h-fit xl:sticky mt-3 xl:block">
        <SidebarItems className="[&>ul]:space-y-1">
          <SidebarItemGroup className="grid grid-cols-2 gap-2 lg:block">
            <SidebarItem onClick={()=>{setLink('https://route-posts.routemisr.com/posts/feed?only=following&limit=40');setBookmarked(false)}} icon={Newspaper} className={`[&>svg]:w-4 [&>svg]:h-4 [&>span]:flex-0  lg:[&>span]:flex-1 text-sm font-bold cursor-pointer ${link=='https://route-posts.routemisr.com/posts/feed?only=following&limit=40'?' bg-[#E7F3FF] text-[#1877f2] [&>svg]:text-[#1877f2]':'bg-[#F8FAFC] lg:bg-transparent'}  `}>
              Feed
            </SidebarItem>
            <SidebarItem onClick={()=>{setLink('https://route-posts.routemisr.com/posts/feed?only=me&limit=10');setBookmarked(false)}}  icon={Sparkles} className={`[&>svg]:w-4 [&>svg]:h-4 text-sm font-bold [&>span]:flex-0 lg:[&>span]:flex-1  cursor-pointer  ${link=='https://route-posts.routemisr.com/posts/feed?only=me&limit=10'? 'bg-[#E7F3FF] text-[#1877f2] [&>svg]:text-[#1877f2]':'bg-[#F8FAFC] lg:bg-transparent'} `}>
              My Posts
            </SidebarItem>
            <SidebarItem onClick={()=>{setLink('https://route-posts.routemisr.com/posts');setBookmarked(false)}} icon={Earth} className={`[&>svg]:w-4 [&>span]:flex-0 lg:[&>span]:flex-1 [&>svg]:h-4 text-sm font-bold cursor-pointer  ${link=='https://route-posts.routemisr.com/posts'?' bg-[#E7F3FF] text-[#1877f2] [&>svg]:text-[#1877f2]':'bg-[#F8FAFC] lg:bg-transparent'} `}>
              Community
            </SidebarItem>
            <SidebarItem onClick={()=>{setLink('https://route-posts.routemisr.com/users/bookmarks');setBookmarked(true)}} icon={Bookmark} className={`[&>svg]:w-4 [&>span]:flex-0 lg:[&>span]:flex-1 [&>svg]:h-4 text-sm font-bold cursor-pointer  ${link=='https://route-posts.routemisr.com/users/bookmarks'?' bg-[#E7F3FF] text-[#1877f2] [&>svg]:text-[#1877f2]':'bg-[#F8FAFC] lg:bg-transparent'} `}>
              Saved
            </SidebarItem>
            
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    );
  }
