import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import Info from "./pages/Info";
import NotFound from "./pages/404";
import DateLog from "./pages/DateLog";
import MbtiGame from "./pages/MbtiGame";
import MbtiGame2 from "./pages/MbtiGame2";
import YearMemory from "./pages/YearMemory";
import More from "./pages/More";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/love-and-ball" element={<Info />} />
          <Route path="/date-log" element={<DateLog />} />
          <Route path="/year-memory" element={<YearMemory />} />
          <Route path="/hy-luv-game" element={<MbtiGame />} />
          <Route path="/dm-luv-game" element={<MbtiGame2 />} />
          <Route path="/more" element={<More />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
