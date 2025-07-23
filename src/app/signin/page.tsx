import React from "react";
import { SignInForm } from "@/components/ui/blocks/SignInForm";
import { Container } from "@/components/ui/base/container";

const SignIn: React.FC = () => {
  return (
    <Container as="main" className="max-w-sm w-full">
      <h1 className="font-bold text-xl text-center mb-11">
        Sign in to your account
      </h1>

      <SignInForm className="basis-full" />
    </Container>
  );
};

export default SignIn;
