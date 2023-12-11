import "./App.css";
import Game from "./pages/Game/Game";
import { Welcome } from "./components/Welcome";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game" element={<Navigate to="/game" />} />
      </Routes>
    </Router>
  );
};

export default App;
