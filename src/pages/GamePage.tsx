import "./SecretPage.css";

import CandyGame from "../components/CandyGame";
export default function GamePage() {
  return (
    <div className="pc-layout">
      <main className="pc-main" role="region" aria-live="polite">
        <CandyGame />
      </main>
    </div>
  );
}
