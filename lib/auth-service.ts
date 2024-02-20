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