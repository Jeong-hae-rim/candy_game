export type LetterId = "Y1" | "U1" | "M1" | "M2" | "Y2" | "C1" | "H1" | "U2";

export const LETTER_ORDER: LetterId[] = [
  "Y1",
  "U1",
  "M1",
  "M2",
  "Y2",
  "C1",
  "H1",
  "U2",
];

export const LETTER_CHAR: Record<LetterId, string> = {
  Y1: "Y",
  U1: "U",
  M1: "M",
  M2: "M",
  Y2: "Y",
  C1: "C",
  H1: "H",
  U2: "U",
};

export const PUZZLE_STORAGE_KEY = "puzzle_yummychu";

export type CollectedState = Partial<Record<LetterId, boolean>>;

export function loadCollected(): CollectedState {
  try {
    return JSON.parse(localStorage.getItem(PUZZLE_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveCollected(state: CollectedState) {
  localStorage.setItem(PUZZLE_STORAGE_KEY, JSON.stringify(state));
  // ✅ 같은 탭에서도 HUD 갱신되도록 커스텀 이벤트 발사
  window.dispatchEvent(new Event("puzzle:update"));
}

export function buildCode(collected: CollectedState): string {
  // 모인 글자 순서대로 조합 (안 모인 건 빈칸)
  return LETTER_ORDER.map((id) => (collected[id] ? LETTER_CHAR[id] : "•")).join(
    ""
  );
}

export function isComplete(collected: CollectedState): boolean {
  return LETTER_ORDER.every((id) => collected[id]);
}

export function finalRoomCode(): string {
  // 최종 이동용 코드는 항상 YUMMYCHU
  return LETTER_ORDER.map((id) => LETTER_CHAR[id]).join("");
}

export function markCollected(prev: any, letterId: string) {
  const next = { ...prev, [letterId]: true };
  saveCollected(next);
  return next;
}
