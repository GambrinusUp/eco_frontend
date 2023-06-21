import './App.css';
import Registration from "./pages/Registration";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Authorization from "./pages/Authorization";
import Profile from "./pages/Profile";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import Chats from "./pages/Chats"
import {Content, Header} from "antd/es/layout/layout";
import {Layout} from "antd";
import Chat from "./pages/Chat";
import Post from "./pages/Post";


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
                        <Route path='/blog/:id/:user_id' element={<Blog />} />
                        <Route path='/post/:id' element={<Post />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/chats' element={<Chats />} />
                        <Route path='/chat/:id' element={<Chat />} />
                    </Routes>
                </Content>
            </Layout>
        </Router>
    );
}

export default App;
