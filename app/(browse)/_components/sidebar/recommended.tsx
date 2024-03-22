"use client"
import { useSidebar } from "@/store/use_sidebar"
//because its gonna behave differently whether the sidebar is collapsed
// or not

import { User } from "@prisma/client"
import { UserItem, UserItemSkeleton } from "./user-item"

//using npx prisma generate, we get the user with schema as we defined earlier
interface RecommendedProps {
    data: User[]
}
export const Recommended = ({
    data,
}: RecommendedProps) => {

    // console.log(data.length)
    const { collapsed } = useSidebar((state) => state)
    // we show labels only when the sidebar isn't collapsed
    // and when there are users to show, i.e. data > 0  
    const showLabel = !collapsed && data.length > 0

    return (
        <div>
            {showLabel && (
                <div className="pl-6 mb-4">
                    <p className=" text-sm text-muted-foreground">Recommended</p>
                </div>
            )}
            <ul className="space-y-2 px-2">
                {data.map((user) => (
                    <UserItem key={user.id} username={user.username} imageUrl={user.imageUrl} isLive={true} />
                ))}
            </ul>
        </div>
    )
}

export const RecommendedSkeleton = () => {
    return (
        <ul className="px-2">
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    )
}