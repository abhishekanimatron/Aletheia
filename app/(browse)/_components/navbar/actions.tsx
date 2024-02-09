import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs"
import { Clapperboard } from "lucide-react";
import Link from "next/link";

export const Actions = async () => {
    const user = await currentUser();
    return (
        <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
            {/* if no user that means we need to show option to login */}
            {!user && (<SignInButton><Button size="sm" variant="primary">Login</Button></SignInButton>)}
            {/* to convert to boolean we do !! else something might happen */}
            {!!user && (
                <div className="flex items-center gap-x-4">
                    <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-primary" asChild>
                        <Link href={`/u/${user.username}`}>
                            <Clapperboard className="h-5 w-5 lg:mr-2" />
                            <span className="hidden lg:block">
                                Dashboard
                            </span>
                        </Link>
                    </Button>
                    {/* that url is the one which user goes when she logs out */}
                    <UserButton afterSignOutUrl="/"/>

                </div>
            )}
        </div>
    )
}