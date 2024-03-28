// the square brackets [username] tells the router that it is dynamic part
// of the URL

import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";


interface UserPageProps {
    params: {
        username: string;//the value passed in url will come in the username
    }
}

const UserPage = async ({
    params

}: UserPageProps) => {

    //get user from the user service function, if not found throw 
    //the not found page error 

    //which uses next navigation
    const user = await getUserByUsername(params.username)
    if (!user) {
        notFound()
    }
    const isFollowing = await isFollowingUser(user.id)
    const isBlocked = await isBlockedByUser(user.id)

    return (
        <div className="flex flex-col gap-y-4">
            <p>username: {user.username}</p>
            <p>User ID: {user.id}</p>
            <p>Is following: {`${isFollowing}`}</p>
            <p>Is blocked by this user: {`${isBlocked}`}</p>
            <Actions isFollowing={isFollowing} userId={user.id} />
        </div>
    )
}

export default UserPage