import { useState } from "react";
import "./CooperModal.css";

const CooperModal = ({ card, onClose }: any) => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  return (
    <>
      <div className="modal__overlay" onClick={onClose}>
        <div className="modal__content" onClick={(e) => e.stopPropagation()}>
          <div className="modal__wrapper">
            <div className="modal__inner">
              <h2>{card.nickname} 님</h2>
              <div className="modal__list">
                {card.cooperation_list.map((item: any) => (
                  <div className="modal__item" key={item.id}>
                    <img
                      src={item.src}
                      alt={item.title}
                      onClick={() => setZoomedImage(item.src)}
                    />
                    <div className="modal__item__text">
                      <strong>{item.title}</strong>
                      <p>{item.category}</p>
                      <p>{item.goods}</p>
                    </div>
                  </div>
                ))}
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
              <button onClick={onClose}>닫기</button>
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
