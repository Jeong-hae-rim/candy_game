// import { LetterId } from "../func/puzzle";
// import PuzzleLetter from "./PuzzleLetter";

// import MEMO_FOLDED from "../assets/images/puzzle/memo_folded.png";
// import U_IMG from "../assets/images/puzzle/U.png";

export default function DownloadSection() {
  // const letterId8: LetterId = "U2";

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
            호열대만_사진집
            {/* <PuzzleLetter
              letterId={letterId8}
              correct_char="첩"
              error_char="줘"
              title="수상한 쪽지 8"
              imageSrc={[MEMO_FOLDED, MEMO_FOLDED, U_IMG, U_IMG]}
              speaker={["??", "??", "??", "[양호열]"]}
              lines={[
                "[도서실에 꽂혀있는 3번째 졸업 앨범 사이에 종이 조각이 끼어 있다.]",
                "[졸업 앨범의 끼워진 부분에 잉크가 묻어있다. 사진에도 묻어있다.]",
                "[‘U’ 라고 적혀 있다.]",
                "이 선배는 자기 얼굴이 더럽혀진 걸 영원히 모르겠네.",
              ]}
            />*/}
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
