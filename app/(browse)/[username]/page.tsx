// the square brackets [username] tells the router that it is dynamic part
// of the URL

import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";


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

    return (
        <div className="flex flex-col gap-y-4">
            <p>username: {user.username}</p>
            <p>User ID: {user.id}</p>
            <p>Is following: {`${isFollowing}`}</p>
            <Actions />
        </div>
    )
}

export default UserPage