export default function GallerySection() {
  return (
    <>
      <h1>호열대만 디스패치</h1>
      <p>여기는 우리가 피땀눈물 흘려서 모은 호댐의 정수가 모여 있어! (۶•̀ᴗ•́)۶</p>
      <div className="grid gallery">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="item">
            이미지 {i + 1}
          </div>
        ))}
      </div>
    </>
  );
}
