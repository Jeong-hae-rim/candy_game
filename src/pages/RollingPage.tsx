import "./RollingPage.css";
import { useEffect, useMemo, useRef, useState } from "react";
import ADD from "../assets/images/add.png";

type Note = {
  id: string;
  room?: string;
  name: string;
  content: string;
  created_at: number;
};

type Props = {
  room?: string; // 하드코딩 룸
};

const NOTE_COLORS = ["lemon", "pink", "mint", "lavender", "sky"] as const;
type NoteColor = (typeof NOTE_COLORS)[number];

function pickColor(id: string): NoteColor {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return NOTE_COLORS[h % NOTE_COLORS.length];
}

export default function RollingPage({ room: roomProp }: Props) {
  const room = roomProp ?? "YUMMYCHU";

  const [notes, setNotes] = useState<Note[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [expandedId, setExpandedId] = useState<string | null>(null); // 메모 카드
  const [composerOpen, setComposerOpen] = useState(false); // 작성 카드

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const canSubmit = useMemo(
    () => name.trim() && content.trim(),
    [name, content]
  );

  async function loadMore() {
    if (!room || loading || !hasMore) return;
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      qs.set("room", room);
      qs.set("limit", "20");
      if (cursor) qs.set("cursor", String(cursor));

      const res = await fetch(`/api/rolling?${qs.toString()}`);
      const data = await res.json();

      const items: Note[] = data.items || [];
      setNotes((prev) => [...prev, ...items]);

      // 다음 cursor: 마지막 아이템 created_at
      const last = items[items.length - 1];
      setCursor(last ? last.created_at : cursor);

      setHasMore(Boolean(data.hasMore));
    } finally {
      setLoading(false);
    }
  }

  async function submit() {
    if (!canSubmit) return;

    const payload = { room, name: name.trim(), content: content.trim() };

    const res = await fetch("/api/rolling", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!data?.ok) return;

    // ✅ 새 메모를 맨 앞에 추가(앞부터 생성, 뒤로 밀림)
    setNotes((prev) => [data.item as Note, ...prev]);
    setContent("");
  }

  // 첫 로드(방 바뀌면 초기화)
  useEffect(() => {
    setNotes([]);
    setCursor(null);
    setHasMore(true);
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  // 인피니티 스크롤
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { root: null, rootMargin: "300px", threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room, cursor, hasMore, loading]);

  return (
    <div className="rolling">
      <div
        className="stickywall"
        onClick={() => {
          setComposerOpen(false);
          setExpandedId(null);
        }}
      >
        <h2>HAPPY BIRTHDAY, 호열아!</h2>
        <h3>CODE: {room}</h3>

        <div className="stickygrid">
          {/* 입력 포스트잇: 항상 맨 앞 */}

          <div
            className={`note note--composer ${
              composerOpen ? "is-expanded" : ""
            }`}
          >
            {!composerOpen && (
              <div
                className="composer-preview"
                onClick={(e) => {
                  e.stopPropagation(); // ✅ 벽 닫기 안 타게
                  setComposerOpen((v) => !v);
                  setExpandedId(null);
                }}
              >
                <img src={ADD} />
              </div>
            )}

            {/* 펼쳐진 내용 */}
            {composerOpen && (
              <div
                className="composer-body"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  className="note__input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름(또는 닉네임)"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
                <textarea
                  className="note__textarea"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="내용"
                  rows={5}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
                <button
                  className="note__btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    submit(); // 또는 submit()
                  }}
                  disabled={!content.trim()}
                >
                  붙이기
                </button>
              </div>
            )}
          </div>
          {/* 실제 메모들 */}
          {notes.map((note) => {
            const isExpanded = expandedId === note.id;
            const color = pickColor(note.id);

            return (
              <article
                key={note.id}
                className={`sticky note note--${color} ${
                  isExpanded ? "is-expanded" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation(); // ✅ 벽 닫기 막기
                  setExpandedId((prev) => (prev === note.id ? null : note.id));
                  setComposerOpen(false);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.stopPropagation();
                    setExpandedId((prev) =>
                      prev === note.id ? null : note.id
                    );
                    setComposerOpen(false);
                  }
                }}
              >
                <div className="note__tape" aria-hidden />
                <header className="note__meta">
                  <strong className="note__name">{note.name}</strong>
                  <span className="note__time">
                    {new Date(note.created_at).toLocaleDateString()}
                  </span>
                </header>
                <div className="note__body">{note.content}</div>
              </article>
            );
          })}
        </div>
      </div>

      <button
        className="rolling-more-btn"
        onClick={loadMore}
        disabled={loading || !hasMore}
      >
        {loading ? "불러오는 중…" : hasMore ? "더보기" : "끝!"}
      </button>
    </div>
  );
}
