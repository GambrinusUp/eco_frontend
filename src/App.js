import './App.css';
import Registration from "./pages/Registration";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Authorization from "./pages/Authorization";
import Profile from "./pages/Profile";

function App() {
  return (
      <Router>
          <Navbar />
        <Routes>
          <Route path='/registration' element={<Registration />} />
            <Route path='/authorization' element={<Authorization />} />
            <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
  );
}

export default App;
