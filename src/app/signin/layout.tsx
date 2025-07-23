import React from "react";
import { Logo } from "@/components/ui/base/logo";

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <Logo />
      {children}
    </React.Fragment>
  );
}
