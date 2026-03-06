import { LetterId } from "../func/puzzle";
import PuzzleLetter from "./PuzzleLetter";

export default function DownloadSection() {
  const letterId8: LetterId = "U2";

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
          <span>
            호열대만_사진{""}
            <PuzzleLetter
              letterId={letterId8}
              correct_char="첩"
              error_char="줘"
              title="수상한 쪽지 8"
              imageSrc="IMG_U2"
              speaker={["??", "??", "??", "[양호열]"]}
              lines={[
                "[벽 틈 사이에 종이 조각이 끼어 있다.]",
                "[…손끝에 잉크가 묻는다.]",
                "[‘U’ 라고 적혀 있다.]",
                "…여기저기 잘도 숨겨놨군.",
              ]}
            />
            .zip
          </span>
          <span className="muted">5.6 MB</span>
        </a>
        <a className="row" href="#" onClick={(e) => e.preventDefault()}>
          <span>호열대만_동네_선후배에서_연인까지.txt</span>
          <span className="muted">43.2 MB</span>
        </a>
      </div>
    </>
  );
}
