// auth
import { getServerSession } from "next-auth";
// components
import LoginButton from "@/containers/landing-page/LoginButton";

export default async function LandingPage() {
  const session = await getServerSession();
  return (
    <div className="flex flex-col gap-2 h-screen items-center justify-center">
      <div>Landing Page</div>
      <LoginButton session={session} />
    </div>
  );
}
