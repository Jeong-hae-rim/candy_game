import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="wrapper">
      <div className="header-container">
        <div className="header-wrap">
          <span>
            <div className="heart">🩷</div> ツッパリ Highschool ⊹⁺ Love & Ball
          </span>
        </div>
      </div>
      <div className="navigate">
        <li>
          <NavLink
            to={"/love-and-ball"}
            className={({ isActive }) => (isActive ? "nav__active" : "")}
          >
            <span>H</span>OME_
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/year-memory"}
            className={({ isActive }) => (isActive ? "nav__active" : "")}
          >
            <span> Y</span>EAR MEMORY_
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/date-log"}
            className={({ isActive }) => (isActive ? "nav__active" : "")}
          >
            <span> D</span>ATE LOG_
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/more"}
            className={({ isActive }) => (isActive ? "nav__active" : "")}
          >
            <span> M</span>ORE_
          </NavLink>
        </li>
      </div>
    </div>
  );
};

export default Header;
