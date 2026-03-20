import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { resolveLanguage } from "../sanity/utils";
import { useLocales } from "../hooks/locales";
import { getFeatured, getLanding, getLatest } from "../sanity/sanity.function";
import { ListingCard } from "../components/ListingCard";

export const Route = createFileRoute("/")({
  loader: async () => {
    const data = await getLanding();
    const featured = await getFeatured();
    const sale = await getLatest({ data: "sale" });
    const rent = await getLatest({ data: "rent" });
    return {
      landing: data,
      featured,
      sale,
      rent,
    };
  },
  component: App,
});

function App() {
  const { landing, featured, sale, rent } = Route.useLoaderData();
  const { lang, t } = useLocales();

  return (
    <div className="pb-0 bg-stone-50">
      {/* Banner */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={landing.banner} alt="Hero Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-linear-to-t from-stone-900/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-left text-white px-4 max-w-5xl mx-auto w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif font-medium mb-8 leading-normal"
          >
            {resolveLanguage(landing?.title, lang)}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl font-light text-stone-200 mb-12 max-w-2xl font-sans tracking-wide"
          >
            {resolveLanguage(landing?.subtitle, lang)}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Link
              to="/collection"
              className="inline-flex items-center gap-3 bg-gold-600 hover:bg-gold-700 text-white px-10 py-4 font-medium transition-all uppercase tracking-widest text-xs border border-gold-500 hover:border-gold-400"
            >
              {t("viewCollection")} <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Listing */}
      <section id="listings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <span className="text-gold-600 uppercase tracking-[0.3em] text-xs font-bold mb-3 block">
            {t("exclusivePortfolio")}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">
            {t("featuredResidences")}
          </h2>
          <div className="w-24 h-1 bg-gold-400 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {featured
            ? featured.map((listing) => <ListingCard key={listing.id} listing={listing} featured />)
            : ""}
        </div>
      </section>

      {/* Latest Sale Listings */}
      <section className="bg-stone-100 py-24 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-serif text-stone-900 mb-2">{t("saleProperty")}</h2>
            </div>
            <Link
              to="/collection"
              className="text-gold-700 hover:text-gold-800 uppercase tracking-widest text-xs font-bold border-b border-gold-700 pb-1"
            >
              {t("viewMore")}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {sale.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Sale Listings */}
      <section className="bg-stone-100 py-24 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-serif text-stone-900 mb-2">{t("rentProperty")}</h2>
            </div>
            <Link
              to="/collection"
              className="text-gold-700 hover:text-gold-800 uppercase tracking-widest text-xs font-bold border-b border-gold-700 pb-1"
            >
              {t("viewMore")}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {rent.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
