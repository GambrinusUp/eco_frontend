import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    loadBlogPostsThunkCreator,
    loadBlogPostsWithTokenThunkCreator,
    loadBlogsThunkCreator,
    loadBlogThunkCreator
} from "../store/blogsReducer";
import {useDispatch, useSelector} from "react-redux";
import styles from "./style.module.css";
import {Button, Card, Input, message, Modal, Pagination, Select} from "antd";
import PostItem from "../components/PostItem";
import {createNewSubThunkCreator, deleteSubThunkCreator} from "../store/subReducer";
import {loadCategoriesThunkCreator} from "../store/categoriesReducer";
import TextArea from "antd/es/input/TextArea";
import {createPostThunkCreator} from "../store/postsReducer";

const Blog = () => {
    const { id } = useParams();
    const {user_id} = useParams();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const blog = useSelector((state) => state.blogs.blog);
    const blogPostsArr = useSelector((state) => state.blogs.blogPostsArr);
    const [pageNumberPost, setPageNumberPost] = useState("1");
    const [showBtn, setShowBtn] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const maxPageNumber = useSelector((state) => state.blogs.postMaxPage);
    const [category, setCategory] = useState("");
    const categories = useSelector((state) => state.cats.categories);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    function subscription() {
        let userId = parseJwt(token);
        dispatch(createNewSubThunkCreator(userId, id, token)).then(() => {
            success("Вы подписались");
            dispatch(loadBlogThunkCreator(id, token));
        }).catch(() => {
            warning("Ошибка");
        });
    }

    function unSubscription() {
        let userId = parseJwt(token);
        dispatch(deleteSubThunkCreator(userId, id)).then(() => {
            success("Вы отписались");
            dispatch(loadBlogThunkCreator(id, token));
        })
    }

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1])).sub;
        } catch (e) {
            return null;
        }
    };

    const warning = (error) => {
        messageApi.open({
            type: 'warning',
            content: error,
        });
    };

    const success = (message) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };

    const options = categories.map(({ category_id, category_name }) => ({
        value: category_id,
        label: category_name,
    }));

    const onChangeSelect = (value) => {
        setSelectedCategories(value);
        console.log(`selected ${value}`);
    };

    const handleOk = () => {
        dispatch(createPostThunkCreator(id, title, text, token, selectedCategories)).then(() => {
            success("Пост создан");
            dispatch(loadBlogPostsThunkCreator(id, pageNumberPost, token));
        });
        setOpen(false);
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        dispatch(loadBlogThunkCreator(id, token));
        dispatch(loadBlogPostsThunkCreator(id, pageNumberPost, token));
        dispatch(loadCategoriesThunkCreator());
    }, [dispatch, pageNumberPost]);

    return (
        <div className={styles.cardDeck}>
            <div className={styles.blogItemDeck}>
                {contextHolder}
                <div style={{width:"80%"}}>
                    <Card style={{margin: "auto 0", marginTop: "20px", minHeight: 200, width: "100%",
                        opacity: 1}}>
                        <div style={{ display: "flex", flexDirection: "row", padding: "20px" }}>
                            <div
                                style={{
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    width: "100px",
                                    height: "100px",
                                }}
                            >
                                {blog.blog_avatar && blog.blog_avatar.length > 0 ? (<img src={"http://d.wolf.16.fvds.ru"
                                    + blog.blog_avatar[0].photo_path} alt={'blog'} style={{ width: "100%" }} />)
                                : (<img src={"https://cdn-icons-png.flaticon.com/512/3669/3669981.png"}
                                        alt={'blog'} style={{width: "100%"}}/>)}
                            </div>
                            <div style={{ flex: "1", paddingLeft: "40px" }}>
                                <div style={{ color: "#6D8251", fontWeight: "bold", fontSize: 16 }}>
                                    {blog.blog_title}
                                </div>
                                <div style={{ color: "#888888", fontSize: 12 }}>
                                    {blog.blog_description}
                                </div>
                            </div>
                        </div>
                        {showBtn && blog.user_id !== parseJwt(token) && token !== '' && !blog.is_subscribed
                            && (<Button type={'primary'} style={{width: "100%",
                            color:"white", marginTop: 20, backgroundColor:"#A9BE8C"}}
                            onClick={subscription}>Подписаться</Button>)}
                        {blog.is_subscribed && (
                            <Button type={'primary'} style={{width: "100%",
                                color:"white", marginTop: 20, backgroundColor:"#A9BE8C"}}
                                    onClick={unSubscription}>Отписаться</Button>
                        )}
                    </Card>
                    {token && parseJwt(token) === blog.user_id
                        && (<div style={{display:"flex", justifyContent:"center"}}>
                        <Button type={'primary'} style={{backgroundColor: "#FFFFFF",
                            width: "80%", color:"black",
                            marginTop: 20,}}
                                onClick={() => setOpen(true)}>+</Button>
                    </div>)}
                    {blogPostsArr && blogPostsArr.map((value) => (
                        <PostItem  key={value.post_id} id={value.post_id} first_name={value.user_first_name}
                                   last_name={value.user_last_name} post_title={value.post_title}
                                   post_description={value.post_text} post_tags={value.categories}
                                   dislikes={value.count_dislikes} likes={value.count_likes}
                                   blogId={blog.blog_id} photos={value.photos}
                                   is_dislike={value.is_dislike} is_like={value.is_like}
                                   page={pageNumberPost}
                                   showBtn={parseJwt(token) === user_id}/>
                    ))}
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <Pagination style={{marginTop: 20, paddingBottom:20}}
                                    defaultCurrent={1} total={maxPageNumber * 10}
                                    onChange={(event) => {setPageNumberPost(event);}}/>
                    </div>
                </div>
            </div>
            <Modal
                title="Создание нового блога"
                centered
                open={open}
                onOk={handleOk}
                onCancel={() => setOpen(false)}
                width={700}
            >
                Название поста
                <Input
                    value={title}
                    placeholder="Введите название поста"
                    onChange={(event) => setTitle(event.target.value)}
                />
                Текст поста
                <TextArea
                    value={text}
                    placeholder="Введите текст поста"
                    onChange={(event) => setText(event.target.value)}
                />
                Выберите категории
                <div style={{width: "100%"}}>
                    <Select
                        style={{width: "100%"}}
                        mode="multiple"
                        showSearch
                        placeholder="Выберите категории"
                        optionFilterProp="children"
                        onChange={onChangeSelect}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={options}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default Blog;