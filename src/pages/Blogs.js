import styles from "./style.module.css";
import {Button, Input, message, Modal} from "antd";
import BlogItem from "../components/BlogItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {loadBlogsThunkCreator} from "../store/blogsReducer";

const Blogs = () => {
    const blogs = useSelector((state) => state.blogs.blogsArr);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

    const handleOk = () => {
        if(groupName !== ''){
            setGroupName("");
            setOpen(false);
        }
        else {
            warning("Empty group name");
        }
    };

    const handleInputChange = (event) => {
        setGroupName(event.target.value);
    };

    const handleCancel = () => {
        setGroupName("");
        setOpen(false);
    };

    const warning = (error) => {
        messageApi.open({
            type: 'warning',
            content: error,
        });
    };

    useEffect(() => {
        dispatch(loadBlogsThunkCreator()).then(() => console.log(blogs));
        // eslint-disable-next-line
    }, [dispatch]);

    return (
        <div className={styles.cardDeck}>
            <div className={styles.blogsItemDeck}>
                {contextHolder}
                <div style={{width:"60%"}}>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <Input
                            type="text"
                            placeholder="Search"
                            style={{ height: "40px", marginTop:90 }}/>
                    </div>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <Button type={'primary'} style={{backgroundColor: "#FFFFFF",
                            width: "80%", color:"black",
                            marginTop: 20,}}
                                onClick={() => setOpen(true)}>+</Button>
                    </div>
                    {blogs && blogs.map((value) => (
                        <BlogItem key={value.blog_id} id={value.blog_id} first_name={value.user_first_name}
                                  last_name={value.user_last_name} blog_title={value.blog_title}
                                  blog_description={value.blog_description} blog_avatar={value.blog_avatar}
                                  blog_id={value.blog_id}/>
                    ))}
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
                    value={groupName}
                    placeholder="Введите название блога"
                    onChange={handleInputChange}
                />
                Описание блога
                <Input
                    value={groupName}
                    placeholder="Введите описание блога"
                    onChange={handleInputChange}
                />
            </Modal>
        </div>
    );
}

export default Blogs;