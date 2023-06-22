import {Button, Card, Input, message, Modal, Popconfirm} from "antd";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
    createBlogThunkCreator,
    deleteBlogThunkCreator,
    editBlogThunkCreator,
    loadBlogsThunkCreator
} from "../store/blogsReducer";
import {useState} from "react";

function BlogItem(props) {
    const dispatch = useDispatch();
    const [blog_description, setBlogDescription] = useState(props.blog_description);
    const [blog_name, setBlogName] = useState(props.blog_title);
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);

    const handleOk = () => {
        if(blog_name !== '' && blog_description !== ''){
            const token = localStorage.getItem("token");
            const userId = JSON.parse(atob(token.split('.')[1])).sub;
            dispatch(editBlogThunkCreator(props.blog_id, userId, blog_name,
                blog_description, null, token)).then(() => {
                dispatch(loadBlogsThunkCreator(props.page));
                success("Блог отредактирован");
            });
            handleCancel();
        }
        else {
            warning("Введите данные в поля");
        }
    };

    const deleteBlog = () => {
        const token = localStorage.getItem("token");
        dispatch(deleteBlogThunkCreator(token, props.id)).then(() => {
            success("Блог удален");
            setTimeout(() => {
                dispatch(loadBlogsThunkCreator(props.page));
            }, 500);
        })
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

    return(
        <>
            <Card style={{margin: "auto 0", marginTop: "15px"}}
                  id={props.id}>
                {contextHolder}
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <div style={{marginRight: "auto", display: "flex", flexDirection: "column", width:"100%"}}>
                        <div className={"author"} style={{color:"#424242", display: "flex", alignItems:"center"}}>
                            {props.avatar && props.avatar.length > 0 ? (

                                <img src={"http://d.wolf.16.fvds.ru"
                                    + props.avatar[0].photo_path} alt={'blog'} style={{
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    width: "30px",
                                    height: "30px",
                                    marginRight:10
                                }} />)
                                : (<img src={"https://img.icons8.com/?size=512&id=7820&format=png"}
                                        alt={'blog'}style={{
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    width: "30px",
                                    height: "30px",
                                    marginRight:10
                                }}/>)}
                            {props.first_name} {" "} {props.last_name}
                        </div>
                        <div className={"title"} style={{color:"#6D8251", fontWeight: "bold", fontSize:16, marginTop:10}}>
                            {props.blog_title}
                        </div>
                        <div className={"description"} style={{color:"#888888", fontSize:12, marginTop:10}}>
                            {props.blog_description}
                        </div>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <Link to={`/blog/${props.blog_id}/${props.user_id}`}>
                                <Button type={"primary"} style={{backgroundColor:"#6D8251",
                                    marginTop:10, width: "100%"}}>
                                    Узнать больше
                                </Button>
                            </Link>
                            {props.show_buttons && (
                                <>
                                    <Button type={"primary"} style={{backgroundColor:"#F8CD84",
                                        marginTop:10, marginLeft:10}}
                                            onClick={() => {setOpen(true); setBlogName(props.blog_title);
                                            setBlogDescription(props.blog_description)}}>
                                        Редактировать
                                    </Button>
                                    <Popconfirm
                                        title="Вы хотите удалить Блог?"
                                        onConfirm={deleteBlog}
                                        okText="Да"
                                        cancelText="Нет"
                                    >
                                    <Button type={"primary"} style={{backgroundColor:"#E38169",
                                        marginTop:10, marginLeft:10}}>
                                        Удалить
                                    </Button>
                                    </Popconfirm>
                                </>)}
                        </div>
                    </div>
                    {props.photo && props.photo !== [] ? (
                        <div style={{marginLeft: "auto", width:"40%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <img src={"http://d.wolf.16.fvds.ru" + props.photo.photo_path} alt={'blog'} style={{ width: "100%" }} />
                    </div>)
                    : (
                            <div style={{marginLeft: "auto", width:"40%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                                <img src={"https://cdn-icons-png.flaticon.com/512/3669/3669981.png"} alt={'blog'} style={{ width: "100%" }} />
                            </div>
                        )}
                </div>
            </Card>
            <Modal
                title="Редактирование блога"
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
                <Input
                    value={blog_description}
                    placeholder="Введите описание блога"
                    onChange={(event) => setBlogDescription(event.target.value)}
                />
            </Modal>
        </>
    )
}

export default BlogItem;