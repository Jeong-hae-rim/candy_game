import "./candyGame.css";

import PLAYER from "../assets/images/candy/player_idle.png";
import PLAYER_HOLDING from "../assets/images/candy/player_holding.png";
import PLAYER_GAMEOVER from "../assets/images/candy/player_over.png";

import CANDY_RED from "../assets/images/candy/candy_red.png";
import CANDY_BLUE from "../assets/images/candy/candy_blue.png";
import CANDY_PURPLE from "../assets/images/candy/candy_purple.png";
import BOMB from "../assets/images/candy/bomb.png";
import SKY from "../assets/images/candy/cloud.png";
import BUILDING from "../assets/images/candy/bg_front.png";

import CANDY_SOUND from "../assets/sounds/sound1.wav";
import BOMB_SOUND from "../assets/sounds/bomb.wav";
import GAMEOVER_SOUND from "../assets/sounds/game_over.wav";
import BGM from "../assets/sounds/bgm.mp3";

import { useEffect, useRef, useState } from "react";

type CandyType = "red" | "blue" | "purple" | "bomb";

type Candy = {
  id: number;
  x: number;
  y: number;
  type: CandyType;
};

type Ranking = {
  name: string;
  score: number;
  created_at: string;
};

const candyImages: Record<CandyType, string> = {
  red: CANDY_RED,
  blue: CANDY_BLUE,
  purple: CANDY_PURPLE,
  bomb: BOMB,
};

const candyScores: Record<Exclude<CandyType, "bomb">, number> = {
  red: 1,
  blue: 2,
  purple: 3,
};

const GAME_WIDTH = 360;
const GAME_HEIGHT = 560;

const PLAYER_START_X = 140;
const PLAYER_IDLE_WIDTH = 110;
const PLAYER_HOLDING_WIDTH = 110;
const PLAYER_HEIGHT = Math.round(PLAYER_HOLDING_WIDTH * (607 / 425));

const MOVE_STEP = 30;

const CANDY_SIZE = 50;
const MAX_CANDY_SIZE = 55;
const CANDY_FALL_SPEED = 6;
const CANDY_CREATE_INTERVAL = 800;
const GAME_TICK = 30;

const BASKET_WIDTH = 110;
const BASKET_HEIGHT = 70;
const BASKET_OFFSET_X = 0;
const BASKET_OFFSET_Y = 10;

const CandyGame = () => {
  const [playerX, setPlayerX] = useState(PLAYER_START_X);
  const [candies, setCandies] = useState<Candy[]>([]);
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState<"idle" | "left" | "right">("idle");

  const [bombCount, setBombCount] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isHit, setIsHit] = useState(false);

  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rankError, setRankError] = useState("");

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const soundRefs = useRef<Record<string, HTMLAudioElement>>({});

  const playerImage = isGameOver
    ? PLAYER_GAMEOVER
    : direction === "idle"
    ? PLAYER
    : PLAYER_HOLDING;

  useEffect(() => {
    soundRefs.current = {
      candy: new Audio(CANDY_SOUND),
      bomb: new Audio(BOMB_SOUND),
      gameover: new Audio(GAMEOVER_SOUND),
    };

    Object.values(soundRefs.current).forEach((audio) => {
      audio.preload = "auto";
      audio.volume = 0.4;
      audio.load();
    });
  }, []);

  const moveLeft = () => {
    setPlayerX((x) => Math.max(0, x - MOVE_STEP));
    setDirection("left");
  };

  const moveRight = () => {
    setPlayerX((x) => Math.min(GAME_WIDTH - PLAYER_IDLE_WIDTH, x + MOVE_STEP));
    setDirection("right");
  };

  const playPreparedSound = (key: "candy" | "bomb" | "gameover") => {
    const audio = soundRefs.current[key];
    if (!audio) return;

    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const startBgm = () => {
    bgmRef.current?.play().catch(() => {});
  };

  const restartBgm = () => {
    if (!bgmRef.current) return;

    bgmRef.current.pause();
    bgmRef.current.currentTime = 0;
    bgmRef.current.play().catch(() => {});
  };

  const unlockSounds = () => {
    Object.values(soundRefs.current).forEach((audio) => {
      audio.muted = true;
      audio
        .play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
          audio.muted = false;
        })
        .catch(() => {
          audio.muted = false;
        });
    });
  };

  const resetGame = () => {
    setScore(0);
    setBombCount(0);
    setIsGameOver(false);
    setIsHit(false);
    setCandies([]);
    setPlayerX(PLAYER_START_X);
    setDirection("idle");
    setHasSubmitted(false);

    restartBgm();
  };

  const restartGame = () => {
    resetGame();
    setIsStarted(true);
    startBgm();
  };

  const isCaught = (candy: Candy) => {
    const basketLeft = playerX + BASKET_OFFSET_X;
    const basketRight = basketLeft + BASKET_WIDTH;
    const basketTop = GAME_HEIGHT - PLAYER_HEIGHT + BASKET_OFFSET_Y;
    const basketBottom = basketTop + BASKET_HEIGHT;

    const candyLeft = candy.x;
    const candyRight = candy.x + CANDY_SIZE;
    const candyTop = candy.y;
    const candyBottom = candy.y + CANDY_SIZE;

    return (
      candyBottom >= basketTop &&
      candyTop <= basketBottom &&
      candyRight >= basketLeft &&
      candyLeft <= basketRight
    );
  };

  const createRandomCandy = (): Candy => {
    const bombChance = Math.min(0.3, 0.05 + score * 0.01);
    const random = Math.random();

    let type: CandyType;

    if (random < bombChance) {
      type = "bomb";
    } else {
      const candyRandom = Math.random();

      if (candyRandom < 0.5) {
        type = "red";
      } else if (candyRandom < 0.85) {
        type = "blue";
      } else {
        type = "purple";
      }
    }

    return {
      id: Date.now() + Math.random(),
      x: Math.random() * (GAME_WIDTH - MAX_CANDY_SIZE),
      y: 0,
      type,
    };
  };

  const handleBombHit = () => {
    playPreparedSound("bomb");

    setIsHit(true);
    setTimeout(() => setIsHit(false), 200);

    setBombCount((count) => {
      const next = count + 1;

      if (next >= 3) {
        setTimeout(() => {
          playPreparedSound("gameover");
          setIsGameOver(true);
        }, 300);
      }

      return next;
    });
  };

  const handleCandyCatch = (candy: Candy) => {
    if (candy.type === "bomb") {
      handleBombHit();
      return;
    }

    setScore((s) => s + candyScores[candy.type as keyof typeof candyScores]);
    playPreparedSound("candy");
  };

  const fetchRankings = async () => {
    try {
      const res = await fetch("/api/candy-ranking");

      if (!res.ok) {
        throw new Error("랭킹을 불러오지 못했습니다.");
      }

      const data: Ranking[] = await res.json();
      setRankings(data);
    } catch (error) {
      console.error(error);
      setRankError("랭킹을 불러오지 못했습니다.");
    }
  };

  const submitScore = async () => {
    if (hasSubmitted) {
      setRankError("이미 점수를 등록했어요!");
      return;
    }

    if (!name.trim()) {
      setRankError("닉네임을 입력해 주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      setRankError("");

      const res = await fetch("/api/candy-ranking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          score,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "점수를 등록하지 못했습니다.");
      }
      setHasSubmitted(true);
      setName("");
      await fetchRankings();
    } catch (error) {
      console.error(error);
      setRankError(
        error instanceof Error ? error.message : "점수를 등록하지 못했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    bgmRef.current = new Audio(BGM);
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.2;

    return () => {
      bgmRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    fetchRankings();
  }, []);

  useEffect(() => {
    if (isGameOver) {
      bgmRef.current?.pause();
    }
  }, [isGameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isStarted || isGameOver) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        moveLeft();
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        moveRight();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isStarted, isGameOver]);

  useEffect(() => {
    if (!isStarted || isGameOver) return;

    const timer = setInterval(() => {
      setCandies((prev) => [...prev, createRandomCandy()]);
    }, CANDY_CREATE_INTERVAL);

    return () => clearInterval(timer);
  }, [isStarted, score, isGameOver]);

  useEffect(() => {
    if (!isStarted || isGameOver) return;

    const timer = setInterval(() => {
      setCandies((prev) =>
        prev
          .map((candy) => ({
            ...candy,
            y: candy.y + CANDY_FALL_SPEED,
          }))
          .filter((candy) => {
            if (isCaught(candy)) {
              handleCandyCatch(candy);
              return false;
            }

            return candy.y < GAME_HEIGHT;
          })
      );
    }, GAME_TICK);

    return () => clearInterval(timer);
  }, [isStarted, playerX, isGameOver]);

  useEffect(() => {
    if (direction === "idle") return;

    const timer = setTimeout(() => {
      setDirection("idle");
    }, 5000);

    return () => clearTimeout(timer);
  }, [direction]);

  return (
    <>
      <div className="candy-game-page">
        <div className="game-wrapper">
          <div
            className={`game-area ${isGameOver ? "shake" : ""} ${
              isHit ? "hit-shake" : ""
            }`}
          >
            <div
              className="sky-layer"
              style={{
                backgroundImage: `url(${SKY})`,
              }}
            />
            <div
              className="building-layer"
              style={{
                backgroundImage: `url(${BUILDING})`,
              }}
            />

            {!isStarted && !isGameOver && (
              <div className="start-ui">
                <div className="start-title">CANDY CATCH!</div>

                <button
                  className="start-button"
                  onClick={() => {
                    setIsStarted(true);
                    startBgm();
                    unlockSounds();
                  }}
                >
                  START
                </button>
              </div>
            )}

            <div className="score">
              SCORE {score}
              <div className="heart-box">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={i < 3 - bombCount ? "heart" : "heart empty"}
                  >
                    ♥
                  </span>
                ))}
              </div>
            </div>

            {candies.map((candy) => (
              <img
                key={candy.id}
                src={candyImages[candy.type]}
                className="candy"
                style={{
                  left: candy.x,
                  top: candy.y,
                  transform: candy.type === "bomb" ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}

            {/* <div
          style={{
            position: "absolute",

            left: playerX + BASKET_OFFSET_X,
            top: GAME_HEIGHT - PLAYER_HEIGHT + BASKET_OFFSET_Y,

            width: BASKET_WIDTH,
            height: BASKET_HEIGHT,

            background: "rgba(255, 0, 0, 0.35)",
            border: "2px solid red",

            zIndex: 999,
            pointerEvents: "none",
          }}
        /> */}

            <img
              src={playerImage}
              className={`
            player
            ${direction !== "idle" ? "holding" : ""}
            ${isGameOver ? "gameover" : ""}
          `}
              style={{ left: playerX }}
            />

            {isGameOver && (
              <div className="game-over-ui">
                <div className="game-over-text">GAME OVER</div>
                <p>현재 스코어 : {score}</p>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={12}
                  placeholder="닉네임"
                  className="rank-input"
                />

                <button
                  onClick={submitScore}
                  disabled={isSubmitting || hasSubmitted}
                  className="restart-button"
                >
                  {hasSubmitted
                    ? "등록 완료"
                    : isSubmitting
                    ? "등록 중..."
                    : "점수 등록"}
                </button>

                {rankError && <div className="rank-error">{rankError}</div>}

                <button className="restart-button" onClick={restartGame}>
                  RESTART
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="control-buttons">
          <button
            className="control-button"
            disabled={!isStarted || isGameOver}
            onClick={moveLeft}
          >
            ◀
          </button>

          <button
            className="control-button"
            disabled={!isStarted || isGameOver}
            onClick={moveRight}
          >
            ▶
          </button>
        </div>

        <div className="ranking-box">
          <h3>RANKING</h3>

          <div className="ranking-list">
            {rankings.map((rank, index) => (
              <div
                key={`${rank.name}-${rank.created_at}`}
                className="ranking-row"
              >
                <span>
                  {index + 1}. {rank.name}
                </span>
                <span>{rank.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CandyGame;
