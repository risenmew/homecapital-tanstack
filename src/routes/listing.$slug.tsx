import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/listing/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/listing/$slug"!</div>;
}
