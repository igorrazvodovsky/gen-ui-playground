"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { LeftSidebar } from "@/components/page/left-sidebar";
import { MainCanvas } from "@/components/page/main-canvas";
import { RightSidebar } from "@/components/page/right-sidebar";
import { TopBar } from "@/components/page/top-bar";
import type { ComponentProps } from "react";

type LayoutProps = {
  leftSidebarOpen: boolean;
  onLeftSidebarOpenChange: (open: boolean) => void;
  leftSidebarProps: ComponentProps<typeof LeftSidebar>;
  topBarProps: ComponentProps<typeof TopBar>;
  mainCanvasProps: ComponentProps<typeof MainCanvas>;
  rightSidebarProps: ComponentProps<typeof RightSidebar>;
};

export function Layout({
  leftSidebarOpen,
  onLeftSidebarOpenChange,
  leftSidebarProps,
  topBarProps,
  mainCanvasProps,
  rightSidebarProps,
}: LayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <SidebarProvider
        open={leftSidebarOpen}
        onOpenChange={onLeftSidebarOpenChange}
      >
        <LeftSidebar {...leftSidebarProps} />
        <div className="flex flex-1 flex-col overflow-auto">
          <TopBar {...topBarProps} />
          <MainCanvas {...mainCanvasProps} />
        </div>
      </SidebarProvider>
      <RightSidebar {...rightSidebarProps} />
    </div>
  );
}
