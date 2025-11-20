import "./SecretPage.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SESSION_KEY } from "../func/constants";
import SectionRenderer from "../components/SectionRenderer";
import Sidebar from "../components/Sidebar";
import type { MenuItem, MenuKey } from "../types/type";

import MobileNav from "../components/MobileNav";
export default function SecretPage() {
  const navigate = useNavigate();
  const { tab } = useParams<{ tab?: string }>();

  // 인증 가드
  useEffect(() => {
    const hasAccess =
      sessionStorage.getItem(SESSION_KEY) === "1" ||
      localStorage.getItem(SESSION_KEY) === "1";
    if (!hasAccess) navigate("/", { replace: true });
    else if (
      localStorage.getItem(SESSION_KEY) === "1" &&
      sessionStorage.getItem(SESSION_KEY) !== "1"
    ) {
      sessionStorage.setItem(SESSION_KEY, "1");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
    navigate("/", { replace: true });
  };

  const menu: MenuItem[] = useMemo(
    () => [
      { key: "home", label: "홈", icon: "🏠" },
      { key: "notice", label: "공지", icon: "📣" },
      { key: "about", label: "천사목록", icon: "👼🏻" },
      { key: "gallery", label: "디스패치", icon: "🖼️" },
      { key: "download", label: "자료실", icon: "📦" },
    ],
    []
  );

  const [active, setActive] = useState<MenuKey>(
    (menu.find((m) => m.key === tab)?.key as MenuKey) || "home"
  );

  const handleTabChange = (key: MenuKey) => {
    setActive(key);
    navigate(`/${key}`, { replace: true });
  };

  return (
    <div className="pc-layout">
      <Sidebar
        menu={menu}
        active={active}
        onChange={handleTabChange}
        onLogout={handleLogout}
      />
      <MobileNav
        menu={menu}
        active={active}
        onChange={handleTabChange}
        onLogout={handleLogout}
      />
      <main className="pc-main" role="region" aria-live="polite">
        <SectionRenderer active={active} />
      </main>
    </div>
  );
}
