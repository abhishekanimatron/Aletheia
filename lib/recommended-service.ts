import { db } from "@/lib/db";
import { getSelf } from "./auth-service";



export const getRecommended = async () => {
    //we don't want to show the user himself in the reommended tab, so:
    let userId;
    //a try catch is needed because getSelf function throws errors too.
    try {
        const self = await getSelf()
        userId = self.id
    } catch {
        userId = null;
    }
    let users = []
    if (userId) {
        users = await db.user.findMany({
            where: {
                AND: [
                    {
                        //skip the current user
                        NOT: {
                            id: userId
                        }
                    },
                    //skips the following users
                    {
                        NOT: {
                            followedBy: {
                                some: {
                                    followerId: userId,
                                }
                            }
                        }
                    }
                ]
            },
            orderBy: {
                createdAt: "desc"
            }
        })
    } else {

        // findMany: Find zero or more Users that matches the filter
        //currently only sorting the users
        users = await db.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
    }
    return users;
}