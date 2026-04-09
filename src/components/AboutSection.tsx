import { useEffect, useState } from "react";

type CooperItem = {
  id: string;
  thumb: string;
  artworks: string[];
  hasArtwork: boolean;
};

export default function AboutSection() {
  const [selectedItem, setSelectedItem] = useState<CooperItem | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeArtworkIndex, setActiveArtworkIndex] = useState(0);

  const thumbImages = import.meta.glob("../assets/images/cooper/*", {
    eager: true,
    import: "default",
  }) as Record<string, string>;

  const artworkImages = import.meta.glob("../assets/images/cooperWorks/*", {
    eager: true,
    import: "default",
  }) as Record<string, string>;

  const getFileName = (path: string) => path.split("/").pop()!.split(".")[0];

  // "1_2" -> "1"
  const getGroupKey = (path: string) => {
    const fileName = getFileName(path);
    return fileName.split("_")[0];
  };

  const cooperList: CooperItem[] = Object.entries(thumbImages)
    .map(([path, thumbSrc]) => {
      const key = getGroupKey(path);

      const matchedArtworks = Object.entries(artworkImages)
        .filter(([artPath]) => getGroupKey(artPath) === key)
        .sort(([a], [b]) =>
          getFileName(a).localeCompare(getFileName(b), undefined, {
            numeric: true,
          })
        )
        .map(([, src]) => src);

      const hasArtwork = matchedArtworks.length > 0;

      return {
        id: key,
        thumb: thumbSrc,
        artworks: hasArtwork ? matchedArtworks : [],
        hasArtwork,
      };
    })
    .sort((a, b) => Number(a.id) - Number(b.id));

  const openViewer = (item: CooperItem) => {
    setSelectedItem(item);
    setActiveArtworkIndex(0);
  };

  const closeViewer = () => {
    setSelectedItem(null);
    setIsFullscreen(false);
    setActiveArtworkIndex(0);
  };

  const openFullscreen = () => setIsFullscreen(true);
  const closeFullscreen = () => setIsFullscreen(false);

  const showPrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedItem || selectedItem.artworks.length === 0) return;

    setActiveArtworkIndex((prev) =>
      prev === 0 ? selectedItem.artworks.length - 1 : prev - 1
    );
  };

  const showNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedItem || selectedItem.artworks.length === 0) return;

    setActiveArtworkIndex((prev) =>
      prev === selectedItem.artworks.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    if (!selectedItem) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreen) {
          closeFullscreen();
        } else {
          closeViewer();
        }
      }

      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedItem, isFullscreen]);

  return (
    <>
      <h1>천사들 소개</h1>
      <p>여기는 우리를 도와주는 천사들을 소개하는 곳이야 ଘ(੭ˊᵕˋ)੭* ੈ✩‧₊˚</p>
      <p className="muted">호열아 대만아 기쁘지?</p>

      <div className="cooper-grid">
        {cooperList.map((item) => (
          <button
            key={item.id}
            disabled={!item.hasArtwork}
            type="button"
            className="cooper-item"
            onClick={() => openViewer(item)}
          >
            <img src={item.thumb} alt={item.id} />
          </button>
        ))}
      </div>

      {selectedItem && (
        <div className="modal-backdrop" onClick={closeViewer}>
          <div
            className="modal cooper-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="협력작 보기"
          >
            <div className="gallery-modal__header">
              <button
                className="modal-close"
                type="button"
                onClick={closeViewer}
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            <div className="cooper-modal__body">
              {selectedItem.artworks.length > 1 && (
                <button
                  type="button"
                  className="gallery-modal__nav prev"
                  onClick={showPrev}
                  aria-label="이전 이미지"
                >
                  《
                </button>
              )}

              <img
                src={selectedItem.artworks[activeArtworkIndex]}
                alt={`${selectedItem.id} 협력작 ${activeArtworkIndex + 1}`}
                className="cooper-modal__img"
                onClick={(e) => {
                  e.stopPropagation();
                  openFullscreen();
                }}
              />

              {selectedItem.artworks.length > 1 && (
                <button
                  type="button"
                  className="gallery-modal__nav next"
                  onClick={showNext}
                  aria-label="다음 이미지"
                >
                  》
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {isFullscreen && selectedItem && (
        <div className="fullscreen-backdrop" onClick={closeFullscreen}>
          <img
            src={selectedItem.artworks[activeArtworkIndex]}
            alt={`${selectedItem.id} 협력작 전체 보기`}
            className="fullscreen-img"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            className="fullscreen-close"
            onClick={closeFullscreen}
            aria-label="전체 화면 닫기"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
