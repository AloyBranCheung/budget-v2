import React from "react";
// utils
import IconHelper from "@/utils/IconHelper";
// components
import Page500 from "@/app/error";
import MainNavbar from "@/components/navigation/MainNavbar";
import PageTransitionMobile from "@/animations/PageTransitionMobile";

// components
import Container from "@/components/Container";

interface RootTemplateProps {
  children: React.ReactNode;
}

export default async function RootTemplate({ children }: RootTemplateProps) {
  // this is unnecessary and potentially not performant but just want to try
  // having binary in a bytes column
  const [
    homeIconBase64,
    addIconBase64,
    strategyIconBase64,
    goalIconBase64,
    graphIconBase64,
  ] = await Promise.all([
    new IconHelper("home-icon.png").getIcon64(),
    new IconHelper("add-icon.png").getIcon64(),
    new IconHelper("strategy-icon.png").getIcon64(),
    new IconHelper("goal-icon.png").getIcon64(),
    new IconHelper("graph-icon.png").getIcon64(),
  ]);

  if (
    !homeIconBase64 ||
    !addIconBase64 ||
    !strategyIconBase64 ||
    !goalIconBase64 ||
    !graphIconBase64
  ) {
    return <Page500 />;
  }

  return (
    <div className="h-screen">
      <PageTransitionMobile />
      <Container>
        <div className="px-4 pt-8 h-full">{children}</div>
        <MainNavbar
          {...{
            homeIconBase64,
            addIconBase64,
            strategyIconBase64,
            goalIconBase64,
            graphIconBase64,
          }}
        />
      </Container>
    </div>
  );
}
