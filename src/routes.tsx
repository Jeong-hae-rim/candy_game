import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import Secretpage from "./pages/SecretPage";
import NotFound from "./pages/404";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/secretclub432" element={<Secretpage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
