import './App.css';
import Registration from "./pages/Registration";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Authorization from "./pages/Authorization";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";

function App() {
  return (
      <Router>
          <Navbar />
        <Routes>
            <Route path='/registration' element={<Registration />} />
            <Route path='/authorization' element={<Authorization />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/blog/:id' element={<Blog />} />
        </Routes>
      </Router>
  );
}

export default App;
