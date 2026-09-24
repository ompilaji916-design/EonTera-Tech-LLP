import type { Metadata } from "next";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const canonical = origin ? `${origin}${path.startsWith("/") ? path : `/${path}`}` : undefined;
  return {
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      title,
      description,
      type: "website",
      ...(canonical ? { url: canonical } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
