import React from "react";

import AppHeader from "./components/app-header";
import AppSidebar from "./components/app-sidebar";
import { useSidebar } from "../../contexts/sidebar-context";

interface Template1Props {
  children?: React.ReactNode;
}

function Template1({ children }: Template1Props) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className='min-h-screen xl:flex'>
      <div>
        <AppSidebar />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className='p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Template1