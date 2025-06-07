import "./More.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { externalReviews } from "../data/data";
import { useState } from "react";

function More() {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 15;
  const totalPages = Math.ceil(externalReviews.length / itemsPerPage);
  const currentItems = externalReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="more__container">
      <Header />
      <div className="external__review__board">
        <h1>온리전 후기 모음</h1>
        <table className="review__table">
          <thead>
            <tr>
              <th>#</th>
              <th>제목</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((review, index) => (
              <tr
                key={review.id}
                onClick={() => window.open(review.url, "_blank")}
                className="review__row"
              >
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{review.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* {selectedTweetId && (
          <div
            className="tweet__modal"
            onClick={() => setSelectedTweetId(null)}
          >
            <div
              className="tweet__modal__content"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedTweetId(null)}>닫기</button>
              <TwitterTweetEmbed tweetId={selectedTweetId} />
            </div>
          </div>
        )} */}
      </div>
      <Footer />
    </div>
  );
}

export default More;
