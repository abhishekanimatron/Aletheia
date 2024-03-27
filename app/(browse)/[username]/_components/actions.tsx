"use client"
import { onBlock, onUnblock } from "@/actions/block"
import { onFollow, onUnfollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner"

interface ActionProps {
    isFollowing: boolean
    userId: string
}

export const Actions = ({ isFollowing, userId }: ActionProps) => {
    //this transition does disable the follow button once clicked till it does its
    // intended action, without us writing the code for loading boolean things
    const [isPending, startTransition] = useTransition()


    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You followed ${data.following.username}`))
                .catch(() => toast.error("Something went wrong."))
        })
    }
    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => toast.success(`You unfollowed ${data.following.username}`))
                .catch(() => toast.error("Something went wrong."))
        })
    }

    const onClick = () => {
        if (isFollowing) {
            handleUnfollow()
        } else {
            handleFollow()
        }
    }

    const handleBlock = () => {
        startTransition(() => {
            onUnblock(userId).then((data) => toast.success(`unblocked ${data.blocked.username}`))
                .catch(() => toast.error("Something went wrong."))
        })
    }

    return (
        <>
            <Button disabled={isPending} onClick={onClick} variant="primary">
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button onClick={handleBlock} disabled={isPending}>
                Unblock
            </Button>
        </>
    )
}