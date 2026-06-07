import { Link, NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive ? "bg-slateblue text-white" : "text-ink hover:bg-white/80"
  }`;

function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-2xl font-bold tracking-tight text-ink">
          FaultLens AI
        </Link>
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/classification" className={navLinkClass}>
            Classification
          </NavLink>
          <NavLink to="/conflicts" className={navLinkClass}>
            Conflicts
          </NavLink>
          <NavLink to="/login" className={navLinkClass}>
            Login
          </NavLink>
          <NavLink to="/register" className={navLinkClass}>
            Register
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
