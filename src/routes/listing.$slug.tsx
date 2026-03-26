import { createFileRoute } from "@tanstack/react-router";
import { Lightbox } from "../components/Lightbox";
import { ListingHero } from "../components/ListingHero";
import { ListingFeatures } from "../components/ListingFeatures";
import { ListingGallery } from "../components/ListingGallery";
import { useState } from "react";

import { ListingSidebar } from "../components/ListingSidebar";
import { entryQueryOptions } from "../sanity/sanity.function";

export const Route = createFileRoute("/listing/$slug")({
  loader: async ({ params, context }) => {
    const listing = await context.queryClient.ensureQueryData(entryQueryOptions(params.slug));
    return {
      listing,
    };
  },
  component: Listing,
});

function Listing() {
  const { listing } = Route.useLoaderData();

  if (!listing) {
    return <h1>Not Found</h1>;
  }

  const gallery = listing.gallery
    ? listing.gallery.map(({ url }) => url).filter((u) => u !== "")
    : [];

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % (gallery.length + 1));
  };

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + gallery.length + 1) % (gallery.length + 1));
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      <Lightbox
        isOpen={isLightboxOpen}
        images={[listing.featureImage, ...gallery]}
        currentIndex={lightboxIndex}
        onClose={() => setIsLightboxOpen(false)}
        onNext={nextLightboxImage}
        onPrev={prevLightboxImage}
        title={listing.title!}
      />

      <ListingHero listing={listing} onOpenLightbox={openLightbox} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <ListingFeatures listing={listing} />
            <ListingGallery images={gallery} onOpenLightbox={openLightbox} />
          </div>
          <ListingSidebar listing={listing} />
        </div>
      </div>
    </div>
  );
}
