import { createFileRoute, Link } from "@tanstack/react-router";
import * as m from "~/paraglide/messages";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex min-h-[calc(100dvh-5rem)] items-center justify-center flex-col gap-0">
      <div
        className="relative flex flex-col items-center p-6 sm:p-12
        before:absolute before:top-[-40px] before:bottom-[-40px] before:left-0 before:right-0 before:border-l before:border-r before:border-black before:pointer-events-none dark:before:border-white sm:before:top-[-80px] sm:before:bottom-[-80px]
        after:absolute after:left-[-40px] after:right-[-40px] after:top-0 after:bottom-0 after:border-t after:border-b after:border-black after:pointer-events-none dark:after:border-white sm:after:left-[-80px] sm:after:right-[-80px]"
      >
        <span className="absolute top-0 left-0 -translate-x-7 -translate-y-7 text-2xl font-bold sm:-translate-x-12.5 sm:-translate-y-12.5 sm:text-4xl">F</span>
        <span className="absolute top-0 right-0 translate-x-7 -translate-y-7 text-2xl font-bold sm:translate-x-12.5 sm:-translate-y-12.5 sm:text-4xl">A</span>
        <span className="absolute bottom-0 left-0 -translate-x-7 translate-y-7 text-2xl font-bold sm:-translate-x-12.5 sm:translate-y-12.5 sm:text-4xl">L</span>
        <span className="absolute bottom-0 right-0 translate-x-7 translate-y-7 text-2xl font-bold sm:translate-x-12.5 sm:translate-y-12.5 sm:text-4xl">K</span>
        <div className="flex flex-col mb-4 gap-2 items-center justify-center">
          {/*<h1 className="text-4xl font-bold">{m.heading_falk()}</h1>*/}
          <h2 className="text-xl text-cyan-800 dark:text-white">freelance software developer</h2>

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
