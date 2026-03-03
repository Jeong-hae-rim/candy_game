import { useEffect, useMemo, useState } from "react";
import "./VNModal.css";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  imageSrc: string;
  speaker?: string | string[];
  lines: string[];
  onCollect?: () => void;
  collected?: boolean;
};

export default function VNModal({
  open,
  onClose,
  title,
  imageSrc,
  speaker,
  lines,
  onCollect,
  collected,
}: Props) {
  const [idx, setIdx] = useState(0);

  const currentSpeaker = useMemo(() => {
    if (!speaker) return "??";
    if (Array.isArray(speaker)) {
      return speaker[idx] ?? speaker[speaker.length - 1];
    }
    return speaker;
  }, [speaker, idx]);

  const text = useMemo(() => lines[idx] ?? "", [lines, idx]);

  useEffect(() => {
    if (open) setIdx(0); // ✅ 다른 페이지에서 열릴 때 인덱스 리셋
  }, [open, lines]);

  if (!open) return null;

  const canNext = idx < lines.length - 1;

  return (
    <div className="vn-backdrop" onClick={onClose}>
      <div
        className="vn-modal vn-modal--side"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* 좌측 이미지 */}
        <div className="vn-left">
          <div className="vn-portrait">
            <img src={imageSrc} alt="" draggable={false} />
          </div>
          {title && <div className="vn-title">{title}</div>}
        </div>

        {/* 우측 대사 */}
        <div className="vn-right">
          <div className="vn-dialog">
            <div className="vn-name">{currentSpeaker}</div>
            <div className="vn-text">{text}</div>

            <div className="vn-actions">
              <button
                className="vn-btn ghost"
                onClick={() => {
                  onClose();
                  setIdx(0);
                }}
              >
                닫기
              </button>

              {canNext ? (
                <button className="vn-btn" onClick={() => setIdx((v) => v + 1)}>
                  다음 ▷
                </button>
              ) : (
                <button
                  className="vn-btn"
                  onClick={() => {
                    onCollect?.();
                    onClose();
                    setIdx(0);
                  }}
                  disabled={!onCollect || collected}
                  title={collected ? "이미 획득했어!" : ""}
                >
                  {collected ? "획득 완료" : "획득"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
