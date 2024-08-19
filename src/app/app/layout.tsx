import React from "react";
// auth
import { getServerSession } from "next-auth";
// pages
import Page403 from "../Page403";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const session = await getServerSession();
  if (!session) return <Page403 />;

  return (
      <div className="h-full w-full">{children}</div>
  );
}
