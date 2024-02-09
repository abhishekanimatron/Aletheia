import { UserButton } from "@clerk/nextjs"
export default function Home() {//homepage for app, will be visible after auth is completed i.e. user has signed in
  return (
    <div className="flex flex-col gap-y-4">
      <h1>Dashboard</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
