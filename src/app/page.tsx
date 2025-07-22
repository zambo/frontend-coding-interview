import { redirect } from "next/navigation";
import { authUtils } from "@/lib/auth";

export default async function Home() {
  const isAuthenticated = await authUtils.isAuthenticated();

  if (isAuthenticated) {
    redirect("/photos");
  } else {
    redirect("/signin");
  }
}
