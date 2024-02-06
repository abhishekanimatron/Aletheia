import { SignUp } from "@clerk/nextjs";
//  using signup from clerk, after which it redirects to / home page
export default function Page() {
  return <SignUp />;
}