import Image from "next/image";
import type { Photo } from "@/types/photo";

function LikedIcon({ liked }: { liked: boolean }) {
  return (
    <svg
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.51059 14.8L3.63272 18.0902L4.94549 11.4833L0 6.90983L6.6892 6.11672L9.51059 0L12.3319 6.11672L19.0211 6.90983L14.0757 11.4833L15.3884 18.0902L9.51059 14.8Z"
        fill={liked ? "rgba(255, 215, 0, 1)" : "none"}
        stroke={!liked ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 215, 0, 1)"}
        strokeWidth="1.5"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="2"
      />
    </svg>
  );
}

function PhotoItem({ ...props }: Photo) {
  return (
    <article
      className="flex w-full gap-4"
      role="listitem"
      aria-labelledby={`photo-title-${props.id}`}
    >
      <div className="w-5" role="presentation">
        <LikedIcon liked={props.liked} />
      </div>
      <div className="size-[75px] aspect-square relative">
        <Image
          className="object-cover rounded inset-0"
          style={{ backgroundColor: props.avg_color }}
          src={props.src.medium}
          fill
          alt={props.alt || `Photo by ${props.photographer}`}
          sizes="75px"
          priority={false}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
            `<svg width="75" height="75" xmlns="http://www.w3.org/2000/svg"><rect width="75" height="75" fill="${props.avg_color}"/></svg>`
          ).toString("base64")}`}
        />
      </div>
      <div className="flex-grow space-y-2 text-sm">
        <div className="flex items-center gap-2 justify-between">
          <h2 id={`photo-title-${props.id}`} className="font-bold">
            {props.photographer}
          </h2>
          <a
            className="text-primary flex items-center gap-1 hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            href={props.photographer_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${props.photographer}'s portfolio on Pexels`}
          >
            <svg
              className="size-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="rgba(0,117,235,1)"
              aria-hidden="true"
            >
              <path d="M13.0607 8.11097L14.4749 9.52518C17.2086 12.2589 17.2086 16.691 14.4749 19.4247L14.1214 19.7782C11.3877 22.5119 6.95555 22.5119 4.22188 19.7782C1.48821 17.0446 1.48821 12.6124 4.22188 9.87874L5.6361 11.293C3.68348 13.2456 3.68348 16.4114 5.6361 18.364C7.58872 20.3166 10.7545 20.3166 12.7072 18.364L13.0607 18.0105C15.0133 16.0578 15.0133 12.892 13.0607 10.9394L11.6465 9.52518L13.0607 8.11097ZM19.7782 14.1214L18.364 12.7072C20.3166 10.7545 20.3166 7.58872 18.364 5.6361C16.4114 3.68348 13.2456 3.68348 11.293 5.6361L10.9394 5.98965C8.98678 7.94227 8.98678 11.1081 10.9394 13.0607L12.3536 14.4749L10.9394 15.8891L9.52518 14.4749C6.79151 11.7413 6.79151 7.30911 9.52518 4.57544L9.87874 4.22188C12.6124 1.48821 17.0446 1.48821 19.7782 4.22188C22.5119 6.95555 22.5119 11.3877 19.7782 14.1214Z"></path>
            </svg>
            <span>Portfolio</span>
          </a>
        </div>

        {props.alt && <p className="text-sm text-gray-700">{props.alt}</p>}

        <div className="flex items-center gap-2" role="presentation">
          <span
            className="text-xs font-mono"
            style={{ color: props.avg_color }}
            aria-label={`Average color: ${props.avg_color}`}
          >
            {props.avg_color}
          </span>
          <div
            className="size-3 rounded border border-gray-200"
            style={{ backgroundColor: props.avg_color }}
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  );
}

export { PhotoItem };
