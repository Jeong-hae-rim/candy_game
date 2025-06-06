import { useState } from "react";
import "./CooperModal.css";

const CooperModal = ({ card, onClose }: any) => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = card.cooperation_list;
  const hasMultipleItems = items.length > 1;
  const currentItem = items[currentIndex];

  const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const next = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, items.length - 1));

  return (
    <>
      <div className="modal__overlay" onClick={onClose}>
        <div className="modal__content" onClick={(e) => e.stopPropagation()}>
          <div className="modal__wrapper">
            <div className="modal__inner">
              <h2>{card.nickname} 님</h2>

              <div className="custom-slider">
                {hasMultipleItems && (
                  <button onClick={prev} disabled={currentIndex === 0}>
                    ◀
                  </button>
                )}

                <div className="slider-content">
                  <img
                    src={currentItem.src}
                    alt={currentItem.title}
                    onClick={() => setZoomedImage(currentItem.src)}
                  />
                  <div className="modal__item__text">
                    <strong>{currentItem.title}</strong>
                    <p>{currentItem.category}</p>
                    <p>{currentItem.goods}</p>
                  </div>
                </div>

                {hasMultipleItems && (
                  <button
                    onClick={next}
                    disabled={currentIndex === items.length - 1}
                  >
                    ▶
                  </button>
                )}
              </div>

              <p>
                X 계정:{" "}
                <a
                  href={`https://twitter.com/${card.x_id.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {card.x_id}
                </a>
              </p>
              <button className="cooper__exit__btn" onClick={onClose}>
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>

      {zoomedImage && (
        <div className="zoom__overlay" onClick={() => setZoomedImage(null)}>
          <img src={zoomedImage} alt="확대 이미지" className="zoom__image" />
        </div>
      )}
    </>
  );
};

export default CooperModal;
