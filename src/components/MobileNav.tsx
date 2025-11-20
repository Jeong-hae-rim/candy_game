import type { MenuItem, MenuKey } from "../types/type";

interface MobileNavProps {
  menu: MenuItem[];
  active: MenuKey;
  onChange: (key: MenuKey) => void;
  onLogout?: () => void; // 필요 없으면 전달 안 해도 됨
}

export default function MobileNav({
  menu,
  active,
  onChange,
  onLogout,
}: MobileNavProps) {
  return (
    <nav className="mobile-nav" aria-label="모바일 네비게이션">
      <div className="mobile-nav__brand">
        <span className="logo">🔒</span>
        <strong>:: The After-Class Secret Club ::</strong>
        {onLogout && (
          <button
            className="mobile-nav__logout"
            onClick={onLogout}
            type="button"
            aria-label="로그아웃"
          >
            ⎋
          </button>
        )}
      </div>
      <div className="mobile-nav__scroll">
        {menu.map((m) => (
          <button
            key={m.key}
            className={`mobile-nav__item ${active === m.key ? "active" : ""}`}
            onClick={() => onChange(m.key)}
            type="button"
            aria-current={active === m.key ? "page" : undefined}
          >
            <span className="mi">{m.icon}</span>
            <span className="lb">{m.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
