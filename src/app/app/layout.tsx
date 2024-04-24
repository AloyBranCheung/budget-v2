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
    <div className="bg-primary relative h-screen">
      <Container>
        <div className="h-full overflow-y-auto">{children}</div>
      </Container>
      <div className="w-full fixed bottom-8 px-8">
        <div className="bg-secondary ">navbar here </div>
      </div>
    </div>
  );
}
