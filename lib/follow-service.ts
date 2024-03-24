import { db } from "@/lib/db"
import { getSelf } from "@/lib/auth-service"

// check to find whether the user is following the mentioned user
//this will break for logged out users, telling they are not following anyone
export const isFollowingUser = async (id: string) => {
    try {
        const self = await getSelf()
        //find the mentioned user in db
        const otherUser = await db.user.findUnique({
            where: { id },
        })
        //if user doesn't exist
        if (!otherUser) {
            throw new Error("User not found")
        }
        //if other user is same as current user
        if (otherUser.id === self.id) {
            return true;
        }

        // checks in the follow model by checking the things 
        // and if it exists returs true
        const existingFollow = await db.follow.findFirst({
            where: {
                followerId: self.id,
                followingId: otherUser.id
            }
        })
        return !!existingFollow
    } catch {
        return false;
    }
}

// action to follow a user should not be initiated without logging in
// so here we don't worry about user existing or not
export const followUser = async (id: string) => {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where: { id },
    })
    if (!otherUser) {
        throw new Error("User not found");
    }
    if (otherUser.id === self.id) {
        throw new Error("You cannot follow yourself.")
    }

    //if the user already follows the intended user to follow
    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id
        }
    })

    if (existingFollow) {
        throw new Error("Already following")
    }

    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id
        },
        include: {
            following: true,
            follower: true,
        }
    })
    return follow;
}