export type MenuKey = "home" | "notice" | "gallery" | "download" | "about";

export interface MenuItem {
  key: MenuKey;
  label: string;
  icon: string; // emoji or text icon
}
