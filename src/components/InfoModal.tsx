import "./infomodal.css";

const InfoModal = ({ card, onClose }: any) => {
  const getRandomColor = () => {
    const colors = ["#6175e5", "#ee6a75", "#f4a261", "#42c2b3", "#8b56e7"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (!card) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        <div className="modal-wrapper">
          <div className="modal-inner">
            <div className="modal-img-wrap">
              <img src={card.src} />
              <label>{card.label}</label>
            </div>
            <h2>{card.title}</h2>
            <div className="tags">
              {card.author.map((name: string, index: number) => (
                <span
                  key={index}
                  style={
                    { "--tag-bg": getRandomColor() } as React.CSSProperties
                  }
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
