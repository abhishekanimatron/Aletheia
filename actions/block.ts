"use server"
//for security, behaves like API route and doesn't spill things to js bundle

import { blockUser, unblockUser } from "@/lib/block-service"
import { revalidatePath } from "next/cache"

export const onBlock = async (id: string) => {
    // TODO: disconnect the user from livestream

    // TODO: allow ability to kick guest (not logged in user)
    // guest becuase this function will break if user id is not there
    const blockedUser = await blockUser(id)
    revalidatePath("/")
    if (blockedUser) {
        revalidatePath(`/${blockedUser.blocked.username}`)
    }
    return blockedUser

}

export const onUnblock = async (id: string) => {
    const unblockedUser = await unblockUser(id)
    revalidatePath("/")
    if (unblockedUser) {
        revalidatePath(`/${unblockedUser.blocked.username}`)
    }
    return unblockedUser
}