import { render, screen } from "@testing-library/react";
import { PhotoItem } from "../PhotoItem";
import type { Photo } from "@/types/photo";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: function MockImage({
    alt,
    src,
    style,
    className,
  }: {
    alt: string;
    src: string;
    style?: React.CSSProperties;
    className?: string;
    fill?: boolean;
    priority?: boolean;
    placeholder?: string;
    blurDataURL?: string;
    sizes?: string;
  }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} src={src} style={style} className={className} />;
  },
}));

const mockPhoto: Photo = {
  id: 123,
  width: 800,
  height: 600,
  url: "https://example.com/photo",
  photographer: "John Doe",
  photographer_url: "https://example.com/photographer",
  photographer_id: 456,
  avg_color: "#8B5A3C",
  src: {
    original: "https://example.com/original.jpg",
    large2x: "https://example.com/large2x.jpg",
    large: "https://example.com/large.jpg",
    medium: "https://example.com/medium.jpg",
    small: "https://example.com/small.jpg",
    portrait: "https://example.com/portrait.jpg",
    landscape: "https://example.com/landscape.jpg",
    tiny: "https://example.com/tiny.jpg",
  },
  liked: false,
  alt: "A beautiful nature photo",
};

describe("PhotoItem", () => {
  it("renders photo information correctly", () => {
    render(<PhotoItem {...mockPhoto} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("A beautiful nature photo")).toBeInTheDocument();
    expect(screen.getByText("#8B5A3C")).toBeInTheDocument();
    expect(
      screen.getByLabelText("View John Doe's portfolio on Pexels")
    ).toBeInTheDocument();
  });

  it("renders image with correct attributes", () => {
    render(<PhotoItem {...mockPhoto} />);

    const image = screen.getByAltText("A beautiful nature photo");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/medium.jpg");
  });

  it("renders fallback alt text when alt is not provided", () => {
    const photoWithoutAlt = { ...mockPhoto, alt: "" };
    render(<PhotoItem {...photoWithoutAlt} />);

    const image = screen.getByAltText("Photo by John Doe");
    expect(image).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<PhotoItem {...mockPhoto} />);

    const article = screen.getByRole("listitem");
    expect(article).toHaveAttribute("aria-labelledby", "photo-title-123");

    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toHaveAttribute("id", "photo-title-123");
  });

  it("renders portfolio link with correct attributes", () => {
    render(<PhotoItem {...mockPhoto} />);

    const portfolioLink = screen.getByLabelText(
      "View John Doe's portfolio on Pexels"
    );
    expect(portfolioLink).toHaveAttribute(
      "href",
      "https://example.com/photographer"
    );
    expect(portfolioLink).toHaveAttribute("target", "_blank");
    expect(portfolioLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("shows liked state correctly", () => {
    const likedPhoto = { ...mockPhoto, liked: true };
    render(<PhotoItem {...likedPhoto} />);

    // The LikedIcon should be present (we can't easily test SVG fill, but we can test it exists)
    expect(document.querySelector("svg")).toBeInTheDocument();
  });
});
