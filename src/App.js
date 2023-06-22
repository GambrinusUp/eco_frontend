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
import LeaderBord from "./pages/LeaderBord";
import EditProfile from "./pages/EditProfile";
import Events from "./pages/Events";
import SubBlogs from "./pages/SubBlogs";
import OwnerBlogs from "./pages/OwnerBlogs";
import Feed from "./pages/Feed";
import MapYa from "./pages/MapYa";


function App() {
    return (
        <Router>
            <Layout>
                <Header>
                    <Navbar/>
                </Header>
                <Content>
                    <Routes>
                        <Route path='/' element={<Feed />} />
                        <Route path='/registration' element={<Registration />} />
                        <Route path='/authorization' element={<Authorization />} />
                        <Route path='/blogs' element={<Blogs />} />
                        <Route path='/blog/:id/:user_id' element={<Blog />} />
                        <Route path='/post/:id' element={<Post />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/profile/edit' element={<EditProfile />} />
                        <Route path='/events' element={<Events />} />
                        <Route path='/subscriptions' element={<SubBlogs /> } />
                        <Route path='/owner' element={<OwnerBlogs /> } />
                        <Route path='/maps' element={<MapYa />} />
                        <Route path='/chats' element={<Chats />} />
                        <Route path='/chat/:id' element={<Chat />} />
                        <Route path='/ratings' element={<LeaderBord />} />
                    </Routes>
                </Content>
            </Layout>
        </Router>
    );
}

export default App;
