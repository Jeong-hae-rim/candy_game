import LOGO from "../assets/images/logo3.png";
import { useMemo, useRef } from "react";
import type { MenuItem, MenuKey } from "../types/type";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  menu: MenuItem[];
  active: MenuKey;
  onChange: (key: MenuKey) => void;
  onLogout: () => void;
}

function Sidebar({ menu, active, onChange, onLogout }: SidebarProps) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const activeIndex = useMemo(
    () => menu.findIndex((m) => m.key === active),
    [menu, active]
  );

  const focusItem = (index: number) => {
    const items =
      listRef.current?.querySelectorAll<HTMLButtonElement>("[data-menu-item]");
    items?.[index]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowUp", "ArrowDown", "Enter"].includes(e.key)) return;
    e.preventDefault();

    if (e.key === "ArrowUp") {
      const next = activeIndex <= 0 ? menu.length - 1 : activeIndex - 1;
      onChange(menu[next].key);
      focusItem(next);
    } else if (e.key === "ArrowDown") {
      const next = activeIndex >= menu.length - 1 ? 0 : activeIndex + 1;
      onChange(menu[next].key);
      focusItem(next);
    } else if (e.key === "Enter") {
      // 필요 시 Enter 동작 추가 가능
    }
  };

  return (
    <aside className="pc-sidebar" aria-label="사이드 메뉴">
      <div className="brand" onClick={() => navigate("/")}>
        <img src={LOGO} alt="비밀결사대 로고" className="login-logo" />
        <div className="logo-box">
          <strong>:: 비밀결사대 주머니통신 ::</strong>
          <p className="muted">The After-Class Secret Club</p>
        </div>
      </div>

      <div
        className="menu"
        role="listbox"
        aria-activedescendant={`menu-${active}`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        ref={listRef}
      >
        {menu.map((m) => (
          <button
            key={m.key}
            id={`menu-${m.key}`}
            className={`menu-item ${active === m.key ? "active" : ""}`}
            data-menu-item
            onClick={() => onChange(m.key)}
            type="button"
          >
            <span className="mi">{m.icon}</span>
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      <div className="sidebar-bottom">
        <button className="logout" onClick={onLogout} type="button">
          로그아웃
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
