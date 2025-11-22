export default function AboutSection() {
  const cooperImages = import.meta.glob("../assets/images/cooper/*", {
    eager: true,
    import: "default",
  }) as Record<string, string>;

  const sortedList = Object.entries(cooperImages)
    .sort(([pathA], [pathB]) => {
      const nameA = pathA.split("/").pop()!.split(".")[0]; // cooper0
      const nameB = pathB.split("/").pop()!.split(".")[0]; // cooper1

      const numA = parseInt(nameA.replace(/\D/g, ""), 10); // 0
      const numB = parseInt(nameB.replace(/\D/g, ""), 10); // 1

      return numA - numB;
    })
    .map(([, src]) => src);

  return (
    <>
      <h1>천사들 소개</h1>
      <p>여기는 우리를 도와주는 천사들을 소개하는 곳이야 ଘ(੭ˊᵕˋ)੭* ੈ✩‧₊˚</p>
      <p className="muted">호열아 대만아 기쁘지?</p>

      {/* 🔥 그리드 이미지 목록 */}
      <div className="cooper-grid">
        {sortedList.map((src, idx) => (
          <div key={idx} className="cooper-item">
            <img src={src} alt={`cooper-${idx}`} />
          </div>
        ))}
      </div>
    </>
  );
}
