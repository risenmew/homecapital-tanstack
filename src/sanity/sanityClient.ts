import { createClient } from "@sanity/client";
import { createQueryStore } from "@sanity/react-loader";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  apiVersion: process.env.SANITY_API_VERSION,
  dataset: process.env.SANITY_DATASET,
});

const { loadQuery } = createQueryStore({ client: client });

export { loadQuery };
