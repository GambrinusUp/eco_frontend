import './App.css';
import Registration from "./pages/Registration";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Authorization from "./pages/Authorization";

function App() {
  return (
      <Router>
          <Navbar />
        <Routes>
          <Route path='/registration' element={<Registration />} />
            <Route path='/authorization' element={<Authorization />} />
        </Routes>
      </Router>
  );
}

export default App;
