import { useState } from "react";

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="mb-10 flex-no-wrap relative flex w-full items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <button
          className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline focus:outline-none dark:text-neutral-200 lg:hidden"
          type="button"
          onClick={handleNavCollapse}
          aria-controls="navbarSupportedContent1"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {/* Collapsible navigation container */}
        <div
          className={`${
            isNavCollapsed ? "hidden" : ""
          } flex-grow basis-[100%] items-center lg:flex lg:basis-auto`}
          id="navbarSupportedContent1"
        >
          {/* Logo */}
          <a
            className="mb-4 me-5 ms-2 mt-3 flex items-center text-xl text-neutral-900  dark:text-neutral-200 lg:mb-0 lg:mt-0"
            href="#"
          >
            Learn From Your Mistakes 2.0
          </a>
          {/* Left navigation links */}
          <ul className="list-style-none me-auto flex flex-col ps-0 lg:flex-row">
            <li className="mb-4 lg:mb-0 lg:pe-2">
              <a
                className="text-black/60 transition duration-200 hover:text-black/80 dark:text-white/60 dark:hover:text-white/80 lg:px-2"
                href="#"
              >
                Set Training Params
              </a>
            </li>
            <li className="mb-4 lg:mb-0 lg:pe-2">
              <a
                className="text-black/60 transition duration-200 hover:text-black/80 dark:text-white/60 dark:hover:text-white/80 lg:px-2"
                href="#"
              >
                Mistake Trainer
              </a>
            </li>
            <li className="mb-4 lg:mb-0 lg:pe-2">
              <a
                className="text-black/60 transition duration-200 hover:text-black/80 dark:text-white/60 dark:hover:text-white/80 lg:px-2"
                href="#"
              >
                How to Use
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
