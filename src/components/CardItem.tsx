import { CardProps } from "../types/type";

function CardItem(props: CardProps & { onClick: () => void }) {
  const getRandomColor = () => {
    const colors = ["#6175e5", "#ee6a75", "#f4a261", "#42c2b3", "#8b56e7"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      <li className="cards__item" onClick={props.onClick}>
        <div className="cards__item__link">
          <div className="cards__item__pic-wrap">
            <img
              className="cards__item__img"
              alt="Travel Image"
              src={props.src}
            />
            <label>{props.label}</label>
          </div>
        </div>
        <div className="cards__item__info">
          <h5 className="cards__item__text">{props.title}</h5>
          <div className="tags">
            {props.author.map((name, index) => (
              <span
                key={index}
                style={{ "--tag-bg": getRandomColor() } as React.CSSProperties}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </li>
    </>
  );
}

export default CardItem;
