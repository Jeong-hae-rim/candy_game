export type PuzzleFoundPayload = { letterId: string };

export function emitPuzzleFound(letterId: string) {
  window.dispatchEvent(
    new CustomEvent<PuzzleFoundPayload>("puzzle:found", {
      detail: { letterId },
    })
  );
}
