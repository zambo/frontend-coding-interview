import { Suspense } from "react";
import { authUtils } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/base/container";
import { PhotoList } from "@/components/ui/blocks/PhotoList";
import { PhotoGridSkeleton } from "@/components/ui/blocks/PhotoItemSkeleton";

export default async function Photos() {
  const isAuthenticated = await authUtils.isAuthenticated();

  if (!isAuthenticated) {
    redirect("/signin");
  }

  return (
    <Container as="main">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-xl mb-11">All Photos</h1>
        </div>
      </div>

      <Suspense fallback={<PhotoGridSkeleton />}>
        <PhotoList query="nature" perPage={10} />
      </Suspense>
    </Container>
  );
}
