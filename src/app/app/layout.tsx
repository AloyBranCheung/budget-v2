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
    <div className="bg-primary relative min-h-screen pb-40">
      <Container>
        <div className="h-full">{children}</div>
      </Container>
    </div>
  );
}
