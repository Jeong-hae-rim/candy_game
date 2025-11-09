export default function DownloadSection() {
  return (
    <>
      <h1>자료실</h1>
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
      </div>
    </>
  );
}
