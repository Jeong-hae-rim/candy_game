import { useEffect, useMemo, useState } from "react";
import {
  LETTER_ORDER,
  loadCollected,
  buildCode,
  isComplete,
  finalRoomCode,
} from "../func/puzzle";
import { useNavigate } from "react-router-dom";
import "./PuzzleHUD.css";

export default function PuzzleHUD() {
  const navigate = useNavigate();
  const [collected, setCollected] = useState(() => loadCollected());
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const refresh = () => setCollected(loadCollected());

    // 같은 탭: puzzle:update
    window.addEventListener("puzzle:update", refresh);
    // 다른 탭: storage
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("puzzle:update", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const codePreview = useMemo(() => buildCode(collected), [collected]);
  const count = useMemo(
    () => LETTER_ORDER.filter((id) => collected[id]).length,
    [collected]
  );
  const done = useMemo(() => isComplete(collected), [collected]);

  return (
    <div className={`puzzlehud ${open ? "" : "is-collapsed"}`}>
      <button
        className="puzzlehud__toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label="퍼즐 HUD 접기/펼치기"
      >
        {open ? "–" : "+"}
      </button>

      {open && (
        <>
          <div className="puzzlehud__title">
            <div className="muted">CODE</div>
            <span className="puzzlehud__count">
              {count}/{LETTER_ORDER.length}
            </span>
          </div>

          <div className="puzzlehud__code">{codePreview}</div>

          <div className="puzzlehud__actions">
            {done ? (
              <button
                className="puzzlehud__btn"
                onClick={() => navigate(`/${finalRoomCode()}`)}
              >
                롤링페이퍼로 이동
              </button>
            ) : (
              <span className="puzzlehud__hint">
                페이지를 돌아다니며 조각을 찾아봐!
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
