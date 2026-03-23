import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import Footer from "../components/Footer";
import Header from "../components/Header";

import appCss from "../styles.css?url";
import { getMetadata } from "../sanity/sanity.function";

export const Route = createRootRoute({
  beforeLoad: async () => {
    const metadata = await getMetadata();
    return metadata;
  },
  loader: async ({ context }) => {
    return context;
  },

  head: ({ loaderData }) => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: loaderData?.title,
      },
    ],
    links: [
      {
        rel: "icon",
        href: loaderData?.icon,
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css",
        crossOrigin: "anonymous",
        referrerPolicy: "no-referrer",
        integrity:
          "sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==",
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const loader = Route.useLoaderData();

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-gold-200 selection:text-stone-900">
          <Header siteName={loader.title} logo={loader.icon!} />
          {children}
          <Footer agency={loader} />
        </div>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
