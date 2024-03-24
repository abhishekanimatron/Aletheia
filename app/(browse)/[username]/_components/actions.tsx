"use client"
import { onFollow } from "@/actions/follow"
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


    const onClick = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You followed ${data.following.username}`))
                .catch(() => toast.error("Something went wrong."))
        })
    }
    return (
        <Button disabled={isFollowing || isPending} onClick={onClick} variant="primary">
            Follow
        </Button>
    )
}