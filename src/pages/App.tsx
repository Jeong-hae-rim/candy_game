import "./App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SESSION_KEY, PASSWORD } from "../func/constants";

export default function App() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPw, setShowPw] = useState(false);

  // 이미 인증된 세션이면 바로 시크릿 페이지로
  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved === "1") navigate("/secretclub432", { replace: true });
  }, [navigate]);

  const handleSubmit = () => {
    if (!input.trim()) {
      setMessage("비밀번호를 입력하세요.");
      return;
    }
    if (input === PASSWORD) {
      // ✅ 현재 탭 세션에서는 항상 통과되도록 세션키 저장
      sessionStorage.setItem(SESSION_KEY, "1");
      // ✅ 체크한 경우에만 '지속 저장'
      if (remember) localStorage.setItem(SESSION_KEY, "1");
      setMessage("인증 성공! 내부로 이동합니다.");
      setInput("");
      navigate("/secretclub432");
    } else {
      setMessage("비밀번호가 일치하지 않습니다. 다시 시도하세요.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>비밀 페이지</h1>
        <p className="desc">
          비밀번호를 입력해야 접근할 수 있습니다. (데모용이므로 서버 검증 없음)
        </p>

        <div className="input-wrap">
          <input
            type={showPw ? "text" : "password"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <button
            className="toggle"
            type="button"
            onClick={() => setShowPw((s) => !s)}
          >
            {showPw ? "숨기기" : "표시"}
          </button>
        </div>

        <label className="remember">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          다음에 다시 묻지 않음 (세션)
        </label>

        <button className="submit" onClick={handleSubmit}>
          입장
        </button>

        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}
