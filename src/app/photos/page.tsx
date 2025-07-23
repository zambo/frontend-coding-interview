import { authUtils } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/base/container";
import { PhotoItem } from "@/components/ui/blocks/PhotoItem";
import { API_BASE_URL, API_KEY, API_ENDPOINTS } from "@/lib/constants";
import type { PexelsResponse } from "@/types/photo";

export default async function Photos() {
  const isAuthenticated = await authUtils.isAuthenticated();

  if (!isAuthenticated) {
    redirect("/signin");
  }

  const res = await fetch(
    `${API_BASE_URL}${API_ENDPOINTS.PEXELS_SEARCH}?query=nature&per_page=10`,
    {
      headers: {
        Authorization: API_KEY,
      },
      next: {
        revalidate: 3600, // Cache for 1 hour for better performance
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch photos");
  }

  const data: PexelsResponse = await res.json();

  return (
    <Container as="main">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-xl mb-11">All Photos</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {data.photos.map((photo) => (
          <PhotoItem key={photo.id} {...photo} />
        ))}
      </div>
    </Container>
  );
}
