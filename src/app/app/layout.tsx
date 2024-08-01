import React from "react";
// auth
import { getServerSession } from "next-auth";
// pages
import Page403 from "../Page403";

// components
import Container from "@/components/Container";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const session = await getServerSession();
  if (!session) return <Page403 />;

  return (
    <div id="portal-animation" className="bg-primary relative min-h-screen">
      <Container>
        <div className="h-full w-full">{children}</div>
      </Container>
    </div>
  );
}
