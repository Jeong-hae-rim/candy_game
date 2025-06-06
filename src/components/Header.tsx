import { Link } from "react-router-dom";
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
          <Link to={"/love-and-ball"}>
            <span>H</span>OME_
          </Link>
        </li>
        <li>
          <Link to={"/year-memory"}>
            <span> Y</span>EAR MEMORY_
          </Link>
        </li>
        <li>
          <Link to={"/date-log"}>
            <span> D</span>ATE LOG_
          </Link>
        </li>
        <li>
          <Link to={"/more"}>
            <span> M</span>ORE_
          </Link>
        </li>
      </div>
    </div>
  );
};

export default Header;
