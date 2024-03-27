import { db } from "./db";
import { getSelf } from "./auth-service";

export const isBlockedByUser = async (id: string) => {
    try {
        const self = await getSelf()
        const otherUser = await db.user.findUnique({
            where: { id }
        })
        if (!otherUser) {
            throw new Error("User not found")
        }
        //prisma can do this check for us, but if we do it here itself
        //it becomes lil optimized, no query required
        if (otherUser.id === self.id) {
            return false;
        }
        const exisitingBlock = await db.block.findUnique({
            where: {
                //faster query because of the index based on unique constraint
                //rather than using findFirst, where it goes through all records
                blockedId_blockerId: {
                    blockerId: otherUser.id,
                    blockedId: self.id,
                }
            }
        })
        return !!exisitingBlock
    } catch {
        return false;
    }
}

export const blockUser = async (id: string) => {
    const self = await getSelf()
    if (self.id == id) {
        throw new Error("Cannot block yourself")
    }
    const otherUser = await db.user.findUnique({
        where: { id }
    })
    if (!otherUser) {
        throw new Error("User not found.")
    }
    const exisitingBlock = await db.block.findUnique({
        where: {
            blockedId_blockerId: {
                blockerId: self.id,
                blockedId: otherUser.id
            }
        }
    })
    if (exisitingBlock) {
        throw new Error("User is already blocked.")
    }
    const block = await db.block.create({
        data: {
            blockerId: self.id,
            blockedId: otherUser.id
        },
        include: {
            blocked: true
        }
    })
    return block
}

export const unblockUser = async (id: string) => {
    const self = await getSelf()
    if (self.id === id) {
        throw new Error("Cannot unblock yourself.")
    }
    const otherUser = await db.user.findUnique({
        where: { id }
    })
    if (!otherUser) {
        throw new Error("User not found.")
    }
    const exisitingBlock = await db.block.findUnique({
        where: {
            blockedId_blockerId: {
                blockerId: self.id,
                blockedId: otherUser.id
            }
        }
    })
    if (!exisitingBlock) {
        throw new Error("User is not blocked.")
    }
    const unblock = await db.block.delete({
        where: {
            id: exisitingBlock.id
            ,
        },
        include: {
            blocked: true,
        }
    })
    return unblock
}