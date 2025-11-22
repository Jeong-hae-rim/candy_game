import { ReactNode } from "react";

export type MenuKey = "home" | "notice" | "gallery" | "download" | "about";

export interface MenuItem {
  key: MenuKey;
  label: string;
  icon: ReactNode; // emoji or text icon
}
