import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import BoardList from "./pages/BoardList";
import BoardWrite from "./pages/BoardWrite";
import BoardDetail from "./pages/BoardDetail";
import BoardUpdate from "./pages/BoardUpdate";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/boardList" element={<BoardList />} />
        <Route path="/write" element={<BoardWrite />} />
        <Route path="/board/:id" element={<BoardDetail />} />
        <Route path="/update/:id" element={<BoardUpdate />} />
      </Routes>
    </>
  );
}

export default App;
