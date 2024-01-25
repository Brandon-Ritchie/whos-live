import { Link, Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

export default function PageLayout() {
  return (
    <div className="min-h-full">
      <Analytics />
      <NavBar />
      <main className="px-8 pb-4 lg:px-16">
        <Outlet />
      </main>
    </div>
  );
}

function NavBar() {
  return (
    <div className="navbar w-full bg-primary">
      <div className="flex-1" />
      <nav className="flex-none lg:hidden">
        <DropdownNavMenu />
      </nav>
      <nav className="navbar-end hidden flex-none lg:flex">
        <NavMenu />
      </nav>
    </div>
  );
}

function Links() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <>
      {links.map((link) => (
        <li key={link.to}>
          <Link to={link.to} className="font-bold" tabIndex={0}>
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );
}

function DropdownNavMenu() {
  return (
    <div className="dropdown dropdown-end">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
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
            />
          </svg>
        </button>
      </div>
      <ul className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-neutral p-2 shadow">
        <Links />
      </ul>
    </div>
  );
}

function NavMenu() {
  return (
    <ul className="menu menu-horizontal px-1 text-secondary-content">
      <Links />
    </ul>
  );
}
