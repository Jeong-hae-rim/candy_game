import "./card.css";
import { InfoDataProps } from "../types/type";
import CardItem from "./CardItem";

const Card = ({ infoData, onClick }: InfoDataProps) => {
  return (
    <div className="cards">
      <div className="cards__container">
        <div className="cards__wrapper">
          {infoData.map((el) => (
            <CardItem
              key={el.id}
              id={el.id}
              src={el.src}
              title={el.title}
              author={el.author}
              description={el.description}
              label={el.label}
              product={el.product} // 추가
              onClick={() => onClick(el)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
