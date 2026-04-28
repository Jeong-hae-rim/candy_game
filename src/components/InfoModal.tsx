import "./infomodal.css";

const InfoModal = ({ card, onClose }: any) => {
  const getRandomColor = () => {
    const colors = ["#3243a5", "#e63946", "#f4a261", "#2a9d8f", "#8a4ef5"];
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
