import TOP from "../assets/images/calendar/top.png";
import BOTTOM from "../assets/images/calendar/bottom.png";

export default function HomeSection() {
  return (
    <>
      <h2>비밀결사클럽 일정</h2>
      <div className="img-stack">
        <img src={BOTTOM} className="img-bottom" />
        <img src={TOP} className="img-top" />
      </div>
    </>
  );
}
