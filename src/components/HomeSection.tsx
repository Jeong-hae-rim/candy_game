export default function HomeSection() {
  return (
    <>
      <h1>비밀결사클럽 홈페이지</h1>
      <h2>여기가 홈!</h2>
      <p>PC 버전일 때</p>
      <ul className="bullets">
        <li>왼쪽: 고정 사이드 메뉴</li>
        <li>오른쪽: 본문 컨텐츠</li>
        <li>키보드 ↑/↓/Enter 지원</li>
      </ul>
      <p>Mobile 버전일 때</p>
      <ul className="bullets">
        <li>위: 고정 메뉴</li>
        <li>아래: 본문 컨텐츠</li>
      </ul>

      <p className="muted">2025-11-09</p>
    </>
  );
}
