import React from "react";
import { Logo } from "@/components/ui/base/logo";
import { Container } from "@/components/ui/base/container";

export default function PhotoGridLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <Container>
        <Logo className="self-start" />
      </Container>
      {children}
    </React.Fragment>
  );
}
