
  "use client";

  import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { Bookmark, Earth, Newspaper, Sparkles } from "lucide-react";
  export default function SidebarCom() {
    return (
      <Sidebar aria-label="Sidebar with multi-level dropdown example" className="sticky top-[84px] z-50 w-60 [&>div]:rounded-2xl [&>div]:border [&>div]:border-slate-200 [&>div]:bg-white [&>div]:p-3 [&>div]:shadow-sm hidden h-fit xl:sticky mt-3 xl:block">
        <SidebarItems className="[&>ul]:space-y-1">
          <SidebarItemGroup>
            <SidebarItem href="#" icon={Newspaper} className="[&>svg]:w-4 [&>svg]:h-4 text-sm font-bold    bg-[#e7f3ff] text-[#1877f2] [&>svg]:text-[#1877f2]" >
              Feed
            </SidebarItem>
            <SidebarItem href="#" icon={Sparkles} className="[&>svg]:w-4 [&>svg]:h-4 text-sm font-bold ">
              My Posts
            </SidebarItem>
            <SidebarItem href="#" icon={Earth} className="[&>svg]:w-4 [&>svg]:h-4 text-sm font-bold">
              Community
            </SidebarItem>
            <SidebarItem href="#" icon={Bookmark} className="[&>svg]:w-4 [&>svg]:h-4 text-sm font-bold  ">
              Saved
            </SidebarItem>
            
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    );
  }
