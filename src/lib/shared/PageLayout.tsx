import { Link, Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

const PageLayout = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Analytics />
      <NavBar />
      <main className="flex-1 px-8 pb-4 lg:px-16">
        <Outlet />
      </main>
    </div>
  );
};

const NavBar = () => {
  return (
    <div className="navbar w-full bg-primary">
      <div className="flex-1"></div>

      <nav className="flex-none">
        <div className="dropdown dropdown-end">
          <div className="flex-none">
            <button className="btn btn-square btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-secondary-content"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-neutral p-2 shadow"
          >
            <Links />
          </ul>
        </div>
      </nav>
      <nav className="navbar-end hidden flex-none lg:flex">
        <ul className="menu menu-horizontal px-1 text-secondary-content">
          <Links />
        </ul>
      </nav>
    </div>
  );
};

const Links = () => {
  const links = [{ to: "/", label: "Home" }];

  return (
    <>
      {links.map((link) => (
        <li key={link.to}>
          <Link to={link.to} className="font-bold">
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );
};

export default PageLayout;
