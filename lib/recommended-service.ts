import { db } from "@/lib/db";
import { getSelf } from "./auth-service";

export const getRecommended = async () => {
    // findMany: Find zero or more Users that matches the filter
    
    const users = await db.user.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
    return users;
}