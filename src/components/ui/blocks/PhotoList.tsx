import { fetchPhotosAction } from "@/lib/actions";
import { PhotoItem } from "./PhotoItem";
import { PhotoError, EmptyPhotos } from "./PhotoError";

interface PhotoListProps {
  query?: string;
  perPage?: number;
}

export async function PhotoList({
  query = "nature",
  perPage = 10,
}: PhotoListProps) {
  const result = await fetchPhotosAction(query, perPage);

  if (!result.success) {
    return <PhotoError error={result.error} />;
  }

  if (!result.data.photos || result.data.photos.length === 0) {
    return <EmptyPhotos />;
  }

  return (
    <div className="grid grid-cols-1 gap-6" role="list">
      {result.data.photos.map((photo) => (
        <PhotoItem key={photo.id} {...photo} />
      ))}
    </div>
  );
}
