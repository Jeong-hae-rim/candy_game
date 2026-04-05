import { useState } from "react";

type CooperItem = {
  id: string;
  thumb: string;
  artwork: string | undefined;
  hasArtwork: boolean;
};

export default function AboutSection() {
  const [selectedItem, setSelectedItem] = useState<CooperItem | null>(null);

  const thumbImages = import.meta.glob("../assets/images/cooper/*", {
    eager: true,
    import: "default",
  }) as Record<string, string>;

  const artworkImages = import.meta.glob("../assets/images/cooperWorks/*", {
    eager: true,
    import: "default",
  }) as Record<string, string>;

  const getBaseName = (path: string) => {
    return path.split("/").pop()!.split(".")[0];
  };

  const cooperList: CooperItem[] = Object.entries(thumbImages)
    .map(([path, thumbSrc]) => {
      const baseName = getBaseName(path);

      // cooper_1 -> cooper_1 과 같은 이름의 협력작을 찾는 구조
      const matchedArtworkEntry = Object.entries(artworkImages).find(
        ([artPath]) => getBaseName(artPath) === baseName
      );

      const hasArtwork = !!matchedArtworkEntry;

      return {
        id: baseName,
        thumb: thumbSrc,
        artwork: matchedArtworkEntry?.[1],
        hasArtwork,
      };
    })
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

  const closeViewer = () => setSelectedItem(null);

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
            onClick={() => setSelectedItem(item)}
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
              <img
                src={selectedItem.artwork}
                alt={`${selectedItem.id} 협력작`}
                className="cooper-modal__img"
              />

              {!selectedItem.hasArtwork && (
                <p className="muted">아직 공개되지 않은 협력작이에요 👀</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
