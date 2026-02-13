import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./game2048.css";

import T2 from "../assets/images/ballantine/tile_2.png";
import T4 from "../assets/images/ballantine/tile_4.png";
import T8 from "../assets/images/ballantine/tile_8.png";
import T16 from "../assets/images/ballantine/tile_16.png";
import T32 from "../assets/images/ballantine/tile_32.png";
import T64 from "../assets/images/ballantine/tile_64.png";
import T128 from "../assets/images/ballantine/tile_128.png";
import T256 from "../assets/images/ballantine/tile_256.png";
import T512 from "../assets/images/ballantine/tile_512.png";
import T1024 from "../assets/images/ballantine/tile_1024.png";
import T2048 from "../assets/images/ballantine/tile_2048.png";

import GIF2 from "../assets/images/ballantine/gif2.gif";
import GIF4 from "../assets/images/ballantine/gif4.gif";
import GIF8 from "../assets/images/ballantine/gif8.gif";
import GIF16 from "../assets/images/ballantine/gif16.gif";
import GIF32 from "../assets/images/ballantine/gif32.gif";
import GIF64 from "../assets/images/ballantine/gif64.gif";
import GIF128 from "../assets/images/ballantine/gif128.gif";
import GIF256 from "../assets/images/ballantine/gif256.gif";
import GIF512 from "../assets/images/ballantine/gif512.gif";
import GIF1024 from "../assets/images/ballantine/gif1024.gif";
import GIF2048 from "../assets/images/ballantine/gif2048.gif";

type Dir = "left" | "right" | "up" | "down";
type Grid = number[][];

const SIZE = 4;

const tileImgMap: Record<number, string> = {
  2: T2,
  4: T4,
  8: T8,
  16: T16,
  32: T32,
  64: T64,
  128: T128,
  256: T256,
  512: T512,
  1024: T1024,
  2048: T2048,
};

const MASCOT_STAGE = [
  {
    min: 2,
    line: "시작해 볼까! 🔥",
    gif: GIF2,
  },
  {
    min: 4,
    line: "우유 그냥 넣는 거 맞나?",
    gif: GIF4,
  },
  {
    min: 8,
    line: "버터도 넣는 거겠지?",
    gif: GIF8,
  },
  {
    min: 16,
    line: "이제 섞어볼까?",
    gif: GIF16,
  },
  {
    min: 32,
    line: "좀 꾸리꾸리한데….",
    gif: GIF32,
  },
  {
    min: 64,
    line: "동그랗게는 좀 어려운 걸….",
    gif: GIF64,
  },
  {
    min: 128,
    line: "딸기 초코 괜찮지 않나?",
    gif: GIF128,
  },
  {
    min: 256,
    line: "여자애들이 도와줬어! 날 알고있대. 이 몸의 인기란.",
    gif: GIF256,
  },
  {
    min: 512,
    line: "왜 삐뚤빼뚤 그려지는 거지?",
    gif: GIF512,
  },
  {
    min: 1024,
    line: "솔직히 좀 귀엽지 않나?",
    gif: GIF1024,
  },
  {
    min: 2048,
    line: "좋아해줬으면 좋겠는데.",
    gif: GIF2048,
  },
];

function emptyGrid(): Grid {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function cloneGrid(g: Grid): Grid {
  return g.map((row) => row.slice());
}

function gridsEqual(a: Grid, b: Grid): boolean {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) if (a[r][c] !== b[r][c]) return false;
  }
  return true;
}

function randomEmptyCell(g: Grid): { r: number; c: number } | null {
  const empties: Array<{ r: number; c: number }> = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (g[r][c] === 0) empties.push({ r, c });
    }
  }
  if (empties.length === 0) return null;
  return empties[Math.floor(Math.random() * empties.length)];
}

function addRandomTile(g: Grid): Grid {
  const next = cloneGrid(g);
  const cell = randomEmptyCell(next);
  if (!cell) return next;
  // 90% 2, 10% 4
  next[cell.r][cell.c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function compressAndMergeLine(line: number[]): {
  line: number[];
  gained: number;
} {
  // remove zeros
  const arr = line.filter((x) => x !== 0);
  let gained = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] !== 0 && arr[i] === arr[i + 1]) {
      arr[i] = arr[i] * 2;
      gained += arr[i];
      arr[i + 1] = 0;
      i++;
    }
  }

  const merged = arr.filter((x) => x !== 0);
  while (merged.length < SIZE) merged.push(0);

  return { line: merged, gained };
}

function rotateGrid(g: Grid): Grid {
  // rotate 90deg clockwise
  const out = emptyGrid();
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      out[c][SIZE - 1 - r] = g[r][c];
    }
  }
  return out;
}

function moveLeft(g: Grid): { grid: Grid; gained: number } {
  const out = emptyGrid();
  let gained = 0;
  for (let r = 0; r < SIZE; r++) {
    const { line, gained: add } = compressAndMergeLine(g[r]);
    out[r] = line;
    gained += add;
  }
  return { grid: out, gained };
}

function move(g: Grid, dir: Dir): { grid: Grid; gained: number } {
  // normalize to moveLeft using rotations
  let working = cloneGrid(g);
  let gained = 0;

  const rot = (n: number) => {
    for (let i = 0; i < n; i++) working = rotateGrid(working);
  };

  // Bring direction to "left"
  if (dir === "up") rot(3);
  if (dir === "right") rot(2);
  if (dir === "down") rot(1);

  const res = moveLeft(working);
  working = res.grid;
  gained = res.gained;

  // rotate back
  if (dir === "up") rot(1);
  if (dir === "right") rot(2);
  if (dir === "down") rot(3);

  return { grid: working, gained };
}

function canMove(g: Grid): boolean {
  // any empty
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) if (g[r][c] === 0) return true;
  // any mergeable neighbors
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const v = g[r][c];
      if (r + 1 < SIZE && g[r + 1][c] === v) return true;
      if (c + 1 < SIZE && g[r][c + 1] === v) return true;
    }
  }
  return false;
}

function getMaxTile(g: Grid): number {
  let m = 0;
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) m = Math.max(m, g[r][c]);
  return m;
}

export default function Game2048() {
  const [grid, setGrid] = useState<Grid>(() =>
    addRandomTile(addRandomTile(emptyGrid()))
  );
  const [score, setScore] = useState(0);
  const [winOpen, setWinOpen] = useState(false);
  const [winShown, setWinShown] = useState(false);

  const gameOver = useMemo(() => !canMove(grid), [grid]);
  const maxTile = useMemo(() => getMaxTile(grid), [grid]);

  useEffect(() => {
    // 2048을 "최초로" 만들었을 때만 팝업
    if (maxTile >= 2048 && !winShown) {
      setWinShown(true);
      setWinOpen(true);
    }
  }, [maxTile, winShown]);

  const reset = useCallback(() => {
    setScore(0);
    setGrid(addRandomTile(addRandomTile(emptyGrid())));
    setWinOpen(false);
    setWinShown(false);
  }, []);

  const doMove = useCallback(
    (dir: Dir) => {
      if (gameOver) return;
      if (winOpen) return; // ✅ 승리 팝업 열려있으면 입력 막기

      const { grid: moved, gained } = move(grid, dir);
      if (gridsEqual(grid, moved)) return;

      const withTile = addRandomTile(moved);
      setGrid(withTile);
      if (gained) setScore((s) => s + gained);
    },
    [grid, gameOver, winOpen]
  );

  useEffect(() => {
    const urls = Object.values(tileImgMap); // {2: img, 4: img ...}의 value들
    urls.forEach((src) => {
      const img = new Image();
      img.src = src;
      // 지원 브라우저에서 디코딩을 미리 끝내기
      // (실패해도 문제 없음)
      (img as any).decode?.().catch(() => {});
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (winOpen) return; // ✅ 팝업 열려있으면 키 입력 무시

      const key = e.key;
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(key))
        e.preventDefault();

      if (key === "ArrowLeft") doMove("left");
      if (key === "ArrowRight") doMove("right");
      if (key === "ArrowUp") doMove("up");
      if (key === "ArrowDown") doMove("down");
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown as any);
  }, [doMove, winOpen]);

  const Cell = React.memo(function Cell({
    v,
    tileImgMap,
  }: {
    v: number;
    tileImgMap: Record<number, string>;
  }) {
    if (!v) return <div className="g2048-cell v0" />;

    const src = tileImgMap[v];

    return (
      <div className={`g2048-cell v${v}`}>
        {src ? <img className="g2048-tileimg" src={src} alt="" /> : v}
      </div>
    );
  });

  const currentStage = useMemo(() => {
    let stage = MASCOT_STAGE[0];

    for (const s of MASCOT_STAGE) {
      if (maxTile >= s.min) stage = s;
    }

    return stage;
  }, [maxTile]);

  return (
    <div className="g2048">
      <div className="g2048-head">
        <div className="g2048-title">
          <strong>💥호댐 2048 초콜릿 머지🐰💥</strong>
          <br />
          <span className="muted-game">
            가사실에서 정대만이 양호열을 위해 <br />
            초콜릿을 만들고 있다는 소문이 들리는데🍳⁉️ <br /> <br />
            따라가 보자!
          </span>
        </div>

        <br />

        <div className="g2048-mascot">
          <div className="g2048-mascot-bubble">
            <span key={currentStage.line} className="g2048-mascot-line">
              {currentStage.line}
            </span>
          </div>
          <img
            key={currentStage.gif} // ⭐ 이게 중요 (GIF 강제 리마운트)
            src={currentStage.gif}
            alt=""
            className="g2048-mascot-gif"
            draggable={false}
          />
        </div>

        <div className="g2048-stats">
          <div className="g2048-pill">
            <div className="muted">SCORE</div>
            <div className="g2048-num">{score}</div>
          </div>
          <div className="g2048-pill">
            <div className="muted">MAX</div>
            <div className="g2048-num">{maxTile}</div>
          </div>
          <button className="g2048-btn" onClick={reset}>
            리셋
          </button>
        </div>
      </div>

      <div
        className={`g2048-board ${gameOver ? "is-over" : ""}`}
        role="application"
        aria-label="2048 game board"
      >
        {grid.map((row, r) =>
          row.map((v, c) => (
            <Cell key={`${r}-${c}`} v={v} tileImgMap={tileImgMap} />
          ))
        )}

        {winOpen && (
          <div className="g2048-overlay">
            <div className="g2048-overcard">
              <strong>양호열에게 줄 초콜릿 완성!</strong>
              <p className="muted">
                조금 더 만들어 볼까? <br /> 더 많이 있으면 더 좋아할 테니까!
              </p>

              <div className="g2048-over-actions">
                <button className="g2048-btn" onClick={() => setWinOpen(false)}>
                  계속하기
                </button>
                <button className="g2048-btn" onClick={reset}>
                  다시하기
                </button>
              </div>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="g2048-overlay">
            <div className="g2048-overcard">
              <strong>GAME OVER</strong>
              <p className="muted">
                여기서 포기할 수는 없어…! <br /> 나는 불꽃남자니까! 🔥
              </p>
              <button className="g2048-btn" onClick={reset}>
                다시하기
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="g2048-controls">
        <button onClick={() => doMove("up")}>▲</button>
        <div>
          <button onClick={() => doMove("left")}>◀</button>
          <button onClick={() => doMove("down")}>▼</button>
          <button onClick={() => doMove("right")}>▶</button>
        </div>
      </div>
    </div>
  );
}
