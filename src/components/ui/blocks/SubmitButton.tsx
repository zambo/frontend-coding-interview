"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/base/button";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Signing in..." : "Sign In"}
    </Button>
  );
}
