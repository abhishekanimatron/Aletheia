import { db } from "./db"

// to load any user by their username
export const getUserByUsername = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username
        }
    })
    return user
}