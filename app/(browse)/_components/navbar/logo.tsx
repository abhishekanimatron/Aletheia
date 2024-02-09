import Link from "next/link"
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'//from shadcn
// Shadcn: Beautifully designed components that you can copy and paste into your apps

//font specification using google fonts
const font = Poppins({
    subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700", "800"]
})


export const Logo = () => {
    return (
        <Link href="/">
            <div className="hidden lg:flex items-center gap-x-4 hover:opacity-75 transition">
                <div className="bg-white rounded-full p-1">
                    <Image src="/spooky.svg" alt="Aletheia" height="32" width="32" />
                </div>
                <div className={cn(font.className)}>
                    <p className="text-lg font-semibold">Aletheia</p>
                    <p className="text-xs text-muted-foreground">With the Gods</p>
                </div>
            </div>
        </Link>
    )
}