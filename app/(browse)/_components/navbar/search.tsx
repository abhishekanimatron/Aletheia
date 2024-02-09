"use client";
//will have onchange, useeffect
// all components in app router are server componenets as default
// to tell this framework that we want this to be a client componenet we do this
import qs from "query-string"
import { useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Search = () => {
    //if use client is removed this be shown in terminal(server) rather
    // than the console on browser (the client side)
    // console.log('logged here..')

    const router = useRouter()
    const [value, setValue] = useState("")
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!value) return;//user searched when she hasn't written anything

        const url = qs.stringifyUrl({
            url: "/search",
            query: { term: value },
        }, { skipEmptyString: true })
        //constructs the URL that the user will be redirected to after submitting the search query

        router.push(url)
        //uses the router object to navigate to the URL 
    }
    const onClear = () => {
        setValue("")
    }
    return (
        <form onSubmit={onSubmit}
            className="relative w-full lg:w-[400px] flex items-center">
            <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search" className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0" />
            {/* button that appears to clear input on the search bar */}
            {value && (<X className="absolute right-14 h-5 w-5 text-muted-foreground hover:opacity-75 transition cursor-pointer" onClick={onClear}/>)}
            <Button type="submit" size="sm" variant="secondary" className="rounded-l-none">
                <SearchIcon className="h-5 w-5 text-muted-foreground" />
            </Button>
        </form>
    )
}