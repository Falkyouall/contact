import { createFileRoute, Link } from "@tanstack/react-router";
import * as m from "~/paraglide/messages";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center flex-col gap-0">
      <div
        className="relative flex flex-col items-center p-12
        before:absolute before:top-[-50px] before:bottom-[-50px] before:left-0 before:right-0 before:border-l-2 before:border-r-2 before:border-black before:pointer-events-none
        after:absolute after:left-[-50px] after:right-[-50px] after:top-0 after:bottom-0 after:border-t-2 after:border-b-2 after:border-black after:pointer-events-none"
      >
        <h1 className="text-4xl font-bold">{m.heading_falk()}</h1>
        <Link
          to="/blog"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          {m.nav_blog()}
        </Link>
        <Link
          to="/services"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          {m.nav_services()}
        </Link>
        <Link
          to="/about"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          {m.nav_about()}
        </Link>
        <Link
          to="/contact"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          {m.nav_contact()}
        </Link>
      </div>
    </div>
  );
}
