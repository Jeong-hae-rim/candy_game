import { useState } from "react";

import "./YearMemory.css";
import { cooperation } from "../data/data";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TIMETABLE from "../assets/images/timetable.jpeg";
import RABBITMITO from "../assets/images/rabbit_mito.gif";
import CooperModal from "../components/CooperModal";

interface CooperationType {
  id: number;
  nickname: string;
  x_id: string;
}

function YearMemory() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedButton, setSelectedButton] = useState<CooperationType | null>(
    null
  );

  const handleOnClick = (el: CooperationType) => {
    setSelectedButton(el);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedButton(null);
    setIsModalOpen(false);
  };

  return (
    <div className="yearmemory__container">
      <Header />
      {isModalOpen && selectedButton && (
        <CooperModal card={selectedButton} onClose={closeModal} />
      )}
      <div className="yearmemory__wrapper">
        <img src={TIMETABLE} />
        <img src={RABBITMITO} />
        <div className="cooper__wrapper">
          <h1>협력진</h1>
          <div className="cooper__btn__wrapper">
            {cooperation.map((el) => (
              <a
                key={el.id}
                onClick={() => handleOnClick(el)}
                className="cooper__btn blue"
              >
                {el.nickname}
              </a>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default YearMemory;
