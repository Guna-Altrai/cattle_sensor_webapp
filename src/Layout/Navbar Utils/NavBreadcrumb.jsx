import { Breadcrumbs, Typography } from "@material-tailwind/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBreadcrumb = () => {
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  if (pathname === "/") {
    return (
      <div className="hidden md:block">
        <Breadcrumbs className="bg-transparent ">
          <Link
            to={`/`}
            className="bg-transparent opacity-60 text-text-light dark:text-text-dark"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </Link>
          <Typography className="opacity-80 text-sm text-text-light dark:text-text-dark">
            home
          </Typography>
        </Breadcrumbs>
      </div>
    );
  }

  return (
    <div className="hidden md:block">
      <Breadcrumbs className="bg-transparent ">
        <Link
          to={`/`}
          className="bg-transparent opacity-60 text-text-light dark:text-text-dark"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </Link>
        {layout && (
          <Link to={`/`} className="opacity-60">
            <span className="text-text-light dark:text-text-dark">
              {layout}
            </span>
          </Link>
        )}
        {page && layout && (
          <Link
            to={`/${layout}/${page}`}
            className="text-text-light dark:text-text-dark opacity-90"
          >
            {page}
          </Link>
        )}
      </Breadcrumbs>
    </div>
  );
};

export default NavBreadcrumb;
