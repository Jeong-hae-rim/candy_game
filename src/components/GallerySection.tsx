import { useState, useEffect, ReactNode } from "react";

import cartoon1 from "../assets/images/gallery/cartoon_1.jpg";
import cartoon2 from "../assets/images/gallery/cartoon_2.jpg";
import EYE from "../assets/images/eye2.png";
import { openVNModal } from "../func/vnEvents";
import { LetterId } from "../func/puzzle";

type AlbumComment = {
  id: number;
  author: string;
  text: string | ReactNode[];
};

type Album = {
  title: string;
  tags: string[]; // 태그들
  date: string;
  images: string[];
  comments: AlbumComment[]; // 댓글 스타일 텍스트
};

const letterId: LetterId = "U2";

const albums: Album[] = [
  {
    title: "비밀결사대 들키기 5초 전",
    date: "2025-11-20",
    images: [cartoon1, cartoon2],
    tags: [
      "들킨_쪽지",
      "들키기_전에_암구호_변경을?",
      "이상한_인테리어와_수상한_책이_가득한_컬트_모임",
    ],
    comments: [
      {
        id: 2,
        author: "조사부장",
        text: "이미 도망간 것 같습니다.",
      },
      {
        id: 1,
        author: "비밀결사대",
        text: [
          <span className="comment-text">
            써방명도 안 쓴 쪽지 흘린 사람 손 들어
            <button
              type="button"
              className="puzzle-letter"
              onClick={() =>
                openVNModal({
                  key: letterId,
                  title: "수상한 조각",
                  imageSrc: "IMG_Y1",
                  speaker: "??",
                  lines: [
                    "벽 틈 사이에 종이 조각이 끼어 있다.",
                    "…손끝에 잉크가 묻는다.",
                    "‘U’ 라고 적혀 있다.",
                  ],
                })
              }
            >
              줘
            </button>{" "}
            볼래…
          </span>,
        ],
      },
    ],
  },
  {
    title: "하굣길 디스패치",
    tags: [], // 태그들
    date: "",
    images: [],
    comments: [
      {
        id: 1,
        author: "캡쳐요정",
        text: "사진은 정리 중이에요! (곧 업로드 예정)",
      },
    ],
  },
  {
    title: "체육대회 비하인드",
    tags: [], // 태그들
    date: "",
    images: [], // 1장짜리도 가능
    comments: [
      {
        id: 1,
        author: "캡쳐요정",
        text: "사진은 정리 중이에요! (곧 업로드 예정)",
      },
    ],
  },
];

export default function GallerySection() {
  const [activeAlbumIndex, setActiveAlbumIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false); // ⭐ 풀스크린 여부

  const isOpen = activeAlbumIndex !== null;
  const currentAlbum =
    activeAlbumIndex !== null ? albums[activeAlbumIndex] : null;

  const openViewer = (albumIndex: number) => {
    const album = albums[albumIndex];
    if (!album || album.images.length === 0) return; // ✅ 안전장치

    setActiveAlbumIndex(albumIndex);
    setActiveImageIndex(0);
  };

  const closeViewer = () => {
    setActiveAlbumIndex(null);
    setActiveImageIndex(0);
  };

  const showPrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!currentAlbum) return;
    setActiveImageIndex((prev) =>
      prev === 0 ? currentAlbum.images.length - 1 : prev - 1
    );
  };

  const showNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!currentAlbum) return;
    setActiveImageIndex((prev) =>
      prev === currentAlbum.images.length - 1 ? 0 : prev + 1
    );
  };

  const openFullscreen = () => setIsFullscreen(true);
  const closeFullscreen = () => setIsFullscreen(false);

  // ESC / 방향키로 조작
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeViewer();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, currentAlbum]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreen) {
          closeFullscreen(); // ⭐ 먼저 풀스크린 닫기
        } else {
          closeViewer();
        }
      }
      if (!isFullscreen) {
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "ArrowRight") showNext();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, isFullscreen, currentAlbum]);

  return (
    <>
      <h1>호열대만 디스패치</h1>
      <p>여기는 우리가 피땀눈물 흘려서 모은 호댐의 정수가 모여 있어! (۶•̀ᴗ•́)۶</p>

      <div className="grid gallery">
        {albums.map((album, i) => {
          const hasImages = album.images.length > 0;
          const thumbSrc = hasImages ? album.images[0] : EYE;
          const firstComment =
            album.comments[0]?.text ?? "아직 코멘트가 없어요";

          return (
            <button
              key={i}
              type="button"
              className="gallery-polaroid"
              onClick={() => openViewer(i)}
              disabled={!hasImages} // ✅ 이미지 없으면 클릭 막고 싶으면
            >
              <div className="gallery-polaroid__photo">
                <img src={thumbSrc} alt={album.title} />
              </div>
              <div className="gallery-polaroid__caption">
                <div className="caption-title">{album.title}</div>
                <div className="caption-date muted">{album.date}</div>
                <div className="caption-comment muted">💬 {firstComment}</div>
                <div className="caption-tags">
                  {album.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="tag-pill">
                      #{tag}
                    </span>
                  ))}

                  {/* 태그가 3개 이상이면 +N 표시 */}
                  {album.tags.length > 2 && (
                    <span className="tag-more">+{album.tags.length - 2}</span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 모달 뷰어 */}
      {isOpen && currentAlbum && (
        <div className="modal-backdrop" onClick={closeViewer}>
          <div
            className="modal gallery-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery viewer"
          >
            {/* 🔹 맨 위 헤더 - X 버튼만 */}
            <div className="gallery-modal__header">
              <button
                className="modal-close"
                type="button"
                onClick={closeViewer}
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            <div className="gallery-modal__body">
              {currentAlbum.images.length > 1 && (
                <button
                  type="button"
                  className="gallery-modal__nav prev"
                  onClick={showPrev}
                  aria-label="이전 이미지"
                >
                  《
                </button>
              )}

              <img
                src={currentAlbum.images[activeImageIndex]}
                alt={`${currentAlbum.title} - ${activeImageIndex + 1}`}
                className="gallery-modal__img"
                onClick={(e) => {
                  e.stopPropagation(); // 모달 클릭 닫힘 방지
                  openFullscreen(); // ⭐ 풀스크린 열기
                }}
              />

              {currentAlbum.images.length > 1 && (
                <button
                  type="button"
                  className="gallery-modal__nav next"
                  onClick={showNext}
                  aria-label="다음 이미지"
                >
                  》
                </button>
              )}
            </div>

            {currentAlbum.images.length > 1 && (
              <p className="gallery-modal__count">
                {activeImageIndex + 1} / {currentAlbum.images.length}
              </p>
            )}

            <div className="gallery-modal__meta">
              <div className="gallery-modal__tags">
                {currentAlbum.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="gallery-modal__comments">
                {currentAlbum.comments.map((c) => (
                  <div key={c.id} className="comment-bubble">
                    <span className="comment-author">{c.author}</span>
                    {c.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {isFullscreen && currentAlbum && (
        <div className="fullscreen-backdrop" onClick={closeFullscreen}>
          <img
            src={currentAlbum.images[activeImageIndex]}
            alt={`${currentAlbum.title} - fullscreen`}
            className="fullscreen-img"
            onClick={(e) => e.stopPropagation()} // 이미지 클릭으로는 안 닫히게
          />

          <button
            type="button"
            className="fullscreen-close"
            onClick={closeFullscreen}
            aria-label="전체 화면 닫기"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
