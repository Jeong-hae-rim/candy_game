import { openVNModal } from "../func/vnEvents";
import { LetterId } from "../func/puzzle";

export default function DownloadSection() {
  const letterId: LetterId = "Y2";

  return (
    <>
      <h1>자료실</h1>
      <p>여기는 절대 호댐한테 들키면 안 돼! 우리끼리만 보는 거야! (.ↀ ↀ)✧</p>
      <div className="list">
        <a className="row" href="#" onClick={(e) => e.preventDefault()}>
          <span>호열대만_CP란.pdf</span>
          <span className="muted">1.2 MB</span>
        </a>
        <a className="row" href="#" onClick={(e) => e.preventDefault()}>
          <span>호열대만_디스패치.png</span>
          <span className="muted">820 KB</span>
        </a>
        <a className="row" href="#" onClick={(e) => e.preventDefault()}>
          <span>호열대만_사진.zip</span>
          <span className="muted">5.6 MB</span>
        </a>
        <a className="row" href="#" onClick={(e) => e.preventDefault()}>
          <span>
            호열대만_동
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
                    "‘Y’ 라고 적혀 있다.",
                  ],
                })
              }
            >
              네
            </button>
            _선후배에서_연인까지.txt
          </span>
          <span className="muted">43.2 MB</span>
        </a>
      </div>
    </>
  );
}
