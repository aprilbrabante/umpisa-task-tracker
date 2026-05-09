import { NavLink } from "react-router-dom";

export default function AppNavLink({to,label}) {
  
  return (

    <NavLink
      to={to}
      className={({ isActive }) =>
        `nav-link ${isActive ? "fw-bold text-white" : ""}`
      }
    >
      {label}
    </NavLink>

  );
}