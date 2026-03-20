import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/collection")({
  component: Collection,
});

function Collection() {}
