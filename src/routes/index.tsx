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
        before:absolute before:top-[-50px] before:bottom-[-50px] before:left-0 before:right-0 before:border-l before:border-r before:border-black before:pointer-events-none dark:before:border-white
        after:absolute after:left-[-50px] after:right-[-50px] after:top-0 after:bottom-0 after:border-t after:border-b after:border-black after:pointer-events-none dark:after:border-white"
      >
        <div className="flex flex-col mb-4 gap-2 items-center justify-center">
          <h1 className="text-4xl font-bold">{m.heading_falk()}</h1>
          <caption className="caption-bottom text-cyan-800">software developer</caption>
        </div>
        <Link
          to="/about"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          {m.nav_about()}
        </Link>
        <Link
          to="/services"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          {m.nav_services()}
        </Link>
        <Link
          to="/blog"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          {m.nav_blog()}
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
