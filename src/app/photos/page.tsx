import { Button } from "@/components/ui/base/button";
import { authUtils } from "@/lib/auth";
import { signOutAction } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Photos() {
  const isAuthenticated = await authUtils.isAuthenticated();

  if (!isAuthenticated) {
    redirect("/signin");
  }

  const user = await authUtils.getCurrentUser();

  return (
    <main className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Photos</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || user?.email}!
          </p>
        </div>
        <form action={signOutAction}>
          <Button type="submit" variant="outline">
            Sign Out
          </Button>
        </form>
      </div>

      <div className="bg-card border rounded-lg p-6">
        <p className="text-muted-foreground">
          Photos will be displayed here using the Pexels API.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          This page is protected - you can only see it when authenticated.
        </p>
      </div>
    </main>
  );
}
