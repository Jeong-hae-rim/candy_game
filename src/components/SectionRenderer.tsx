import HomeSection from "./HomeSection";
import NoticeSection from "./NoticeSection";
import GallerySection from "./GallerySection";
import DownloadSection from "./DownloadSection";
import AboutSection from "./AboutSection";
import InfoSection from "./InfoSection";
import { MenuKey } from "../types/type";

interface SectionRendererProps {
  active: MenuKey;
}

function SectionRenderer({ active }: SectionRendererProps) {
  switch (active) {
    case "home":
      return <HomeSection />;

    case "notice":
      return <NoticeSection />;

    case "booth_info":
      return <InfoSection />;

    case "gallery":
      return <GallerySection />;

    case "download":
      return <DownloadSection />;

    case "secret_angels":
      return <AboutSection />;

    default:
      return null;
  }
}

export default SectionRenderer;
