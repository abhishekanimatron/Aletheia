"use client"

import { useSidebar } from "@/store/use_sidebar";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { FollowingSkeleton } from "./following";

//is expanded or collapsed to its full width
interface WrapperProps {
    children: React.ReactNode;
}

export const Wrapper = ({
    children,
}: WrapperProps) => {
    const [isClient, setIsClient] = useState(false)
    const { collapsed } = useSidebar((state) => state)

    useEffect(() => {
        setIsClient(true);
    }, [])
    // rendering skeleton when the sidebar isn't loaded.
    if (!isClient) return (
        <aside className={cn("fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50")}>
            <ToggleSkeleton />
            <FollowingSkeleton/>
            <RecommendedSkeleton />
        </aside>
    );
    return (
        //then load the children
        <aside className={cn("fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50", collapsed && "w-[70px]")}>{children}</aside>
    )
}