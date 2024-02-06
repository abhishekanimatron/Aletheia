import { SignIn } from "@clerk/nextjs";
//  using signin from clerk, after which it redirects to / home page
export default function Page() {
  return <SignIn />;
}