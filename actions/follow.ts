"use server"
//for security, behaves like API route and doesn't spill things to js bundle

import { followUser } from "@/lib/follow-service"
import { revalidatePath } from "next/cache"


export const onFollow = async (id: string) => {
    try {
        const followedUser = await followUser(id)
        //is global root path, so our sidebar gets updated
        revalidatePath("/")
        if (followedUser) {
            revalidatePath(`/${followedUser.following.username}`)
        }
        return followedUser
    } catch (error) {
        throw new Error("Internal error.")
    }
}