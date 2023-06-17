import './App.css';
import Registration from "./pages/Registration";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Authorization from "./pages/Authorization";
import Profile from "./pages/Profile";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import {Content, Header} from "antd/es/layout/layout";
import {Layout} from "antd";

function App() {
    return (
        <Router>
            <Layout>
                <Header>
                    <Navbar/>
                </Header>
                <Content>
                    <Routes>
                        <Route path='/registration' element={<Registration />} />
                        <Route path='/authorization' element={<Authorization />} />
                        <Route path='/blogs' element={<Blogs />} />
                        <Route path='/blog/:id' element={<Blog />} />
                        <Route path='/profile' element={<Profile />} />
                    </Routes>
                </Content>
            </Layout>
        </Router>
    );
}

export default App;
