import styles from "./style.module.css";
import {Button, Input, message, Modal, Pagination} from "antd";
import BlogItem from "../components/BlogItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {createBlogThunkCreator, loadBlogsThunkCreator} from "../store/blogsReducer";
import TextArea from "antd/es/input/TextArea";

const Blogs = () => {
    const blogs = useSelector((state) => state.blogs.blogsArr);
    const dispatch = useDispatch();
    const maxPageNumber = useSelector((state) => state.blogs.maxPageNumber);
    const [open, setOpen] = useState(false);
    const [blog_description, setBlogDescription] = useState("");
    const [blog_name, setBlogName] = useState("");
    const [pageNumber, setPageNumber] = useState("1");
    const token = localStorage.getItem("token");
    const [messageApi, contextHolder] = message.useMessage();

    const handleOk = () => {
        if(blog_name !== '' && blog_description !== ''){
            const token = localStorage.getItem("token");
            const userId = JSON.parse(atob(token.split('.')[1])).sub;
            console.log(userId)
            dispatch(createBlogThunkCreator(userId, blog_name, blog_description, null, token)).then(() => {
                dispatch(loadBlogsThunkCreator(pageNumber));
                success("Блог создан");
            });
            console.log(pageNumber);
            handleCancel();
        }
        else {
            warning("Введите данные в поля");
        }
    };

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1])).sub;
        } catch (e) {
            return null;
        }
    };

    const handleCancel = () => {
        setBlogDescription("");
        setBlogName("");
        setOpen(false);
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

    useEffect(() => {
        dispatch(loadBlogsThunkCreator(pageNumber)).then(() => console.log(blogs));
        // eslint-disable-next-line
    }, [dispatch, pageNumber]);

    return (
        <div className={styles.cardDeck}>
            <div className={styles.blogsItemDeck}>
                {contextHolder}
                <div style={{width:"60%"}}>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <Input
                            type="text"
                            placeholder="Search"
                            style={{ height: "40px", marginTop:20 }}/>
                    </div>
                    {token && token !== '' && (<div style={{display:"flex", justifyContent:"center"}}>
                        <Button type={'primary'} style={{backgroundColor: "#FFFFFF",
                            width: "80%", color:"black",
                            marginTop: 20,}}
                                onClick={() => setOpen(true)}>+</Button>
                    </div>)}
                    {blogs && blogs.map((value) => (
                        <BlogItem key={value.blog_id} id={value.blog_id} first_name={value.user_first_name}
                                  last_name={value.user_last_name} blog_title={value.blog_title}
                                  blog_description={value.blog_description}
                                  blog_id={value.blog_id}
                                  show_buttons={value.user_id === parseJwt(token)}
                                  page={pageNumber}
                                  user_id={value.user_id}
                                  avatar={value.user_avatar}
                                  photo={value.blog_avatar[0]}/>
                    ))}
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <Pagination style={{marginTop: 20, paddingBottom:20}}
                                    defaultCurrent={1} total={maxPageNumber * 10}
                                    onChange={(event) => {setPageNumber(event);}}/>
                    </div>
                </div>
            </div>
            <Modal
                title="Создание нового блога"
                centered
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
            >
                Название блога
                <Input
                    value={blog_name}
                    placeholder="Введите название блога"
                    onChange={(event) => setBlogName(event.target.value)}
                />
                Описание блога
                <TextArea
                    value={blog_description}
                    placeholder="Введите описание блога"
                    onChange={(event) => setBlogDescription(event.target.value)}
                />
            </Modal>
        </div>
    );
}

export default Blogs;