import { createContext, useContext } from "react";
import type { LetterId } from "./puzzle";

export type CollectedMap = Partial<Record<LetterId, boolean>>;

export const PuzzleContext = createContext<CollectedMap>({});

export function useCollected() {
  return useContext(PuzzleContext);
}
