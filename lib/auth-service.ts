import { currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";


// to get user from database, db
export const getSelf = async () => {
    //await user, if doesn't exist throw error
    const self = await currentUser();
    if (!self || !self.username) {
        throw new Error("Unauthorized");
    }
    //here we get that user from the db
    const user = await db.user.findUnique({
        where: { externalUserId: self.id }
    })
    if (!user) {
        throw new Error("Not found.")
    }
    return user;
}

// to load our creator dashboard by username
export const getSelfByUsername = async (username: string) => {
    const self = await currentUser()

    if (!self || !self.username) {
        throw new Error("Unauthorized")
    }

    const user = await db.user.findUnique({
        where: { username }
    })

    if (!user) {
        throw new Error("User not found")
    }

    //we will not be able to look at someone else's dashboard
    if (self.username !== user.username) {
        throw new Error("Unauthorized")
    }
    return user
}