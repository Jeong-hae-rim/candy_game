import { CardProps } from "../types/type";

function CardItem(props: CardProps & { onClick: () => void }) {
  const getRandomColor = () => {
    const colors = ["#3243a5", "#e63946", "#f4a261", "#2a9d8f", "#8a4ef5"];
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
