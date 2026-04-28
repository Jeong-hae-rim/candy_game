import "./infosection.css";
import { useState } from "react";
import { data } from "../data/data";
import Card from "../components/Card";
import SearchInput from "../components/Search";
import { FilterData } from "../types/type";
import InfoModal from "../components/InfoModal";

function InfoSection() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<FilterData[number] | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) => {
    const authorString = Array.isArray(item.author)
      ? item.author.join(", ")
      : item.author; // 기존 string 데이터도 처리 가능하도록

    return (
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      authorString.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleCardClick = (card: FilterData[number]) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && selectedCard && (
        <InfoModal card={selectedCard} onClose={closeModal} />
      )}
      <div className="test-wrapper">
        <div className="info__wrapper">
          <div className="info__wrap">
            <div className="info__contents">
              <h1 className="title3">결사대원 목록</h1>
              <SearchInput
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
              />
              {filteredData.length !== 0 ? (
                <Card infoData={filteredData} onClick={handleCardClick} />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoSection;
