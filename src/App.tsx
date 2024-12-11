import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/log-in-page";
import MainContainter from "./containers/main-container";

function App() {
  return (
    <Routes>
      <Route path="log-in" element={<LoginPage />} />
      <Route path="/*" element={<MainContainter />} />
    </Routes>
  );
}

export default App;
