import { useEffect, useRef, useState } from "react";
import { openVNModal } from "../func/vnEvents";
import { LetterId } from "../func/puzzle";
import { useCollected } from "../func/puzzleStore";

type Props = {
  letterId: LetterId;
  error_char: string;
  correct_char: string;
  title: string;
  imageSrc: string;
  speaker: string[];
  lines: string[];
};

export default function PuzzleLetter({
  letterId,
  correct_char,
  error_char,
  title,
  imageSrc,
  speaker,
  lines,
}: Props) {
  const [tapped, setTapped] = useState<LetterId | null>(null);

  const collected = useCollected();

  const ref = useRef<HTMLSpanElement>(null);

  // 바깥 클릭 감지
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current) return;

      if (!ref.current.contains(e.target as Node)) {
        setTapped(null);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (!tapped) return;

    const t = setTimeout(() => setTapped(null), 1000);
    return () => clearTimeout(t);
  }, [tapped]);

  return (
    <span
      ref={ref}
      className={`puzzle-letter ${tapped === letterId ? "hovered" : ""} ${
        collected[letterId] ? "found" : ""
      }`}
      onClick={() => {
        setTapped((prev) => {
          if (prev === letterId) {
            setTimeout(() => {
              openVNModal({
                key: letterId,
                title,
                imageSrc,
                speaker,
                lines,
              });
            }, 0);

            return null;
          }

          return letterId;
        });
      }}
    >
      {collected[letterId] ? correct_char : error_char}
    </span>
  );
}
