import "./App.css";
import LOGO from "../assets/images/logo3.png";
import CODE from "../assets/images/code_sc.png";
import HINT from "../assets/images/hint.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SESSION_KEY, PASSWORDS } from "../func/constants";

export default function App() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [remember, setRemember] = useState(false);
  const [showHint, setShowHint] = useState(false); // ✅ 힌트 모달 상태
  const [showHint2, setShowHint2] = useState(false);

  // 이미 인증된 세션이면 바로 시크릿 페이지로
  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved === "1") navigate("/home", { replace: true });
  }, [navigate]);

  const handleSubmit = () => {
    if (!input.trim()) {
      setMessage("비밀번호를 입력하세요.");
      return;
    }
    if (PASSWORDS.includes(input)) {
      // ✅ 현재 탭 세션에서는 항상 통과되도록 세션키 저장
      sessionStorage.setItem(SESSION_KEY, "1");
      // ✅ 체크한 경우에만 '지속 저장'
      if (remember) localStorage.setItem(SESSION_KEY, "1");
      setMessage("인증 성공! 내부로 이동합니다.");
      setInput("");
      navigate("/home");
    } else {
      setMessage("비밀번호가 일치하지 않습니다. 다시 시도하세요.");
    }
  };

  const openHint = () => setShowHint(true);
  const closeHint = () => setShowHint(false);
  const openHint2 = () => setShowHint2(true);
  const closeHint2 = () => setShowHint2(false);

  return (
    <div className="container">
      <div className="card">
        <img src={LOGO} alt="비밀결사대 로고" className="login-logo" />
        <h1>:: 비밀결사대 주머니통신 ::</h1>
        <p>The After-Class Secret Club</p>

        <p className="hint-ment">
          홈페이지에 입장하기 위해서는 <br /> 초대장에 남겨둔 코드를 치고
          들어와야 해. <br /> 비밀 결사대 대원이라면, 답은 당연히 알겠지?
        </p>

        {/* ✅ 힌트 텍스트 (input 바로 아래) */}
        <div className="hint-row">
          <button type="button" className="hint-link" onClick={openHint}>
            힌트
          </button>
        </div>

        <div className="input-wrap">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="비밀번호를 입력해줘!"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>

        <label className="remember">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          다음에는 비밀번호 없이 들어오기
        </label>

        <button className="submit" onClick={handleSubmit}>
          입장
        </button>

        {message && <div className="message">{message}</div>}

        <div className="hint-row2">
          <button type="button" className="hint-link2" onClick={openHint2}>
            Access Code for International Members <br />{" "}
            海外の方向けアクセスコード
          </button>
        </div>
      </div>

      {/* ✅ 힌트 모달 */}
      {showHint && (
        <div className="modal-backdrop" onClick={closeHint}>
          <div
            className="modal hint-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="비밀번호 힌트"
          >
            <button
              className="modal-close"
              type="button"
              onClick={closeHint}
              aria-label="힌트 닫기"
            >
              ✕
            </button>

            <h2>비밀번호 힌트</h2>
            <img src={CODE} className="code-img" />
            <p>초대장에 숨겨져 있던 코드, 다들 발견했을까?</p>
            <h3>
              '<span className="hint-ment2">○○○○○○</span>' 클럽
            </h3>
          </div>
        </div>
      )}

      {showHint2 && (
        <div className="modal-backdrop" onClick={closeHint2}>
          <div
            className="modal hint-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Access Code Hint"
          >
            <button
              className="modal-close"
              type="button"
              onClick={closeHint2}
              aria-label="Close international hint"
            >
              ✕
            </button>

            <h2>Access Code 🌍</h2>
            <p>
              To gain access, enter the code hidden below. <br />
              Only true members of the After-Class Secret Club may pass.
            </p>
            <p>**************************************</p>
            <img src={HINT} className="code-img" />

            <h4>
              Think back to Ho-yeol’s confession. <br />
              Can you uncover it?
            </h4>
            <h2 className="hint-ment-global">
              {" "}
              '<span className="hint-ment2">○○○○○○○○○○○</span>' club
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
