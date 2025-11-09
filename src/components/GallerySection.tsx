export default function GallerySection() {
  return (
    <>
      <h1>호열대만 디스패치</h1>
      <div className="grid gallery">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="item">
            호열대만 이미지 {i + 1}
          </div>
        ))}
      </div>
    </>
  );
}
