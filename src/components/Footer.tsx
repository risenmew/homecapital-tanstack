import { Link } from "@tanstack/react-router";
// import { Crown } from "lucide-react";
import { useLocales } from "../hooks/locales";
import { resolveLanguage } from "../sanity/utils";
import type { InternationalizedArrayDescription, Location } from "../../sanity/sanity.types";

type PropsType = {
  title: string;
  icon: string | undefined;
  location: Location | undefined;
  contacts?: {
    email?: string;
    phone?: string;
    whatsapp?: string;
  };
  bio: InternationalizedArrayDescription | undefined;
};

export default function Footer({ agency }: { agency: PropsType }) {
  const { t, lang } = useLocales();

  return (
    <footer className="bg-stone-900 text-stone-400 py-16 mt-20 border-t-4 border-gold-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-6 text-gold-100">
              {/* <Crown size={24} /> */}
              <i className="fa-solid fa-crown"></i>
              <span className="font-serif font-bold text-xl tracking-wide uppercase">
                {agency.title || "Real Estate"}
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs font-serif italic text-stone-500">
              {resolveLanguage(agency?.bio, lang) || "Description"}
            </p>
          </div>
          <div>
            <h3 className="text-gold-200 font-serif text-lg mb-6 italic">{t("navigation")}</h3>
            <ul className="space-y-3 text-sm tracking-wide uppercase">
              <li>
                <Link to="/collection" className="hover:text-gold-400 transition-colors">
                  {t("collection")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-400 transition-colors">
                  {t("about-us")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-400 transition-colors">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-gold-200 font-serif text-lg mb-6 italic">{t("office")}</h3>
            <ul className="space-y-3 text-sm font-light">
              <li>{agency.location?.address || "Somewhere"}</li>
              <li>{agency.location?.postalCode || "1000"} Budapest, Hungary</li>
              <li>{agency.contacts?.email || "example@gmail.com"}</li>
              <li>{agency.contacts?.phone || "+366969696969"}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800 mt-16 pt-8 text-[10px] uppercase tracking-widest text-center text-stone-600">
          © {new Date().getFullYear()} {agency.title || "Real Estate"}. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
