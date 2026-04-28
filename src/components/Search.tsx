import "./search.css";

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="search-container">
      <div className="search-8bit">
        <div className="search-wrapper">
          {/* 숨겨진 input */}
          <input
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="부스 명 / 작가님 이름 / 부스 위치로 검색"
            className="hidden-input"
          />
          {/* 커스텀 스타일 적용된 div */}
          <div
            className="search-input"
            onClick={() =>
              document.querySelector<HTMLInputElement>(".hidden-input")?.focus()
            }
          >
            {searchTerm || "부스 명 / 작가님 이름 / 부스 위치로 검색"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
